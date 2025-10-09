// utils.js
export function rand(min, max) {
  return Math.random() * (max - min) + min;
}
export function dist(a,b) {
  const dx = a.x - b.x, dy = a.y - b.y;
  return Math.sqrt(dx*dx + dy*dy);
}
