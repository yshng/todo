import { ToDo } from "./todo";
import { currentState, updateDisplay } from ".";
// import { Project } from "./project";

const dialog = document.querySelector<HTMLDialogElement>("dialog");
const addBtn = document.querySelector<HTMLButtonElement>("#submit");
const cancelBtn = document.querySelector<HTMLButtonElement>("#cancel");

const newItemBtn = document.querySelector<HTMLButtonElement>("#new-item");

newItemBtn?.addEventListener("click", () => {
  if (dialog) dialog.showModal();
});

addBtn?.addEventListener("click", ()=> {
  currentState.todos = newItem().addToDo(currentState);
  updateDisplay(currentState);
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
  if (!priority) {priority = 2};

  let timescaleSelect = document.querySelector<HTMLSelectElement>("#timescale");
  let timescale = timescaleSelect!.selectedIndex;

  let projectSelect = document.querySelector<HTMLSelectElement>(".project-dropdown");
  console.log(projectSelect);
  let projectID = projectSelect?.options[projectSelect.selectedIndex].value;
  if (!projectID) {projectID = "00000"}
  
  return new ToDo(
    title,
    dueDate,
    priority, 
    notes,
    timescale,
    projectID
  )
  
}