import { GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {scenarios_data} from '../MockedData/scenarioData.js'

const HIGHLIGHTABLE_NAMES = ['Black_jack', 'Bar'];

export function loadModel(scene, scenarioData) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader()

        loader.load(
            // Loads the model from path
            scenarios_data[0]["modelPath"],
            (gltf) => {
                const model = gltf.scene
                model.position.set(0, 0, 0)
                model.scale.set(0.5, 0.5, 0.5)
                scene.add(model)

                // Get the meshes related to the names
                const meshNames = scenarioData.enviroments.map(env => env.id);
                resolve(_collectHighlightable(model, meshNames));
            
            },
            // Progress loader
            (progress) => {
                const pct = (progress.loaded / progress.total * 100).toFixed(1)
                console.log(`Loading model: ${pct}%`)
            },
            reject
        )     
    })

    // Trasverse the models meshes to find the highlightable meshes
    function _collectHighlightable(model, highlightableNames) {
        const meshes = []

        model.traverse((child) => {
            if (!child.isMesh) return

            let obj = child
            while (obj) {
            if (highlightableNames.includes(obj.userData?.name)) {
                meshes.push(child)
                break
            }
            obj = obj.parent
            }
        })

        return meshes
    }
}

