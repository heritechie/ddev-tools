import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

export type ServerOptions = {
  port: number;
  onListening?: (url: string) => void;
};

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
};

export function startServer(options: ServerOptions) {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  // 👉 apps/cli/dist -> ../../web/dist
  const webRoot = join(__dirname, "../../web/dist");

  const server = createServer((req, res) => {
    if (!req.url || req.method !== "GET") {
      res.writeHead(400);
      res.end();
      return;
    }

    // normalize & prevent path traversal
    const safePath = normalize(req.url).replace(/^(\.\.[\/\\])+/, "");
    const pathname = safePath === "/" ? "/index.html" : safePath;
    const filePath = join(webRoot, pathname);

    if (!existsSync(filePath)) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    // directory access not allowed
    if (statSync(filePath).isDirectory()) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    const content = readFileSync(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });

  server.listen(options.port, () => {
    const url = `http://localhost:${options.port}`;
    console.log(`Server running at ${url}`);
    options.onListening?.(url);
  });

  return server;
}
