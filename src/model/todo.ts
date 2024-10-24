import { getToDos, setTypedItem } from "./storage";
import { Status } from "./status";
import { updateDisplay } from "..";

export interface ToDo {
  title: string;
  dueDate?: string;
  priority: number; // from 0 to 4, 4 being most important
  notes?: string;
  status: Status;
  timescale: number;
  created: number;
  projectID: number;
}

class ToDoNotFoundError extends Error {}

export function getToDoByID(id: number) {
  return getToDos().find((todo) => id == todo.created);
}

export function updateToDo<K extends keyof ToDo, V extends ToDo[K]>(
  id: number,
  key: K,
  value: V,
) {
  let oldToDo = getToDoByID(id);
  let bookmark = getToDos().findIndex((todo) => id == todo.created);
  if (oldToDo) {
    setTypedItem(
      "todos",
      getToDos().toSpliced(bookmark, 1, { ...oldToDo, [key]: value }),
    );
  } else {
    throw new ToDoNotFoundError("No To Do found with ID: " + id);
  }
}

export function replaceToDo(id: number, newToDo: ToDo) {
  let oldToDo = getToDoByID(id);
  let bookmark = getToDos().findIndex((todo) => id == todo.created);
  if (oldToDo) {
    setTypedItem(
      "todos",
      getToDos().toSpliced(bookmark, 1, newToDo),
    );
  } else {
    throw new ToDoNotFoundError("No To Do found with ID: " + id);
  }
}

export function addEmptyToDo(projectID?: number): ToDo {
  let todo: ToDo = {
    title: "",
    dueDate: undefined,
    priority: 1,
    status: "not yet started",
    notes: undefined,
    timescale: 0,
    created: Date.now(),
    projectID: projectID || -1
  }
  addToDo(todo);
  return todo;
}

export function addToDo(todo: ToDo) {
  setTypedItem("todos", [todo].concat(getToDos()));
}

export function removeToDo(id: number) {
  setTypedItem("prevToDos", getToDos());
  setTypedItem(
    "todos",
    getToDos().filter((todo) => id != todo.created),
  );
  updateDisplay();
}

export function selectToDo(id: number) {
  const todo = getToDoByID(id);
  if (todo) {
    if (todo.status == "done") setTypedItem("currentProject",-2);
    else setTypedItem("currentProject",todo.projectID);
  }
  updateDisplay(id);
}