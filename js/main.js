import {scene, renderer, canvas, resizeRenderer, buildCameraSetup, container} from './scene.js'
import { setupLights } from './lights.js'
import { PostProcessing } from './PostProcessing.js'
import { Raycaster } from './Raycaster.js';
import { loadModel } from './loader.js'
import { setupGUI } from './gui.js' 
import { CameraManager } from './cameraManager.js'
import { setupEvents } from './events.js';

import {scenarios_data} from '../MockedData/scenarioData.js'

// Core modules
const cameraManager = new CameraManager(scenarios_data[0]);
const postFX = new PostProcessing(renderer, scene, cameraManager.camera);
const raycaster = new Raycaster(canvas, cameraManager.camera, postFX.outlinePass);

// Load data
raycaster.loadHighlightNames(scenarios_data[0])
loadModel(scene, scenarios_data[0]).then(meshes => {
  raycaster.loadMeshes(meshes);
});

// Subscribers
raycaster.onMeshClick((meshName) => {
  cameraManager.switchCamera(meshName);
})

cameraManager.subscribe((cam) => {
  raycaster.updateCamera(cam);
});

cameraManager.subscribe((cam) => {
  postFX.updateCamera(cam);
});

// Setup
setupLights(scene);
setupGUI(cameraManager.camera, cameraManager.controls);
setupEvents(container, cameraManager, postFX);

// Rendering loop
renderer.setAnimationLoop(() => {
  raycaster.update();
  postFX.render();
  cameraManager.controls.update();
})






