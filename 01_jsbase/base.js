const itemList = document.getElementById("items");
let items = document.getElementById("items").children;

// Переименовывание всех остальных
for (let i = 0; i < items.length; i++) {
    items[i].innerText = i;
}

// Удаление последнего
items[items.length-1].remove();

// Замена предследнего
let newEl2 = document.createElement("span");
newEl2.innerText = "Replaced Item";
items[items.length-1].replaceWith(newEl2);

// Вставка нового элемента
let newEl = document.createElement("p");
newEl.innerText = "Created Item";
itemList.appendChild(newEl);

// Изменение цвета
items[0].style.color = "red";
items[1].style.color = "blue";

// Изменение размера
items[0].style.fontSize = "20px";
items[1].style.fontSize = "30px";
