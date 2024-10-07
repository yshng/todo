import './styles/card.css';
import './styles/layout.css';
import './styles/dialog.css';
import {ToDo} from './todo';
import './dialog';
import { createCard } from './card'
import { addProject, selectProject, addProjectDropdown } from './project';
import { getCurrentProject, setTypedItem, getProjects, getToDos, checkStorage } from './storage';

checkStorage();

const sample1: ToDo = {
  title :"Sample Task",
  dueDate: new Date(2025,12,1),
  priority: 2,
  notes: "Here are some notes",
  status: 1,
  projectID: -1,
  timescale: 3,
  created: 456745674567
}

const sample2 = {
  title: "Another Sample Task",
  dueDate: new Date(2025,12,1),
  priority: 3,
  notes: "Here are some notes. Even more notes.",
  status: 2,
  projectID: -1,
  timescale: 2,
  created: 123412341234
}

updateDisplay();

export function updateDisplay(position?: number) {
  const main = document.querySelector<HTMLDivElement>("main");
  main?.replaceChildren(populateProjects(),populateContent()); 
  if (position != undefined) {
    let element = document.querySelector(`#card${position}`);
    if (element) element.scrollIntoView();}
  addProjectDropdown();
}

function populateProjects(): HTMLDivElement {
  const projectDiv = document.createElement("div");
  projectDiv.setAttribute("id","projects");

  for (let {id,title} of getProjects()) {
    const h1 = document.createElement("h1");
    h1.textContent = title;
    if (id == -1) {h1.textContent = "View all"};
    h1.setAttribute("id",`${id}`);
    if (id == getCurrentProject()) {h1.classList.add("current-project")};
    h1.classList.add("project");
    h1.addEventListener("click", () => selectProject(id))
    projectDiv.appendChild(h1);
  }
  return projectDiv;
}

function populateContent(): HTMLDivElement {
  const contentDiv = document.createElement("div");
  contentDiv.setAttribute("id","content");
  const cardHolder = document.createElement("div");
  cardHolder.setAttribute("id","cards");
  let forDisplay = getToDos();
  let message: HTMLParagraphElement = document.createElement("p");
  message.classList.add("message");
  if (getCurrentProject() != -1) {
    forDisplay = forDisplay.filter( (todo) => todo.projectID == getCurrentProject())
  }
  if (forDisplay.length) {
    forDisplay.map((todo) => {
      let cards = createCard(todo);
      cardHolder.append(cards);
    })
    message.textContent = "End of list."
  } else if (getCurrentProject() == -1) {
    message.textContent = "What would you like to do?"
  } else {
    message.textContent = "There are no items in this project.";
  }
  cardHolder.append(message);
  contentDiv.append(cardHolder);
  return contentDiv;
}