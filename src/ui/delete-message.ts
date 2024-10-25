import { updateDisplay } from "..";
import { restoreToDos, restoreProjects } from "../model/storage";
import { createElement } from "./createElement";

function makeConfirm(message: string, option: string, restore: Function) {
  const cards = document.querySelector("#cards");
  const confirm = createElement({
    type: "div",
    text: message,
    classes: "confirm",
  });
  const undo = createElement({
    type: "button",
    id: "undo",
    attr: "type,button",
    text: option,
  });
  const exit = createElement({
    type: "button",
    id: "exit",
    text: "X",
  });
  confirm.append(undo, exit);
  cards?.prepend(confirm);
  undo.addEventListener("click", () => restore());
  exit.addEventListener("click", () => updateDisplay());
}

export function confirmToDoDelete(title: string, id: number) {
  makeConfirm(`Task "${title}" deleted. `, "Undo?", () => restoreToDos(id));
}

export function confirmProjectDelete(title: string, id: number) {
  makeConfirm(`Project "${title}" deleted.`, "Undo?", () =>
    restoreProjects(id),
  );
}
