import {scene, camera, renderer, canvas, resizeRenderer} from './scene.js'
import { setupLights } from './lights.js'
import { PostProcessing } from './PostProcessing.js'
import { Raycaster } from './Raycaster.js';
import { loadModel } from './loader.js'
import { setupControls } from './controls.js'
import { setupGUI } from './gui.js' 


// Initialize components
const postFX = new PostProcessing(renderer, scene, camera);
const highlightableMeshes = [];
const raycaster = new Raycaster(canvas, camera, postFX.outlinePass, highlightableMeshes);

const controls = setupControls()

setupLights(scene);
setupGUI(camera, controls);
loadModel(scene).then(meshes => highlightableMeshes.push(...meshes))



// Rendering loop
renderer.setAnimationLoop(() => {
  raycaster.update();
  postFX.render();
  controls.update()
})

// ------------ EVENTS ----------------
window.addEventListener('resize', () => {

  resizeRenderer(postFX);

});

