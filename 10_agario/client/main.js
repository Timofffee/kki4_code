// main.js
import { Game } from './game.js';

const socketUrl = 'http://localhost:3000'; // TODO: change to your server address when deploying
const socket = io(socketUrl, { transports: ['websocket', 'polling'] });

const statusEl = document.getElementById('status');
const massEl = document.getElementById('mass');

socket.on('connect', () => {
  statusEl.textContent = 'Connected to server (id=' + socket.id + ')';
  // Server connection exists — students should implement auth, spawn, sync here.
});

socket.on('disconnect', () => {
  statusEl.textContent = 'Disconnected';
});

// minimal handshake - server will reply with 'welcome'
socket.on('welcome', (data) => {
  console.log('Server welcome:', data);
  statusEl.textContent = 'Connected — server says: ' + (data && data.msg ? data.msg : 'hello');
});

// Create game
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const game = new Game(2000,2000);

let mouse = { x: canvas.width/2, y: canvas.height/2 };
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
  // Convert to world coords
  game.localPlayer.target.x = mouse.x + game.cam.x;
  game.localPlayer.target.y = mouse.y + game.cam.y;
});

// simple touch support
canvas.addEventListener('touchmove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const t = e.touches[0];
  mouse.x = t.clientX - rect.left;
  mouse.y = t.clientY - rect.top;
  game.localPlayer.target.x = mouse.x + game.cam.x;
  game.localPlayer.target.y = mouse.y + game.cam.y;
  e.preventDefault();
}, { passive:false });

let last = performance.now();
function loop(now){
  const dt = (now - last)/1000;
  last = now;
  game.update(dt);
  game.draw(ctx);
  massEl.textContent = Math.floor(game.localPlayer.mass);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// TODO: multiplayer hooks
// - emit local player spawn/inputs: socket.emit('player:spawn', {...})
// - listen other players and update `game.players` map
// - send periodic position updates and implement interpolation on other clients
