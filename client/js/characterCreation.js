import * as THREE from 'three';
import { GLTFLoader }      from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls }   from 'three/addons/controls/OrbitControls.js';
import { getToken, clearSession } from './auth.js';
import { loadAvatar, getMixer } from './loader.js';
import { getCharacterData } from './gameData.js';
import { color } from 'three/tsl';
import { Scene } from 'three/webgpu';

const API_URL = 'http://localhost:3000/api';
const PATHS = {
  drawings: { base: "/img/drawings/characters/", ext: ".png" },
  models:   { base: "/Models/Characters/",       ext: ".glb" }
};

// ── Guard: must be logged in ───────────────────────────────────────────────
const token = getToken();
if (!token) window.location.href = '/auth.html';

// ── Avatar model map ───────────────────────────────────────────────────────

let currentAvatar = 0; // Starting avatar

const AVATAR_LIST = [
  { value: 1, colors: ['#0d0d0d', '#7a8a45', '#3c627d'], selectedColor: 1},
  { value: 2, colors: ['#0d0d0d','#8f3b35', '#7a8a45'],  selectedColor: 1},
  { value: 3, colors: ['#7a8a45', '#78562f', '#8f3b35'], selectedColor: 1},
  { value: 4, colors: ['#8f3b35', '#78562f', '#3c627d'], selectedColor: 1},
  { value: 5, colors: ['#8f3b35', '#cc7614', '#ffffff'], selectedColor: 1},
  { value: 7, colors: ['#78562f', '#616b40', '#cc7614'], selectedColor: 1}
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
const colorGrid     = document.querySelector('.color-grid')

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

// ── Colors buttons creation ───────────────────────────────────────────────────────

function renderColorButtons(colorsSet, selectedValue) {
  colorGrid.innerHTML = ''; 

  colorsSet.forEach((color, index) => {
    const checked = index + 1 === selectedValue ? 'checked' : '';

    colorGrid.insertAdjacentHTML('beforeend', `
      <label class="color-swatch">
        <input type="radio" name="tint" value="${index + 1}" ${checked} />
        <span style="background:${color}"></span>
      </label>
    `);
  });
}


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

// ── Render loop ────────────────────────────────────────────────────────────
renderer.setAnimationLoop(() => {
  const delta = clock.getDelta();
  const mixer = getMixer();
  if (mixer) mixer.update(delta);
  controls.update();
  renderer.render(scene, camera);
});


// ── Events ────────────────────────────────────────────────────────────────
grid.addEventListener('change', async (e) => {

  const input = e.target.closest('input[name="avatar"]');
  if (!input) return;

  const avatar   = AVATAR_LIST.find(obj => obj.value === Number(input.value));
  const charData = await getCharacterData(PATHS, avatar.value, avatar.selectedColor);

  renderColorButtons(avatar.colors, avatar.selectedColor);
  await loadAvatar(scene, charData.modelUrl);

  currentAvatar = input.value - 1;

});


colorGrid.addEventListener('change', async (e) => {
  const input = e.target.closest('input[name="tint"]');
  if (!input) return;

  
  const avatar =  AVATAR_LIST[currentAvatar]
  avatar.selectedColor = Number(input.value) // Update the current color

  const charData = await getCharacterData(PATHS, avatar.value, avatar.selectedColor);

  await loadAvatar(scene, charData.modelUrl)

});

nameInput.addEventListener('input', () => {
  const len = nameInput.value.length;
  nameCounter.textContent = `${len} / 32`;
  previewBadge.textContent = nameInput.value.trim() || '— Name Your Legend —';
});


submitBtn.addEventListener('click', async () => {
  const name   = nameInput.value.trim();
  const avatar = Number(document.querySelector('input[name="avatar"]:checked')?.value);
  const type  = Number(document.querySelector('input[name="tint"]:checked')?.value);

    
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
      body: JSON.stringify({ name, avatar, type}),
    });
    
    const data = await res.json();
    
    if (!res.ok) return showMsg(data.message || 'Something went wrong.');
    
    showMsg('Legend created! Riding in… ', false);
    setTimeout(() => window.location.href = '/index.html', 1200);
    
  } catch {
    showMsg('Cannot reach the server.');
  } finally {
    setLoading(false);
  }
});

// ── Helpers ────────────────────────────────────────────────────────────────
function showMsg(text, isError = true) {
  msgBox.textContent = text;
  msgBox.className   = 'char-msg ' + (isError ? 'error' : 'success');
}

function setLoading(loading) {
  submitBtn.disabled    = loading;
  submitBtn.textContent = loading ? 'Saddling up…' : 'Ride Into the Far Lands';
}