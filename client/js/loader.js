import * as THREE from 'three';
import { GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { NPC } from './Npc.js';
import { degrees } from 'three/tsl';

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

                    // Apply angle convertion at run time
                    const DEG = (degrees) => degrees * (Math.PI / 180);
                    const rotation = (npcData.rotation ?? [0, 0, 0]).map(DEG);
                    model.rotation.set(...rotation);
                    
                    model.scale.set(1, 1, 1)
                    scene.add(model)

                    // Set animation mixer
                    const mixer = new THREE.AnimationMixer(model);
                    const animations = {};
                    gltf.animations.forEach((clip) => {
                        animations[clip.name] = mixer.clipAction(clip);
                    })
                    
                    const npc = new NPC(
                        npcData.name ?? 'Default', 
                        mixer, 
                        model,
                        animations, 
                        animations[npcData.animationList[0]] ?? null,
                        npcData.animationList 
                    );

                    resolve(npc);
                    
                },
                // Progress loader
                (progress) => {
                    const pct = (progress.loaded / progress.total * 100).toFixed(1)
                },
                reject
            )     
        })
    }

    return Promise.all(npcsData.map(loadSingle));
}

export function loadAvatar(scena, modelPath) {

    const loader = new GLTFLoader()

    return new Promise((resolve, reject) => {

            loader.load(
                // Loads the model from path
                modelPath,
                (gltf) => {
                    const model = gltf.scene;

                    // Centre model at origin
                    const box    = new THREE.Box3().setFromObject(model);
                    const centre = box.getCenter(new THREE.Vector3());
                    model.position.sub(centre);
                    model.position.y += (box.max.y - box.min.y) / 2;
                

                    // Apply angle convertion at run time
                    model.scale.set(1, 1, 1)
                    scene.add(model)

                    // Set animation mixer 
                    const mixer = new THREE.AnimationMixer(model);
                    const animations = {};
                    const idle = gltf.animations.find(a => a.name == 'Idle') || gltf.animations[0];
                    // Play animation
                    mixer.clipAction(idle).play();
                    
                    resolve(true);
                    
                },
                // Progress loader
                (progress) => {
                    const pct = (progress.loaded / progress.total * 100).toFixed(1)
                },
                reject
            )     
        })

        return Promise.all(true);
    }

