import { replaceToDo, getToDoByID, ToDo, addToDo } from "../model/todo";
import { createPriorityDropdown } from "./priority";
import { createTimescaleDropdown } from "./timescale";
import { createProjectDropdown } from "./project";
import { createRow } from "../ui/card";
import { formatDistanceToNow } from "date-fns";
import { selectToDo } from "../model/todo";
import { clearEditBuffer } from "../model/editBuffer";
import { updateDisplay } from "../ui/update-display";
import { createElement } from "./createElement";

export function editCard(todo: ToDo) {
  const card = createElement({
    type: "form",
    classes: "todo editing",
    attr: "autocomplete,off;novalidate,novalidate"
  });
  card.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm()) { pushSaveButton(todo.created) }});
  card.append(
    createRow(createTitleField(todo.title)),
    createProjectDropdown(todo.projectID),
    createDueDateSelector(todo.dueDate),
    createPriorityDropdown(todo.priority),
    createTimescaleDropdown(todo.timescale),
    createNotesField(todo.notes),
    createLastRow(createTimestamp(todo.created),createFormButtons(todo.created)))
  return card;

}

function createLastRow(...elements: HTMLElement[]) {
  const row = createRow(...elements);
  row.classList.add("last-row");
  return row;
}

function createTitleField(title: string): HTMLInputElement {
  const titleField = createElement({
    type: "input",
    id: "title-field",
    classes: "title",
    attr: "type,text;placeholder,To Do Item;required,required",
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
    text: "Save"
  });

  const cancel = createElement({
    type: "button",
    attr: "type,cancel",
    text: "Cancel"
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

function validateForm() {
  const titleField = document.querySelector<HTMLInputElement>("#title-field");
  if (titleField?.validity.valueMissing) {
    titleField?.setCustomValidity("Please give your task a name.");  
  } else {
    titleField?.setCustomValidity("");
  }
  return titleField?.reportValidity();
}
  