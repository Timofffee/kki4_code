import express from "express";

const app = express();
const PORT = 5555;

app.use(express.json());
app.use(express.static("./public"));

let tasks = [
    { id: 1, title: "Купить хлеб" },
    { id: 2, title: "Сделать домашку" },
];

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
    const task = { id: tasks.length + 1, title: req.body.taskTitle };
    tasks.push(task);
    res.status(201).json(tasks);
});

app.delete("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter((t) => t.id !== id);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
