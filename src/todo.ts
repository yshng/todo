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

function updateToDo<K extends keyof ToDo, V extends ToDo[K]>(todo: ToDo, key: K,value: V): ToDo {
  return {...todo,[key]: value}
}

export function addToDo(todo: ToDo) {
  setTypedItem("todos",getToDos().concat(todo));
}