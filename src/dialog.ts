import { Status, Timescale, ToDo } from "./todo";
import { master } from "./cache";
import { updateDisplay } from ".";

export const dialog = document.querySelector<HTMLDialogElement>("dialog");
export const addBtn = document.querySelector<HTMLButtonElement>("#submit");
export const cancelBtn = document.querySelector<HTMLButtonElement>("#cancel");

addBtn?.addEventListener("click", ()=> {
  master.push(newItem());
  updateDisplay();
  dialog?.close();
})

cancelBtn?.addEventListener("click", () => {
  dialog?.close();
})

export function newItem(): ToDo {
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

  let status: Status = "not started";
  let checklist: string[] = [];

  return {
    title,
    dueDate,
    created: Date.now(),
    notes,
    priority,
    timescale,
    status,
    checklist
  }
}