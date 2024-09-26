import { State, updateDisplay } from ".";

export class Projects extends Map<string,string> { 
  static #counter = 0;

  addProject(state: State, title: string): State {
    let id = Projects.#counter.toString().padStart(5,'0');
    Projects.#counter++;
    let projectsAmended = new Projects(state.projects).set(id,title);
    return {...structuredClone(state), projects: projectsAmended};
  }
}

export function addProjectDropdown(state: State) {
  const projectDiv = document.querySelector("#project-dropdown");
  const head = document.createElement("p");
  head.classList.add("project-head");
  head.textContent = "Project";
  const dropdown = document.createElement("select");
  dropdown.classList.add("project-dropdown");
  for (let [key,value] of state.projects.entries()) {
    const opt = document.createElement("option");
    opt.setAttribute("value",key);
    opt.textContent = value;
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

export function addProjectButtons(state: State) {
  const buttons = document.querySelectorAll(".new-project");
  buttons.forEach( (button) => {
  button.addEventListener("click", () => {
    let title = prompt("Name your new project: ","Another Project");
    if (title) state = state.projects.addProject(state, title);
    updateDisplay(state);
    })
  })}

export function selectProject(state: State) {}