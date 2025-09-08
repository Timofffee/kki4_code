import Children from "./children.js";
import singleton from "./singleton.js";

class Parent {
    constructor() {
        this.name = "MyModule";
        console.log(this.name);
        this.children = [];

        singleton.iterate();
    }

    addChildren() {
        this.children.push(new Children());

        singleton.iterate();
    }
}

export default () => {
    const module = new Parent();
    module.addChildren();
    return module;
};
