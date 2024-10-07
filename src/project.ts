import { updateDisplay } from ".";
import { getProjects, setTypedItem } from "./storage";

export interface Project {
  id: number;
  title: string;
}

export function addProjectDropdown() {
  const projectDiv = document.querySelector("#project-select");
  const label = document.createElement("label");
  label.setAttribute("for","project-dropdown");
  label.textContent = "Project";
  const dropdown = document.createElement("select");
  dropdown.setAttribute("id","project-dropdown");

  for (let {id,title} of getProjects()) {
    const opt = document.createElement("option");
    opt.setAttribute("value",id.toString());
    opt.textContent = title;
    if (id == -1) {opt.textContent = "(no project)"}
    dropdown.appendChild(opt);
  }

  const addProject = document.createElement("option");
  const span = document.createElement("span");
  span.textContent = "Add new project";
  addProject.appendChild(span);
  dropdown.appendChild(addProject);
  projectDiv?.replaceChildren(label,dropdown);
}

export function selectProject(id: number) {
  setTypedItem("currentProject", id);
  updateDisplay();
}

// make add project button work

function addProject() {
  let title: string | null = null;
  while (!title) {
    title = prompt("Name your new project: ","Another Project");
  }
  setTypedItem("projects",getProjects().concat({id: Date.now(),title})); 
  updateDisplay();
}

const button = document.querySelector<HTMLButtonElement>(".new-project");
button?.addEventListener("click", () => addProject)

