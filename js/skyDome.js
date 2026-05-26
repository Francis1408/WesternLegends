import * as THREE from 'three';

export class Sky {

    #skyMaterial;
    #skyMesh;

    constructor(scene) {
        const skySphereGeometry = new THREE.SphereGeometry(700, 60, 60);

        this.#skyMaterial = new THREE.ShaderMaterial({
            uniforms: {
                topColor:    { value: new THREE.Color(0x0077ff) },
                bottomColor: { value: new THREE.Color(0xffffff) },
                offset:      { value: 20 },
                exponent:    { value: 0.4 }
            },
            vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `, // Creates a color gradient between the top and bottom color
            fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                uniform float offset;
                uniform float exponent;
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize(vWorldPosition + offset).y;
                    gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
                }
            `,
            side: THREE.BackSide
        });

        this.#skyMesh = new THREE.Mesh(skySphereGeometry, this.#skyMaterial);
        scene.add(this.#skyMesh);
    }

    updateSky(scenarioData) {
        if (!scenarioData.sky) return;

        const skyData = scenarioData.sky;

        if (skyData.topColor)    this.#skyMaterial.uniforms.topColor.value.set(skyData.topColor);
        if (skyData.bottomColor) this.#skyMaterial.uniforms.bottomColor.value.set(skyData.bottomColor);
        if (skyData.offset    !== undefined) this.#skyMaterial.uniforms.offset.value   = skyData.offset;
        if (skyData.exponent  !== undefined) this.#skyMaterial.uniforms.exponent.value = skyData.exponent;
    }
}