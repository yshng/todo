import { createCard } from "../ui/card";
import { deleteProject, getProjectByID } from "../model/project";
import { getCompleted, getCurrentProject, getIncomplete } from "../model/storage";
import { confirmProjectDelete } from "../ui/delete-message";
import { makeNewItemButton } from "./new-item-button";

export function populateContent() {
  const contentDiv = document.createElement("div");
  contentDiv.setAttribute("id", "content");
  const cardHolder = document.createElement("div");
  cardHolder.setAttribute("id", "cards");
  cardHolder.append(createBuffer());
  let message = document.createElement("div");
  message.classList.add("todo", "message");
  const current = getCurrentProject();

  let forDisplay = getIncomplete();
  if (current > 0) {
    forDisplay = forDisplay.filter(
      (todo) => todo.projectID == current,
    );
  }
  if(current == -2) {
    forDisplay = getCompleted();
  }
  if (forDisplay.length) {
    forDisplay.map((todo) => {
      let cards = createCard(todo);
      cardHolder.append(cards);
    });
  } else if (current == -1) {
    message.textContent = "You have no pending tasks.";
    message.appendChild(contentItemButton("Add a task"));
  } else {
    message.textContent = "This project contains no tasks.";
    message.appendChild(contentItemButton("Add a task"));
  }

  if (current > 0) {
    message.append(contentDeleteButton());
  }

  cardHolder.append(message);
  cardHolder.append(createBuffer())
  contentDiv.append(cardHolder);
  return contentDiv;
}

function contentDeleteButton() {
  const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete project";
    deleteButton.addEventListener("click", () => pushDeleteProjectButton())
  return deleteButton;
}

function pushDeleteProjectButton() {
  const id = getCurrentProject();
  const title = getProjectByID(id).title;
  deleteProject(id);
  confirmProjectDelete(title, id);
}

export function createBuffer() {
  const buffer = document.createElement("div");
  buffer.classList.add("buffer");
  return buffer;
}

function contentItemButton(message: string) {
  const addItem = document.createElement("button");
  addItem.textContent = message;
  makeNewItemButton(addItem);
  return addItem;
}