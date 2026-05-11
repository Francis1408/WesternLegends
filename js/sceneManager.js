import { loadModel } from "./loader.js";
import { scene } from './scene.js';

export class SceneManager {

    #currentModel = null;
    #subscribers = [];
    #stack = []; // History of loaded scenarios
    #focusedId  = null;


    // Load scenario model and return highlightable meshes
    async load(scenarioData) {

        // Remove previous model
        if (this.#currentModel) {
            scene.remove(this.#currentModel);
            this.#currentModel = null;
        }

        if (!scenarioData.modelPath) return [];

        const { model, meshes } = await loadModel(scene, scenarioData);
        this.#currentModel = model;

        // Add to the stack
        this.#stack.push(scenarioData)

        // Notify subscribers with the new enviroment list
        this.#notify(scenarioData);

        return meshes;
    }

    get current() {
        return this.#stack[this.#stack.length - 1];
    }

    get focusedId() {
        return this.#focusedId;
    }

    setFocused(id) {
        this.#focusedId = id;
    }

    hasModel(envData) {
        return !!envData.modelPath;
    }

    subscribe(fn) {
        this.#subscribers.push(fn);
    }

    #notify(scenarioData) {
        this.#subscribers.forEach(fn => fn(scenarioData));
    }
}
