import {scene, renderer, canvas, resizeRenderer, buildCameraSetup, container} from './scene.js'
import { setupLights } from './lights.js'
import { PostProcessing } from './PostProcessing.js'
import { Raycaster } from './Raycaster.js';
import { loadModel } from './loader.js'
import { setupGUI } from './gui.js' 
import { CameraManager } from './cameraManager.js'

// Mocked data
import {scenarios_data} from '../MockedData/scenarioData.js'

// Load cameras
const cameraManager = new CameraManager(scenarios_data[0]);

// Initialize components
const postFX = new PostProcessing(renderer, scene, cameraManager.camera);
const highlightableMeshes = [];
const raycaster = new Raycaster(canvas, cameraManager.camera, postFX.outlinePass, highlightableMeshes);

setupLights(scene);
setupGUI(cameraManager.camera, cameraManager.controls);
loadModel(scene).then(meshes => highlightableMeshes.push(...meshes))


// Rendering loop
renderer.setAnimationLoop(() => {
  raycaster.update();
  postFX.render();
  cameraManager.controls.update()
})


// ------------ EVENTS ----------------
window.addEventListener('resize', () => {

    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    cameraManager.resize(w, h);
    postFX.resize(w, h);

});


