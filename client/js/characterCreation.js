import * as THREE from 'three';
import { GLTFLoader }      from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls }   from 'three/addons/controls/OrbitControls.js';
import { getToken, clearSession } from './auth.js';
import { loadAvatar } from './loader.js';
import { getCharacterData } from './utils.js';

const API_URL = 'http://localhost:3000/api';
const PATHS = {
  drawings: { base: "/img/drawings/characters/", ext: ".png" },
  models:   { base: "../Models/characters/",       ext: ".glb" }
};

// ── Guard: must be logged in ───────────────────────────────────────────────
const token = getToken();
if (!token) window.location.href = '/auth.html';

// ── Avatar model map ───────────────────────────────────────────────────────
const AVATAR_MODELS = {
  cowboy:  '../Models/Characters/Mexican_02/Mexican_02_03.glb',
  cowgirl: '../Models/Characters/Bandit_man/Bandit_man_02.glb',
  badguy:  '../Models/Characters/Badguy/Badguy_01.glb',
  woman:   '../Models/Characters/Woman/Woman_02.glb',
};

// const AVATAR_LIST = [
//   { value: 'badguy',  img: 'img/drawings/characters/Badguy_drawing.png', name: 'Badguy'  },
//   { value: 'bandit',  img: 'img/drawings/characters/Bandit_drawing.png',  name: 'Bandit'   },
//   { value: 'cowboy',  img: 'img/drawings/characters/Cowboy_drawing.png',  name: 'Cowboy'   },
//   { value: 'cowgirl',  img: 'img/drawings/characters/Cowgirl_drawing.png',  name: 'Cowgirl'  },
//   { value: 'gunman',  img: 'img/drawings/characters/Gunman_drawing.png',  name: 'Gunman'  },
//   { value: 'mexican',  img: 'img/drawings/characters/Mexican_drawing.png',  name: 'Mexican'  },
// ]

const AVATAR_LIST = [
  { value: 1, colors: ['#0d0d0d', '#7a8a45', '#3c627d']},
  { value: 2, colors: ['#0d0d0d','#8f3b35', '#7a8a45']},
  { value: 3, colors: ['#7a8a45', '#78562f', '#8f3b35']},
  { value: 4, colors: ['#8f3b35', '#78562f', '#3c627d']},
  { value: 5, colors: ['#8f3b35', '#cc7614', '#ffffff']},
  { value: 7, colors: ['#78562f', '#616b40', '#cc7614']}
]




// ── DOM refs ───────────────────────────────────────────────────────────────
const nameInput     = document.getElementById('char-name');
const nameCounter   = document.querySelector('.char-name-counter');
const avatarInputs  = document.querySelectorAll('input[name="avatar"]');
const tintInputs    = document.querySelectorAll('input[name="tint"]');
const submitBtn     = document.getElementById('char-submit');
const msgBox        = document.getElementById('char-msg');
const previewBadge  = document.getElementById('preview-name');
const canvas        = document.getElementById('char-canvas');
const grid          = document.querySelector('.avatar-grid')

// ── Avatar poster creation ───────────────────────────────────────────────────────

async function createAvatarPoster(value, colorSet) {
  const label = document.createElement('label');
  label.className = 'avatar-card';

  // Get the character data
  const charData = await getCharacterData(PATHS, value)

  if (!charData) return null;

  label.innerHTML = `
    <input type="radio" name="avatar" value="${value}" />
    <div class="poster-header">
      <span class="wanted-label">★ &nbsp; ★ &nbsp; ★</span>
      <span class="wanted-title">WANTED</span>
      <span class="wanted-label">DEAD OR ALIVE</span>
    </div>
    <div class="poster-img-wrap">
      <img src="${charData.drawingUrl}" alt="${charData.name}" draggable="false" />
    </div>
    <div class="poster-footer">
      <span class="dead-alive">— — —</span>
      <span class="name-label">${charData.name}</span>
    </div>
  `;

  return label;
}

// Create avatars
const cards = await Promise.all(
  AVATAR_LIST.map(({ value, colorSet }) => createAvatarPoster(value, colorSet))
);

cards.filter(Boolean).forEach(card => grid.appendChild(card));


// ── Three.js setup ─────────────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
// Bust framing — close up on the upper body
camera.position.set(0, 1.5, 2.8);
camera.lookAt(0, 1.2, 0);

// Lights
const ambient = new THREE.AmbientLight(0xe8c07a, 0.9);
scene.add(ambient);

const key = new THREE.DirectionalLight(0xfff0d8, 2.2);
key.position.set(2, 4, 3);
key.castShadow = true;
scene.add(key);

