import { API_URL } from "../config";

let _items     = [];
let _scenarios = [];
let _characters = [];
let _distances = [];
let _buildings = [];

export async function initGameData() {
  try {
    const [items, scenarios, characters, distances, buildings] = await Promise.all([
      fetch(`${API_URL}/data/items`).then(r => { if (!r.ok) throw new Error(`items ${r.status}`); return r.json(); }),
      fetch(`${API_URL}/data/scenarios`).then(r => { if (!r.ok) throw new Error(`scenarios ${r.status}`); return r.json(); }),
      fetch(`${API_URL}/data/characters`).then(r => { if (!r.ok) throw new Error(`characters ${r.status}`); return r.json(); }),
      fetch(`${API_URL}/data/distances`).then(r => { if (!r.ok) throw new Error(`distances ${r.status}`); return r.json(); }),
      fetch(`${API_URL}/data/buildings`).then(r => { if (!r.ok) throw new Error(`buildings ${r.status}`); return r.json(); })
    ]);

    _items      = items;
    _scenarios  = scenarios;
    _characters = characters;
    _distances  = distances;
    _buildings = buildings;

    console.log('Game data loaded:', {
      items:      _items.length,
      scenarios:  _scenarios.length,
      characters: _characters.length,
      distances:  _distances.length,
      buildings:  _buildings.length,
    });

  } catch (err) {
    console.error('initGameData failed:', err);
  }
}


// ---------- Get data functions ----------------------------
export async function getCharacterData(paths, id, type=1) {

    const char = _characters.find(c => c.id === id);
    if (!char) return null;

    // Build the relative paths
    const drawingUrl = paths.drawings.base + char.baseDrawing + paths.drawings.ext;

    const paddedType = String(type).padStart(2, '0');
    const modelUrl = `${paths.models.base}${char.baseModelPath}/${char.baseModelPath}_${paddedType}${paths.models.ext}`

    console.log(modelUrl)

    return {
        name: char.name,
        drawingUrl: (await pathExists(drawingUrl)) ? drawingUrl : null,
        modelUrl:   (await pathExists(modelUrl))   ? modelUrl   : null,
    };

}


export function getScenarioDatabyId(id) {

  return _scenarios[id] ?? null;
}

export function getScenarioData() {
  return _scenarios;
}

export function getItemData(id) {

  return _items.find(i => i.id === id) ?? null;
}

export function getBuildingData(id) {

  return _buildings.find(i => i.id === id) ?? null;
}

export function getDistances() {
  return _distances;
}


// Check if content exists
async function pathExists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}
