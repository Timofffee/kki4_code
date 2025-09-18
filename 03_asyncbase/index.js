// ====== БАЗОВЫЕ ПРИМЕРЫ С КОЛЛБЕКАМИ И ПРОМИСАМИ ======

// Простейший коллбек
function sum(a, b, cb) {
    cb(a + b);
}

// Используем
sum(1, 2, (result) => {
    console.log("Callback result:", result);
});

// Промис-обёртка для той же задачи
function sumPromise(a, b) {
    return new Promise((resolve, reject) => {
        // Здесь reject почти никогда не вызовется, но для примера — ок
        resolve(a + b);
    });
}

sumPromise(3, 4)
    .then((result) => console.log("Promise result:", result))
    .catch((error) => console.error(error));

/*
Что важно:
- Коллбеки — старый стиль. Работает, но плохо читается при вложенности.
- Промисы читаются лучше и позволяют работать с async/await.
- reject нужен для ошибок, resolve — для успеха. 
*/


// ====== РАБОТА С FETCH ======

// Пример с then
fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json()) // response.json() возвращает промис!
    .then((json) => {
        console.log("Posts loaded with .then:", json.length);
    })
    .catch((error) => console.error("Fetch error:", error));


// То же самое с async/await (сахар над промисами)
const loadPosts = async () => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const json = await res.json();
        console.log("Posts loaded with async/await:", json.length);
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

loadPosts();

/*
Что важно:
- .then() и async/await делают одно и то же, await — синтаксический сахар.
- Ошибки: 
    - JSON может не иметь того поля, которое вы ожидаете (json.data !== всегда).
    - Сеть может упасть, поэтому всегда нужен try/catch или .catch().
*/


// ====== PROMISE.ALL ======

// Параллельные запросы
const getPosts = () =>
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json());
const getUsers = () =>
    fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());

Promise.all([getPosts(), getUsers()])
    .then(([posts, users]) => {
        console.log("Posts count:", posts.length);
        console.log("Users count:", users.length);
    })
    .catch((err) => console.error("Promise.all error:", err));

/*
Что важно:
- Promise.all ждёт выполнения всех промисов или падает, если один сломался.
- Для «не критичных» ошибок лучше использовать Promise.allSettled().
*/


// ====== СОЗДАНИЕ СОБСТВЕННОГО ПРОМИСА ======

const promise = new Promise((resolve, reject) => {
    // resolve и reject можно вызвать только один раз
    resolve("Promise resolved");
});

promise.then((result) => console.log(result));

/*
Подводные камни:
- Если забыть вызвать resolve/reject — промис «зависнет» навсегда.
- Если вызвать и resolve, и reject — учитывается только первый вызов.
*/


// ====== РАБОТА С ФАЙЛАМИ (Node.js) ======

import fs from "fs";

const readFromFile = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                reject(err); // ошибка — уходит в catch
            } else {
                resolve(data); // успех — уходит в then/await
            }
        });
    });
};

// Использование через .then()
readFromFile("./data.txt")
    .then((data) => {
        console.log("File content with .then():", data);
    })
    .catch((err) => {
        console.error("File error:", err);
    });

// Использование через async/await
const showFile = async () => {
    try {
        const data = await readFromFile("./data.txt");
        console.log("File content with async/await:", data);
    } catch (err) {
        console.error("File error:", err);
    }
};

showFile();

/*
Что важно:
- fs.readFile работает по коллбеку → мы оборачиваем в промис.
- fs.promises уже есть в Node.js, можно писать: await fs.promises.readFile().
- Ошибка чтения (например, файл не найден) обязательно уйдёт в catch.
*/
