import * as THREE from 'three';


export class Raycaster {

    #highlightableNames = [];
    #highlightableMeshes = [];
    // Array that store functions that will be called when a mapped mesh
    // is clicked
    #onClickHandlers = []; 
    

    constructor(canvas, camera, outlinePass) {

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.canvas = canvas;
        this.camera = camera;
        this.outlinePass = outlinePass;

        this.hittedMeshName = null; // Saves the name of the mesh hitted by the ray

        this._bindMouseMove(canvas)
    }

    // Call function stored when mesh is clicked
    onMeshClick(fn) {
        this.#onClickHandlers.push(fn);
    }

    _bindMouseMove(canvas) {
        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect()
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        })


        canvas.addEventListener('click', (event) => {

            if(this.#highlightableNames.includes(this.hittedMeshName)) {

                // Calls the camera animation handler
                this.#onClickHandlers.forEach(fn => fn(this.hittedMeshName));
            }
        })
    }

    loadMeshes(meshes) {
        this.#highlightableMeshes.push(...meshes);
    }

    clearMeshes() {
        this.#highlightableMeshes = [];
    }

    loadHighlightNames(scenarioData) {

        for (const env of scenarioData.enviroments) {
            this.#highlightableNames.push(env.id);
        }

        console.log(this.#highlightableNames)

    }

    clearHighlithNames() {
        this.#highlightableNames = [];
    }
    
    updateCamera(newCamera) {
        this.camera = newCamera;
    }


    // Apply raycast logic
    update() {

        if (this.#highlightableMeshes.length === 0) return; 

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.#highlightableMeshes, false);

        if (intersects.length > 0) {
            // Find the top-level named object to outline all its meshes
            const hit = intersects[0].object;
            let namedObj = hit;
            while (namedObj.parent && !this.#highlightableNames.includes(namedObj.name)) {
                namedObj = namedObj.parent;
            }
            this.hittedMeshName = this.#highlightableNames.includes(namedObj.name) ? namedObj.name : null;
            // Collect all child meshes of the named group
            const toOutline = [];
            namedObj.traverse((c) => { if (c.isMesh) toOutline.push(c); });
            this.outlinePass.selectedObjects = toOutline; // Highlight the meshes with outline pass
        } else {

            this.outlinePass.selectedObjects = [];
            this.hittedMeshName = null;
        }
    }

}