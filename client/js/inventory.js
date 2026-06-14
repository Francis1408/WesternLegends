import { getCharacterData, getItemData } from "./gameData";
import { getPlayerData } from "./playerState";

const PATHS = {
  drawings: { base: "/img/drawings/characters/", ext: ".png" },
  models:   { base: "/Models/Characters/",       ext: ".glb" }
};


export function renderInventory() {

    const player = getPlayerData()

    const specialSlotsEl = document.querySelector(".inv-special-slots")
    // const invSlotsEL = document.querySelector()

    // Render avatar image
    renderImage(player);
    renderReputationBar(player.reputation)

    // Special slots
    renderSpecialSlot('slot-gun', player.inventory.specialSlots.weapon)
    renderSpecialSlot('slot-horse', player.inventory.specialSlots.horse)
    renderSpecialSlot('slot-case', player.inventory.specialSlots.case)

    // Render slots
    renderNormalSlots(player.inventory)

}

async function renderImage(player) {

    const invAvatarImgEl = document.getElementById("inv-avatar-img");
    const invAvatarNameEl = document.getElementById("inv-avatar-name")

    // set path
    const charData = await getCharacterData(PATHS, player.avatar_id)
    invAvatarImgEl.src = charData.drawingUrl;

    // Place name
    invAvatarImgEl.innerText = player.name;

}

function renderReputationBar(reputation) {

    const rep     = Math.max(-100, Math.min(100, reputation));
    const pct     = Math.abs(rep) / 2;  
    const arrow   = document.getElementById('inv-rep-arrow');
    const posBar  = document.getElementById('inv-rep-pos');
    const negBar  = document.getElementById('inv-rep-neg');

    arrow.style.left = `calc(50% + ${rep / 2}%)`;

    if (rep >= 0) {
        posBar.style.width = `${pct}%`;
        negBar.style.width = '0';

    } else {

        negBar.style.width = `${pct}%`;
        posBar.style.width = '0';
    }

}

function renderSpecialSlot(id, item){

    const box = document.getElementById(id);

    if (item) {
        box.classList.remove('empty');
        box.innerHTML = `<img src="/img/${item.icon}" alt="${item.name}" />`;
    } else {
        box.classList.add('empty');
        box.innerHTML = '';
    }

}

function renderNormalSlots(inv) {

    const grid = document.getElementById('inv-grid')
    grid.innerHTML = '';

    for (let i = 0; i < inv.totalSlots ; i++) {

        const slot = document.createElement('div');
        slot.className = 'inv-grid-slot';
        const item = inv.items[i];

        if (item) {
            slot.className = 'active';
            slot.dataset.itemId = `${item.id}`
            slot.innerHTML = `<img src="${item.icon}" alt="${item.name}" />
            ${item.quantity > 1 ? `<span class="inv-qty">${item.quantity}</span>` : ''}`;

        } else {

            slot.classList.add('empty');

        }

        grid.appendChild(slot);
    }
}
