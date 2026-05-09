import {scene, renderer, canvas, resizeRenderer, buildCameraSetup} from './scene.js'
import { setupLights } from './lights.js'
import { PostProcessing } from './PostProcessing.js'
import { Raycaster } from './Raycaster.js';
import { loadModel } from './loader.js'
import { setupControls } from './controls.js'
import { setupGUI } from './gui.js' 

// Mocked data
import {scenarios_data} from '../MockedData/scenarioData.js'

const saloon = scenarios_data[0]
const camera_pos = [saloon.camera.position.x, saloon.camera.position.y, saloon.camera.position.z]
const camera_target = [saloon.camera.target.x, saloon.camera.target.y, saloon.camera.target.z]
const camera_up = [saloon.camera.up.x, saloon.camera.up.y, saloon.camera.up.z,]
const { overviewCamera, controls } = buildCameraSetup(camera_pos, camera_target, camera_up);

// Initialize components
const postFX = new PostProcessing(renderer, scene, overviewCamera);
const highlightableMeshes = [];
const raycaster = new Raycaster(canvas, overviewCamera, postFX.outlinePass, highlightableMeshes);

// controls.addEventListener('change', () => {
//   console.log('position:', camera.position.clone());
//   console.log('target:', controls.target.clone());
//   console.log('up:', camera.up.clone()); // ← log this too
// })

setupControls(controls)
setupLights(scene);
setupGUI(overviewCamera, controls);
loadModel(scene).then(meshes => highlightableMeshes.push(...meshes))


// Rendering loop
renderer.setAnimationLoop(() => {
  raycaster.update();
  postFX.render();
  controls.update()
})


// ------------ EVENTS ----------------
window.addEventListener('resize', () => {

  resizeRenderer(postFX, overviewCamera);

});


