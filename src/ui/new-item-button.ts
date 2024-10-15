import { addEmptyToDo } from "../model/todo";
import { editCard } from "./edit-card";

export function makeNewItemButton(element: HTMLButtonElement) {
  element.addEventListener("click", () => {
    const cardholder = document.querySelector("#cards");
    if (!document.querySelector(".editing")) {
      const editor = editCard(addEmptyToDo());
      cardholder?.prepend(editor);
      document.querySelector<HTMLInputElement>("#title-field")?.focus();
      editor.scrollIntoView();
    }
  });
}

const newItemBtn = document.querySelector<HTMLButtonElement>("#new-item");
if (newItemBtn) makeNewItemButton(newItemBtn);