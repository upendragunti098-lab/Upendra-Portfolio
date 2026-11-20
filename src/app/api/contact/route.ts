import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// In-memory rate limiter: maximum 5 requests per 10 minutes per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipSubmissionTracker = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipSubmissionTracker.get(ip);

  // If no record exists or window expired, reset
  if (!record || now > record.resetAt) {
    ipSubmissionTracker.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  // If over limit, block
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    // 0. Rate limiting check
    const forwardedHeader = request.headers.get("x-forwarded-for");
    const clientIp =
      (forwardedHeader ? forwardedHeader.split(",")[0].trim() : null) ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Too many submissions from this connection. Please wait a few minutes before trying again.",
          code: "RATE_LIMITED",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject =
      typeof body.subject === "string" && body.subject.trim()
        ? body.subject.trim()
        : "Portfolio Inquiry";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    // 1. Validation: Required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 2. Validation: Length limits
    if (name.length > 255 || email.length > 255 || subject.length > 255) {
      return NextResponse.json(
        { success: false, error: "Input text exceeds maximum length (255 characters)." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Message exceeds maximum length (5000 characters)." },
        { status: 400 }
      );
    }

    // 3. Validation: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 4. Initialize server-side Supabase client
    const supabase = await createClient();

    // 5. Insert into Supabase 'contact_submissions' table
    const { error } = await supabase.from("contact_submissions").insert([
      {
        name,
        email,
        subject,
        message,
        created_at: new Date().toISOString(),
        status: "unread",
      },
    ]);

    if (error) {
      // Catch when the table has not yet been created in the Supabase schema
      const isMissingTable =
        error.code === "PGRST205" ||
        error.message?.includes("schema cache") ||
        error.message?.includes("does not exist");

      if (isMissingTable) {
        return NextResponse.json(
          {
            success: false,
            error:
              "The 'contact_submissions' table does not exist in Supabase yet. Please execute the SQL migration in your Supabase SQL Editor.",
            code: "TABLE_NOT_FOUND",
          },
          { status: 503 }
        );
      }

      // Other database or permission/RLS errors
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to save message to database.",
          code: error.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error occurred.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
