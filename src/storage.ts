import { Projects } from "./project";
import { ToDo } from "./todo";

export interface Schema {
  projects: Projects;
  todos: ToDo[];
  currentProject: number;
}

export function setTypedItem<T extends keyof Schema>(key: T, value: Schema[T]): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getTypedItem<T extends keyof Schema>(key: T): Schema[T] | null {
  let result = window.localStorage.getItem(key);
  if (result) return JSON.parse(result); 
  else return null;
}

