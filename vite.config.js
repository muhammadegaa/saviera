import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));
const contentPath = path.join(root, "server", "content.json");
const PASSWORD = process.env.DASHBOARD_PASSWORD || "saviera-demo";
const TOKEN = "saviera-local-session";

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function contentApi() {
  const handle = async (req, res, next) => {
    const url = req.url?.split("?")[0];
    if (!url?.startsWith("/api/")) {
      next();
      return;
    }

    try {
      if (req.method === "GET" && url === "/api/content") {
        send(res, 200, JSON.parse(fs.readFileSync(contentPath, "utf8")));
        return;
      }

      if (req.method === "POST" && url === "/api/login") {
        const body = await readBody(req);
        if (body.password !== PASSWORD) {
          send(res, 401, { error: "Invalid password" });
          return;
        }
        send(res, 200, { token: TOKEN });
        return;
      }

      if (req.method === "PUT" && url === "/api/content") {
        const header = req.headers.authorization || "";
        if (header !== `Bearer ${TOKEN}`) {
          send(res, 401, { error: "Unauthorized" });
          return;
        }
        const body = await readBody(req);
        if (!body.homepage || !body.about) {
          send(res, 400, { error: "Content must include homepage and about" });
          return;
        }
        fs.writeFileSync(contentPath, `${JSON.stringify(body, null, 2)}\n`);
        send(res, 200, { ok: true });
        return;
      }
    } catch {
      send(res, 500, { error: "Content API failed" });
      return;
    }

    send(res, 404, { error: "Not found" });
  };

  return {
    name: "local-content-api",
    configureServer(server) {
      server.middlewares.use(handle);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle);
    },
  };
}

export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" }), contentApi()],
  server: { port: 5173 },
});
