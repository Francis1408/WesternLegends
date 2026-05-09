import * as THREE from 'three';

export class CameraManager {
    #activeCamera;
    // Used to alert the other modules that the camera has changed
    #subscribers = []; 

    // Build the initial camera setup
    constructor(cameraData, container) {


        // Get all the cameras inside the scenario
        this.availableCameras = [];

        // MAIN CAMERA
        const mainCameraValues = cameraData['camera']
        const mainCamera = this._createCamera(mainCameraValues, container);

        this._addCameraToList(mainCamera, "defaultCamera")

        // Add  the other enviroment cameras
        for (const cameraInfo of cameraData['enviroments']) {
            
            console.log(cameraInfo);
            let camera = this._createCamera(cameraInfo['camera'], container);
            this._addCameraToList(camera, cameraInfo['id']);
        }
        
        // Add the main camera as the default one
        this.#activeCamera = this.availableCameras[0];
        console.log(this.#activeCamera);
    }

    
    // Get active camera
    get active() {
        return this.#activeCamera;
    }

    _createCamera(cameraData, container) {

        const camera = new THREE.PerspectiveCamera(75, container.clientWidth/ container.clientHeight, 0.1, 1000);

        camera.position.set(
            cameraData.position.x,
            cameraData.position.y,
            cameraData.position.z
        )
        camera.up.set(
            cameraData.up.x,
            cameraData.up.y,
            cameraData.up.z
        )

        camera.target = new THREE.Vector3(
            cameraData.target.x,
            cameraData.target.y,
            cameraData.target.z
        );

        return camera;
    }

    _addCameraToList(camera, cameraID) {

        this.availableCameras.push( // Add the main camera
            {
                "name": cameraID,
                "camera": camera
            }
        )
    }

    _clearCameraList() {
        this.availableCameras = [];
    }

    subscribe(fn) {
        this.#subscribers.push(fn);
    }

    // Inform the subs that the camera has changed
    #notify() {
        this.#subscribers.forEach(fn => fn(this.#activeCamera));
    }
}
