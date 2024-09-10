const statuses = ["done", "started", "not started", "paused"] as const;
type Status = typeof statuses[number];


export function createStatus(state: Status): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("status-div");
  const head = document.createElement("p");
  head.classList.add("status-head");
  head.textContent = "Status: ";

  const status = document.createElement("select");
  status.classList.add("status");
  status.textContent = state;
  const statuses: Status[] = ["not started", "started", "paused", "done"];
  for (let st of statuses) {
    const option = document.createElement("option");
    if (st == state) {
      option.setAttribute("selected","");
    }
    option.textContent = st;
    status.appendChild(option);
  }
  container.append (head, status);
  return container;
}