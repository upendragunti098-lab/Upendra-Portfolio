import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Perform a lightweight check to verify connection to Supabase
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Supabase connection successfully established!",
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      session: data.session ? "Active session found" : "No active session (expected for public/anon)",
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown connection error";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
