export function createChecklist(array: string[] | undefined): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("checklist-div");

  const head = document.createElement("p");
  head.classList.add("checklist-head");
  head.textContent = "Subtasks";

  const add = document.createElement("button");
  add.classList.add("checklist-add");
  add.textContent = "+";

  container.append(head, add);

  if (array != undefined) {
    const list = document.createElement("ul");
    list.classList.add("checklist");
    array.map((listitem) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("name", listitem);
      const text = document.createTextNode(listitem);
      li.append(checkbox, text);
      list.appendChild(li);
    });
    container.append(list);
  }

  return container;
}
