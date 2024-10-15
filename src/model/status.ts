import { updateDisplay } from "..";
import { updateToDo } from "./todo";

export type Status = "not yet started" | "started" | "paused" | "done";

export function changeStatus(id: number, status: Status) {
  updateToDo(id, "status", status);
  updateDisplay(id);
}