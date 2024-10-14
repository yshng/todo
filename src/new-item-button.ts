import { addEmptyToDo } from "./todo";
import { editCard } from "./edit-card";

const newItemBtn = document.querySelector<HTMLButtonElement>("#new-item");

newItemBtn?.addEventListener("click", () => {
  const cardholder = document.querySelector("#cards");
  const editor = editCard(addEmptyToDo());
  cardholder?.prepend(editor);
  editor.scrollIntoView();
});