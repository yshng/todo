import { replaceToDo, getToDoByID, ToDo } from "../model/todo";
import { createPriorityDropdown } from "./priority";
import { createTimescaleDropdown } from "./timescale";
import { createProjectDropdown } from "./project";
import { createRow } from "../ui/card";
import { formatDistanceToNow } from "date-fns";
import { trashButton } from "./edit-trash-buttons";
import { selectToDo } from "../model/todo";

export function editCard(todo: ToDo) {
  const card = document.createElement("form");
  card.classList.add("todo","editing");
  card.setAttribute("autocomplete","off");
  card.append(
    createRow(createTitleField(todo.title), createSaveButton(todo.created), trashButton(todo.created)),
    createProjectDropdown(todo.projectID),
    createDueDateSelector(todo.dueDate),
    createPriorityDropdown(todo.priority),
    createTimescaleDropdown(todo.timescale),
    createNotesField(todo.notes),
    createTimestamp(todo.created))
  return card;
}

function createTitleField(title: string): HTMLInputElement {
  const titleField = document.createElement("input");
  titleField.setAttribute("type","text");
  titleField.setAttribute("id","title-field");
  titleField.value = title;
  titleField.setAttribute("placeholder","To Do Item");
  return titleField;
}

function createSaveButton(id: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("status-button-div");
  const save = document.createElement("button");
  save.setAttribute("type","submit");
  save.classList.add("save-button","status-button");
  save.addEventListener("click", () => pushSaveButton(id));
  container.append(save);
  return container; 
}

function createDueDateSelector(duedate?: string): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("due-date-div");
  const date = document.createElement("input");
  const label = document.createElement("label");
  label.setAttribute("for","due-date");
  label.textContent = "Due by ";
  date.setAttribute("type","date");
  date.setAttribute("id","due-date");
  if (duedate) date.value = duedate;
  container.append(label,date);
  return container;
}

function createNotesField(notes?: string): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("notes-div");

  const head = document.createElement("p");
  head.classList.add("notes-head");
  head.textContent = "Notes";

  const body = document.createElement("textarea");
  body.classList.add("notes");
  body.setAttribute("id","notes");
  if (notes == undefined) {
    body.placeholder = "add notes here";
  } else { 
    body.value = notes;
  }

  container.append(head,body);

  return container;
}

function createTimestamp(timestamp?: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("timestamp");
  if (!timestamp) { timestamp = Date.now(); }
  container.textContent = `Created ${formatDistanceToNow(timestamp)} ago`;
  return container;
}

function newToDoFromCard(id: number) {
    
  let title = document.querySelector<HTMLInputElement>("#title-field")?.value || "";

  let dueDate = document.querySelector<HTMLInputElement>("#due-date")?.value || undefined;

  let notes = document.querySelector<HTMLTextAreaElement>("#notes")?.value || "";

  let priority =
    document.querySelector<HTMLSelectElement>("#priority")?.selectedIndex || 2;

  let timescale =
    document.querySelector<HTMLSelectElement>("#timescale")?.selectedIndex || 1;

  let projectSelect =
    document.querySelector<HTMLSelectElement>("#project-dropdown");
  let projectID = Number(
    projectSelect?.options[projectSelect.selectedIndex].value,
  ) || -1;

  return {
    title,
    dueDate,
    priority,
    notes,
    timescale,
    projectID,
    status: getToDoByID(id)?.status || "not yet started", 
    created: getToDoByID(id)?.created || Date.now(),
  };
}

function pushSaveButton(id: number) {
  replaceToDo(id, newToDoFromCard(id));
  selectToDo(id);
}