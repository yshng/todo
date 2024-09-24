import './card.css';
import './layout.css';
import './dialog.css';
import {ToDo} from './todo';
import './dialog';
import { createCard } from './card'
import { Project, addProjectButtons, addProjectDropdown } from './project';

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


export interface State {
  projects: Project[];
  todos: ToDo[];
  currentProject: number;
}

export let currentState: State = {
  projects: [new Project("default")],
  todos: [sample1, sample2],
  currentProject: 0
}
updateDisplay(currentState);
addProjectButtons(currentState);

export function updateDisplay(state: State) {
  const main = document.querySelector<HTMLDivElement>("main");
  main?.replaceChildren(createProjects(state),createContent(state));  
  addProjectDropdown(state);
}

function createProjects(state: State): HTMLDivElement {
  const projectDiv = document.createElement("div");
  projectDiv.setAttribute("id","projects");  
  for (let i = 0; i < state.projects.length; i++) {
    const h1 = document.createElement("h1");
    h1.textContent = state.projects[i].title;
    if (i == state.currentProject) {h1.classList.add("current-project")};
    h1.classList.add("project");
    projectDiv.appendChild(h1);
  }
  return projectDiv;
}

function createContent(state: State): HTMLDivElement {
  const contentDiv = document.createElement("div");
  contentDiv.setAttribute("id","content");
  const cardHolder = document.createElement("div");
  cardHolder.setAttribute("id","cards");
  state.todos.map((todo) => {
  if (state.todos.length) {
      const card = createCard(todo);
      cardHolder.append(card);
  }})
  contentDiv.append(cardHolder);
  return contentDiv;
}
