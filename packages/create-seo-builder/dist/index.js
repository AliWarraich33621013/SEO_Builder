#!/usr/bin/env node
#!/usr/bin/env node

// src/index.ts
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { createInterface } from "readline/promises";
import { dirname, join, resolve } from "path";
import { stdin as input, stdout as output } from "process";
import { fileURLToPath } from "url";
var __dirname = dirname(fileURLToPath(import.meta.url));
var templatesDir = join(__dirname, "../templates");
var args = process.argv.slice(2);
var skipConfirm = args.includes("--yes") || args.includes("-y");
var HELP_TEXT = `create-seo-builder \u2014 add SEO Builder files to an existing Next.js + Payload project

This CLI is an add-on scaffolder. It does NOT create a full Next.js or Payload app.

Usage:
  npx create-seo-builder@latest [target-directory]
  npm create seo-builder@latest [target-directory]

Run inside your existing project root (where package.json lives).

Examples:
  cd my-next-payload-app
  npx create-seo-builder@latest .

What it adds:
  - seo-builder.config.ts
  - app/blog, sitemap, robots, and API route wrappers
  - SEO_BUILDER_SETUP.md

After scaffolding, install packages:
  npm install @seo-builder/core @seo-builder/payload-plugin @seo-builder/ui @seo-builder/next

Docs: https://github.com/AliWarraich33621013/SEO_Builder
`;
if (args.includes("--help") || args.includes("-h")) {
  console.log(HELP_TEXT);
  process.exit(0);
}
var targetArg = args.find((arg) => !arg.startsWith("-"));
var targetDir = resolve(targetArg || process.cwd());
var files = [
  { template: "seo-builder.config.ts", dest: "seo-builder.config.ts" },
  { template: "blog-page.tsx", dest: "app/blog/[[...slug]]/page.tsx" },
  { template: "sitemap.ts", dest: "app/sitemap.ts" },
  { template: "robots.ts", dest: "app/robots.ts" },
  { template: "api-route.ts", dest: "app/api/seo-builder/provider-info/route.ts" },
  { template: "env.example.additions", dest: "SEO_BUILDER_ENV.example" },
  { template: "SEO_BUILDER_SETUP.md", dest: "SEO_BUILDER_SETUP.md" }
];
async function confirmContinue(message) {
  const rl = createInterface({ input, output });
  const answer = await rl.question(`${message} (y/N) `);
  rl.close();
  const normalized = answer.trim().toLowerCase();
  return normalized === "y" || normalized === "yes";
}
async function main() {
  const packageJsonPath = join(targetDir, "package.json");
  const hasPackageJson = existsSync(packageJsonPath);
  console.log("");
  console.log("SEO Builder \u2014 add-on scaffolder for existing Next.js + Payload projects");
  console.log("");
  console.log("This does NOT create a full app. It adds SEO Builder routes and config files.");
  console.log(`Target: ${targetDir}`);
  console.log("");
  if (!hasPackageJson) {
    console.warn(
      "\u26A0\uFE0F  No package.json found. SEO Builder is intended to be installed inside an existing Next.js + Payload project."
    );
    console.warn("    You can still scaffold files here, but you will need a Next.js + Payload app separately.");
    console.warn("");
    if (!skipConfirm) {
      const proceed = await confirmContinue("Continue scaffolding anyway?");
      if (!proceed) {
        console.log("\nCancelled. Run this inside your Next.js + Payload project root, for example:");
        console.log("  cd my-next-payload-app");
        console.log("  npx create-seo-builder@latest .");
        process.exit(0);
      }
    }
  } else {
    console.log("\u2713 Found package.json \u2014 scaffolding into your existing project.");
    console.log("");
  }
  console.log("Adding files:");
  console.log("");
  for (const { template, dest } of files) {
    const src = join(templatesDir, template);
    const out = join(targetDir, dest);
    const outDir = dirname(out);
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    if (existsSync(out)) {
      console.log(`  skip (exists): ${dest}`);
      continue;
    }
    copyFileSync(src, out);
    console.log(`  created: ${dest}`);
  }
  console.log("");
  console.log("Done.");
  console.log("");
  console.log("Next steps:");
  console.log("  1. Make sure you are in your Next.js + Payload project root");
  console.log("  2. Install SEO Builder packages:");
  console.log(
    "     npm install @seo-builder/core @seo-builder/payload-plugin @seo-builder/ui @seo-builder/next"
  );
  console.log("  3. Read SEO_BUILDER_SETUP.md for Payload + Next.js wiring");
  console.log("  4. Run: npm run dev");
  console.log("");
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
