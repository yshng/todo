import './card.css';
import './layout.css';
import './dialog.css';
import {ToDo} from './todo';
import './dialog';
import { createCard } from './card'
import { Projects, enableAddProject, addProjectDropdown, enableProjectSelection } from './project';

const sample1 = new ToDo(
  "Sample Task",
  new Date(2025,12,1),
  2,
  "Here are some notes",
  1,
  "00001"
);

const sample2 = new ToDo(
  "Another Sample Task",
  new Date(2025,12,1),
  3,
  "Here are some notes. Even more notes.",
  2,
  "00002"
);

export interface State {
  projects: Projects;
  todos: ToDo[];
  currentProject: string | null;
}

let initial = new Projects();

let currentState: State = {
  projects: initial,
  todos: [],
  currentProject: null
}

currentState = currentState.projects.addProject(currentState, "View All");
currentState.currentProject = "00000";

currentState = currentState.projects.addProject(currentState, "Project 1");
currentState = currentState.projects.addProject(currentState, "Project 2");
currentState.todos = sample1.addToDo(currentState);
currentState.todos = sample2.addToDo(currentState);

updateDisplay(currentState);
enableAddProject(currentState);

export function updateDisplay(state: State) {
  const main = document.querySelector<HTMLDivElement>("main");
  main?.replaceChildren(populateProjects(state),populateContent(state));  
  addProjectDropdown(state);
  enableProjectSelection(state);
}

function populateProjects(state: State): HTMLDivElement {
  const projectDiv = document.createElement("div");
  projectDiv.setAttribute("id","projects");  
  for (let [key,value] of state.projects.entries()) {
    const h1 = document.createElement("h1");
    h1.textContent = value;
    h1.setAttribute("id",key);
    if (key == state.currentProject) {h1.classList.add("current-project")};
    h1.classList.add("project");
    projectDiv.appendChild(h1);
  }
  return projectDiv;
}

function populateContent(state: State): HTMLDivElement {
  const contentDiv = document.createElement("div");
  contentDiv.setAttribute("id","content");
  const cardHolder = document.createElement("div");
  cardHolder.setAttribute("id","cards");
  let forDisplay = state.todos;
  if (state.currentProject != "00000") {
    forDisplay = state.todos.filter( (todo) => todo.projectID == state.currentProject)
  }
  if (forDisplay.length) {
    forDisplay.map((todo) => {
      const card = createCard(state, todo);
      cardHolder.append(card);
    })
  } else {
    const noCardsText = document.createElement("p");
    noCardsText.textContent = "There are no items in this project.";
    cardHolder.append(noCardsText);
  }
  contentDiv.append(cardHolder);
  return contentDiv;
}
