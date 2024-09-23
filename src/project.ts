import { ToDo } from "./todo";

export class Project {

title: string;
created: Date;
items?: ToDo[];

constructor(title: string, items?: ToDo[], created?: Date){
  this.title = title;
  this.items = items;
  if (created != undefined) {
    this.created = created;
  } else {
    this.created = new Date();
  }
};

addItem(item: ToDo) {
  let added = [item];
  if (this.items) {added = this.items.concat(added)};
  return new Project(this.title, added, this.created);
}

removeItem(created: Date) {
  let removed: ToDo[] = [];
  if (this.items) {removed = this.items.filter(item => item.created != created)}
  return new Project(this.title, removed, this.created);
}

toString(): string {
  let list: string = "";
  if (this.items)  {
    for (let item of this.items) {
      list += `\n${item.toString()}`;
    }
  } else {
    list = "no items";
  }
  return `${this.title} contains ${list}`;
}
  
}

