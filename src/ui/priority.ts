const priorities = ["Very high", "High", "Normal", "Low", "Very Low"] as const;

export function createPriority(priority: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("priority-div");
  const body = document.createElement("p");
  body.classList.add("priority");
  body.textContent = priorities[priority] + " priority";
  container.append(body);
  return container;
}

export function createPriorityDropdown(priority?: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("priority-div");
  const dropdown = document.createElement("select");
  dropdown.setAttribute("id","priority-dropdown")
  for (let i = 0; i < priorities.length; i++) {
    const opt = document.createElement("option");
    opt.textContent = priorities[i] + " priority";
    opt.value = i.toString();
    if (i == priority) {
      opt.selected = true;
    }
    dropdown.appendChild(opt);
  }
  container.append(dropdown);
  return container;
}
