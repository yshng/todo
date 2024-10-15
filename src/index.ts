import "./styles/card.css";
import "./styles/layout.css";
import "./styles/button.css";
import "./styles/edit-card.css";
import "./ui/new-item-button";
import { createCard } from "./ui/card";
import { selectProject, addProjectDropdown, deleteProject } from "./model/project";
import {
  getCurrentProject,
  getProjects,
  getToDos,
  checkStorage,
  //initializeStorage,
} from "./model/storage";

checkStorage();
// initializeStorage();
updateDisplay();

export function updateDisplay(position?: number) {
  const main = document.querySelector<HTMLDivElement>("main");
  main?.replaceChildren(populateContent(), populateProjects());
  if (position != undefined) {
    let element = document.querySelector(
      `[id$=${CSS.escape(position.toString())}]`,
    );
    if (element)
      element.scrollIntoView({ block: "center" });
  }
  addProjectDropdown();
}

function populateProjects(): HTMLDivElement {
  const projectDiv = document.createElement("div");
  projectDiv.setAttribute("id", "projects");

  for (let { id, title } of getProjects()) {
    const h1 = document.createElement("h1");
    h1.classList.add("project");
    if (id == -1) {
      h1.textContent = "View all";
    } else {
      h1.textContent = title;
    }
    h1.setAttribute("id", `p${id}`);
    if (id == getCurrentProject()) {
      h1.classList.add("current-project");
    }

    // show number of todos in each project, or total number for default
    const badge = document.createElement("span");
    if (id == -1) {
      badge.textContent = getToDos().length.toString();
    } else {
      badge.textContent = getToDos()
        .filter((todo) => todo.projectID == id)
        .length.toString();
    }
    badge.classList.add("project-badge");
    h1.addEventListener("click", () => selectProject(id));

    h1.prepend(badge);
    projectDiv.appendChild(h1);
  }

  return projectDiv;
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
  } else if (getCurrentProject() == -1) {
    message.textContent = "What would you like to do?";
  } else {
    message.textContent = "There are no items in this project.";
  }

  if (getCurrentProject() != -1) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete project";
    deleteButton.addEventListener("click", () =>
      deleteProject(getCurrentProject()),
    );
    message.append(deleteButton);
  }

  cardHolder.append(message);
  contentDiv.append(cardHolder);
  return contentDiv;
}