const fill = new THREE.DirectionalLight(0xd4a060, 0.6);
fill.position.set(-3, 2, -1);
scene.add(fill);

// Orbit controls — limited to horizontal rotation only
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 1.2, 0);
controls.enablePan    = false;
controls.enableZoom   = false;
controls.minPolarAngle = Math.PI / 2.8;
controls.maxPolarAngle = Math.PI / 1.8;
controls.autoRotate     = true;
controls.autoRotateSpeed = 1.2;
controls.update();

// ── Resize helper ──────────────────────────────────────────────────────────
function resizeRenderer() {
  const panel  = canvas.parentElement;
  const w = panel.clientWidth;
  const h = panel.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
const ro = new ResizeObserver(resizeRenderer);
ro.observe(canvas.parentElement);
resizeRenderer();

// ── Model state ────────────────────────────────────────────────────────────
let currentModel = null;
let mixer        = null;
const clock      = new THREE.Clock();
const loader     = new GLTFLoader();

let currentTint  = new THREE.Color('#c9a96e');

function loadModel(avatarKey) {
  // Remove previous
  if (currentModel) {
    scene.remove(currentModel);
    currentModel = null;
    mixer = null;
  }

  const path = AVATAR_MODELS[avatarKey];
  if (!path) return;

  loader.load(path, (gltf) => {
    const model = gltf.scene;

    // Centre model at origin
    const box    = new THREE.Box3().setFromObject(model);
    const centre = box.getCenter(new THREE.Vector3());
    model.position.sub(centre);
    model.position.y += (box.max.y - box.min.y) / 2;

    // Apply tint to all meshes
    applyTint(model, currentTint);

    scene.add(model);
    currentModel = model;

    // Play first idle animation if available
    if (gltf.animations.length) {
      mixer = new THREE.AnimationMixer(model);
      const idle = gltf.animations.find(a =>
        /idle/i.test(a.name)
      ) || gltf.animations[0];
      mixer.clipAction(idle).play();
    }
  });
}

function applyTint(model, color) {
  model.traverse(child => {
    if (child.isMesh && child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach(mat => {
        mat.color.set(color);
      });
    }
  });
}

// ── Render loop ────────────────────────────────────────────────────────────
renderer.setAnimationLoop(() => {
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  controls.update();
  renderer.render(scene, camera);
});

// ── Initial load ───────────────────────────────────────────────────────────
loadModel('cowboy');

// ── Avatar radio change ────────────────────────────────────────────────────
avatarInputs.forEach(input => {
  input.addEventListener('change', () => {
    if (input.checked) loadModel(input.value);
  });
});

// ── Tint radio change ──────────────────────────────────────────────────────
tintInputs.forEach(input => {
  input.addEventListener('change', () => {
    if (input.checked) {
      currentTint = new THREE.Color(input.value);
      if (currentModel) applyTint(currentModel, currentTint);
    }
  });
});

// ── Name input ─────────────────────────────────────────────────────────────
nameInput.addEventListener('input', () => {
  const len = nameInput.value.length;
  nameCounter.textContent = `${len} / 32`;
  previewBadge.textContent = nameInput.value.trim() || '— Name Your Legend —';
});

// ── Helpers ────────────────────────────────────────────────────────────────
function showMsg(text, isError = true) {
  msgBox.textContent = text;
  msgBox.className   = 'char-msg ' + (isError ? 'error' : 'success');
}

function setLoading(loading) {
  submitBtn.disabled    = loading;
  submitBtn.textContent = loading ? 'Saddling up…' : 'Ride Into the Frontier';
}

// ── Submit ─────────────────────────────────────────────────────────────────
submitBtn.addEventListener('click', async () => {
  const name   = nameInput.value.trim();
  const avatar = document.querySelector('input[name="avatar"]:checked')?.value;
  const tint   = document.querySelector('input[name="tint"]:checked')?.value;

  if (!name)   return showMsg('Give yourself a name, stranger.');
  if (!avatar) return showMsg('Pick your legend first.');

  setLoading(true);
  showMsg('');

  try {
    const res  = await fetch(`${API_URL}/players`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar, tint }),
    });

    const data = await res.json();

    if (!res.ok) return showMsg(data.message || 'Something went wrong.');

    showMsg('Legend created! Riding in… 🤠', false);
    setTimeout(() => window.location.href = '/index.html', 1200);

  } catch {
    showMsg('Cannot reach the server.');
  } finally {
    setLoading(false);
  }
});