const priorities = ["Very High","High","Normal","Low","Very Low"] as const;

export function createPriority(priority: number | undefined): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("priority-div");
  if (priority != undefined) {  
    const body = document.createElement("p");
    body.classList.add("priority");
    if (priority != undefined) body.textContent = priorities[priority-1] + " priority";
    container.append (
      body
    );  
  }
  return container;
}