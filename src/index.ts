import './card.css';
import './layout.css';
import './dialog.css';
import {ToDo} from './todo';
import './dialog';
import './project';
import {createCard} from './card'

export let master: ToDo[] = [];
 
const sample1 = new ToDo(
  "Sample Task",
  new Date(2025,12,1),
  2,
  "Here are some notes",
  1
);

master.push(sample1);
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
