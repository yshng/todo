export class ToDo {
  title: string;
  dueDate: number;
  priority: number; // from 0 to 4, 4 being most important
  notes: string;
  //checklist?: string[];
  status: Status;
  timescale: Timescale; 
  created: number;

  constructor(title: string,dueDate: number,priority: number,notes: string, timescale: Timescale) {
    this.title = title,
    this.dueDate = dueDate,
    this.priority = priority,
    this.notes = notes,
    this.timescale = timescale,
    this.status = "not started",
    this.created = Date.now();
  }

  update<K extends keyof ToDo, V extends ToDo[K]>(key: K,value: V): ToDo {
    return {...this,[key]: value}
  }
}

export type Status = "done" | "started" | "not started" | "paused";
export type Timescale = "less-5-min" | "less-hour" | "hours" | "days" | "weeks" | "months" | "years";