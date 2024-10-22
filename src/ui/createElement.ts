interface customElement {
  type: string;
  id?: string;
  classes?: string; 
  attr?: string[][]; // [["att1",target"],["att2","false"]]
  text?: string;
}

export function createElement(el: customElement) {
  const element = document.createElement(el.type);
  if (el.classes) element.classList.add(el.classes);
  if (el.id) element.setAttribute("id",el.id);
  if (el.attr) {
    for (let ats of el.attr) {
      element.setAttribute(ats[0],ats[1]);
    }
  }
  if (el.text) element.textContent = el.text;
  return element;
}