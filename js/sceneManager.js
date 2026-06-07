import * as THREE from 'three';

import { loadModel, loadNPCs } from "./loader.js";
import { scene } from './scene.js';

export class SceneManager {

    #currentModel = null;
    #mainCurrentScenario = null; // Saves the current scenario id
    #subscribers = [];
    #stack = []; // History of loaded scenarios
    #focusedId  = null;
    #npcs = []; // Save the npc list
    #timer = new THREE.Timer();


    async #loadModel(scenarioData) {
        // Remove previous model
        if (this.#currentModel) {
            scene.remove(this.#currentModel);
            this.#currentModel = null;
        }

        // Clear npcs list
        if(this.#npcs) {
            this.#npcs.forEach((npc) => {
                scene.remove(npc.model);
            })
            this.#npcs = []
        }

        if (!scenarioData.modelPath) return [];

        const [{ model, meshes }, npcs] = await Promise.all([
            loadModel(scene, scenarioData),
            loadNPCs(scene, scenarioData.npcs ?? [])
        ]) 
        this.#currentModel = model;
        this.#npcs = [...npcs];

        return meshes;
    }

    // Load scenario model and return highlightable meshes
    async load(scenarioData) {

        const meshes = await this.#loadModel(scenarioData);
        // Add to the stack
         if (this.#stack.length <= 1) this.updateRootId(scenarioData);
        this.#stack.push(scenarioData)

        // Notify subscribers with the new enviroment list
        this.#notify(scenarioData);

        return meshes;
    }

    // Clear stack tree and load a fresh scenario
    async reset(scenarioData) {
        const meshes = await this.#loadModel(scenarioData);
        
        this.clearStack()
        // Add to the stack
        this.#stack.push(scenarioData)
        this.updateRootId(scenarioData)
        // Notify subscribers with the new enviroment list
        this.#notify(scenarioData);

        return meshes;
    }

    // Go up one position from the scenes stack tree
    async goBack() {
        if (this.#stack.length <= 1) return;

        this.#stack.pop();
        const parent = this.#stack[this.#stack.length - 1];

        const meshes = await this.#loadModel(parent); 
        this.#notify(parent);

        return meshes ?? [];
    }

    // Update the root id (referent to the main scenario)
    updateRootId(scenarioData) {

        this.#mainCurrentScenario = scenarioData.id;
    }

    updateAnimations() {
        this.#timer.update()
        const delta = this.#timer.getDelta();
        this.#npcs.forEach(npc => npc.update(delta));
    }

    get current() {
        return this.#stack[this.#stack.length - 1];
    }

    get focusedId() {
        return this.#focusedId;
    }

    get npcs() {
        return this.#npcs;
    }

    get mainCurrentScenario() {
        return this.#mainCurrentScenario;
    }   

    // CHeck if stack has more than one scene
    hasParent() {
        return this.#stack.length > 1;
    }

    setFocused(id) {
        this.#focusedId = id;
    }

    hasModel(envData) {
        return !!envData.modelPath;
    }

    clearStack() {
        this.#stack = [];
    }

    subscribe(fn) {
        this.#subscribers.push(fn);
    }


    #notify(scenarioData) {
        this.#subscribers.forEach(fn => fn(scenarioData));
    }
}
