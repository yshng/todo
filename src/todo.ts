export class ToDo {
  title: string;
  dueDate?: Date;
  priority: number; // from 0 to 4, 4 being most important
  notes: string;
  //checklist?: string[];
  status: Status;
  timescale: Timescale; 
  created: Date;

  constructor(title: string,dueDate: Date | undefined,priority: number,notes: string, timescale: Timescale) {
    this.title = title,
    this.dueDate = dueDate,
    this.priority = priority,
    this.notes = notes,
    this.timescale = timescale,
    this.status = "not started",
    this.created = new Date();
  }

  update<K extends keyof ToDo, V extends ToDo[K]>(key: K,value: V): ToDo {
    return {...this,[key]: value}
  }
}

export type Status = "done" | "started" | "not started" | "paused";
export type Timescale = "less-5-min" | "less-hour" | "hours" | "days" | "weeks" | "months" | "years";