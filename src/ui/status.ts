import { Status, changeStatus } from "../model/status";

// display status

export function createStatus(state: Status): HTMLParagraphElement {
  const status = document.createElement("p");
  status.textContent = state;
  status.classList.add("status");
  return status;
}

// status buttons
function makeStatusButton(id: number, className: string, state: Status) {
  const button = document.createElement("button");
  button.classList.add("status-button", className);
  button.addEventListener("click", () => changeStatus(id, state));
  return button;
}

export function playButton(id: number) {
  return makeStatusButton(id, "play-button", "started");
}

export function pauseButton(id: number) {
  return makeStatusButton(id, "pause-button", "paused");
}

export function checkButton(id: number) {
  return makeStatusButton(id, "check-button", "done");
}

export function completedButton(id: number) {
  return makeStatusButton(id, "completed-button", "not yet started");
}
