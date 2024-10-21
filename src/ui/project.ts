import { getProjects, getCurrentProject, getToDos } from "../model/storage";
import { addProject, selectProject } from "../model/project";

export function populateProjects(): HTMLDivElement {
  const projectDiv = document.createElement("div");
  projectDiv.setAttribute("id", "projects");

  for (let { id, title } of getProjects()) {
    const h1 = document.createElement("h1");
    h1.classList.add("project");
    if (id == -1) {
      h1.textContent = "View all";
    } else {
      h1.textContent = title;
    }
    h1.setAttribute("id", `p${id}`);
    if (id == getCurrentProject()) {
      h1.classList.add("current-project");
    }

    // show number of todos in each project, or total number for default
    const badge = document.createElement("span");
    if (id == -1) {
      badge.textContent = getToDos().length.toString();
    } else {
      badge.textContent = getToDos()
        .filter((todo) => todo.projectID == id)
        .length.toString();
    }
    badge.classList.add("project-badge");
    h1.addEventListener("click", () => selectProject(id));

    h1.prepend(badge);
    projectDiv.appendChild(h1);
  }
  return projectDiv;
}

export function createProjectDropdown(itemID?: number) {
  const projectDiv = document.createElement("div");
  projectDiv.setAttribute("id","project-select-div");
  const dropdown = document.createElement("select");
  dropdown.setAttribute("id", "project-dropdown");

  for (let { id, title } of getProjects()) {
    const opt = document.createElement("option");
    opt.setAttribute("value", id.toString());
    opt.textContent = title;

    // text for default project option
    if (id == -1) {
      opt.textContent = "(no project)";
    }

    // if given an existing item, pre-select its project
    if (id == itemID) {
      opt.setAttribute("selected","true");
    }

    // if in a project view already, pre-select that project name
    if (getCurrentProject() !== -1 && getCurrentProject() == id) {
      opt.setAttribute("selected","true");
    }

    dropdown.appendChild(opt);
  }

  projectDiv.append(dropdown);
  return projectDiv;
}

// make add project button work
const button = document.querySelector<HTMLButtonElement>(".new-project");
button?.addEventListener("click", () => makeProjectInput());

function makeProjectInput() {
  const projectDiv = document.querySelector("#projects");
  const form = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("button");
  button.setAttribute("type","submit");
  form.addEventListener( "submit", () => {addProject(input.value)});
  form.append(input,button);
  projectDiv?.append(form);
  input.focus();
}