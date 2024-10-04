import { getToDos, setTypedItem } from "./storage";

export interface ToDo {
  title: string;
  dueDate?: Date;
  priority: number; // from 0 to 4, 4 being most important
  notes: string;
  //checklist?: string[];
  status: number;
  timescale: number;
  created: number;
  projectID: number;
}

class ToDoNotFoundError extends Error {};

export function updateToDo<K extends keyof ToDo, V extends ToDo[K]>(
  id: number,
  key: K,
  value: V
) {
  let oldArray: ToDo[] = getToDos();
  let oldToDo = oldArray.find((todo) => id == todo.created);
  if (oldToDo) {
    setTypedItem("todos", oldArray.filter( (todo) => id != todo.created).concat({...oldToDo, [key]: value}))
  } else {
    throw new ToDoNotFoundError("No To Do found with ID: " + id); 
  }
}

export function addToDo(todo: ToDo) {
  setTypedItem("todos", getToDos().concat(todo));
}