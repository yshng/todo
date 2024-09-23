import './card.css';
import './layout.css';
import './dialog.css';
import {ToDo} from './todo';
import './dialog';
import './project';
import {createCard} from './card'
import { Project } from './project';
import { set } from 'date-fns';

const sample1 = new ToDo(
  "Sample Task",
  new Date(2025,12,1),
  2,
  "Here are some notes",
  1
);

const sample2 = new ToDo(
  "Another Sample Task",
  new Date(2025,12,1),
  3,
  "Here are some notes. Even more notes.",
  2
);

export let master: Project[] = [];
export let currentProject = 0;

const firstProj = new Project("To Do List",[]);
const project1 = new Project("project1",[]);
const project2 = new Project("project2",[]);

master.push(firstProj);
master.push(project1);
master.push(project2);




updateDisplay();

export function updateDisplay() {
  const main = document.querySelector<HTMLDivElement>("main");
  const content = document.createElement("div");
  content.setAttribute("id","content");
  content.append(createCards());
  main?.replaceChildren(createProjects(),content);
}

function createProjects(): HTMLDivElement {
  const projectDiv = document.createElement("div");
  projectDiv.setAttribute("id","projects");  
  for (let i = 0; i < master.length; i++) {
    const h1 = document.createElement("h1");
    h1.textContent = master[i].title;
    //if (i == master.currentProject) {h1.classList.add("inview")};
    h1.classList.add("project");
    projectDiv.appendChild(h1);
  }
  return projectDiv;
}

function createCards(): HTMLDivElement {
  const cardHolder = document.createElement("div");
  cardHolder.setAttribute("id","content");
  master.map(proj => {
  if (proj.items?.length) {
    for (let todo of proj.items){
      const card = createCard(todo);
      cardHolder.append(card);
    }
  }})
  return cardHolder;
}
