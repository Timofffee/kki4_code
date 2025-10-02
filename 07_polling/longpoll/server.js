import express from "express";
const app = express();

let subscribers = [];

app.get("/messages/long", (req, res) => {
  subscribers.push(res);
});

setInterval(() => {
  const msg = "Новое: " + Date.now();
  subscribers.forEach(r => r.json(msg));
  subscribers = [];
}, 5000);

app.listen(3000, () => console.log("Long polling сервер на 3000"));
