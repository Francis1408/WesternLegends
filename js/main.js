import {scene, renderer, canvas, container} from './scene.js'
import { setupLights } from './lights.js'
import { PostProcessing } from './PostProcessing.js'
import { Raycaster } from './Raycaster.js';
import { loadModel } from './loader.js'
import { setupGUI } from './gui.js' 
import { CameraManager } from './cameraManager.js'
import { setupEvents } from './events.js';
import { SceneManager } from './sceneManager.js';

import {scenarios_data} from '../MockedData/scenarioData.js'

/*
MODULES DYNAMIC

Scene Manager: Retains the scene properties such as the current scene model on canvas 
and the stack that informs how deep the user is inside the models three (inside buildings inside a town)

Camara Manager: Retains all the cameras infos which are available in the scene. Each camera has an id and
a dict of positional properties

Raycaster: Algorithm that returns the meshes name which the mouse pointer is on

Envents: HUD events


*/ 

// Core modules
const sceneManager = new SceneManager();
const cameraManager = new CameraManager(scenarios_data[0]);
const postFX = new PostProcessing(renderer, scene, cameraManager.camera);
const raycaster = new Raycaster(canvas, cameraManager.camera, postFX.outlinePass);

// Initial load
sceneManager.load(scenarios_data[0]).then(meshes => {
  raycaster.loadMeshes(meshes);
})


// GUI
const gui = setupGUI(cameraManager.camera, cameraManager.controls);


// Subscribers
sceneManager.subscribe((scenarioData) => {
  cameraManager.loadScenario(scenarioData);
  raycaster.clearMeshes();
  raycaster.clearHighlithNames();
  raycaster.loadHighlightNames(scenarioData);
})

raycaster.onMeshClick((meshName) => {
  cameraManager.switchCamera(meshName);
})

cameraManager.subscribe((cam) => {
  raycaster.updateCamera(cam);
});

cameraManager.subscribe((cam) => {
  postFX.updateCamera(cam);
});

cameraManager.subscribe((cam, id) => {
  sceneManager.setFocused(id);
})

cameraManager.subscribe((cam, id) => {
  gui.update(cam, cameraManager.controls);
})

// Setup
setupLights(scene);
setupEvents(container, cameraManager, sceneManager, raycaster, postFX);

// Rendering loop
renderer.setAnimationLoop(() => {
  raycaster.update();
  postFX.render();
  // cameraManager.controls.update();
})






