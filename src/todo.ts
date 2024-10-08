import { getToDos, setTypedItem } from "./storage";
import {Status} from "./status";

export interface ToDo {
  title: string;
  dueDate?: Date;
  priority: number; // from 0 to 4, 4 being most important
  notes: string;
  //checklist?: string[];
  status: Status;
  timescale: number;
  created: number;
  projectID: number;
}

class ToDoNotFoundError extends Error {}

export function updateToDo<K extends keyof ToDo, V extends ToDo[K]>(
  id: number,
  key: K,
  value: V,
) {
  let oldArray: ToDo[] = getToDos();
  let oldToDo = oldArray.find((todo) => id == todo.created);
  let bookmark = oldArray.findIndex((todo) => id == todo.created);
  if (oldToDo) {
    setTypedItem(
      "todos",
      oldArray.toSpliced(bookmark, 1, { ...oldToDo, [key]: value }),
    );
  } else {
    throw new ToDoNotFoundError("No To Do found with ID: " + id);
  }
}

export function addToDo(todo: ToDo) {
  setTypedItem("todos", getToDos().concat(todo));
}

export function removeToDo(id: number) {
  setTypedItem("prevToDos", getToDos());
  setTypedItem(
    "todos",
    getToDos().filter((todo) => id != todo.created),
  );
}
