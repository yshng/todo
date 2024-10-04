import { updateDisplay } from ".";
import { getProjects, setTypedItem } from "./storage";

export interface Project {
  id: number;
  title: string;
}

// when adding new project, generate unix timestamp key/ID for it
export function addProject(title: string) {
  setTypedItem("projects",getProjects().concat({id: Date.now(),title})); 
}

export function addProjectDropdown() {
  const projectDiv = document.querySelector("#project-select");
  const head = document.createElement("p");
  head.classList.add("project-head");
  head.textContent = "Project";
  const dropdown = document.createElement("select");
  dropdown.classList.add("project-dropdown");

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
  projectDiv?.replaceChildren(head,dropdown);
}

export function selectProject(id: number) {
  setTypedItem("currentProject", id);
  updateDisplay();
}

// make add project button work
const button = document.querySelector<HTMLButtonElement>(".new-project");
button?.addEventListener("click", () => {
  let title: string | null = null;
  while (!title) {
    title = prompt("Name your new project: ","Another Project");
  }
  addProject(title);
  updateDisplay();
})

