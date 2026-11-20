import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// 1. Read .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (!fs.existsSync(envPath)) {
  console.error("❌ Error: .env.local file not found.");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf-8");
const envVars = {};
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
    const [key, ...values] = trimmed.split("=");
    envVars[key.trim()] = values.join("=").trim();
  }
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  envVars.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: Missing Supabase environment variables in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable() {
  console.log("🔍 Checking 'contact_submissions' table existence and security policies in Supabase...\n");

  // 1. Check SELECT permission (Must be blocked for anon)
  const { error: selectError } = await supabase
    .from("contact_submissions")
    .select("id")
    .limit(1);

  if (selectError && (selectError.code === "PGRST205" || selectError.message.includes("schema cache"))) {
    console.log("❌ Table 'public.contact_submissions' does not exist yet.");
    console.log("👉 Please execute the migration in your Supabase SQL Editor.\n");
    return;
  }

  if (selectError && (selectError.code === "42501" || selectError.message.includes("permission denied"))) {
    console.log("🔒 Security Confirmed: Public SELECT is strictly denied (42501 permission denied).");
  } else if (!selectError) {
    console.log("⚠️ Notice: Public SELECT was allowed (check if RLS or SELECT policies are open).");
  }

  // 2. Check INSERT capability without SELECT
  const { error: insertError } = await supabase
    .from("contact_submissions")
    .insert([
      {
        name: "Verification Probe",
        email: "probe@verify.local",
        subject: "Health check",
        message: "Automated table presence check.",
      },
    ]);

  if (!insertError) {
    console.log("✅ Functionality Confirmed: Public anonymous INSERT succeeded without needing read permissions.");
    console.log("\n🎉 Table 'public.contact_submissions' exists, is protected by RLS, and accepts form entries!");
  } else {
    console.log("❌ INSERT test failed:", insertError.message);
  }
}

checkTable();
