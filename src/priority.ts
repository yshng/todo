const priorities = ["Very High", "High", "Normal", "Low", "Very Low"] as const;

export function createPriority(priority: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("priority-div");
  const body = document.createElement("p");
  body.classList.add("priority");
  body.textContent = priorities[priority] + " priority";
  container.append(body);
  return container;
}
