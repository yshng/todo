import { getProjects, getCurrentProject, getCompleted, getIncomplete} from "../model/storage";
import { addProject, selectProject } from "../model/project";
import { createElement } from "./createElement";

export function populateProjects(): HTMLDivElement {
  const projectDiv = document.createElement("div");
  projectDiv.setAttribute("id", "projects");

  projectDiv.append(createDefaultProject());
  for (let { id, title } of getProjects()) {
    if (id > 0) {
      const selector = createProjectSelector(id, title);
      selector.prepend(createProjectBadge(id));
      projectDiv.append(selector);
    }
  }

  if (getCompleted().length > 0) {
    projectDiv.append(createCompletedProject());
  }
  return projectDiv;
}

function createDefaultProject() {
  let selector = createProjectSelector(-1, "All tasks");
  const badge = createElement({
    type: "span",
    text: getIncomplete().length.toString(),
    classes: "project-badge"
  })
  selector.prepend(badge);
  selector.addEventListener("click", () => selectProject(-1))
  return selector;
}

function createProjectSelector(id: number, title: string) {
  const project = createElement({
    type: "h1",
    classes: "project",
    text: title,
    id: `p${id}`
  })

  if (id == getCurrentProject()) {
    project.classList.add("current-project");
  }
  project.addEventListener("click", () => selectProject(id));
  return project;
}

function createProjectBadge(id: number) {
  const badge = createElement({
    type: "span",
    text: getIncomplete()
      .filter((todo) => todo.projectID == id)
      .length.toString(),
    classes: "project-badge"
  })
  return badge;
}

function createCompletedProject() {
  const selector = createProjectSelector(-2,"Completed");
  const badge = createElement({
    type: "span",
    text: getCompleted().length.toString(),
    classes: "project-badge"
  })
  selector.prepend(badge);
  selector.addEventListener("click", () => selectProject(-2));
  return selector;
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
const button = document.querySelector<HTMLButtonElement>("#new-project");
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