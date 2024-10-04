import { ToDo, addToDo } from "./todo";
import { updateDisplay } from ".";
// import { Project } from "./project";

const dialog = document.querySelector<HTMLDialogElement>("dialog");
const addBtn = document.querySelector<HTMLButtonElement>("#submit");
const cancelBtn = document.querySelector<HTMLButtonElement>("#cancel");

const newItemBtn = document.querySelector<HTMLButtonElement>("#new-item");

newItemBtn?.addEventListener("click", () => {
  if (dialog) dialog.showModal();
});

addBtn?.addEventListener("click", ()=> {
  addToDo(newItem());
  updateDisplay();
  dialog?.close();
})

cancelBtn?.addEventListener("click", () => {
  dialog?.close();
})

function newItem(): ToDo {
  let title = document.querySelector<HTMLInputElement>("#title")?.value;
  if (!title) {title = "Another To Do";}

  let dueDate = undefined;
  let dateString = document.querySelector<HTMLInputElement>("#due-date")?.value;
  if (dateString) {dueDate = new Date(dateString);}

  let notes = document.querySelector<HTMLTextAreaElement>("#notes")?.value;
  if (!notes) {notes = "(no notes)"};

  let priority = document.querySelector<HTMLSelectElement>("#priority")?.selectedIndex;
  if (priority == undefined) {priority = 2};

  let timescale = document.querySelector<HTMLSelectElement>("#timescale")?.selectedIndex;
  if (timescale == undefined) {timescale = 1};

  let projectSelect = document.querySelector<HTMLSelectElement>(".project-dropdown");
  let projectID = Number(projectSelect?.options[projectSelect.selectedIndex].value);
  if (!projectID) {projectID = -1}
  
  return new ToDo(
    title,
    dueDate,
    priority, 
    notes,
    timescale,
    projectID
  )
  
}