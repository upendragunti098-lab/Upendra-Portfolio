import { createHash, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const HEALTH_CHECK_TABLE = "contact_submissions";
const HEALTH_CHECK_TIMEOUT_MS = 8000;

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

function isAuthorizedCronRequest(
  authHeader: string | null,
  expectedSecret: string
): boolean {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const providedSecret = authHeader.slice("Bearer ".length).trim();
  if (!providedSecret) {
    return false;
  }

  const expectedHash = createHash("sha256").update(expectedSecret).digest();
  const providedHash = createHash("sha256").update(providedSecret).digest();
  return timingSafeEqual(expectedHash, providedHash);
}

function isPausedOrUnavailableError(params: {
  httpStatus?: number;
  code?: string;
  message?: string;
}): boolean {
  const { httpStatus, code = "", message = "" } = params;

  // HTTP 0 indicates a client-side network/abort failure before a response was received.
  // HTTP 540 is returned by Supabase for paused projects; 502/503/504/52x indicate unavailable upstream services.
  if (
    httpStatus !== undefined &&
    (httpStatus === 0 ||
      httpStatus === 540 ||
      httpStatus === 502 ||
      httpStatus === 503 ||
      httpStatus === 504 ||
      (httpStatus >= 520 && httpStatus <= 524))
  ) {
    return true;
  }

  // PostgREST database connection, pool timeout, or schema cache unavailability errors
  if (/^PGRST00[0-3]$/.test(code)) {
    return true;
  }

  // PostgreSQL SQLSTATE classes: 08 (connection), 53 (resources), 57 (shutdown/cannot connect)
  if (/^(08|53|57)/.test(code)) {
    return true;
  }

  const normalized = message.toLowerCase();
  return (
    normalized.includes("paused") ||
    normalized.includes("unavailable") ||
    normalized.includes("bad gateway") ||
    normalized.includes("gateway timeout") ||
    normalized.includes("timeout") ||
    normalized.includes("timed out") ||
    normalized.includes("abort") ||
    normalized.includes("fetch failed") ||
    normalized.includes("failed to fetch") ||
    normalized.includes("econnrefused") ||
    normalized.includes("enotfound") ||
    normalized.includes("etimedout") ||
    normalized.includes("econnreset") ||
    normalized.includes("network")
  );
}

function isMissingTableError(code?: string, message?: string): boolean {
  const normalized = (message || "").toLowerCase();
  return (
    code === "PGRST205" ||
    code === "42P01" ||
    normalized.includes("schema cache") ||
    normalized.includes("does not exist")
  );
}

export async function GET(request: NextRequest) {
  const timestamp = new Date().toISOString();
  const cronSecret = process.env.CRON_SECRET?.trim();

  // 1. Fail closed if CRON_SECRET is not configured on the server
  if (!cronSecret) {
    console.error(
      JSON.stringify({
        event: "supabase_health_check",
        status: "failed",
        reason: "cron_secret_not_configured",
        timestamp,
      })
    );

    return NextResponse.json(
      {
        ok: false,
        status: "error",
        database: "unknown",
        error: "Health check authentication is not configured.",
        timestamp,
      },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }

  // 2. Authenticate incoming cron request using Authorization: Bearer <CRON_SECRET>
  const authHeader = request.headers.get("authorization");
  if (!isAuthorizedCronRequest(authHeader, cronSecret)) {
    console.warn(
      JSON.stringify({
        event: "supabase_health_check",
        status: "unauthorized",
        timestamp,
      })
    );

    return NextResponse.json(
      {
        ok: false,
        status: "unauthorized",
        error: "Unauthorized",
        timestamp,
      },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  // 3. Run lightweight read-only SELECT query using existing server-side Supabase client
  const startedAt = performance.now();

  try {
    const supabase = await createClient();
    const { error, status: httpStatus } = await supabase
      .from(HEALTH_CHECK_TABLE)
      .select("id")
      .limit(1)
      .abortSignal(AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS));

    const responseTimeMs = Math.round(performance.now() - startedAt);

    // public.contact_submissions intentionally revokes SELECT from anon/authenticated
    // (001_create_contact_submissions.sql) while allowing INSERT. PostgreSQL returns
    // SQLSTATE 42501 only after PostgREST connects to the live database and confirms
    // the table exists, proving the database is active while RLS remains intact.
    const isExpectedPermissionDenied = error?.code === "42501";

    if (!error || isExpectedPermissionDenied) {
      const accessMode = error ? "rls_enforced" : "select_ok";

      console.info(
        JSON.stringify({
          event: "supabase_health_check",
          status: "healthy",
          database: "connected",
          table: HEALTH_CHECK_TABLE,
          accessMode,
          responseTimeMs,
          timestamp,
        })
      );

      return NextResponse.json(
        {
          ok: true,
          status: "healthy",
          database: "connected",
          table: HEALTH_CHECK_TABLE,
          accessMode,
          responseTimeMs,
          timestamp,
        },
        { status: 200, headers: NO_STORE_HEADERS }
      );
    }

    if (
      isPausedOrUnavailableError({
        httpStatus,
        code: error.code,
        message: error.message,
      })
    ) {
      console.error(
        JSON.stringify({
          event: "supabase_health_check",
          status: "failed",
          database: "paused_or_unavailable",
          table: HEALTH_CHECK_TABLE,
          httpStatus,
          errorCode: error.code || "UNAVAILABLE",
          errorMessage: error.message,
          responseTimeMs,
          timestamp,
        })
      );

      return NextResponse.json(
        {
          ok: false,
          status: "unhealthy",
          database: "paused_or_unavailable",
          error:
            "Supabase database appears paused, unreachable, or temporarily unavailable.",
          responseTimeMs,
          timestamp,
        },
        { status: 503, headers: NO_STORE_HEADERS }
      );
    }

    if (isMissingTableError(error.code, error.message)) {
      console.error(
        JSON.stringify({
          event: "supabase_health_check",
          status: "failed",
          database: "schema_error",
          table: HEALTH_CHECK_TABLE,
          httpStatus,
          errorCode: error.code || "TABLE_NOT_FOUND",
          errorMessage: error.message,
          responseTimeMs,
          timestamp,
        })
      );

      return NextResponse.json(
        {
          ok: false,
          status: "unhealthy",
          database: "schema_error",
          error: "Target table was not found in the database schema.",
          responseTimeMs,
          timestamp,
        },
        { status: 503, headers: NO_STORE_HEADERS }
      );
    }

    console.error(
      JSON.stringify({
        event: "supabase_health_check",
        status: "failed",
        database: "error",
        table: HEALTH_CHECK_TABLE,
        httpStatus,
        errorCode: error.code || "DB_ERROR",
        errorMessage: error.message,
        responseTimeMs,
        timestamp,
      })
    );

    return NextResponse.json(
      {
        ok: false,
        status: "unhealthy",
        database: "error",
        error: "Database health check query failed.",
        responseTimeMs,
        timestamp,
      },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  } catch (err: unknown) {
    const responseTimeMs = Math.round(performance.now() - startedAt);
    const errorMessage =
      err instanceof Error ? err.message : "Unknown database connection error";
    const errorName = err instanceof Error ? err.name : "Error";

    const isUnavailable =
      errorName === "TimeoutError" ||
      errorName === "AbortError" ||
      isPausedOrUnavailableError({ message: errorMessage });

    console.error(
      JSON.stringify({
        event: "supabase_health_check",
        status: "failed",
        database: isUnavailable ? "paused_or_unavailable" : "error",
        table: HEALTH_CHECK_TABLE,
        errorName,
        errorMessage,
        responseTimeMs,
        timestamp,
      })
    );

    return NextResponse.json(
      {
        ok: false,
        status: "unhealthy",
        database: isUnavailable ? "paused_or_unavailable" : "error",
        error: isUnavailable
          ? "Supabase database appears paused, unreachable, or timed out."
          : "Database health check failed unexpectedly.",
        responseTimeMs,
        timestamp,
      },
      { status: isUnavailable ? 503 : 500, headers: NO_STORE_HEADERS }
    );
  }
}
