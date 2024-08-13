import { formatDate, formatDistance } from "date-fns";

export interface ToDo {
  title: string;
  description: string;
  dueDate: Date | undefined;
  priority: number; // from 0 to 4, 4 being most important
  notes: string;
  checklist: string[];
  status: Status;
  timescale: Timescale; 
  created: number;
}

export type Status = "done" | "started" | "not started" | "paused";
export type Timescale = "<5 minutes" | "<1 hour" | "hours" | "days" | "weeks" | "months" | "years";

export function createCard(item: ToDo): HTMLDivElement {
  const card = document.createElement("div");
  card.classList.add("todo");

  const title = document.createElement("p");
  title.classList.add("title");
  title.textContent = item.title;

  const description = document.createElement("p");
  description.classList.add("description");
  description.textContent = item.description;

  const dueDate = createDueDate(item.dueDate);
  const priority = createPriority(item.priority);
  const notes = createNotes(item.notes);
  const checklist = createChecklist(item.checklist);
  const timestamp = createTimestamp(item.created);

  card.append(
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    timestamp
  );

  return card;
}

function createPriority(priority: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("priority-div");

  const priorityHead = document.createElement("p");
  priorityHead.classList.add("priority-head");
  priorityHead.textContent = "Priority: ";
  const dropdown = createPriorityDropdown(priority);
  dropdown.classList.add("priority");
  container.append (
    priorityHead,
    dropdown
  );
  
  return container;
}

function createPriorityDropdown(priority: number): HTMLSelectElement {
  const list = document.createElement("select");
  const priorities = ["very low", "low", "moderate", "high", "very high"];
  for (let i = 0; i <= 4; i++) {
    const option = document.createElement("option");
    if (i == priority) {
    option.setAttribute("selected","");
    }
    option.textContent = priorities[i];
    list.appendChild(option);
  }
  return list;
}

function createDueDate(dueDate: Date | undefined): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("due-date-div");
  
  const head = document.createElement("p");
  head.textContent = "Due: ";
  head.classList.add("due-date-head");

  const date = document.createElement("p");
  
  if (dueDate == undefined) {
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

function createChecklist(array: string[]): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("checklist-div"); 

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
  return container;
}

function createTimestamp(timestamp: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("timestamp");
  container.textContent = "Created " + formatDistance(new Date(timestamp), new Date(Date.now())) + " ago";
  return container;
}