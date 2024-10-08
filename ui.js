"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDisplay = void 0;
const todo_item_1 = require("./todo-item");
const newItemBtn = document.querySelector("#new-item");
newItemBtn === null || newItemBtn === void 0 ? void 0 : newItemBtn.addEventListener("click", () => {
    const newItem = (0, todo_item_1.createItem)();
    todo_item_1.board.push(newItem);
    updateDisplay();
});
function createCard(item) {
    const card = document.createElement("div");
    card.classList.add("todo");
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = item.title;
    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = item.description;
    const dueDate = document.createElement("p");
    dueDate.classList.add("due-date");
    dueDate.textContent = String(item.dueDate);
    const priorityHead = document.createElement("p");
    priorityHead.classList.add("priority-head");
    priorityHead.textContent = "Priority: ";
    const priority = createPriorityDropdown();
    const notesHead = document.createElement("p");
    notesHead.classList.add("notes-head");
    const notes = document.createElement("p");
    notes.textContent = item.notes;
    const checklist = createChecklist(item.checklist);
    card.append(title, description, dueDate, priorityHead, priority, notesHead, notes, checklist);
    return card;
}
function createPriorityDropdown() {
    const list = document.createElement("select");
    const priorities = ["very low", "low", "moderate", "high", "very high"];
    for (let i = 0; i <= 4; i++) {
        const option = document.createElement("option");
        option.textContent = priorities[i];
        list.appendChild(option);
    }
    return list;
}
function createChecklist(array) {
    const list = document.createElement("ul");
    array.map(listitem => {
        const li = document.createElement("li");
        li.textContent = listitem;
        list.appendChild(li);
    });
    return list;
}
function updateDisplay() {
    const container = document.querySelector("#content");
    const content = document.createElement("div");
    todo_item_1.board.map((item) => {
        const card = createCard(item);
        content.appendChild(card);
    });
    container.replaceChildren(content);
}
exports.updateDisplay = updateDisplay;
