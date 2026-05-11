import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js'


export const canvas = document.querySelector('#canvas')
export const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

export const container = canvas.parentElement;
renderer.setSize(container.clientWidth, container.clientHeight, false);
renderer.setPixelRatio(window.devicePixelRatio);

// Tell the canvas to fill its container via the renderer
canvas.style.width = '100%';
canvas.style.height = '100%';

export const scene = new THREE.Scene()
