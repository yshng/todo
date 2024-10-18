import "./styles/card.css";
import "./styles/layout.css";
import "./styles/button.css";
import "./styles/edit-card.css";
import "./styles/projects.css";
import "./ui/new-item-button";
import { createCard } from "./ui/card";
import { deleteProject } from "./model/project";
import {
  getCurrentProject,
  getToDos,
  checkStorage,
} from "./model/storage";
import { populateProjects } from "./ui/project";
import { makeNewItemButton } from "./ui/new-item-button";

checkStorage();
updateDisplay();

export function getElementByID(id: number) {
  return document.querySelector(`[id$=${CSS.escape(id.toString())}]`);
}

export function updateDisplay(position?: number) {
  const main = document.querySelector<HTMLDivElement>("main");
  main?.replaceChildren(populateContent(), populateProjects());
  if (position != undefined) {
    let element = getElementByID(position);
    if (element)
      element.scrollIntoView({ block: "center" });
  }
}

function populateContent(): HTMLDivElement {
  const contentDiv = document.createElement("div");
  contentDiv.setAttribute("id", "content");
  const cardHolder = document.createElement("div");
  cardHolder.setAttribute("id", "cards");
  let forDisplay = getToDos();
  let message: HTMLParagraphElement = document.createElement("div");
  message.classList.add("todo", "message");
  if (getCurrentProject() != -1) {
    forDisplay = forDisplay.filter(
      (todo) => todo.projectID == getCurrentProject(),
    );
  }
  if (forDisplay.length) {
    forDisplay.map((todo) => {
      let cards = createCard(todo);
      cardHolder.append(cards);

    });
    message.append(contentItemButton("Add another task"));
  } else if (getCurrentProject() == -1) {
    message.textContent = "You have no pending To Do items.";
  } else {
    message.textContent = "There are no items in this project.";
    message.append(contentItemButton("Add a task"));
  }

  if (getCurrentProject() != -1) {
    message.append(contentDeleteButton());
  }

  cardHolder.append(message);
  contentDiv.append(cardHolder);
  return contentDiv;
}

function contentItemButton(message: string): HTMLButtonElement {
  const addItem = document.createElement("button");
  addItem.textContent = message;
  makeNewItemButton(addItem);
  return addItem;
}

function contentDeleteButton(): HTMLButtonElement {
  const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete project";
    deleteButton.addEventListener("click", () =>
      deleteProject(getCurrentProject()),
    );
  return deleteButton;
}