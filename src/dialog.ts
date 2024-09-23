import { ToDo } from "./todo";
import { currentProject, master, updateDisplay } from ".";
import { Project } from "./project";

const dialog = document.querySelector<HTMLDialogElement>("dialog");
const addBtn = document.querySelector<HTMLButtonElement>("#submit");
const cancelBtn = document.querySelector<HTMLButtonElement>("#cancel");

const newItemBtn = document.querySelector<HTMLButtonElement>("#new-item");

newItemBtn?.addEventListener("click", () => {
  if (dialog) dialog.showModal();
});

addBtn?.addEventListener("click", ()=> {
  let update = master[currentProject].addItem(newItem());
  master[currentProject] = update;
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
  if (!priority) {priority = 2};

  let timescaleSelect = document.querySelector<HTMLSelectElement>("#timescale");
  let timescale = timescaleSelect!.selectedIndex;

  //let checklist: string[] = [];
  
  return new ToDo(
    title,
    dueDate,
    priority, 
    notes,
    timescale
  )
  
}