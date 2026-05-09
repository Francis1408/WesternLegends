import * as THREE from 'three';

const light = new THREE.DirectionalLight(0xffffff, 3);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
light.position.set(5, 5, 5);

export function setupLights(scene) {
    scene.add(light);
    scene.add(ambientLight);
}