import { State, updateDisplay } from ".";

export class Project {
  #counter = 0;
  title: string;
  ID: string;

  constructor(title: string) {
    this.title = title;
    let id = this.#counter.toString().padStart(5,'0');
    this.ID = `project${id}`;
    this.#counter++;
  }
}

export function addProjectDropdown(state: State) {
  const projectDiv = document.querySelector("#project-dropdown");
  const head = document.createElement("p");
  head.classList.add("project-head");
  head.textContent = "Project";
  const dropdown = document.createElement("select");
  dropdown.classList.add("project-dropdown");
  for (let {title, ID} of state.projects) {
    const opt = document.createElement("option");
    opt.setAttribute("value",ID);
    opt.textContent = title;
    dropdown.appendChild(opt);
  }
  const addProject = document.createElement("option");
  const span = document.createElement("span");
  span.classList.add("new-project");
  span.textContent = "Add new project";
  addProject.appendChild(span);
  dropdown.appendChild(addProject);
  projectDiv?.replaceChildren(head,dropdown);
}

export function addProject(state: State, title: string): State {
  let project = new Project(title);
  let amended = state.projects.concat(project);
  return {...structuredClone(state),projects: amended};
}

export function addProjectButtons(state: State) {
  const buttons = document.querySelectorAll(".new-project");
  buttons.forEach( (button) => {
  button.addEventListener("click", () => {
    let title = prompt("Name your new project: ","Another Project");
    if (title) state = addProject(state, title);
    updateDisplay(state);
    })
  })}
