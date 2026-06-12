import {scene, renderer, canvas, container} from './scene.js'
import { Lights } from './lights.js'
import { PostProcessing } from './PostProcessing.js'
import { Raycaster } from './Raycaster.js';
import { setupGUI } from './gui.js' 
import { CameraManager } from './cameraManager.js'
import { setupEvents, setupTabs, setMapHud, overviewBuilder } from './events.js';
import { SceneManager } from './sceneManager.js';
import { Sky } from './skyDome.js';
import { loadRoutes } from './path.js';
import {scenarios_data} from '../MockedData/scenarioData.js'
import { getToken, getPlayer } from './auth.js';
import { getScenarioData } from './utils.js';

/*
MODULES DYNAMIC

Scene Manager: Retains the scene properties such as the current scene model on canvas 
and the stack that informs how deep the user is inside the models three (inside buildings inside a town)

Camara Manager: Retains all the cameras infos which are available in the scene. Each camera has an id and
a dict of positional properties

Raycaster: Algorithm that returns the meshes name which the mouse pointer is on

Envents: HUD events

*/ 

//────────────── AUTH PHASE ───────────────────────── 

// Load routes
const token = getToken();
if (!token) window.location.href = '/auth.html';

// Check if player exists via API
const res  = await fetch(`http://localhost:3000/api/players/me`, {
  headers: { Authorization: `Bearer ${token}` }
});
if (!res.ok) {
  window.location.href = '/character.html';
}

const { player } = await res.json();
console.log(player)
const startScenario = getScenarioData(player.scenario) ?? scenarios_data[1];
//──────────────────────────────────────────────────── 

loadRoutes();

// Core modules
const sceneManager     = new SceneManager();
const cameraManager    = new CameraManager(startScenario);
const postFX           = new PostProcessing(renderer, scene, cameraManager.camera);
const raycaster        = new Raycaster(canvas, cameraManager.camera, postFX.outlinePass);
const sky              = new Sky(scene);
const lights           = new Lights(scene);

// Initial load
sceneManager.load(startScenario).then(meshes => {
  raycaster.loadMeshes(meshes);
})

const onConfirm = (scenario) => {
    return sceneManager.reset(scenario).then(meshes => {
        raycaster.loadMeshes(meshes);
    });
};

// // // GUI
// const gui = setupGUI(cameraManager.camera, cameraManager.controls);


// Subscribers
sceneManager.subscribe((scenarioData) => {
  cameraManager.loadScenario(scenarioData);
  lights.updateLights(scenarioData);
  postFX.updateAttributes(scenarioData);
  sky.updateSky(scenarioData);
  raycaster.clearMeshes();
  raycaster.clearHighlithNames();
  raycaster.loadHighlightNames(scenarioData);
  overviewBuilder(scenarioData, sceneManager, { onConfirm });
  
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

// cameraManager.subscribe((cam, id) => {
//   gui.update(cam, cameraManager.controls);
// })

// Setup
setupEvents(container, cameraManager, sceneManager, raycaster, postFX, onConfirm);
setMapHud(scenarios_data, sceneManager, onConfirm);
setupTabs(sceneManager);

// lights.setupLightsGUI(postFX.bloomPass);

// Rendering loop
renderer.setAnimationLoop(() => {
  sceneManager.updateAnimations();
  raycaster.update();
  postFX.render();
  // cameraManager.controls.update();
})


