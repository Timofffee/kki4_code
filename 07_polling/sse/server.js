import express from "express";
const app = express();

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  setInterval(() => {
    res.write(`data: ${Date.now()}\n\n`);
  }, 2000);
});

app.listen(3000, () => console.log("SSE сервер на 3000"));
