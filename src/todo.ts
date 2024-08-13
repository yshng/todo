import { formatDate } from "date-fns";

export interface ToDo {
  title: string;
  description: string;
  dueDate: Date | undefined;
  priority: number; // from 0 to 4, 4 being most important
  notes: string;
  checklist: string[];
  status: "done" | "started" | "not started";
  timescale: "less than 5 minutes" | "less than an hour" | "hours" | "days" | "weeks" | "months" | "years"; 
}

export function createItem(): ToDo {
  const newItem: ToDo = {
    title: "Sample task",
    description: "This is a description.",
    dueDate: new Date("2001-01-01"),
    priority: 2,
    notes: "Here are some notes about this task.",
    checklist: ["Some item","Next item","Check me out"],
    status: "not started",
    timescale: "less than an hour"

  }
  return newItem;
}

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

  card.append(
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist
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
  body.textContent = notes;
  
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
