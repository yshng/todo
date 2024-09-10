const statuses = ["done", "started", "not started", "paused"];

export function createStatus(state: number): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("status-div");
  const head = document.createElement("p");
  head.classList.add("status-head");
  head.textContent = "Status: ";

  const status = document.createElement("select");
  status.classList.add("status");
  status.textContent = statuses[state];
  for (let st of statuses) {
    const option = document.createElement("option");
    if (st == statuses[state]) {
      option.setAttribute("selected","");
    }
    option.textContent = st;
    status.appendChild(option);
  }
  container.append (head, status);
  return container;
}