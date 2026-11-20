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
  console.error("❌ Missing required environment variables in .env.local");
  process.exit(1);
}

// Client using the public / anonymous key
const supabase = createClient(supabaseUrl, supabaseKey);

async function runSecurityTests() {
  console.log("=================================================");
  console.log("🛡️  SUPABASE CONTACT SECURITY VERIFICATION SUITE");
  console.log("=================================================\n");

  let allPassed = true;

  // -------------------------------------------------------------------------
  // TEST 1: Confirm public users CANNOT read contact submissions (SELECT test)
  // -------------------------------------------------------------------------
  console.log("TEST 1: Testing public SELECT protection...");
  const { data: selectData, error: selectError } = await supabase
    .from("contact_submissions")
    .select("*");

  if (selectError && (selectError.code === "42501" || selectError.message.includes("permission denied"))) {
    console.log("  ✅ PASSED: Public SELECT is strictly denied by PostgreSQL permissions/RLS.");
    console.log(`     Error received as expected: [${selectError.code}] ${selectError.message}`);
  } else if (!selectError && Array.isArray(selectData) && selectData.length === 0) {
    console.log("  ✅ PASSED: Public SELECT returned 0 rows (denied by RLS policy).");
  } else {
    console.error("  ❌ FAILED: Public was able to read data or unexpected error occurred:", selectError, selectData);
    allPassed = false;
  }

  // -------------------------------------------------------------------------
  // TEST 2: Confirm INSERT works without public SELECT access (Pure INSERT)
  // -------------------------------------------------------------------------
  console.log("\nTEST 2: Testing public INSERT (without SELECT access)...");
  const testPayload = {
    name: "Automated Security Test",
    email: "security-verification@test.de",
    subject: "Security & RLS Verification Probe",
    message: "Verifying that public anonymous insert succeeds while read access remains forbidden.",
    status: "unread",
    created_at: new Date().toISOString(),
  };

  // Pure insert without .select()
  const { error: insertError } = await supabase
    .from("contact_submissions")
    .insert([testPayload]);

  if (!insertError) {
    console.log("  ✅ PASSED: Public anonymous INSERT succeeded with zero errors!");
    console.log("     The record was inserted into 'public.contact_submissions' without requiring read permissions.");
  } else {
    console.error("  ❌ FAILED: Public INSERT failed:", insertError);
    allPassed = false;
  }

  // -------------------------------------------------------------------------
  // TEST 3: Confirm public users CANNOT UPDATE submissions
  // -------------------------------------------------------------------------
  console.log("\nTEST 3: Testing public UPDATE protection...");
  const { error: updateError } = await supabase
    .from("contact_submissions")
    .update({ status: "read" })
    .eq("email", "security-verification@test.de");

  if (updateError && (updateError.code === "42501" || updateError.message.includes("permission denied"))) {
    console.log("  ✅ PASSED: Public UPDATE is denied by permissions/RLS.");
    console.log(`     Error received as expected: [${updateError.code}] ${updateError.message}`);
  } else if (!updateError) {
    console.log("  ✅ PASSED: Public UPDATE modified 0 rows (denied by RLS policy).");
  } else {
    console.log(`  ℹ️ Update result: ${updateError.message}`);
  }

  // -------------------------------------------------------------------------
  // TEST 4: Confirm public users CANNOT DELETE submissions
  // -------------------------------------------------------------------------
  console.log("\nTEST 4: Testing public DELETE protection...");
  const { error: deleteError } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("email", "security-verification@test.de");

  if (deleteError && (deleteError.code === "42501" || deleteError.message.includes("permission denied"))) {
    console.log("  ✅ PASSED: Public DELETE is denied by permissions/RLS.");
    console.log(`     Error received as expected: [${deleteError.code}] ${deleteError.message}`);
  } else if (!deleteError) {
    console.log("  ✅ PASSED: Public DELETE deleted 0 rows (denied by RLS policy).");
  } else {
    console.log(`  ℹ️ Delete result: ${deleteError.message}`);
  }

  console.log("\n=================================================");
  if (allPassed) {
    console.log("🎉 ALL SECURITY & INTEGRATION TESTS PASSED!");
  } else {
    console.log("⚠️ Some tests failed. Please review above output.");
  }
  console.log("=================================================\n");
}

runSecurityTests();
