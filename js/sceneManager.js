import { loadModel } from "./loader.js";
import { scene } from './scene.js';

export class SceneManager {

    #currentModel = null;
    #subscribers = [];
    #stack = []; // History of loaded scenarios
    #focusedId  = null;



    async #loadModel(scenarioData) {
        // Remove previous model
        if (this.#currentModel) {
            scene.remove(this.#currentModel);
            this.#currentModel = null;
        }

        if (!scenarioData.modelPath) return [];

        const { model, meshes } = await loadModel(scene, scenarioData);
        this.#currentModel = model;

        return meshes;
    }

    // Load scenario model and return highlightable meshes
    async load(scenarioData) {

        const meshes = await this.#loadModel(scenarioData);
        // Add to the stack
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
        // Notify subscribers with the new enviroment list
        this.#notify(scenarioData);

        return meshes;
    }

    // Go up one position from the scenes stack tree
    async goBack() {
        if (this.#stack.length <= 1) return;

        this.#stack.pop();
        const parent = this.#stack[this.#stack.length - 1];

        const meshes = await this.#loadModel(parent); // ← load without pushing
        this.#notify(parent);

        return meshes ?? [];
    }

    get current() {
        return this.#stack[this.#stack.length - 1];
    }

    get focusedId() {
        return this.#focusedId;
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
