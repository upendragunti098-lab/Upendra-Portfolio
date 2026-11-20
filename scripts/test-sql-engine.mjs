import fs from "fs";
import path from "path";

const portfolioPath = path.resolve(process.cwd(), "src/data/portfolio.ts");
const content = fs.readFileSync(portfolioPath, "utf-8");

console.log("Checking sqlSandboxData in portfolio.ts...");
if (content.includes("upendra_career_impact") && content.includes("upendra_technical_skills") && content.includes("upendra_projects")) {
  console.log("✅ All 3 read-only tables defined in portfolio.ts");
} else {
  console.error("❌ Missing tables in portfolio.ts");
  process.exit(1);
}

// Check prebuilt queries
if (content.includes("query-1") && content.includes("query-2") && content.includes("query-3")) {
  console.log("✅ All 3 prebuilt queries (query-1, query-2, query-3) defined in portfolio.ts");
} else {
  console.error("❌ Missing prebuilt queries");
  process.exit(1);
}

console.log("✅ SQL Sandbox Data integrity verified successfully!");
