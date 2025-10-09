// food.js
import { rand } from './utils.js';

export class Food {
  constructor(x,y, r=6) {
    this.x = x; this.y = y; this.r = r;
    this.color = `hsl(${Math.floor(rand(0,360))} 70% 60%)`;
  }
  draw(ctx, cam) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x - cam.x, this.y - cam.y, this.r, 0, Math.PI*2);
    ctx.fill();
  }
}
export function generateFood(count, bounds) {
  const arr = [];
  for (let i=0;i<count;i++){
    arr.push(new Food(rand(bounds.x, bounds.x+bounds.w), rand(bounds.y, bounds.y+bounds.h)));
  }
  return arr;
}
