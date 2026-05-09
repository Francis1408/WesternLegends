import * as THREE from 'three';


export const canvas = document.querySelector('#canvas')
export const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

const container = canvas.parentElement;
renderer.setSize(container.clientWidth, container.clientHeight, false);

export const scene = new THREE.Scene()
export const camera = new THREE.PerspectiveCamera(75, container.innerWidth / container.innerHeight, 0.1, 1000)

export function resizeRenderer(postFX) {

    const width = container.clientWidth
    const height = container.clientHeight

    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    postFX.resize(width, height) 

}