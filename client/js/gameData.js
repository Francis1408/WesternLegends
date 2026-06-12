// client/js/gameData.js
let _items     = [];
let _scenarios = [];
let _characters = []
let _distances = [];

export async function initGameData() {
  const [items, scenarios, characters, distances] = await Promise.all([
    fetch('/api/data/items').then(r => r.json()),
    fetch('/api/data/scenarios').then(r => r.json()),
    fetch('/api/data/characters').then(r => r.json()),
    fetch('/api/data/distances').then(r => r.json())
  ]);

  _items     = items;
  _scenarios = scenarios;
  _characters = characters;
  _distances = distances;
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


export function getScenarioData(id) {

  return _scenarios.find(s => s.id === id) ?? null;
}

export function getItemData(id) {

  return _items.find(i => i.id === id) ?? null;
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
