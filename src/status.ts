import { updateToDo, ToDo, removeToDo } from "./todo";
import { updateDisplay } from ".";

const statuses = ["not yet started", "started", "paused", "done"];
export type Status = typeof statuses[number];


export function createStatus(state: Status): HTMLParagraphElement {
  const status = document.createElement("p");
  status.textContent = state;
  status.classList.add("status");
  return status;
}

export function createStatusButtons(todo: ToDo): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("status-button-div");
  if (todo.status == "not yet started" || todo.status == "paused") {
    container.append(
      playButton(todo.created),
      checkButton(todo.created),
    );
  } else if (todo.status == "done") {
    container.append(completedButton(todo.created));
  } else if (todo.status == "started") {
    container.append(
      pauseButton(todo.created),
      checkButton(todo.created),
    );
  }
  container.append(editButton(todo.created), trashButton(todo.created));
  return container;
}

function pushStatusButton(id: number, status: Status) {
  updateToDo(id, "status", status);
  updateDisplay(id);
}

function playButton(id: number): HTMLButtonElement {
  const play = document.createElement("button");
  play.classList.add("status-button", "play-button");
  play.addEventListener("click", () => pushStatusButton(id, "started"));
  return play;
}

function pauseButton(id: number): HTMLButtonElement {
  const pause = document.createElement("button");
  pause.classList.add("status-button", "pause-button");
  pause.addEventListener("click", () => pushStatusButton(id, "paused"));
  return pause;
}

function checkButton(id: number): HTMLButtonElement {
  const check = document.createElement("button");
  check.classList.add("status-button", "check-button");
  check.addEventListener("click", () => pushStatusButton(id, "done"));
  return check;
}

function completedButton(id: number): HTMLButtonElement {
  const completed = document.createElement("button");
  completed.classList.add("status-button", "completed-button");
  completed.addEventListener("click", () => pushStatusButton(id, "not yet started"));
  return completed;
}

function editButton(id: number): HTMLButtonElement {
  const edit = document.createElement("button");
  edit.classList.add("status-button","edit-button");
  // edit.addEventListener("click", () => toggleEdit());
  return edit;
}

function trashButton(id: number): HTMLButtonElement {
  const trash = document.createElement("button");
  trash.classList.add("status-button", "trash-button");
  trash.addEventListener("click", () => {
    removeToDo(id);
    updateDisplay();
  });
  return trash;
}
