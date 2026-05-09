import * as THREE from 'three';


export const canvas = document.querySelector('#canvas')
export const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

const container = canvas.parentElement;
renderer.setSize(container.clientWidth, container.clientHeight, false);
renderer.setPixelRatio(window.devicePixelRatio);

// Tell the canvas to fill its container via the renderer
canvas.style.width = '100%';
canvas.style.height = '100%';

export const scene = new THREE.Scene()

export function resizeRenderer(postFX, camera) {

    const width = container.clientWidth
    const height = container.clientHeight

    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    postFX.resize(width, height) 

}

export function buildCameraSetup(position, target) {

    const overviewCamera = new THREE.PerspectiveCamera(75, container.clientWidth/ container.clientHeight, 0.1, 1000);
    overviewCamera.position.set(...position)
    overviewCamera.target = new THREE.Vector3(...target)
    return overviewCamera
}