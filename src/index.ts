import "./styles/button.css";
import "./styles/card.css";
import "./styles/delete-message.css";
import "./styles/edit-card.css";
import "./styles/layout.css";
import "./styles/projects.css"
import "./ui/new-item-button";
import { checkStorage } from "./model/storage";
import { populateProjects } from "./ui/project";
import { populateContent } from "./ui/content";

checkStorage();
updateDisplay();

export function getElementByID(id: number) {
  return document.querySelector(`[id$=${CSS.escape(id.toString())}]`);
}

export function updateDisplay(position?: number) {
  const main = document.querySelector<HTMLDivElement>("main");
  const projects = document.querySelector<HTMLDivElement>("#projects");
  const content = document.querySelector<HTMLDivElement>("#content");
  if (projects) main?.replaceChild(populateProjects(), projects);
  if (content) main?.replaceChild(populateContent(), content);
  if (position != undefined) {
    let element = getElementByID(position);
    if (element)
      element.scrollIntoView({ block: "center" });
  }
}