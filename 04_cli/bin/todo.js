#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "fs";
import dotenv from "dotenv";

// Загружаем .env
dotenv.config();

// Используем путь из .env или fallback
const DB_FILE = process.env.DB_FILE || "./tasks.json";

function loadTasks() {
    if (!existsSync(DB_FILE)) {
        return [];
    }
    try {
        return JSON.parse(readFileSync(DB_FILE, "utf-8"));
    } catch (err) {
        console.error("Ошибка при чтении tasks.json:", err.message);
        return [];
    }
}

function saveTasks(tasks) {
    writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
}

function listTasks() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("Нет задач");
        return;
    }
    tasks.forEach((t, i) => {
        console.log(`${i + 1}. [${t.done ? "x" : " "}] ${t.text}`);
    });
}

function addTask(text) {
    text = text.replace(/^["']|["']$/g, ""); // убираем лишние кавычки
    const tasks = loadTasks();
    tasks.push({ text, done: false });
    saveTasks(tasks);
    console.log(`Добавлена задача: "${text}"`);
}

function doneTask(index) {
    const tasks = loadTasks();
    if (tasks[index]) {
        tasks[index].done = true;
        saveTasks(tasks);
        console.log(`Задача "${tasks[index].text}" выполнена`);
    } else {
        console.log("Нет такой задачи");
    }
}

function removeTask(index) {
    const tasks = loadTasks();
    if (tasks[index]) {
        const removed = tasks.splice(index, 1);
        saveTasks(tasks);
        console.log(`Удалена задача: "${removed[0].text}"`);
    } else {
        console.log("Нет такой задачи");
    }
}

// CLI
const [, , cmd, ...args] = process.argv;

switch (cmd) {
    case "list":
        listTasks();
        break;
    case "add":
        if (args.length === 0) {
            console.log("Введите задачу (или <Enter> чтобы выйти):");
            process.stdin.setEncoding("utf-8");
            process.stdin.on("data", (data) => {
                const text = data.toString().trim();
                if (text === "") {
                    console.log("Выход из режима добавления задач.");
                    process.exit(0);
                }
                addTask(text);
                console.log("Введите еще задачу или нажмите <Enter> чтобы выйти:");
            });
        } else {
            addTask(args.join(" "));
        }
        break;
    case "done":
        doneTask(Number(args[0]) - 1);
        break;
    case "remove":
        removeTask(Number(args[0]) - 1);
        break;
    default:
        console.log(`
Использование:
  node todo.js list             показать задачи
  node todo.js add "текст"      добавить задачу
  node todo.js done N           отметить задачу как выполненную
  node todo.js remove N         удалить задачу
        `);
}
