import * as THREE from 'three';


export class Raycaster {

    #highlightableNames = [];
    #highlightableMeshes = [];

    constructor(canvas, camera, outlinePass) {

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.canvas = canvas;
        this.camera = camera;
        this.outlinePass = outlinePass;

        this.hittedMeshName = null; // Saves the name of the mesh hitted by the ray

        this._bindMouseMove(canvas)
    }

    _bindMouseMove(canvas) {
        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect()
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        })


        canvas.addEventListener('click', (event) => {

            if(this.#highlightableNames.includes(this.hittedMeshName)) {

                console.log(`O elemento ${this.hittedMeshName} foi clicado`);
                // Calls the camera animation handler
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

    }

    clearHighlithNames() {
        this.#highlightableNames = [];
    }

    // Apply raycast logic
    update() {

        if (this.#highlightableMeshes.length === 0) return 

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.#highlightableMeshes, false);

        if (intersects.length > 0) {
            // Find the top-level named object to outline all its meshes
            const hit = intersects[0].object;
            let namedObj = hit;
            while (namedObj.parent && !this.#highlightableNames.includes(namedObj.userData?.name)) {
                namedObj = namedObj.parent;
                this.hittedMeshName = namedObj.name;
            }
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