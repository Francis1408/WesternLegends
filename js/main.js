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
const camera_pos = [saloon.camera_pos.x, saloon.camera_pos.y, saloon.camera_pos.z]
const camera_target = [saloon.camera_target.x, saloon.camera_target.y, saloon.camera_pos.z]

const camera = buildCameraSetup(camera_pos, camera_target);

// Initialize components
const postFX = new PostProcessing(renderer, scene, camera);
const highlightableMeshes = [];
const raycaster = new Raycaster(canvas, camera, postFX.outlinePass, highlightableMeshes);

const controls = setupControls(camera)

setupLights(scene);
setupGUI(camera, controls);
loadModel(scene).then(meshes => highlightableMeshes.push(...meshes))

camera.position.z = 5


// Rendering loop
renderer.setAnimationLoop(() => {
  raycaster.update();
  postFX.render();
  controls.update()
})


// ------------ EVENTS ----------------
window.addEventListener('resize', () => {

  resizeRenderer(postFX, camera);

});


