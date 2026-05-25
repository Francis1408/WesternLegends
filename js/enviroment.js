import * as THREE from 'three';

export function setSky(scene) {
    const skySphereGeometry = new THREE.SphereGeometry(700, 60, 60);

    const skySphereMaterial = new THREE.ShaderMaterial({
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
        `,
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

    const skySphereMesh = new THREE.Mesh(skySphereGeometry, skySphereMaterial);
    scene.add(skySphereMesh);
}