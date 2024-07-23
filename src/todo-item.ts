export interface ToDo {
  title: string;
  description: string;
  dueDate: Date | undefined;
  priority: number; // from 1 to 5, 5 being most important
  notes: string;
  checklist: ToDo[];
}

export interface Project {
  title: string;
  description: string;
  items: ToDo[];
}

const defaultProject: Project = {
  title: "",
  description: "",
  items: []
} 

export const projects: Project[] = [defaultProject];
export let currentProject = projects[0];

function createItem(): ToDo {
  const newItem: ToDo = {
    title: "",
    description: "",
    dueDate: undefined,
    priority: 3,
    notes: "",
    checklist: [] 
  }
  return newItem;
}

const newItemBtn = document.querySelector("#new-item") as HTMLElement;
newItemBtn?.addEventListener("click", () => {
  const newItem = createItem();
  currentProject.items.push(newItem);
});