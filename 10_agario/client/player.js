// player.js
import { dist } from './utils.js';

export class Player {
  constructor(id, x=0,y=0){
    this.id = id;
    this.x = x; this.y = y;
    this.vx = 0; this.vy = 0;
    this.mass = 20; // mass influences radius
    this.color = 'hsl(' + Math.floor(Math.random()*360) + ' 80% 60%)';
    this.target = { x: x, y: y };
  }
  get radius() {
    return Math.max(6, Math.sqrt(this.mass) * 3);
  }
  update(dt){
    // simple movement towards target (client-side local control)
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const d = Math.sqrt(dx*dx+dy*dy) || 1;
    const speed = Math.max(50, 200 - this.mass); // bigger -> slower
    const nx = dx/d, ny = dy/d;
    this.vx = nx * speed;
    this.vy = ny * speed;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }
  draw(ctx, cam){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x - cam.x, this.y - cam.y, this.radius, 0, Math.PI*2);
    ctx.fill();
  }
  tryEatFood(foodArray){
    for (let i = foodArray.length-1; i>=0; i--){
      const f = foodArray[i];
      const d = dist(this, f);
      if (d < this.radius + f.r){
        this.mass += 1;
        foodArray.splice(i,1);
      }
    }
  }
}
