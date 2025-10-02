import express from "express";
const app = express();

app.use(express.json());

app.post("/hook", (req, res) => {
  console.log("Webhook событие:", req.body);
  res.send("ok");
});

app.listen(3000, () => console.log("Webhook сервер на 3000"));
