import { NextResponse } from "next/server";
import { executeSql } from "@/lib/sqlEngine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = typeof body.query === "string" ? body.query.trim() : "";

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Query string is required." },
        { status: 400 }
      );
    }

    if (query.length > 2000) {
      return NextResponse.json(
        { success: false, error: "Query exceeds maximum length of 2000 characters." },
        { status: 400 }
      );
    }

    // Execute query with strict sandbox safety
    const result = executeSql(query);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected SQL evaluation error occurred.";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 400 }
    );
  }
}
