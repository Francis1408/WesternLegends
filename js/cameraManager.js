import * as THREE from 'three';
import { renderer, container } from './scene.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export class CameraManager {
    #activeCamera;
    #activeControls;
    #activeCameraId;
    // Used to alert the other modules that the camera has changed
    #subscribers = []; 

    // Build the initial camera setup
    constructor(scenarioData) {
        // Get all the cameras inside the scenario
        this.availableCameras = [];

        // MAIN CAMERA
        const mainCamera = this._createEntry('defaultCamera', scenarioData.camera);
        this.availableCameras.push(mainCamera)


        // Add  the other enviroment cameras
        for (const env of scenarioData.enviroments) {
            const entry = this._createEntry(env.id, env.camera);
            this.availableCameras.push(entry);
        }
        
        // Add the main camera as the default one
        this.#activeCamera = this.availableCameras[0].camera;
        this.#activeControls = this.availableCameras[0].controls;
    
    }

    
    // Get active camera
    get camera() {
        return this.#activeCamera;
    }

    get controls() {
        return this.#activeControls;
    }

    _createEntry(id, cameraData) {

        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );

        camera.position.set(cameraData.position.x, cameraData.position.y, cameraData.position.z)
        camera.up.set(cameraData.up.x, cameraData.up.y, cameraData.up.z)
        camera.target = new THREE.Vector3( cameraData.target.x, cameraData.target.y, cameraData.target.z);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; 
        controls.target.copy(camera.target);
        controls.update();

        return { id, camera, controls };

    }

    _clearCameraList() {
        this.availableCameras = [];
    }

    subscribe(fn) {
        this.#subscribers.push(fn);
    }

    // Inform the subs that the camera has changed
    #notify() {
        this.#subscribers.forEach(fn => fn(this.#activeCamera, this.#activeCameraId));
    }

    // Change width and height on resize
    resize(width, height) {
        for (const { camera } of this.availableCameras) {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
    }

    switchCamera(targetCameraName) {

        const targetCamera = null;
        // Find the target camera
        for (const entry of this.availableCameras) {
            if (entry.id === targetCameraName) {
                this.#activeCamera = entry.camera
                this.#activeControls = entry.controls; 
                this.#activeCameraId = entry.id;
                this.#notify(); // Update all the subscribers
                break;
            } 
        }

    }
}
