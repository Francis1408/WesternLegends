import * as THREE from 'three';
import { GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { NPC } from './Npc';

export function loadModel(scene, scenarioData) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader()

        loader.load(
            // Loads the model from path
            scenarioData.modelPath,
            (gltf) => {
                const model = gltf.scene
                model.position.set(0, 0, 0)
                model.scale.set(1, 1, 1)
                scene.add(model)

                // Get the meshes related to the names
                const meshNames = scenarioData.enviroments.map(env => env.id);
                const meshes = _collectHighlightable(model, meshNames);

                resolve({ model, meshes });
            
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
            if (!child.isMesh && !child.isSkinnedMesh) return

            let obj = child
            while (obj) {
            if (highlightableNames.includes(obj.name)) {
                meshes.push(child)
                break
            }
            obj = obj.parent
            }
        })

        return meshes
    }
}

export function loadNPCs(scene, npcsData) {

    const loader = new GLTFLoader()
    const loadSingle = (npcData) => {
        return new Promise((resolve, reject) => {
            loader.load(
                // Loads the model from path
                npcData.modelPath,
                (gltf) => {
                    const model = gltf.scene
                    model.position.set(...npcData.position ?? [0, 0, 0]);
                    model.scale.set(1, 1, 1)
                    scene.add(model)

                    // Set animation mixer
                    const mixer = new THREE.AnimationMixer(model);
                    const animations = {};
                    gltf.animations.forEach((clip) => {
                        animations[clip.name] = mixer.clipAction(clip);
                    })
                    
                    const npc = new NPC(npcData.name ?? 'Default', animations, animations['Sit_idle'], mixer, model);

                    resolve(npc);
                    
                },
                // Progress loader
                (progress) => {
                    const pct = (progress.loaded / progress.total * 100).toFixed(1)
                    console.log(`Loading ${npcData.name}: ${pct}%`);
                },
                reject
            )     
        })
    }

    return Promise.all(npcsData.map(loadSingle));
}
