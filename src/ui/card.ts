import { formatInTimeZone } from "date-fns-tz";
import { formatDistance } from "date-fns";
import { ToDo } from "../model/todo";
import { createPriority } from "./priority";
import {
  createStatus,
  playButton,
  pauseButton,
  checkButton,
  completedButton,
} from "./status";
import { trashButton, editButton } from "./edit-trash-buttons";
import { createTimescale } from "./timescale";
import { getProjects } from "../model/storage";
import { getElementByID } from "./util";
import { createElement } from "./createElement";

export function createCard(item: ToDo) {
  const card = createElement({
    type: "div",
    id: `c${item.created}`,
    classes: "todo",
  });

  card.append(
    createRow(createTitle(item.title), createStatusButtons(item)),
    getProjectName(item.projectID),
    createStatus(item.status),
  );
  if (item.dueDate) card.append(createDueDate(item.dueDate));
  card.append(
    createPriority(item.priority),
    createTimescale(item.timescale),
    createNotes(item.notes),
    createTimestamp(item.created),
  );

  return card;
}

export function createRow(...elements: HTMLElement[]) {
  const row = createElement({ type: "div", classes: "card-row" });
  row.append(...elements);
  return row;
}

function createTitle(title: string) {
  return createElement({
    type: "p",
    classes: "title",
    text: title,
  });
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

function createStatusButtons(todo: ToDo) {
  const container = createElement({
    type: "div",
    classes: "status-button-div",
  });
  if (todo.status == "not yet started" || todo.status == "paused") {
    container.append(playButton(todo.created), checkButton(todo.created));
  } else if (todo.status == "started") {
    container.append(pauseButton(todo.created), checkButton(todo.created));
  } else if (todo.status == "done") {
    container.append(completedButton(todo.created));
  }
  container.append(editButton(todo.created), trashButton(todo.created));
  return container;
}

function createDueDate(dueDate: string | undefined) {
  const container = createElement({ type: "div", classes: "due-date-div" });
  const date = document.createElement("p");
  if (dueDate) {
    date.textContent =
      "Due by " + formatInTimeZone(dueDate, "UTC", "EEEE, MMMM d, yyyy");
  }
  container.append(date);
  return container;
}

function createNotes(notes?: string) {
  const container = createElement({ type: "div", classes: "notes-div" });
  const head = createElement({
    type: "p",
    classes: "notes-head",
    text: "Notes",
  });

  const body = createElement({
    type: "p",
    classes: "notes",
    text: notes || "",
  });
  container.append(head, body);
  return container;
}

function createTimestamp(timestamp: number) {
  return createElement({
    type: "div",
    classes: "timestamp last-row",
    text: `Created ${formatDistance(timestamp, new Date())} ago`,
  });
}

export function replaceCard(id: number, el: Element) {
  let card = getElementByID(id);
  let cardholder = document.querySelector("#cards");
  if (card) cardholder?.replaceChild(el, card);
}
