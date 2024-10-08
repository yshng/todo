import { updateToDo, ToDo, removeToDo } from "./todo";
import { setTypedItem, getToDos } from "./storage";
import { updateDisplay } from ".";

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
  if (todo.status == 0 || todo.status == 2) {
    container.append(
      playButton(todo.created),
      checkButton(todo.created),
      trashButton(todo.created),
    );
  } else if (todo.status == 3) {
    container.append(completedButton(todo.created), trashButton(todo.created));
  } else if (todo.status == 1) {
    container.append(
      pauseButton(todo.created),
      checkButton(todo.created),
      trashButton(todo.created),
    );
  }
  return container;
}

function pushStatusButton(id: number, status: number) {
  updateToDo(id, "status", status);
  updateDisplay(id);
}

function playButton(id: number): HTMLButtonElement {
  const play = document.createElement("button");
  play.classList.add("status-button", "play-button");
  play.addEventListener("click", () => pushStatusButton(id, 1));
  return play;
}

function pauseButton(id: number): HTMLButtonElement {
  const pause = document.createElement("button");
  pause.classList.add("status-button", "pause-button");
  pause.addEventListener("click", () => pushStatusButton(id, 2));
  return pause;
}

function checkButton(id: number): HTMLButtonElement {
  const check = document.createElement("button");
  check.classList.add("status-button", "check-button");
  check.addEventListener("click", () => pushStatusButton(id, 3));
  return check;
}

function completedButton(id: number): HTMLButtonElement {
  const completed = document.createElement("button");
  completed.classList.add("status-button", "completed-button");
  completed.addEventListener("click", () => pushStatusButton(id, 0));
  return completed;
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
