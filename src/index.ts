import './card.css';
import './layout.css';
import {ToDo, createItem, createCard} from './todo';

export const master: ToDo[] = [];

const newItemBtn = document.querySelector("#new-item") as HTMLElement;
newItemBtn?.addEventListener("click", function pushItem() {
  const newItem = createItem();
  master.push(newItem);
  updateDisplay();
});

const newItem = createItem();
master.push(newItem);
updateDisplay();

export function updateDisplay() {
  const container = document.querySelector("#content") as HTMLDivElement;
  const content = document.createElement("div");
  master.map(function addCard(item) {
    const card = createCard(item);
    content.appendChild(card);
  });
  container.replaceChildren(content);
}
