import { replaceToDo, getToDoByID, ToDo, addToDo } from "../model/todo";
import { createPriorityDropdown } from "./priority";
import { createTimescaleDropdown } from "./timescale";
import { createProjectDropdown } from "./project";
import { createRow } from "../ui/card";
import { formatDistanceToNow } from "date-fns";
import { selectToDo } from "../model/todo";
import { clearEditBuffer } from "../model/editBuffer";
import { updateDisplay } from "..";
import { createElement } from "./createElement";

export function editCard(todo: ToDo) {
  const card = createElement({
    type: "form",
    classes: "todo editing",
    attr: "autocomplete,off"
  });
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
  const titleField = createElement({
    type: "input",
    id: "title-field",
    attr: "type,text;placeholder,To Do Item",
  }) as HTMLInputElement;
  titleField.value = title;
  return titleField;
}

function createFormButtons(id: number) {
  const container = createElement({ 
    type: "div", 
    classes: "status-button-div" 
  });

  const save = createElement({
    type: "button",
    attr: "type,submit",
    classes: "save-button status-button",
  });
  save.addEventListener("click", () => pushSaveButton(id));

  const cancel = createElement({
    type: "button",
    classes: "trash-button status-button",
    attr: "type,cancel"
  });
  cancel.addEventListener("click", () => pushCancelButton());
  container.append(save,cancel);
  return container; 
}

function pushCancelButton() {
  clearEditBuffer();
  updateDisplay();
}

function createDueDateSelector(duedate?: string) {
  const container = createElement({
    type: "div",
    classes: "due-date-div"
  })

  const label = createElement({
    type: "label",
    attr: "for,due-date",
    text: "Due by "
  });

  const date = createElement({
    type: "input",
    id: "due-date",
    attr: "type,date"
  }) as HTMLInputElement;
  
  if (duedate) date.value = duedate;
  container.append(label,date);
  return container;
}

function createNotesField(notes?: string) {
  const container = createElement({ type: "div", classes: "notes-div" });
  
  const head = createElement({
    type: "label",
    classes: "notes-head",
    attr: "for,notes-field",
    text: "Notes"
  })

  const body = createElement({
    type: "textarea",
    id: "notes-field",
    classes: "notes"
  }) as HTMLTextAreaElement;
  
  notes == undefined ? 
    body.placeholder = "add notes here" :
    body.value = notes;

  container.append(head,body);
  return container;
}

function createTimestamp(timestamp?: number) {
  if (!timestamp) { timestamp = Date.now(); }
  return createElement({
    type: "div",
    classes: "timestamp",
    text: `Created ${formatDistanceToNow(timestamp)} ago`
  });
}

function newToDoFromCard(id: number) {
    
  let title = document.querySelector<HTMLInputElement>("#title-field")?.value || "";

  let dueDate = document.querySelector<HTMLInputElement>("#due-date")?.value || undefined;
  
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