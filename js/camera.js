
export class CameraManager {
    #activeCamera;
    // Used to alert the other modules that the camera has changed
    #subscribers = []; 

    constructor(defaultCamera) {
        this.#activeCamera = defaultCamera;
    }

    // Get active camera
    get active() {
        return this.#activeCamera;
    }

    subscribe(fn) {
        this.#subscribers.push(fn);
    }

    // Inform the subs that the camera has changed
    #notify() {
        this.#subscribers.forEach(fn => fn(this.#activeCamera));
    }
}