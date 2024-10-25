import { createCard } from "../ui/card";
import { deleteProject, getProjectByID, selectProject } from "../model/project";
import {
  getCompleted,
  getCurrentProject,
  getIncomplete,
} from "../model/storage";
import { confirmProjectDelete } from "../ui/delete-message";
import { makeNewItemButton } from "./new-item-button";
import { checkEditBuffer } from "../model/editBuffer";
import { editCard } from "./edit-card";
import { createElement } from "./createElement";

export function populateContent() {
  const contentDiv = createElement({ type: "div", id: "content" });
  const cardHolder = createElement({ type: "div", id: "cards" });
  cardHolder.append(createBuffer());
  let message = createElement({ type: "div", classes: "todo message" });
  const current = getCurrentProject();

  const underEdit = checkEditBuffer();
  if (underEdit) cardHolder.append(editCard(underEdit));

  let forDisplay = getIncomplete();
  if (current > 0) {
    forDisplay = forDisplay
      .filter((todo) => todo.projectID == current)
      .filter((todo) => todo.created != underEdit?.created);
  }
  if (current == -2) { forDisplay = getCompleted(); };
  if (forDisplay.length) {
    forDisplay.map((todo) => {
      let cards = createCard(todo);
      cardHolder.append(cards);
    });
  } else if (current == -1) {
    message.textContent = "You have no pending tasks.";
    message.appendChild(contentItemButton("Get started with a new task"));
  } else if (current == -2) {
    message.textContent = "You have deleted all your completed tasks."
    message.appendChild(contentItemButton("Add a new task"));
    selectProject(-1);
  } else {
    message.textContent = "This project contains no tasks.";
    message.appendChild(contentItemButton("Add a task"));
  }

  if (current > 0) {
    message.append(contentDeleteButton());
    if (forDisplay.length > 0) {
      message.append(createElement({
        type: "p",
        text: "Note: Deleting a project with tasks in it will not delete the tasks, only remove them from this project."
    }))
  }}

  cardHolder.append(message, createBuffer());
  contentDiv.append(cardHolder);
  return contentDiv;
}

function contentDeleteButton() {
  const deleteButton = createElement({
    type: "button",
    attr: "type,button",
    text: "Delete project"
  });
  deleteButton.addEventListener("click", () => pushDeleteProjectButton());
  return deleteButton;
}

function pushDeleteProjectButton() {
  const id = getCurrentProject();
  const title = getProjectByID(id).title;
  deleteProject(id);
  confirmProjectDelete(title, id);
}

export function createBuffer() {
  return createElement({ type: "div", classes: "buffer" });
}

function contentItemButton(message: string) {
  const addItem = createElement({
    type: "button",
    attr: "type,button",
    text: message,
  }) as HTMLButtonElement;
  makeNewItemButton(addItem);
  return addItem;
}
