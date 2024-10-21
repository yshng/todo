import { createCard } from "../ui/card";
import { deleteProject, getProjectByID } from "../model/project";
import { getCurrentProject, getToDos } from "../model/storage";
import { makeNewItemButton } from "../ui/new-item-button";
import { confirmProjectDelete } from "../ui/delete-message";

export function populateContent() {
  const contentDiv = document.createElement("div");
  contentDiv.setAttribute("id", "content");
  const cardHolder = document.createElement("div");
  cardHolder.setAttribute("id", "cards");
  let forDisplay = getToDos();
  let message = document.createElement("div");
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
    message.textContent = "You have no pending tasks.";
    message.append(contentItemButton("Add a task"));
  } else {
    message.textContent = "Add a task to this project?";
    message.append(contentItemButton("Add a task"));
  }

  if (getCurrentProject() != -1) {
    message.append(contentDeleteButton());
  }

  cardHolder.append(message);
  contentDiv.append(cardHolder);
  return contentDiv;
}

function contentItemButton(message: string) {
  const addItem = document.createElement("button");
  addItem.textContent = message;
  makeNewItemButton(addItem);
  return addItem;
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