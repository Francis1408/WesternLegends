import * as THREE from 'three';
import GUI from 'three/addons/libs/lil-gui.module.min.js';


export class Lights {

    #directionalLight;
    #ambientLight;


    constructor(scene) {

        // Default values
        this.#directionalLight = new THREE.DirectionalLight(0xffd27f, 4); 
        this.#ambientLight = new THREE.AmbientLight(0xff9966, 0.3);
        this.#directionalLight.position.set(50, 30, -20);

        this.setupLights(scene);

    }

    setupLights(scene) {
        scene.add(this.#directionalLight);
        scene.add(this.#ambientLight);
    }


    updateLights(scenarioData) {

        if (!scenarioData.lights) return;

        const directionalLightData = scenarioData.lights.directional
        const ambientLightData = scenarioData.lights.ambient

        // Set directional light
        this.#directionalLight.position.set(...directionalLightData.position);
        this.#directionalLight.color.set(directionalLightData.color);
        this.#directionalLight.intensity = directionalLightData.intensity;

        // Set ambient light
        this.#ambientLight.color.set(ambientLightData.color);
        this.#ambientLight.intensity = ambientLightData.intensity;
    }

    setupLightsGUI(bloomPass) {
        const gui = new GUI();
    
        // Directional light
        const dirFolder = gui.addFolder('Directional Light');
        dirFolder.add(this.#directionalLight.position, 'x', -200, 200).name('pos X');
        dirFolder.add(this.#directionalLight.position, 'y', -200, 200).name('pos Y');
        dirFolder.add(this.#directionalLight.position, 'z', -200, 200).name('pos Z');
        dirFolder.add(this.#directionalLight, 'intensity', 0, 10).name('intensity');
        dirFolder.addColor({ color: '#ffd27f' }, 'color').name('color')
            .onChange(val => this.#directionalLight.color.set(val));
        dirFolder.open();
    
        // Ambient light
        const ambFolder = gui.addFolder('Ambient Light');
        ambFolder.add(this.#ambientLight, 'intensity', 0, 3).name('intensity');
        ambFolder.addColor({ color: '#ff9966' }, 'color').name('color')
            .onChange(val => this.#ambientLight.color.set(val));
        ambFolder.open();
    
        // Bloom 
        const bloomFolder = gui.addFolder('Bloom');
        bloomFolder.add(bloomPass, 'strength', 0, 3).name('strength');
        bloomFolder.add(bloomPass, 'radius', 0, 2).name('radius');
        bloomFolder.add(bloomPass, 'threshold', 0, 1).name('threshold');
        bloomFolder.open();
    }
}

// export const light = new THREE.DirectionalLight(0xffd27f, 4);
// light.position.set(50, 30, -20);

// export const ambientLight = new THREE.AmbientLight(0xff9966, 0.3);

