/* FRONT-END EVENTS */

import { pass } from "three/tsl";
import {scenarios_data} from '../MockedData/scenarioData.js'

export function setupEvents(container, cameraManager, sceneManager, raycaster, postFX) {

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

    const cameraButton = document.querySelector('#camera_button');
    cameraButton.addEventListener('click', () => {

        cameraManager.toggleControls();

        // Update button label
        const isEnabled = cameraButton.dataset.active === 'true';
        cameraButton.dataset.active = !isEnabled;
    })

    const enterButton = document.querySelector('#enter_button');
    
    cameraManager.subscribe((cam, id) => {
        const scenario = scenarios_data[0];
        const env = scenario.enviroments.find(e => e.id === id);

        if (env && sceneManager.hasModel(env) && id != 'defaultCamera') {
            enterButton.classList.remove('occult');
        }

        else {
            enterButton.classList.add('occult');
        }
    })


}