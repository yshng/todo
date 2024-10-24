import { addEmptyToDo } from "../model/todo";
import { updateDisplay } from "..";
import { addToEditBuffer } from "../model/editBuffer";

export function makeNewItemButton(element: HTMLButtonElement) {
  element.addEventListener("click", () => {
      addToEditBuffer(addEmptyToDo());
      updateDisplay();
    }
  );
}

const newItemBtn = document.querySelector<HTMLButtonElement>("#new-item");
if (newItemBtn) makeNewItemButton(newItemBtn);