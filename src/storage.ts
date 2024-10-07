import storageAvailable from "storage-available";
import { Project } from "./project";
import { ToDo } from "./todo";

if (storageAvailable('localStorage')) {
  ;
} else {
  alert("This site is not compatible with your browser :( ");
}

export interface Schema {
  projects: Project[];
  todos: ToDo[];
  currentProject: number;
  prevProjects: Project[];
  prevToDos: ToDo[];
}

export function checkStorage() {
  const projects = getTypedItem("projects");
  if (!projects || projects[0].id != -1) {
    initializeStorage();
  }
}

export function initializeStorage() {
  // set up empty default "no project / all projects" project as current 
  setTypedItem("projects",[{id: -1, title: "default"}]);
  setTypedItem("todos",[]);
  setTypedItem("currentProject",-1);
}


export function setTypedItem<T extends keyof Schema>(key: T, value: Schema[T]): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getTypedItem<T extends keyof Schema>(key: T): Schema[T] | undefined {
  let result = window.localStorage.getItem(key);
  if (result) return JSON.parse(result); 
  else return undefined;
}

export function getProjects(): Project[] {
  let projects = getTypedItem("projects");
  if (!projects) {
    projects = [{id: -1, title: "default"}];
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
  if (current == undefined) {return -1;} 
  else {return current;}
}