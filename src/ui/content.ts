import { createCard } from "../ui/card";
import { deleteProject, getProjectByID } from "../model/project";
import { getCurrentProject, getToDos } from "../model/storage";
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
  } else if (getCurrentProject() == -1) {
    message.textContent = "You have no pending tasks.";
  } else {
    message.textContent = "This project contains no tasks.";
  }

  if (getCurrentProject() != -1) {
    message.append(contentDeleteButton());
  }

  cardHolder.append(message);
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