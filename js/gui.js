
import GUI from 'lil-gui'

export function setupGUI(camera, controls) {
  const gui = new GUI()

  const posFolder = gui.addFolder('Position')
  posFolder.add(camera.position, 'x').listen().disable().decimals(2)
  posFolder.add(camera.position, 'y').listen().disable().decimals(2)
  posFolder.add(camera.position, 'z').listen().disable().decimals(2)

  const targetFolder = gui.addFolder('Target')
  targetFolder.add(controls.target, 'x').listen().disable().decimals(2)
  targetFolder.add(controls.target, 'y').listen().disable().decimals(2)
  targetFolder.add(controls.target, 'z').listen().disable().decimals(2)
}