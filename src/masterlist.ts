import { Project} from "./project";

class MasterList {
  currentProject: number;
  projects: Project[] = [];

  constructor(currentProject: number, ...projects: Project[]){
    this.currentProject = currentProject;
    this.projects = projects;
  }
  
  updateProject(update: Function) {
    
  //
  }

  // addProject(...item: Project[]) {
  //   let added = [...item];
  //   if (this.projects) {added = this.projects.concat(added)};
  //   return {...this, projects: added};
  // }
  
  // removeProject() {
  //   let removed: Project[] = [];
  //   if (this.projects) {removed = this.projects.slice(0,this.currentProject).concat(this.projects.slice(this.currentProject + 1))}
  //   return {...this, projects: removed};
  // }

  // updateProject() {
    
  // }
} 