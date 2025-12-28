#!/usr/bin/env node
import { parseArgs } from "./args.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { startServer } from "./server.js";

function getVersion(): string {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pkgPath = join(__dirname, "../package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
  return pkg.version;
}

function printHelp() {
  console.log(`
ddev-tools (ddt)

Usage:
  ddt [options]

Options:
  --help, -h        Show help
  --version, -v     Show version
  --port <number>   Port to run server (default: 4545)
  --no-open         Do not open browser automatically
`);
}

function main() {
  let options;

  try {
    options = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error("Error:", (err as Error).message);
    process.exit(1);
  }

  if (options.help) {
    printHelp();
    return;
  }

  if (options.version) {
    console.log(getVersion());
    return;
  }

  startServer({ port: options.port });
}

main();
