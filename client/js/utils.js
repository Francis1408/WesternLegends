import { characters_data } from "../MockedData/characters";

// Pick characters data based on id and return the correct models
export async function getCharacterData(paths, id, type=1) {

    const char = characters_data.find(c => c.id === id);
    if (!char) return null;

    // Build the relative paths
    const drawingUrl = paths.drawings.base + char.baseDrawing + paths.drawings.ext;

    const paddedType = String(type).padStart(2, '0');
    const modelUrl = `${paths.models.base}${char.baseModelPath}/${char.baseModelPath}_${paddedType}${paths.models.ext}`

    console.log(drawingUrl)

    return {
        name: char.name,
        drawingUrl: (await pathExists(drawingUrl)) ? drawingUrl : null,
        modelUrl:   (await pathExists(modelUrl))   ? modelUrl   : null,
    };

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
