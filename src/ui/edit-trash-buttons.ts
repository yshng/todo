import { getToDoByID, removeToDo } from "../model/todo";
import { editCard } from "./edit-card";
import { replaceCard } from "./card";
import { confirmToDoDelete } from "./delete-message";
import { moveToEditBuffer } from "../model/editBuffer";


export function editButton(id: number): HTMLButtonElement {
  const edit = document.createElement("button");
  edit.classList.add("status-button", "edit-button");
  edit.addEventListener("click", () => pushEditButton(id));
  return edit;
}

function pushEditButton(id: number) {
  const todo = getToDoByID(id);
  if (todo) {
    moveToEditBuffer(todo, id);
    replaceCard(id, editCard(todo));
  }
}

export function trashButton(id: number): HTMLButtonElement {
  const trash = document.createElement("button");
  trash.classList.add("status-button", "trash-button");
  trash.addEventListener("click", () => pushTrashButton(id));
  return trash;
}

function pushTrashButton(id: number) {
  const title = getToDoByID(id)?.title;
  removeToDo(id);
  if (title) confirmToDoDelete(title,id);
}

