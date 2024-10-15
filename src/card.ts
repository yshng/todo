import { formatDate, formatDistance } from "date-fns";
import { ToDo } from "./todo";
import { createPriority } from "./priority";
import { createStatus, createStatusButtons } from "./status";
import { createTimescale } from "./timescale";
import { getProjects } from "./storage";

export function createCard(item: ToDo): HTMLDivElement {
  const card = document.createElement("div");
  card.classList.add("todo");
  card.setAttribute("id", `c${item.created}`);
  card.append(
    createRow(createTitle(item.title), createStatusButtons(item)),
    getProjectName(item.projectID),
    createStatus(item.status),
    createDueDate(item.dueDate),
    createPriority(item.priority),
    createTimescale(item.timescale),
    createNotes(item.notes),
    createTimestamp(item.created),
  );

  return card;
}

export function createRow(...elements: HTMLElement[]) {
  const row = document.createElement("div");
  row.classList.add("card-row");
  row.append(...elements);
  return row;
}

function createTitle(title: string): HTMLParagraphElement {
  const titleText = document.createElement("p");
  titleText.classList.add("title");
  titleText.textContent = title;
  return titleText;
}
function getProjectName(id: number): HTMLParagraphElement {
  const project = document.createElement("p");
  if (id != -1) {
    let projectName = getProjects().filter((project) => project.id == id)[0]
      .title;
    if (projectName) {
      project.classList.add("project-name");
      project.textContent = projectName;
    }
  }
  return project;
}

function createDueDate(dueDate: string | undefined): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("due-date-div");
  const date = document.createElement("p");

  if (dueDate == undefined) {
    date.textContent = "(none)";
  } else {
    date.textContent = "Due by " + formatDate(dueDate, "eeee, MMMM d, yyyy");
    container.append(date);
  }
  return container;
}

function createNotes(notes?: string): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("notes-div");

  const head = document.createElement("p");
  head.classList.add("notes-head");
  head.textContent = "Notes";

  const body = document.createElement("p");
  body.classList.add("notes");
  if (notes != undefined) {
    body.textContent = notes;
  }

  container.append(head, body);

  return container;
}

function createTimestamp(timestamp: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("timestamp");
  container.textContent = `Created ${formatDistance(timestamp, new Date())} ago`;
  return container;
}
