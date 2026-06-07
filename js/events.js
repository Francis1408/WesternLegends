/* FRONT-END EVENTS */

import { container } from "./scene";

export function setupEvents(container, cameraManager, sceneManager, raycaster, postFX) {

    // ------------ RESIZE ----------------
    window.addEventListener('resize', () => {

        // Canvas
        const w = container.clientWidth;
        const h = container.clientHeight;
        postFX.resize(w, h);
        cameraManager.resize(w, h);


        // Map scale
        const map = document.querySelector('.map_display');
        const scale = map.offsetWidth / 1200;
        document.documentElement.style.setProperty('--map-scale', scale);

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

    // Assign the tabs for each container 
    const containersList = ['canvas', 'sidemenu'];

    containersList.forEach((container) => {

        const tabs    = document.querySelectorAll(`.tabs_button.${container}`);
        const panels  = document.querySelectorAll(`${container}_wrap`);
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {

                const target = tab.dataset.target;

                // Get current frame only
                const frame = tab.closest('.frame');
                
                // Tabs/panels only inside this frame
                const localTabs = frame.querySelectorAll(`.tabs_button.${container}`);
                const localPanels = frame.querySelectorAll(`.${container}_wrap`);

                // Remove active
                localTabs.forEach(t => t.classList.remove('active'));
                localPanels.forEach(p => p.classList.remove('active'));

                // Add active
                tab.classList.add('active');
                frame.querySelector(`#${target}`).classList.add('active');

                // Resize for Three.js
                window.dispatchEvent(new Event('resize'));
            }) 
        })
    })
    
    
    const town_tab = document.querySelector('#town_tab');

    sceneManager.subscribe((scenarioData) => {

        let scenario_name = scenarioData.id
        town_tab.innerHTML = String(scenario_name).replace("_", " ");
    })

}

// ------------ OVERVIEW BUILDER -------------
function overviewBuilder(scenarioData) {

    const overviewEl = document.querySelector('.overview');

    // Checks if it is the final env in the three
    if (!scenarioData.enviroments) {
        overviewEl.innerHTML = `<h1>FINAL</h1>`
    }

    else {

        // Title
        const region_name =  "("+ scenarioData.id + ")"
        const title = `<h1>${region_name}</h1>`
    
        // Image
        const image = scenarioData.image ? `<img src=${scenarioData.image}>` : '';
    
        // Description
        const description = scenarioData.description ? `<p class="description">${scenarioData.description}</p>` : '';
    
        // Divider
        const divider = `<div class="divider">()</div>`;

        const overviewMainPart = title + image + description + divider;

        // Iterates through the enviroments and fetches their infos
        let infosList = scenarioData.info ? `<div class="info_list"><img src=${scenarioData.icon}><p>${scenarioData.info}</p></div>` : '';
        
        infosList = scenarioData.enviroments.map(item => `<div class="info_list"><img src=${item.icon}><p>${item.info}</p></div>`).join('')

        overviewEl.innerHTML = overviewMainPart + infosList;
    }
    

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


    // Baloon info
    const baloonEl = document.querySelector('#baloon');
    const pinsEl = document.querySelectorAll('.pin');

    pinsEl.forEach(pin => {
        pin.addEventListener('mouseover', (e) => {

            let triggeredEl = e.currentTarget;
            let scenarioId = triggeredEl.dataset.spot;

            // Find the scenario id
            const scenario_data = scenarios.find(item => item.id === scenarioId)
            console.log(scenario_data)

            // // Build content
            const title = `<h2>${scenario_data.id}</h2>`
            const body = scenario_data.enviroments.map(item => `<img src=${item.icon}>`).join('');

            // Append content
            baloonEl.innerHTML = title + body;


        });

        pin.addEventListener('mouseout', () =>{
            baloonEl.innerHTML = '';
        });

        pin.addEventListener('mousemove', (e) => {

            baloonEl.style.left = `${e.pageX}px`;
            baloonEl.style.top = `${e.pageY}px`;
        });

        pin.addEventListener('click', (e) => {

            const overviewEl = document.querySelector('.overview');
            // Clear current content
            overviewEl.innerHTML = "";

            let triggeredEl = e.currentTarget;
            let scenarioId = triggeredEl.dataset.spot;

            // Find the scenario id
            const scenario_data = scenarios.find(item => item.id === scenarioId)
            overviewBuilder(scenario_data)
            // const region_name =  "("+ scenario_data.id + ")"
            // const title = `<h1>${region_name}</h1>`
            // const image = `<img src=${scenario_data.image}>`

            // overviewEl.innerHTML = title + image;



        });
    })

}
