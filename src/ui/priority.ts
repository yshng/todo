import { createElement } from "./createElement";

const priorities = ["Important", "Normal priority", "Low priority"];

function createPriorityDiv() {
  return createElement({
    type: "div",
    classes: "priority-div"
  })
}

export function createPriority(priority: number) {
  const div = createPriorityDiv();
  div.append(createElement({
    type: "p",
    classes: "priority",
    text: priorities[priority]
  }))
  return div;
}

export function createPriorityDropdown(priority?: number){
  const container = createPriorityDiv();
  const dropdown = document.createElement("select");
  dropdown.setAttribute("id","priority-dropdown")
  for (let i = 0; i < priorities.length; i++) {
    const opt = document.createElement("option");
    opt.textContent = priorities[i];
    opt.value = i.toString();
    if (i == priority) {
      opt.selected = true;
    }
    dropdown.appendChild(opt);
  }
  container.append(dropdown);
  return container;
}
