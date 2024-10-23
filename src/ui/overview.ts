import { createElement } from "./createElement";
import { getProjects, getToDos } from "../model/storage";
import { selectProject } from "../model/project";
import { selectToDo } from "../model/todo";
import { updateDisplay } from "..";

function enableOverviewButton() {
  const overviewButton = document.querySelector("#overview-button");
  overviewButton?.addEventListener("click",() => toggleOverview());
}

enableOverviewButton();
function toggleOverview() {
  const overview = document.querySelector("#overview");
  if (overview) updateDisplay();
  else {
    const main = document.querySelector("main");
    main?.replaceChildren(populateOverview());
  }
}

export function populateOverview() {

  const container = createElement({type: "div",id: "overview"});
  const projects = getProjects();

  for (let project of projects) {
    if (project.id != -1) {
    const h1 = createElement({type: "h1", classes: "overview-project-title"})
    const link = createElement({
      type: "a",
      text: project.title,
      classes: "overview-link",
      attr: [["href","#"]]
    });
    link.addEventListener("click", () => selectProject(project.id))
    h1.appendChild(link);
    container.appendChild(h1);

    const list = createElement({type: "ul", classes: "overview-list"});
    let todos = getToDos().filter( (todo) => todo.projectID == project.id);
    for (let todo of todos) {
      const li = createElement({type: "li",classes: "overview-list-item"})
      const link = createElement({
        type: "a",
        text: todo.title,
        classes: "overview-link",
        attr: [["href",`#`]]
      })
      link.addEventListener("click",() => selectToDo(todo.created));
      li.appendChild(link);
      list.appendChild(li);
    }
    container.appendChild(list);
  }}
    return container;
}