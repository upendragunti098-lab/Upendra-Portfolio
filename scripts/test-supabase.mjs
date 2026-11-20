import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load .env.local variables
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

console.log("🔍 Checking Supabase Configuration...");
console.log(`URL: ${supabaseUrl}`);
console.log(`Key: ${supabaseKey ? supabaseKey.slice(0, 15) + "..." : "Not found"}`);

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing required environment variables in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("📡 Attempting connection to Supabase endpoint...");
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("❌ Supabase returned an error:", error.message);
      process.exit(1);
    }
    console.log("✅ Supabase connection verified successfully!");
    console.log("ℹ️ Endpoint reachable, auth service responding normally.");
  } catch (err) {
    console.error("❌ Failed to reach Supabase:", err.message);
    process.exit(1);
  }
}

testConnection();
