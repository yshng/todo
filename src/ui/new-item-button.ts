import { addEmptyToDo } from "../model/todo";
import { editCard } from "./edit-card";

export function makeNewItemButton(element: HTMLButtonElement) {
  element.addEventListener("click", () => {
    const cardholder = document.querySelector("#cards");
    if (!document.querySelector(".editing")) {
      const editor = editCard(addEmptyToDo());
      cardholder?.prepend(editor);

      //check for message and confirm divs and remove them 
      const checkForMessage = document.querySelector<HTMLElement>(".message");
      if (checkForMessage) checkForMessage.remove();
      const checkForConfirm = document.querySelector(".confirm");
      if (checkForConfirm) checkForConfirm.remove();

      document.querySelector<HTMLInputElement>("#title-field")?.focus();
      editor.scrollIntoView({ block: "center" });
    }
  });
}

const newItemBtn = document.querySelector<HTMLButtonElement>("#new-item");
if (newItemBtn) makeNewItemButton(newItemBtn);