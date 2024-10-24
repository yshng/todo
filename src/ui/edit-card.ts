import { replaceToDo, getToDoByID, ToDo, addToDo } from "../model/todo";
import { createPriorityDropdown } from "./priority";
import { createTimescaleDropdown } from "./timescale";
import { createProjectDropdown } from "./project";
import { createRow } from "../ui/card";
import { formatDistanceToNow } from "date-fns";
import { selectToDo } from "../model/todo";
import { clearEditBuffer } from "../model/editBuffer";
import { updateDisplay } from "..";

export function editCard(todo: ToDo) {
  const card = document.createElement("form");
  card.classList.add("todo","editing");
  card.setAttribute("autocomplete","off");
  card.append(
    createRow(createTitleField(todo.title), createFormButtons(todo.created)),
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

function createFormButtons(id: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("status-button-div");
  const save = document.createElement("button");
  save.setAttribute("type","submit");
  save.classList.add("save-button","status-button");
  save.addEventListener("click", () => pushSaveButton(id));
  const cancel = document.createElement("button");
  cancel.setAttribute("type","cancel");
  cancel.classList.add("trash-button","status-button");
  cancel.addEventListener("click", () => pushCancelButton());
  container.append(save,cancel);
  return container; 
}

function pushCancelButton() {
  clearEditBuffer();
  updateDisplay();
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
  dueDate
  console.log(dueDate);

  let notes = document.querySelector<HTMLTextAreaElement>("#notes")?.value || "";

  let priority =
    document.querySelector<HTMLSelectElement>("#priority-dropdown")?.selectedIndex || 0;

  let timescale = document.querySelector<HTMLSelectElement>("#timescale-dropdown")?.selectedIndex || 0;

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
  if (getToDoByID(id)) {
    replaceToDo(id, newToDoFromCard(id));
  } else {
    addToDo(newToDoFromCard(id));
  }
  clearEditBuffer();
  selectToDo(id);
}