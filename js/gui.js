import GUI from 'lil-gui'

export function setupGUI(camera, controls) {
  const gui = new GUI()

  const posFolder = gui.addFolder('Position')
  const px = posFolder.add(camera.position, 'x').listen().decimals(2)
  const py= posFolder.add(camera.position, 'y').listen().decimals(2)
  const pz = posFolder.add(camera.position, 'z').listen().decimals(2)

  const targetFolder = gui.addFolder('Target')
  const tx = targetFolder.add(controls.target, 'x').listen().decimals(2)
  const ty = targetFolder.add(controls.target, 'y').listen().decimals(2)
  const tz = targetFolder.add(controls.target, 'z').listen().decimals(2)

  function update(newCamera, newControls) {

    px.object = newCamera.position;
    py.object = newCamera.position;
    pz.object = newCamera.position;

    tx.object = newControls.target;
    ty.object = newControls.target;
    tz.object = newControls.target;

  }

  return { update };

}

export function setupGUILight(camera, controls) {
  const gui = new GUI()

  const posFolder = gui.addFolder('Position')
  const px = posFolder.add(camera.position, 'x').listen().decimals(2)
  const py= posFolder.add(camera.position, 'y').listen().decimals(2)
  const pz = posFolder.add(camera.position, 'z').listen().decimals(2)

  const targetFolder = gui.addFolder('Target')
  const tx = targetFolder.add(controls.target, 'x').listen().decimals(2)
  const ty = targetFolder.add(controls.target, 'y').listen().decimals(2)
  const tz = targetFolder.add(controls.target, 'z').listen().decimals(2)

  function update(newCamera, newControls) {

    px.object = newCamera.position;
    py.object = newCamera.position;
    pz.object = newCamera.position;

    tx.object = newControls.target;
    ty.object = newControls.target;
    tz.object = newControls.target;

  }

  return { update };

}


