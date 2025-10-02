
const evtSource = new EventSource("http://localhost:3000/stream");

evtSource.onmessage = (e) => {
  console.log("Новое событие:", e.data);
};
