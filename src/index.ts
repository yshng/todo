import './card.css';
import './layout.css';
import './dialog.css';
import {ToDo} from './todo';
import './dialog';
import './project';
import {createCard} from './card'
import { getProjects } from './project';

const sample1 = new ToDo(
  "Sample Task",
  new Date(2025,12,1),
  2,
  "Here are some notes",
  1,
  "Project 1"
);

const sample2 = new ToDo(
  "Another Sample Task",
  new Date(2025,12,1),
  3,
  "Here are some notes. Even more notes.",
  2,
  "Project 2"
);

export let todos: ToDo[] = [sample1, sample2];
export let projects: string[] = getProjects();
export let currentProject = 0;

updateDisplay();

export function updateDisplay() {
  const main = document.querySelector<HTMLDivElement>("main");
  const content = document.createElement("div");
  content.setAttribute("id","content");
  content.append(createCards());
  main?.replaceChildren(createProjects(),content);
}

function createProjects(): HTMLDivElement {
  const projectDiv = document.createElement("div");
  projectDiv.setAttribute("id","projects");  
  for (let i = 0; i < projects.length; i++) {
    const h1 = document.createElement("h1");
    h1.textContent = projects[i];
    if (i == currentProject) {h1.classList.add("current-project")};
    h1.classList.add("project");
    projectDiv.appendChild(h1);
  }
  return projectDiv;
}

function createCards(): HTMLDivElement {
  const cardHolder = document.createElement("div");
  cardHolder.setAttribute("id","cards");
  todos.map((todo) => {
  if (todos.length) {
      const card = createCard(todo);
      cardHolder.append(card);
    
  }})
  return cardHolder;
}
