const timescales = [
  "Less than 5 minutes",
  "Less than an hour",
  "Several hours",
  "A day",
  "Several days"
];

export function createTimescale(index: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("timescale-div");
  const timescale = document.createElement("p");
  timescale.classList.add("timescale");
  timescale.textContent = "Should take " + timescales[index];

  container.append(timescale);
  return container;
}

export function createTimescaleDropdown(index?: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("timescale-div");
  const label = document.createElement("label");
  label.setAttribute("for","timescale-dropdown");
  label.textContent = "How long should this take?"
  const timescale = document.createElement("select");
  timescale.setAttribute("id","timescale-dropdown");
  for (let i = 0; i < timescales.length; i++) {
    const opt = document.createElement("option");
    opt.value = i.toString();
    opt.textContent = timescales[i];
    if (i == index) {
      opt.selected = true;
    }
    timescale.appendChild(opt);
  }
  container.append(label, timescale);
  return container;
}