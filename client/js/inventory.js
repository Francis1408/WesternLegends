import { getItemData } from "./utils";

export function calcInventorySlots(inv, rows) {
  const caseOwned  = rows.find(r => r.item_id === inv.case_id);
  const horseOwned = rows.find(r => r.item_id === inv.horse_id);

  const caseItem  = getItemData(inv.case_id);
  const horseItem = getItemData(inv.horse_id);

  const caseSlots  = caseItem?.slots?.[caseOwned?.level - 1] ?? 10;
  const horseSlots = horseItem?.stats?.slots                  ?? 0;

  return caseSlots + horseSlots;
}

export function buildInventory(inv, rows) {
  const totalSlots = calcInventorySlots(inv, rows);

  // Special slot items are excluded from the bag
  const specialIds = [inv.case_id, inv.horse_id, inv.weapon_id].filter(Boolean);
  const bagRows    = rows.filter(r => !specialIds.includes(r.item_id));
  const usedSlots  = bagRows.reduce((sum, r) => sum + r.quantity, 0);

  const findOwned  = (id) => rows.find(r => r.item_id === id);
  const weaponOwned = inv.weapon_id ? findOwned(inv.weapon_id) : null;

  return {
    totalSlots,
    usedSlots,
    freeSlots: totalSlots - usedSlots,
    specialSlots: {
      case:   { ...getItemData(inv.case_id),  level: findOwned(inv.case_id)?.level  ?? 1 },
      horse:  { ...getItemData(inv.horse_id), level: findOwned(inv.horse_id)?.level ?? 1 },
      weapon: weaponOwned
        ? { ...getItemData(inv.weapon_id), level: weaponOwned.level }
        : null
    },
    items: bagRows.map(r => ({
      ...getItemData(r.item_id),
      quantity: r.quantity,
      level:    r.level
    }))
  };
}