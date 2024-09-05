import './card.css';
import './layout.css';
import './dialog.css';
import {ToDo, Status, Timescale, createCard} from './todo';
import './dialog';

export let master: ToDo[] = [];
 
const sample1: ToDo = {
  title: "Sample Task",
  dueDate: new Date(2025,12,1,),
  priority: 2,
  notes: "Here are some notes about what I need to do",
  checklist: ["Subtask 1","Subtask 2"],
  status: "not started",
  timescale: "less-hour",
  created: Date.now()
}

const sample2: ToDo = {
  title: "Sample Task 2",
  dueDate: new Date(2025,12,2,),
  priority: 3,
  notes: "",
  checklist: ["Subtask 1","Subtask 2"],
  status: "started",
  timescale: "days",
  created: Date.now()
}

const sample3: ToDo = {
  title: "Sample Task 3",
  dueDate: new Date(2025,12,5),
  priority: 0,
  notes: "Maybe don't even do this task.",
  checklist: [],
  status: "paused",
  timescale: "less-5-min",
  created: Date.now()
}

master.push(sample1,sample2,sample3);
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
