// game.js
import { Player } from './player.js';
import { generateFood } from './food.js';
import { rand } from './utils.js';

export class Game {
  constructor(w=2000,h=2000){
    this.w = w; this.h = h;
    this.players = new Map();
    this.food = generateFood(300, { x:0,y:0,w:this.w,h:this.h });
    // create local player
    this.localId = 'local-' + Math.floor(Math.random()*10000);
    this.localPlayer = new Player(this.localId, this.w/2, this.h/2);
    this.players.set(this.localId, this.localPlayer);
    // create bots for singleplayer demo
    for (let i=0;i<4;i++){
      const id = 'bot-'+i;
      const p = new Player(id, rand(100, this.w-100), rand(100, this.h-100));
      p.color = 'hsl(200 80% 50%)';
      this.players.set(id, p);
    }
    this.cam = { x: this.localPlayer.x - 450, y: this.localPlayer.y - 300 };
    this.worldBounds = { x:0,y:0,w:this.w,h:this.h };
  }
  update(dt){
    // update players
    for (const p of this.players.values()){
      // simple bot behavior
      if (p.id.startsWith('bot')) {
        // bots randomly target food
        if (Math.random() < 0.01) {
          const pick = Math.floor(Math.random()*this.food.length);
          if (this.food[pick]) p.target = { x: this.food[pick].x, y: this.food[pick].y };
        }
      }
      p.update(dt);
      // eating food
      p.tryEatFood(this.food);
    }
    // respawn food if low
    if (this.food.length < 250) {
      const extra = generateFood(100, this.worldBounds);
      this.food.push(...extra);
    }
    // keep camera following local player
    this.cam.x = this.localPlayer.x - 450;
    this.cam.y = this.localPlayer.y - 300;
  }
  draw(ctx){
    // clear
    ctx.fillStyle = '#0b0b0b';
    ctx.fillRect(0,0,900,600);
    // draw food
    for (const f of this.food) f.draw(ctx, this.cam);
    // draw players
    for (const p of this.players.values()) p.draw(ctx, this.cam);
  }
}
