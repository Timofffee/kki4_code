class Singleton {
    constructor() {
        this.count = 0;
    }

    iterate() {
        this.count += 1;
        console.log("Действий сделано: " + this.count);
    }
}

export default new Singleton();