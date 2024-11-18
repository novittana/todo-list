const todoListContainer = document.getElementById("todoList");
const addBtn = document.getElementById("addBtn");
const inputToDoItem = document.getElementById("inputToDoItem");

let id = 0;
let text = "";

inputToDoItem.addEventListener("input", getInputValue);
addBtn.addEventListener("click", onAddButtonClick);
todoListContainer.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("remove-btn")) {
        const arrayToDoItemfromLS = getToDoItemsfromLocalStorage();
        const deletedId = Number(event.target.id);
        const newArray = arrayToDoItemfromLS.filter(item => item.id !== deletedId);
        setToDoItemsToLocalStorage(newArray);
        const li = event.target.closest('li');
        if (li) {
            li.remove();
        }
    }
});

function getInputValue() {
    text = inputToDoItem.value;
    return text;
}

function createId(array) {
    if (array.length > 0) {
        id = array[array.length - 1].id + 1
        return id;
    } else {
        return id = 1
    };
}

function createItem(array) {
    let listItem = {};
    listItem.id = createId(array);
    listItem.text = getInputValue();
    if (listItem.text !== "") {
        inputToDoItem.value = "";
        return listItem;
    }
}

function setToDoItemsToLocalStorage(arrayOfToDoItem) {
    localStorage.setItem("arrayOfToDoItem", JSON.stringify(arrayOfToDoItem));
}

function getToDoItemsfromLocalStorage() {
    const toDoItemsFromLocalStorage = localStorage.getItem("arrayOfToDoItem");
    if (toDoItemsFromLocalStorage) {
        return JSON.parse(toDoItemsFromLocalStorage)
    } else {
        return [];
    }
}

function setNewToDoItemToLocalStorage() {
    const arrayOfItemsfromLS = getToDoItemsfromLocalStorage();
    let newToDoItem = createItem(arrayOfItemsfromLS);

    if (newToDoItem) {
        arrayOfItemsfromLS.push(newToDoItem);
        setToDoItemsToLocalStorage(arrayOfItemsfromLS);
    }

}

function addToDoItemToHTML(item) {
    let listItemContainer = document.createElement("li");
    listItemContainer.className = "list-item";
    listItemContainer.innerHTML = `${item.text} <button class="btn remove-btn" id=${item.id}>Remove</button>`;
    todoListContainer.appendChild(listItemContainer);
    `<li>${item.text} <button class="btn remove-btn" id=${item.id}>Remove</button></li>`
}

function renderToDoList() {
    const list = getToDoItemsfromLocalStorage();
    list.map(item => {
        addToDoItemToHTML(item);
    })
}

function onAddButtonClick() {
    setNewToDoItemToLocalStorage();
    getToDoItemsfromLocalStorage();
}

renderToDoList();