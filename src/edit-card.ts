import { addToDo, removeToDo, ToDo } from "./todo";
import { createPriorityDropdown } from "./priority";
import { createTimescaleDropdown } from "./timescale";
import { createProjectDropdown } from "./project";
import { createRow } from "./card";
import { formatDistanceToNow } from "date-fns";
import { updateDisplay } from ".";

export function editCard(todo?: ToDo): HTMLDivElement {

  const card = document.createElement("div");
  card.classList.add("todo","editing");
  card.append(
    createRow(createTitleField(todo?.title), createSaveButton(todo?.created)),
    createProjectDropdown(),
    createDueDateSelector(),
    createPriorityDropdown(),
    createTimescaleDropdown(),
    createNotesField(),
    createTimestamp(todo?.created))

  return card;
}

function createTitleField(title?: string): HTMLInputElement {
  const titleField = document.createElement("input");
  titleField.setAttribute("type","text");
  titleField.setAttribute("id","title-field");
  titleField.value = title || "To Do Item";
  titleField.classList.add("title");
  return titleField;
}

function createSaveButton(id?: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("status-button-div");
  const save = document.createElement("button");
  save.classList.add("save-button","status-button");
  save.addEventListener("click", () => pushSaveButton(id));
  container.append(save);
  return container; 
}

function pushSaveButton(id?: number) {
  if (id) removeToDo(id);
  addToDo(newToDoFromCard(id));
  updateDisplay(id)
}

function createDueDateSelector(): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("due-date-div");
  const date = document.createElement("input");
  const label = document.createElement("label");
  label.setAttribute("for","due-date");
  label.textContent = "Due by ";
  date.setAttribute("type","datetime-local");
  date.setAttribute("id","due-date");
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

function newToDoFromCard(id?: number) {
    
  let title = document.querySelector<HTMLInputElement>("#title-field")?.value;
  if (!title) {title = "To Do Item";}

  let dueDate: Date | undefined = undefined;
  let dateString = document.querySelector<HTMLInputElement>("#due-date")?.value;
  if (dateString) {dueDate = new Date(dateString);}

  let notes = document.querySelector<HTMLTextAreaElement>("#notes")?.value;
  if (!notes) {notes = "(no notes)";}

  let priority =
    document.querySelector<HTMLSelectElement>("#priority")?.selectedIndex;
  if (priority == undefined) {
    priority = 2;
  }

  let timescale =
    document.querySelector<HTMLSelectElement>("#timescale")?.selectedIndex;
  if (timescale == undefined) {
    timescale = 1;
  }

  let projectSelect =
    document.querySelector<HTMLSelectElement>("#project-dropdown");
  let projectID = Number(
    projectSelect?.options[projectSelect.selectedIndex].value,
  );
  if (!projectID) {
    projectID = -1;
  }

  return {
    title,
    dueDate,
    priority,
    notes,
    timescale,
    projectID,
    status: "not yet started",
    created: Date.now(),
  };
}