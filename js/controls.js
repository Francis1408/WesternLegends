import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { camera, renderer } from './scene.js'

export function setupControls() {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true 
  console.log(renderer.domElement.isConnected) // must be true
  console.log(document.body.contains(canvas)) 
  
  return controls

}