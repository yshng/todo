import { getToDos, setTypedItem } from "./storage";

export class ToDo {
  title: string;
  dueDate?: Date;
  priority: number; // from 0 to 4, 4 being most important
  notes: string;
  //checklist?: string[];
  status: number;
  timescale: number; 
  created: Date;
  projectID: number; 

  constructor(title: string,dueDate: Date | undefined,priority: number,notes: string, timescale: number, project: number) {
    this.title = title,
    this.dueDate = dueDate,
    this.priority = priority,
    this.notes = notes,
    this.timescale = timescale,
    this.status = 0,
    this.created = new Date();
    this.projectID = project;
  }

  update<K extends keyof ToDo, V extends ToDo[K]>(key: K,value: V): ToDo {
    return {...this,[key]: value}
  }
}

export function addToDo(todo: ToDo) {
  setTypedItem("todos",getToDos().concat(todo));
}