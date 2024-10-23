import { updateDisplay } from "..";
import { getToDoByID, selectToDo, updateToDo } from "./todo";

export type Status = "not yet started" | "started" | "paused" | "done";

export function changeStatus(id: number, status: Status) {
  updateToDo(id, "status", status);
  if (status == "done") {
    updateDisplay(getToDoByID(id)?.projectID);    
  } else selectToDo(id);
}