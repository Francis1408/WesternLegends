import { getCharacterData, getItemData } from "./gameData";

const PATHS = {
  drawings: { base: "/img/drawings/characters/", ext: ".png" },
  models:   { base: "/Models/Characters/",       ext: ".glb" }
};


export function renderInventory(player) {


    
    const specialSlotsEl = document.querySelector(".inv-special-slots")
    // const invSlotsEL = document.querySelector()

    // Render avatar image
    renderImage(player.avatar_id);
    renderReputationBar(player.reputation)
    


}

async function renderImage(player_id) {

    const invAvatarImgEl = document.getElementById("inv-avatar-img");

    // set path
    const charData = await getCharacterData(PATHS, player_id)
    invAvatarImgEl.src = charData.drawingUrl;

}

function renderReputationBar(reputation) {

    const rep     = Math.max(-100, Math.min(100, reputation));
    const pct     = Math.abs(rep) / 2;  
    const arrow   = document.getElementById('inv-rep-arrow');
    const posBar  = document.getElementById('inv-rep-pos');
    const negBar  = document.getElementById('inv-rep-neg');

    document.getElementById('inv-rep-value').textContent = rep > 0 ? `+${rep}` : `${rep}`;
    arrow.style.left = `calc(50% + ${rep / 2}%)`;

    if (rep >= 0) {
        posBar.style.width = `${pct}%`;
        negBar.style.width = '0';

    } else {

        negBar.style.width = `${pct}%`;
        posBar.style.width = '0';
    }

}