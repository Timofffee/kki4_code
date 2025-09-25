import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors()); // Разрешаем CORS
app.use(express.json()); // Автоматический парсинг JSON
app.use(express.static(path.join(__dirname, "public"))); // Отдача статических файлов

app.get("/", (req, res) => {
    res.send("<h1>Главная страница</h1>");
});

app.get("/about", (req, res) => {
    res.send("О нас");
});

app.get("/search", (req, res) => {
    const q = req.query.q || "";
    res.send("Поиск по запросу: " + q);
});

app.post("/api", (req, res) => {
    res.json({ received: req.body });
});

app.get("/page", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/error", (req, res) => {
    throw new Error("Что-то пошло не так!");
});

app.use((req, res) => {
    res.status(404).send("Страница не найдена");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
    console.log("Сервер запущен: http://localhost:3000");
});
