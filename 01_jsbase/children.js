import singleton from "./singleton.js";

export default class Children {
    constructor() {
        this.name = 'Children';
        console.log(this.name);

        singleton.iterate();
    }
}