interface customElement {
  type: string;
  id?: string;
  classes?: string; // "class1 class2"
  attr?: string; // "att1,target;att2,false"
  text?: string;
}

export function createElement(el: customElement) {
  const element = document.createElement(el.type);
  if (el.classes) {
    const arr = el.classes.split(" ");
    element.classList.add(...arr);
  }
  if (el.id) element.setAttribute("id", el.id);
  if (el.attr) {
    const ats = el.attr.split(";");
    for (let at of ats) {
      const a = at.split(",");
      element.setAttribute(a[0], a[1]);
    }
  }
  if (el.text) element.textContent = el.text;
  return element;
}