/* FRONT-END EVENTS */

import { container } from "./scene";

export function setupEvents(container, cameraManager, sceneManager, raycaster, postFX, onConfirm) {

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


    cameraManager.subscribe((cam, id) => {
        const currentScenario = sceneManager.current;
        const env = currentScenario.enviroments.find(e => e.id === id);

        if (env && sceneManager.hasModel(env) && id != 'defaultCamera') {
            console.log(env)
            overviewBuilder(env, sceneManager, {
                onConfirm : onConfirm,
                onEnter: (env) => sceneManager.load(env).then(meshes => raycaster.loadMeshes(meshes)),
                onReturn: () => cameraManager.switchCamera('defaultCamera'),
                isPreview:  true
            }); 
        }

        else if (id === 'defaultCamera') {
            overviewBuilder(currentScenario, sceneManager, { onConfirm });
        }

        else {
            overviewBuilder(env, sceneManager, { onConfirm });
        }

        setOverviewFocus()

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

        overviewBuilder(scenarioData, sceneManager, { onConfirm });
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

export function overviewBuilder(scenarioData, sceneManager, { onConfirm, onEnter, onReturn, isPreview = false } = {}) {

    const overviewEl = document.querySelector('.overview');

    console.log(scenarioData)


    if (!isPreview) {

        // Checks if it is the final env in the three
        if (!scenarioData.enviroments || scenarioData.enviroments.length === 0) {
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
            const ownInfo = scenarioData.info 
                ? `<div class="info_list"><img src=${scenarioData.icon}><p>${scenarioData.info}</p></div>` 
                : '';

            const envInfos = scenarioData.enviroments.map(item => 
                `<div class="info_list"><img src=${item.icon}><p>${item.info}</p></div>`
            ).join('') ?? '';

            const infosList = ownInfo + envInfos;
    
            // Buttons
            const isCurrentLocation = scenarioData.id === sceneManager.mainCurrentScenario;
            const travelButton = `<button class="travel_btn" ${isCurrentLocation ? 'disabled' : ''}>
                ${isCurrentLocation ? 'You are here' : 'Travel'}
            </button>`;
        
    
            overviewEl.innerHTML = overviewMainPart + infosList + travelButton;
    
            if (!isCurrentLocation) {
                overviewEl.querySelector('.travel_btn').addEventListener('click', () => {
                    onConfirm(scenarioData).then(() => {
                        overviewBuilder(scenarioData, sceneManager, { onConfirm });
                    });
                });
            }
        }
    }

    else {

        // Builds overview
        
        // Title
        const building_name =  "("+ scenarioData.id + ")"
        const title = `<h1>${building_name}</h1>`

        // Description
        const description = scenarioData.description ? `<p class="description">${scenarioData.description}</p>` : '';

        // Divider
        const divider = `<div class="divider">()</div>`;

        // Itens preview
        const itensPreview = `<p>ITENS PREVIEW</p>`

        // Icons info
        const ownInfo = scenarioData.info 
                ? `<div class="info_list"><img src=${scenarioData.icon}><p>${scenarioData.info}</p></div>` 
                : '';

        const envInfos = scenarioData.enviroments.map(item => 
            `<div class="info_list"><img src=${item.icon}><p>${item.info}</p></div>`
        ).join('') ?? '';

        const infosList = ownInfo + envInfos;

        // Buttons
        const buttons = `<button id="enter_btn" class="travel_btn">Enter</button> 
                         <button id="return_btn" class="travel_btn">Return</button>`;

        overviewEl.innerHTML = title + description + divider + itensPreview + divider + infosList + buttons

        overviewEl.querySelector('#enter_btn').addEventListener('click', () => {
            onEnter(scenarioData);
            });

            overviewEl.querySelector('#return_btn').addEventListener('click', () => {
                onReturn();
            });

    }
}

function setOverviewFocus() {

    const localTabs = document.querySelectorAll('.tabs_button.sidemenu');
    const localPanels = document.querySelectorAll('.sidemenu_wrap');
    
    // Remove active
    localTabs.forEach(t => t.classList.remove('active'));
    localPanels.forEach(p => p.classList.remove('active'));
    
    const overviewTab = document.querySelector('#overview_tab');
    const overviewPanel = document.querySelector('#overview')
    overviewTab.classList.add('active');
    overviewPanel.classList.add('active');

    window.dispatchEvent(new Event('resize'));
}

// ------------ MAP HUD ----------------
export function setMapHud(scenarios, sceneManager, onConfirm) {
    
    // Baloon info
    const baloonEl = document.querySelector('#baloon');
    const pinsEl = document.querySelectorAll('.pin');

    pinsEl.forEach(pin => {
        pin.addEventListener('mouseover', (e) => {

            let triggeredEl = e.currentTarget;
            let scenarioId = triggeredEl.dataset.spot;

            // Find the scenario id
            const scenario_data = scenarios.find(item => item.id === scenarioId)

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
            overviewBuilder(scenario_data, sceneManager, { onConfirm } );
            setOverviewFocus()

        });
    })

}
