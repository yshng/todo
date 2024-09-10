import { Status, Timescale, ToDo } from "./todo";
import { master, updateDisplay } from ".";

const dialog = document.querySelector<HTMLDialogElement>("dialog");
const addBtn = document.querySelector<HTMLButtonElement>("#submit");
const cancelBtn = document.querySelector<HTMLButtonElement>("#cancel");

const newItemBtn = document.querySelector<HTMLButtonElement>("#new-item");

newItemBtn?.addEventListener("click", () => {
  if (dialog) dialog.showModal();
});

addBtn?.addEventListener("click", ()=> {
  master.push(newItem());
  updateDisplay();
  dialog?.close();
})

cancelBtn?.addEventListener("click", () => {
  dialog?.close();
})

function newItem(): ToDo {
  let title = document.querySelector<HTMLInputElement>("#title")?.value;
  if (!title) {title = "Another To Do";}

  let dateString = document.querySelector<HTMLInputElement>("#due-date")?.value;
  if (dateString) {var dueDate: Date | undefined = new Date(dateString);} 
  else {dueDate = undefined;}

  let notes = document.querySelector<HTMLTextAreaElement>("#notes")?.value;
  if (!notes) {notes = "(no notes)"};

  let priority = document.querySelector<HTMLSelectElement>("#priority")?.selectedIndex;
  if (!priority) {priority = 2};

  let timescaleSelect = document.querySelector<HTMLSelectElement>("#timescale");
  var timescale = timescaleSelect!.options[timescaleSelect!.selectedIndex].value as Timescale;

  //let checklist: string[] = [];

  return new ToDo(
    title,
    dueDate,
    priority, 
    notes,
    timescale
  )
  
}