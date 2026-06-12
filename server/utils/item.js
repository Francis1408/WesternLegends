import { items_data } from "../data/items.js";


export function getItemData(id) {

  return items_data.find(i => i.id === id) ?? null;
}
