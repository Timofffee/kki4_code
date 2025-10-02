import express from "express";
const app = express();

let messages = ["Привет!"];

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.listen(3000, () => console.log("HTTP polling сервер на 3000"));
