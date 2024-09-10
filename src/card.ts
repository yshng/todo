import { formatDate, formatDistance } from "date-fns";
import { ToDo, Status, Timescale } from "./todo";
import {createPriority} from "./priorities";

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
    createNotes(item.notes),
    //createChecklist(item.checklist),
    createStatus(item.status),
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

function createChecklist(array: string[] | undefined): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("checklist-div"); 

  const head = document.createElement("p");
  head.classList.add("checklist-head");
  head.textContent = "Subtasks";

  const add = document.createElement("button");
  add.classList.add("checklist-add");
  add.textContent = "+";

  container.append(head,add);

  if (array != undefined) {
    const list = document.createElement("ul");
    list.classList.add("checklist");
    array.map((listitem) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type","checkbox");
      checkbox.setAttribute("name",listitem);
      const text = document.createTextNode(listitem);
      li.append(checkbox, text);
      list.appendChild(li);
    });
    container.append(list);
  }

  return container;
}

function createTimestamp(timestamp: Date): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("timestamp");
  container.textContent = `Created at ${formatDistance(timestamp, new Date())}ago`;
  return container;
}

//function createTimeScale(timescale: Timescale): HTMLDivElement{}

function createStatus(state: Status): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("status-div");
  const head = document.createElement("p");
  head.classList.add("status-head");
  head.textContent = "Status: ";

  const status = document.createElement("select");
  status.classList.add("status");
  status.textContent = state;
  const statuses: Status[] = ["not started", "started", "paused", "done"];
  for (let st of statuses) {
    const option = document.createElement("option");
    if (st == state) {
      option.setAttribute("selected","");
    }
    option.textContent = st;
    status.appendChild(option);
  }
  
  container.append (head, status);
  return container;

}