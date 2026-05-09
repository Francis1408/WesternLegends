import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { RenderPass } from 'three/examples/jsm/Addons.js'
import { OutlinePass } from 'three/examples/jsm/Addons.js'
import { OutputPass } from 'three/examples/jsm/Addons.js'

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
 }