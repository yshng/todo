import { formatDate, formatDistance } from "date-fns";
import { ToDo } from "./todo";
import { createPriority } from "./priority";
import { createStatus } from "./status";
import { createTimescale } from "./timescale";

export function createCard(item: ToDo): HTMLDivElement {
  const card = document.createElement("div");
  card.classList.add("todo");

  const title = document.createElement("p");
  title.classList.add("title");
  title.textContent = item.title;

  card.append(
    title,
    createDueDate(item.dueDate),
    createPriority(item.priority),
    createTimescale(item.timescale),
    createStatus(item.status),
    //createChecklist(item.checklist),
    createNotes(item.notes),
    createTimestamp(item.created)
  );

  return card;
}

function createDueDate(dueDate: Date | undefined): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("due-date-div");
  
  const head = document.createElement("p");
  head.textContent = "Due: ";
  head.classList.add("due-date-head");

  const date = document.createElement("p");
  
  if (dueDate == undefined) {
    date.textContent = "(none)";
  } else {
    date.textContent = formatDate(dueDate, 'EEE MMM dd, yyyy')
    container.append(head,date);
  }
  return container;
}

function createNotes(notes: string): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("notes-div");

  const head = document.createElement("p");
  head.classList.add("notes-head");
  head.textContent = "Notes";

  const body = document.createElement("p");
  body.classList.add("notes");
  if (notes == "") {
    body.textContent = "(none)";
  } else { 
    body.textContent = notes;
  }

  container.append(head,body);

  return container;
}

function createTimestamp(timestamp: Date): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("timestamp");
  container.textContent = `Created at ${formatDistance(timestamp, new Date())}ago`;
  return container;
}

