import { updateDisplay } from "..";
import { getProjects, setTypedItem, getToDos } from "./storage";
import { ToDo } from "./todo";

export interface Project {
  id: number;
  title: string;
}

export function selectProject(id: number | string) {
  if (typeof id == "string") id = Number(id);
  setTypedItem("currentProject", id);
  updateDisplay(id);
}

// make add project button work

export function addProject(title: string) {
  let id = Date.now();
  setTypedItem("projects", getProjects().concat({ id, title }));
  selectProject(id);
}

/*
function getNewestProject() {
  const newest = getProjects().reduce((latest, current) => {
    return current.id > latest.id ? current : latest;
  });
}
*/

export function deleteProject(id: number) {
  if (id != -1) {
    setTypedItem("prevProjects", getProjects());
    setTypedItem(
      "projects",
      getProjects().filter((project) => project.id != id),
    );

    setTypedItem("prevToDos", getToDos());
    //remove references to deleted project in existing todos
    setTypedItem(
      "todos",
      getToDos().map((todo): ToDo => {
        if (todo.projectID == id) {
          return { ...todo, projectID: -1 };
        } else {
          return todo;
        }
      }),
    );
  }
  updateDisplay();
}
