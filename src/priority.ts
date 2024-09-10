const priorities = ["Very High","High","Normal","Low","Very Low"] as const;
type priorities = typeof priorities[number];

export function createPriority(priority: number | undefined): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("priority-div");
  if (priority != undefined) {
    const priorityHead = document.createElement("p");
    priorityHead.classList.add("priority-head");
    priorityHead.textContent = "Priority: ";
    const body = document.createElement("p");
    body.classList.add("priority");
    if (priority != undefined) body.textContent = priorities[priority-1];
    container.append (
      priorityHead,
      body
    );  
  }
  return container;
}