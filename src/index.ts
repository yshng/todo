import "./styles/button.css";
import "./styles/card.css";
import "./styles/delete-message.css";
import "./styles/edit-card.css";
import "./styles/layout.css";
import "./styles/projects.css";
import "./styles/overview.css";
import "./ui/new-item-button";
import "./ui/overview";
import { checkStorage } from "./model/storage";
import { populateProjects } from "./ui/project";
import { populateContent } from "./ui/content";
import { createElement } from "./ui/createElement";

checkStorage();
updateDisplay();

export function getElementByID(id: number) {
  return document.querySelector(`[id$=${CSS.escape(id.toString())}]`);
}

export function updateDisplay(position?: number) {
  const main = document.querySelector<HTMLDivElement>("main");

  const overview = document.querySelector<HTMLDivElement>("#overview");
  if (overview != null) overview.remove();

  const projects = document.querySelector<HTMLDivElement>("#projects");
  if (projects != null) {projects.remove()};
  main?.appendChild(populateProjects());

  const content = document.querySelector<HTMLDivElement>("#content");
  if (content != null) {content.remove();}
  main?.appendChild(populateContent());

  if (position != undefined) {
    let element = getElementByID(position);
    if (element) element.scrollIntoView({ block: "center" });
  }
}

function addOverlays() {
  const overTop = document.querySelector(".overlay-top");
  if (!overTop) createElement({
    type: "div",
    classes: "overlay-"
  })
}