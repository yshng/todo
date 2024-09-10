const timescales = ["less than 5 minutes", "less than an hour", "hours", "days", "weeks", "months", "years"];

export function createTimescale(index: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("timescale-div");
  const head = document.createElement("p");
  head.classList.add("timescale-head");
  head.textContent = "Timescale: ";

  const timescale = document.createElement("select");
  timescale.classList.add("timescale");
  timescale.textContent = timescales[index];
  for (let scale of timescales) {
    const option = document.createElement("option");
    if (scale == timescales[index]) {
      option.setAttribute("selected","");
    }
    option.textContent = scale;
    timescale.appendChild(option);
  }
  container.append (head, timescale);
  return container;
}