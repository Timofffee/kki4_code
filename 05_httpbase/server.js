import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

        if (req.method === "OPTIONS") {
            res.writeHead(204);
            res.end();
            return;
        }

        const url = new URL(req.url, "http://localhost:3000");

        if (url.pathname === "/") {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end("<h1>Главная страница</h1>");
            return;
        }

        if (url.pathname === "/page") {
            const filePath = path.join(__dirname, "index.html");
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
                    res.end("Ошибка сервера");
                    return;
                }
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end(data);
            });
            return;
        }

        if (url.pathname === "/search") {
            const q = url.searchParams.get("q") || "";
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Поиск по запросу: " + q);
            return;
        }

        if (url.pathname === "/api" && req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => (body += chunk));
            req.on("end", () => {
                let data;
                try {
                    data = JSON.parse(body);
                } catch (err) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Некорректный JSON" }));
                    return;
                }
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ received: data }));
            });
            return;
        }

        if (url.pathname === "/video") {
            const filePath = path.join(__dirname, "video.mp4");
            res.writeHead(200, { "Content-Type": "video/mp4" });
            fs.createReadStream(filePath).pipe(res);
            return;
        }

        if (url.pathname === "/error") {
            throw new Error("Что-то пошло не так!");
        }

        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Страница не найдена");
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                error: err.message,
                stack: err.stack,
            })
        );
    }
});

server.listen(3000, () => {
    console.log("Сервер запущен: http://localhost:3000");
});
