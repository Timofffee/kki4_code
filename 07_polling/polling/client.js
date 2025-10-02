async function poll() {
  try {
    const res = await fetch("http://localhost:3000/messages");
    const data = await res.json();
    console.log("Новые сообщения:", data);
  } catch (err) {
    console.error("Ошибка:", err);
  }
}

setInterval(poll, 2000);
