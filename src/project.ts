import { todos } from ".";

export function getProjects(): string[] {
  let projects: string[] = [];
  for (let {project} of todos) {
    if (!projects.includes(project)) {
      projects.push(project);
    }
  }
  return projects;
}