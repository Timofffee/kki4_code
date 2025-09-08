import singleton from "./singleton.js";

let timeouts = [];

document.body.addEventListener("click", (e) => {
    if (e.target != null && e.target.nodeName === "P") {
        onClick(e);

        singleton.iterate();
    }
});

function onClick(e) {
    let id = timeouts.findIndex((item) => item.el === e.target);

    if (id > -1) {
        clearTimeout(timeouts[id].id);
        timeouts.splice(id, 1);

        e.target.style.color = "red";
        e.target.style.fontSize = "30px";
    } else {
        e.target.style.color = "green";
        e.target.style.fontSize = "20px";
    }

    const timeoutId = setTimeout(() => {
        e.target.style.color = "inherit";
        e.target.style.fontSize = "inherit";

        let id = timeouts.findIndex((item) => item.el === e.target);

        if (id > -1) {
            clearTimeout(timeouts[id].id);
            timeouts.splice(id, 1);
        }
    }, 1000);

    timeouts.push({ id: timeoutId, el: e.target });
}

//Timers

let count = 1;
const itemList = document.getElementById("items");

const intervalId = setInterval(() => {
    let newEl = document.createElement("p");
    newEl.innerText = `Interval Item ${count++}`;
    itemList.appendChild(newEl);
    if (itemList.children.length > 10) {
        clearInterval(intervalId);
    }

    singleton.iterate();
}, 1000);
