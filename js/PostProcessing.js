import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js';


export class PostProcessing {

    constructor(renderer, scene, camera) {
        this.composer = new EffectComposer(renderer);

        this.renderPass = new RenderPass(scene, camera);
        this.composer.addPass(this.renderPass);

        this.outlinePass = new OutlinePass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          scene,
          camera
        );

        this.outputPass = new OutputPass();

        this.outlinePass.edgeStrength = 4;
        this.outlinePass.edgeGlow = 0.5;
        this.outlinePass.edgeThickness = 2;
        this.outlinePass.visibleEdgeColor.set('#ff0c0c'); // highlight color
        this.outlinePass.hiddenEdgeColor.set('#190a05');
        this.composer.addPass(this.outlinePass);


        
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.3,  // strength
            0.5,  // radius
            0.85  // threshold
        );
        this.composer.addPass(this.bloomPass);

        // const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
        // this.composer.addPass(gammaCorrectionPass);

        this.outputPass = new OutputPass();
        this.composer.addPass(this.outputPass);

        

    }

    render() {
        // Handle scene effects
        this.composer.render()
    }

    resize(width, height) {
        this.composer.setSize(width, height);
    }

    updateCamera(newCamera) {
        this.renderPass.camera  = newCamera
        this.outlinePass.renderCamera = newCamera;
    }

    updateAttributes(scenarioData) {

        if(!scenarioData.post_processing) return;

        const postFxData = scenarioData.post_processing;

        if (postFxData.bloom) {

            this.bloomPass.strength = postFxData.bloom.strength
            this.bloomPass.radius = postFxData.bloom.radius
            this.bloomPass.threshold = postFxData.bloom.threshold
        }

        
    }
 }