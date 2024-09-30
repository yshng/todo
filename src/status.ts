import { currentState } from ".";
import {ToDo} from "./todo";

const statuses = ["not yet started", "started", "paused", "done"];

export function createStatus(state: number): HTMLParagraphElement {
  const status = document.createElement("p");
  status.textContent = statuses[state];
  status.classList.add("status");
  return status;
}

export function createStatusButtons(todo: ToDo): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("status-button-div");
  if(todo.status == 0 || 2) {
    container.append(playButton(),checkButton(),trashButton());
  } else if (todo.status == 3) {
    container.append(completedButton())
  } else if (todo.status == 1) {
    container.append(pauseButton(), checkButton(), trashButton());
  }
  return container;
}

function playButton(): HTMLButtonElement {
  const play = document.createElement("button");
  play.classList.add("status-button","play-button");
  return play;
}

function pauseButton(): HTMLButtonElement {
  const check = document.createElement("button");
  check.classList.add("status-button","check-button");
  return check;
}

function checkButton(): HTMLButtonElement {
  const check = document.createElement("button");
  check.classList.add("status-button","check-button");
  return check;
}

function trashButton(): HTMLButtonElement {
  const trash = document.createElement("button");
  trash.classList.add("status-button","trash-button");
  return trash;
}

function completedButton(): HTMLButtonElement {
  const completed = document.createElement("button");
  completed.classList.add("status-button","completed-button");
  return completed;
}