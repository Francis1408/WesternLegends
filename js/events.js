/* FRONT-END EVENTS */

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
    enterButton.addEventListener('click', () => {

        const currentScenario = sceneManager.current;
        const env = currentScenario.enviroments.find(e => e.id === sceneManager.focusedId);

        if (env && sceneManager.hasModel(env)) {
            console.log(env)
            sceneManager.load(env).then(meshes => {
                raycaster.loadMeshes(meshes);
        });
    }
        
    });
    
    cameraManager.subscribe((cam, id) => {
        const currentScenario = sceneManager.current;
        const env = currentScenario.enviroments.find(e => e.id === id);

        if (env && sceneManager.hasModel(env) && id != 'defaultCamera') {
            enterButton.classList.remove('occult');
        }

        else {
            enterButton.classList.add('occult');
        }
    })

    const leaveButton = document.querySelector('#leave_button');
    leaveButton.addEventListener('click', async () => {
        const meshes = await sceneManager.goBack();
        raycaster.loadMeshes(meshes);
    })

    sceneManager.subscribe((scenarioData) => {
        if (sceneManager.hasParent()) {
            leaveButton.classList.remove('occult');
        }
        else {
            leaveButton.classList.add('occult');
        }
    })

}

// ------------ TAB BUTTONS ----------------
export function setupTabs(sceneManager) {

    const tabs    = document.querySelectorAll('.tabs_button');
    const panels  = document.querySelectorAll('.canvas_wrap');
    const town_tab = document.querySelector('#town_tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;

            tabs.forEach(t   => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(`${target}`).classList.add('active');

            // Re-trigger resize so Three.js recalculates canvas dimensions
            window.dispatchEvent(new Event('resize'));
        }) 
    })

    sceneManager.subscribe((scenarioData) => {

        let scenario_name = scenarioData.id
        town_tab.innerHTML = String(scenario_name).replace("_", " ");
    })

}



// ------------ MAP HUD ----------------
export function setMapHud(scenarios, onConfirm) {
    let index = 0;
    const input = document.querySelector("#area_display");
    const backward = document.querySelector('#backward');
    const forward  = document.querySelector('#forward');
    const submit   = document.querySelector('#submit');

     console.log(input, backward, forward);

    input.value = scenarios[index].id;

     backward.addEventListener('click', () => {
        index = (index - 1 + scenarios.length) % scenarios.length;
        input.value = scenarios[index].id;
    });

    forward.addEventListener('click', () => {
        index = (index + 1) % scenarios.length;
        let scenario_name = scenarios[index].id
        input.value = String(scenario_name).replace("_", " ");
    });

    submit.addEventListener('click', () => {
        onConfirm(scenarios[index]);
    });
}