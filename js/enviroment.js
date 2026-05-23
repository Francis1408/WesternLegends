import * as THREE from 'three';

export function setSky(scene, imagePath) {
    let textureLoader = new THREE.TextureLoader();

    textureLoader.load(imagePath, (jpgTexture) => {

        let skySphereGeometry = new THREE.SphereGeometry(1000, 60, 60);

        let skySphereMaterial = new THREE.MeshBasicMaterial({
            map: jpgTexture
        })

        skySphereMaterial.side = THREE.BackSide;
        let skySphereMesh = new THREE.Mesh(skySphereGeometry, skySphereMaterial);
        skySphereMesh.rotation.z = Math.PI /2 ;

        scene.add(skySphereMesh);
    });
};
    