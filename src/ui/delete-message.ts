import { updateDisplay } from "..";
import { restoreToDos, restoreProjects } from "../model/storage";

function makeConfirm(message: string, option: string, restore: Function) {
  const cards = document.querySelector("#cards");
  const confirm = document.createElement("div");
  confirm.textContent = message;
  confirm.classList.add("confirm");
  const undo = document.createElement("button");
  undo.setAttribute("id","undo");
  undo.textContent = option;
  const exit = document.createElement("button");
  exit.setAttribute("id","exit");
  exit.textContent = "X";
  confirm.append(undo, exit);
  cards?.prepend(confirm);
  undo.addEventListener("click", () => restore());
  exit.addEventListener("click", () => updateDisplay());
}

export function confirmToDoDelete(title: string, id: number) {
  makeConfirm(`Task "${title}" deleted. `, "Undo?", () => restoreToDos(id));
}

export function confirmProjectDelete(title: string, id: number) {
  makeConfirm(
    `Project "${title}" deleted.`,
    "Undo?",
    () => restoreProjects(id),
  );
}
