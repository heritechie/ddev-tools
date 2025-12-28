import { createServer } from "node:http";

export type ServerOptions = {
  port: number;
};

export function startServer(options: ServerOptions) {
  const server = createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>ddev-tools</title>
  </head>
  <body>
    <h1>ddev-tools</h1>
    <p>Server is running.</p>
  </body>
</html>
      `);
      return;
    }

    res.writeHead(404);
    res.end("Not found");
  });

  server.listen(options.port, () => {
    console.log(`Server running at http://localhost:${options.port}`);
  });

  return server;
}
