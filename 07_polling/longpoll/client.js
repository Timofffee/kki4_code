async function longPoll() {
  try {
    const res = await fetch("http://localhost:3000/messages/long");
    const data = await res.json();
    console.log("Новое сообщение:", data);
    longPoll();
  } catch (err) {
    console.error("Ошибка:", err);
    setTimeout(longPoll, 1000);
  }
}

longPoll();
