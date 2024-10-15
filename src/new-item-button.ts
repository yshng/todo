import { addEmptyToDo } from "./todo";
import { editCard } from "./edit-card";

const newItemBtn = document.querySelector<HTMLButtonElement>("#new-item");

newItemBtn?.addEventListener("click", () => {
  const cardholder = document.querySelector("#cards");
  if (!document.querySelector(".editing")) {
    const editor = editCard(addEmptyToDo());
    cardholder?.prepend(editor);
    document.querySelector<HTMLInputElement>("#title-field")?.focus();
    editor.scrollIntoView();
  }
});