import { updateDisplay } from "..";
import { getProjects, setTypedItem, getToDos } from "./storage";
import { ToDo } from "./todo";

export interface Project {
  id: number;
  title: string;
}

export function selectProject(id: number) {
  setTypedItem("currentProject", id);
  updateDisplay(id);
}

// make add project button work

export function addProject() {
  let title: string | null = null;
  while (!title) {
    title = prompt("Name your new project: ", "Another Project");
  }
  setTypedItem("projects", getProjects().concat({ id: Date.now(), title }));
  updateDisplay();
}

export function deleteProject(id: number) {
  if (id != -1) {
    setTypedItem("prevProjects", getProjects());
    setTypedItem(
      "projects",
      getProjects().filter((project) => project.id != id),
    );

    setTypedItem("prevToDos", getToDos());
    //remove references to deleted project in existing todos
    setTypedItem("todos", getToDos().map( (todo): ToDo => {
      if (todo.projectID == id) {
        return {...todo, "projectID": -1};
      } else {
        return todo;
      }}))
  }
  updateDisplay();
}
