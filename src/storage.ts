import { Projects } from "./project";
import { ToDo } from "./todo";

export interface Schema {
  projects: Projects;
  todos: ToDo[];
  currentProject: number;
}

function setTypedItem<T extends keyof Schema>(key: T, value: Schema[T]): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getTypedItem<T extends keyof Schema>(key: T): Schema[T] | undefined {
  let result = window.localStorage.getItem(key);
  if (result) return JSON.parse(result); 
  else return undefined;
}

export function getProjects(): Projects {
  let projects = getTypedItem("projects");
  if (!projects) {
    projects = new Projects;
    setTypedItem("projects", projects);
  }
  return projects;
}

export function getToDos(): ToDo[] {
  let todos = getTypedItem("todos");
  if (!todos) {
    todos = [];
    setTypedItem("todos", todos);
  }
  return todos;
}

export function getCurrentProject(): number {
  let current = getTypedItem("currentProject");
  if (current == undefined) {return 0;} 
  else {return current;}
}