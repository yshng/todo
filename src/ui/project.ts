import { getProjects } from "../model/storage";
import { addProject } from "../model/project";

export function createProjectDropdown(id?: number) {
  const projectDiv = document.createElement("div");
  projectDiv.setAttribute("id","project-select-div");
  const dropdown = document.createElement("select");
  dropdown.setAttribute("id", "project-dropdown");

  for (let { id, title } of getProjects()) {
    const opt = document.createElement("option");
    opt.setAttribute("value", id.toString());
    opt.textContent = title;
    if (id == -1) {
      opt.textContent = "(no project)";
    }
    dropdown.appendChild(opt);
  }
  projectDiv.append(dropdown);
  return projectDiv;
}

// make add project button work
const button = document.querySelector<HTMLButtonElement>(".new-project");
button?.addEventListener("click", () => addProject());