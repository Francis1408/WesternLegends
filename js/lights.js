import * as THREE from 'three';
import GUI from 'three/addons/libs/lil-gui.module.min.js';

export const light = new THREE.DirectionalLight(0xffd27f, 4);
light.position.set(50, 30, -20);

export const ambientLight = new THREE.AmbientLight(0xff9966, 0.3);

export function setupLights(scene) {
    scene.add(light);
    scene.add(ambientLight);
}

export function setupLightsGUI(light, ambientLight, bloomPass) {
    const gui = new GUI();

    // Directional light
    const dirFolder = gui.addFolder('Directional Light');
    dirFolder.add(light.position, 'x', -200, 200).name('pos X');
    dirFolder.add(light.position, 'y', -200, 200).name('pos Y');
    dirFolder.add(light.position, 'z', -200, 200).name('pos Z');
    dirFolder.add(light, 'intensity', 0, 10).name('intensity');
    dirFolder.addColor({ color: '#ffd27f' }, 'color').name('color')
        .onChange(val => light.color.set(val));
    dirFolder.open();

    // Ambient light
    const ambFolder = gui.addFolder('Ambient Light');
    ambFolder.add(ambientLight, 'intensity', 0, 3).name('intensity');
    ambFolder.addColor({ color: '#ff9966' }, 'color').name('color')
        .onChange(val => ambientLight.color.set(val));
    ambFolder.open();

    // Bloom — foggy feel
    const bloomFolder = gui.addFolder('Bloom');
    bloomFolder.add(bloomPass, 'strength', 0, 3).name('strength');
    bloomFolder.add(bloomPass, 'radius', 0, 2).name('radius');
    bloomFolder.add(bloomPass, 'threshold', 0, 1).name('threshold');
    bloomFolder.open();
}