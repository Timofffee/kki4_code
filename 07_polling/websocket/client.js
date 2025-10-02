
const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  console.log("Подключено!");
  socket.send("Привет сервер!");
};

socket.onmessage = (e) => {
  console.log("Сообщение от сервера:", e.data);
};
