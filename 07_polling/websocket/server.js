import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("Клиент подключился");
  ws.send("Добро пожаловать!");

  ws.on("message", (msg) => {
    console.log("От клиента:", msg.toString());
    ws.send("Эхо: " + msg);
  });
});

console.log("WebSocket сервер на 3000");
