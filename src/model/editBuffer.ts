import { setTypedItem, getTypedItem } from "./storage"
import { removeToDo, ToDo } from "./todo"

export function addToEditBuffer(todo: ToDo) {
  setTypedItem("editBuffer", todo);
}

export function moveToEditBuffer(todo: ToDo, id: number) {
  setTypedItem("editBuffer", todo);
  removeToDo(id);
}

export function clearEditBuffer() {
  setTypedItem("editBuffer", null);
}

export function checkEditBuffer() {
  return getTypedItem("editBuffer");
}