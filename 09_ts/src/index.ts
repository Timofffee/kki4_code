import * as Prog from './prog';
import * as Prog2 from './prog2';

const myEnum: Prog.MyEnum = Prog.MyEnum.ADMIN;
console.log(myEnum);

const myEnum2 = Prog2.MyEnum.ADMIN;
console.log(myEnum2);


let a: number = 1;
let b: number = 2;
console.log(a + b);

let c: string = 'hello';
let d: string = 'world';
console.log(c + d);

let e: boolean = true;
let f: boolean = false;
console.log(e && f);

let g: any = 'hello';
g = 123;
g = true;
console.log(g);

//float

let h: number = 1.23;
console.log(h);

//array

let i: Prog.MyEnum[] = [Prog.MyEnum.ADMIN, Prog.MyEnum.USER];
console.log(i);

//object

type MyType = {name: string, age: number};

let j: {name: string, age: number} = {name: 'John', age: 30};
console.log(j);

// 


// max int value

let k: number = Number.MAX_VALUE;
console.log(k);
