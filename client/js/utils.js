import { chacracters_data } from "../MockedData/characters";

// Pick characters data based on id and return the correct models
export function getCharacterData(paths, id, type) {

    const char = characters_data.find(c => c.id === id);
    if (!char) return null;

    // Build the relative paths
    const drawingUrl = paths.drawings + char.baseDrawing + paths.drawings.ext;

    const paddedType = String(type).padStart(2, '0');
    const modelUrl = `${paths.models}${char.baseModelPath}/${char.baseModelPath}_${paddedType}${paths.models.ext}`

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
