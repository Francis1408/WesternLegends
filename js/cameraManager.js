import * as THREE from 'three';
import { renderer, container } from './scene.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class CameraManager {
    #activeCamera;
    #activeControls;
    #activeCameraId;
    #controlsEnabled = false; // Set camera controls disabled as default
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
            if (env.previewCamera) {
                const entry = this._createEntry(env.id, env.previewCamera);
                this.availableCameras.push(entry);
            }
        }
        
        // Add the main camera as the default one
        this.#activeCamera = mainCamera.camera;
        this.#activeControls = mainCamera.controls;
        this.#activeCameraId = mainCamera.id;

        // Set controls disabled as default
        this.#activeControls.enabled = this.#controlsEnabled;

    
    }

    loadScenario(scenarioData) {

        this._clearCameraList();

     
        // Add new cameras info
        const mainCamera = this._createEntry('defaultCamera', scenarioData.camera);
        this.availableCameras.push(mainCamera)

        for (const env of scenarioData.enviroments) {
            if(env.previewCamera) {
                
                const entry = this._createEntry(env.id, env.previewCamera);
                this.availableCameras.push(entry);
            }
        }

        this.#activeCamera = mainCamera.camera;
        this.#activeControls = mainCamera.controls;
        this.#activeCameraId = mainCamera.id;

        this.#activeControls.enabled = this.#controlsEnabled;

        this.#notify()

    }

    // Get active camera
    get camera() {
        return this.#activeCamera;
    }

    get controls() {
        return this.#activeControls;
    }

    toggleControls() {
        this.#controlsEnabled = !this.#controlsEnabled;
        this.#activeControls.enabled = this.#controlsEnabled;
        const state = this.#activeControls.enabled ? 'ON' : 'OFF';
        console.log('Camera Orbit: ' + state);
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
        // controls.enableDamping = true; 
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
                this.#activeControls.enabled = this.#controlsEnabled;

                // Check if 

                this.#notify(); // Update all the subscribers
    
                break;
            } 
        }


        /* TRIED TO MAKE AN ANIMATION - FAILED MISERABLY 

        // Find taget camera info
        const entry = this.availableCameras.find(e => e.id === targetCameraId);
        if (!entry) return;

        // Kill any ongoing transition
        if (this.#activeTween) this.#activeTween.kill();

        const fromPos    = this.#activeCamera.position.clone();
        const fromTarget = this.#activeControls.target.clone();
        const proxy      = { t: 0 };

        this.#activeControls.enableDamping = false;

        // gsap = lib to make transitions
        this.#activeTween = gsap.to(proxy, {
            t:1,
            duration: 1.8,
            ease: 'power2.inOut',
            onUpdate: () => {
                this.#activeCamera.position.lerpVectors(fromPos, entry.camera.position, proxy.t);
                this.#activeControls.target.lerpVectors(fromTarget, entry.camera.target, proxy.t);
                this.#activeControls.update();
            },
            onComplete: () => {

                this.#activeCamera.position.copy(entry.camera.position);
                this.#activeControls.target.copy(entry.camera.target);

                // Copy dest cam values to the active camera
                this.#activeCamera   = entry.camera;
                this.#activeControls = entry.controls;
                this.#activeCameraId = entry.id;

                this.#activeControls.enableDamping = true;
                this.#activeControls.update();

                this.#notify();
                this.#activeTween = null;
            }
        })
        
        */

    }


}
