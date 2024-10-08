const timescales = [
  "less than 5 minutes",
  "less than an hour",
  "hours",
  "days",
  "weeks",
  "months",
  "years",
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

// for (let scale of timescales) {
//   const option = document.createElement("option");
//   if (scale == timescales[index]) {
//     option.setAttribute("selected","");
//   }
//   option.textContent = scale;
//   timescale.appendChild(option);
// }
