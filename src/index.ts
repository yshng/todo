import './styles/card.css';
import './styles/layout.css';
import './styles/dialog.css';
import {ToDo} from './todo';
import './dialog';
import { createCard } from './card'
import { selectProject, addProjectDropdown } from './project';
import { getCurrentProject, getProjects, getToDos, checkStorage } from './storage';

checkStorage();
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
    h1.classList.add("project");
    if (id == -1) {
      h1.textContent = "View all"
    } else {
      h1.textContent = title;
    }
    h1.setAttribute("id",`${id}`);
    if (id == getCurrentProject()) {h1.classList.add("current-project")};

    // show number of todos in each project, or total number for default 
    const badge = document.createElement("span");
    if (id == -1) {
      badge.textContent = getToDos().length.toString();
    } else {
      badge.textContent = getToDos().filter((todo) => todo.projectID == id).length.toString();
    } 
    badge.classList.add("project-badge");
    h1.addEventListener("click", () => selectProject(id))

    h1.prepend(badge);
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