import { updateToDo, ToDo, removeToDo } from "../model/todo";
import { updateDisplay } from "..";

export type Status = "not yet started" | "started" | "paused" | "done";

// display status

export function createStatus(state: Status): HTMLParagraphElement {
  const status = document.createElement("p");
  status.textContent = state;
  status.classList.add("status");
  return status;
}

// logic
function changeStatus(id: number, status: Status) {
  updateToDo(id, "status", status);
  updateDisplay(id);
}

// status buttons
function makeStatusButton(id: number, className: string, state: Status){
  const button = document.createElement("button");
  button.classList.add("status-button", className);
  button.addEventListener("click", () => changeStatus(id,state));
  return button;
}

function playButton(id: number) { 
  return makeStatusButton(id, "play-button","started"); 
}

function pauseButton(id: number) { 
  return makeStatusButton(id, "pause-button","paused"); 
}

function checkButton(id: number) { 
  return makeStatusButton(id, "check-button","done"); 
}

function completedButton(id: number) { 
  return makeStatusButton(id, "completed-button","not yet started"); 
}

// edit and trash buttons

function editButton(id: number): HTMLButtonElement {
  const edit = document.createElement("button");
  edit.classList.add("status-button","edit-button");
  // edit.addEventListener("click", () => toggleEdit());
  return edit;
}

export function trashButton(id: number): HTMLButtonElement {
  const trash = document.createElement("button");
  trash.classList.add("status-button", "trash-button");
  trash.addEventListener("click", () => {
    removeToDo(id);
    updateDisplay();
  });
  return trash;
}

// put the buttons on the card
export function createStatusButtons(todo: ToDo): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("status-button-div");
  if (todo.status == "not yet started" || todo.status == "paused") {
    container.append(
      playButton(todo.created),
      checkButton(todo.created)
    );
  } else if (todo.status == "started") {
    container.append(
      pauseButton(todo.created),  
      checkButton(todo.created)
    );
  } else if (todo.status == "done") {
    container.append(completedButton(todo.created));
  }
  container.append(editButton(todo.created), trashButton(todo.created));
  return container;
}