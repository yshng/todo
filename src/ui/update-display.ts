import { populateProjects } from "./project";
import { populateContent } from "./content";
import { createElement } from "./createElement";
import { getElementByID } from "./util";

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

  if (main) addOverlays(main);
  document.querySelector<HTMLInputElement>("#title-field")?.focus();
}

function addOverlays(main: HTMLDivElement) {
  let overTop = document.querySelector(".overlay-top");
  if (!overTop) {
    overTop = createElement({
      type: "div",
      classes: "overlay-top"
    })
    main.prepend(overTop)
  }

  let overBottom = document.querySelector(".overlay-bottom");
  if (!overBottom) {
    overBottom = createElement({
      type: "div",
      classes: "overlay-bottom"
    })
    main.append(overBottom);
  }
}