import { createServer } from "node:http";
import { readFile, readdir } from "node:fs/promises";
import { join, extname } from "node:path";

const PORT = process.env.PORT || 3000;
const MATERIALS_DIR = join(import.meta.dirname, "..", "materials");

function topicFromPath(pathname) {
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  if (!slug || slug.includes("/") || slug.includes("..")) return null;
  return slug;
}

async function listTopics() {
  const files = await readdir(MATERIALS_DIR);
  return files.filter((f) => extname(f) === ".html").map((f) => f.slice(0, -5));
}

async function renderIndex() {
  const topics = await listTopics();
  const items = topics.map((t) => `<li><a href="/${t}">${t}</a></li>`).join("\n");
  return `<!doctype html>
<html lang="pl">
<head><meta charset="utf-8"><title>e-learner</title></head>
<body>
<h1>Materiały do nauki</h1>
<ul>${items}</ul>
</body>
</html>`;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/") {
    const html = await renderIndex();
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
    return;
  }

  const topic = topicFromPath(url.pathname);
  if (!topic) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Bad request");
    return;
  }

  try {
    const filePath = join(MATERIALS_DIR, `${topic}.html`);
    const content = await readFile(filePath);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<!doctype html><html><body><h1>404</h1><p>Brak materiału "${topic}".</p></body></html>`);
  }
});

server.listen(PORT, () => {
  console.log(`e-learner listening on http://localhost:${PORT}`);
});
