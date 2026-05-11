import { loadModel } from "./loader.js";
import { scene } from './scene.js';

export class SceneManager {

    #currentModel = null;
    #subscribers = [];
    #stack = []; // History of loaded scenarios

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

        // Notify subscribers with the new enviroment list
        this.#notify(scenarioData);

        return meshes;
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
