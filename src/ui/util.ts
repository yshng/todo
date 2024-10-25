export function getElementByID(id: number) {
  return document.querySelector(`[id$=${CSS.escape(id.toString())}]`);
}