
fetch("http://localhost:3000/hook", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ event: "push", repo: "demo" })
})
  .then(res => res.text())
  .then(console.log)
  .catch(console.error);
