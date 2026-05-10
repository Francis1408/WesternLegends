/* FRONT-END EVENTS */

import { pass } from "three/tsl";

export function setupEvents(container, cameraManager, postFX) {

    // ------------ RESIZE ----------------
    window.addEventListener('resize', () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        postFX.resize(w, h);
        cameraManager.resize(w, h);
    });

    // ------------ UI BUTTONS ----------------
    const returnButton = document.querySelector('#return_button');
    returnButton.addEventListener('click', () => {
        cameraManager.switchCamera('defaultCamera');
    });

    cameraManager.subscribe((cam, id) => {
        console.log(id)
        if (id === 'defaultCamera') {
            returnButton.classList.add('occult');
        }
        else {
            returnButton.classList.remove('occult');
        }
    })

}