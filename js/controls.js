import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { renderer } from './scene.js'

export function setupControls(controls) {
  controls.enableDamping = true 
  // console.log(renderer.domElement.isConnected) // must be true
  // console.log(document.body.contains(canvas)) 

}