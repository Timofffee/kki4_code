import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5555;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let tasks = [
    { id: 1, title: "Купить хлеб" },
    { id: 2, title: "Сделать домашку" },
];

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
    const task = { id: tasks.length + 1, ...req.body };
    tasks.push(task);
    res.status(201).json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter((t) => t.id !== id);
    res.sendStatus(204);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
