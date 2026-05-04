import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { RenderPass } from 'three/examples/jsm/Addons.js';
import { OutlinePass } from 'three/examples/jsm/Addons.js';
import { OutputPass } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / innerHeight, 0.1, 1000)


const canvas = document.querySelector('#canvas')
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
const container = canvas.parentElement;

renderer.setSize(container.clientWidth, container.clientHeight, false);
renderer.setAnimationLoop( animate );


const controls = new OrbitControls(camera, renderer.domElement);

// --- Post-processing setup ---
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);


const outlinePass = new OutlinePass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  scene,
  camera
);
outlinePass.edgeStrength = 4;
outlinePass.edgeGlow = 0.5;
outlinePass.edgeThickness = 2;
outlinePass.visibleEdgeColor.set('#ff0c0c'); // highlight color
outlinePass.hiddenEdgeColor.set('#190a05');
composer.addPass(outlinePass);

const outputPass = new OutputPass();
composer.addPass(outputPass);

// --- Raycaster setup ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const highlightableNames = ['Black_jack', 'Bar']; // names from userData
let highlightableMeshes = []; // filled after model loads

window.addEventListener('mousemove', (event) => {

  const rect = canvas.getBoundingClientRect(); // Maps the mouse relative to the canvas

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
});

// Rendering an object
const loader = new GLTFLoader();
loader.load('Models/Valentine/Saloon.glb', function (gltf) {
  const model = gltf.scene;
  model.position.set(0, 0, 0);
  model.scale.set(0.5, 0.5, 0.5);
  scene.add(model);

  // Collect all meshes whose parent object has a matching name in userData
  model.traverse((child) => {
    if (child.isMesh) {
      // Check the mesh itself or any ancestor for the userData name
      let obj = child;
      while (obj) {
        if (highlightableNames.includes(obj.userData?.name)) {
          highlightableMeshes.push(child);
          break;
        }
        obj = obj.parent;
      }
    }
  });
}, undefined, console.error);

// Adding light
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


camera.position.z = 5;

function animate( time ) {

  // Raycast against highlightable meshes
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(highlightableMeshes, false);

  if (intersects.length > 0) {
    // Find the top-level named object to outline all its meshes
    const hit = intersects[0].object;
    let namedObj = hit;
    while (namedObj.parent && !highlightableNames.includes(namedObj.userData?.name)) {
      namedObj = namedObj.parent;
    }
    // Collect all child meshes of the named group
    const toOutline = [];
    namedObj.traverse((c) => { if (c.isMesh) toOutline.push(c); });
    outlinePass.selectedObjects = toOutline;
  } else {
    outlinePass.selectedObjects = [];
  }

  composer.render(); // use composer instead of renderer.render

}

window.addEventListener('resize', resizeRenderer);

function resizeRenderer() {
  const width = container.clientWidth;
  const height = container.clientHeight;

  renderer.setSize(width, height, false);
  composer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}