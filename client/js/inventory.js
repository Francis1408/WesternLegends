import { getCharacterData, getItemData } from "./gameData";
import { getToken } from './auth.js';
import { showNotification }  from './notification.js';
import { getPlayerData, setPlayerData } from './playerState.js';
import { API_URL } from "../config.js";
import { updatePlayer } from "./playerState.js";

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
    invAvatarNameEl.textContent = player.name;

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

  const grid = document.getElementById('player-inv-grid')
  grid.innerHTML = '';

  for (let i = 0; i < inv.totalSlots ; i++) {

    const slot = document.createElement('div');
    slot.className = 'inv-grid-slot';
    const item = inv.items[i];

    if (item) {
        slot.classList.add('active');
        slot.dataset.itemId = item.id
        slot.dataset.instanceId = item.instance_id
        slot.innerHTML = `<img src="img/${item.icon}" alt="${item.name}" />
        ${item.quantity > 1 ? `<span class="inv-qty">${item.quantity}</span>` : ''}`;

    } else {

        slot.classList.add('empty');

    }

    grid.appendChild(slot);
  }

  // Bind the events to the buttons
  setItemContextMenu();
}

// ------------- EVENT DELEGATION ------------
function setItemContextMenu() {

  const grid = document.getElementById('player-inv-grid');
  const baloonEl = document.getElementById('item-baloon');

  grid.addEventListener('contextmenu', (e) => {

    e.preventDefault();

    const slot = e.target.closest('.inv-grid-slot.active');
    if (!slot) return;

    const itemId = Number(slot.dataset.itemId)
    const itemData = getItemData(itemId);
    if (!itemData) return;

    // Build context options based on item type
    const options = [];

    if (itemData.type  === 'weapon') {
      options.push({ label: 'Equip', action: () => handleEquip(slot)});
    }
    if (itemData.type === 'consumable' && !itemData.ammo_type && !itemData.stats.mining_stats) { // Cannot consume ammo or mining tools
      options.push({ label: 'Use',  action: () => handleUse(slot) });
    }

    options.push({ label: 'Drop', action: () => handleDrop(slot)});

    // Render dropdown in baloon
    baloonEl.innerHTML = `
      <p class="ctx-item-name">${itemData.name}</p>
      ${options.map((o, i) =>
        `<button class="ctx-btn" data-idx="${i}">${o.label}</button>`
      ).join('')}
    `;

    baloonEl.style.left = `${e.pageX + 4}px`;
    baloonEl.style.top  = `${e.pageY + 4}px`;

    baloonEl.querySelectorAll('.ctx-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        options[i].action();
        baloonEl.innerHTML = '';
      })
    })

    // Close on click outside
    document.addEventListener('click', () => {
      baloonEl.innerHTML = '';
    });

  })

}

async function handleEquip(slot) {
  const instanceId = Number(slot.dataset.instanceId);
  await equipWeapon(instanceId);
  await updatePlayer();
}

async function handleUse(slot) {
  const instanceId = Number(slot.dataset.itemId);
  // await useItem(instanceId);
  await updatePlayer();
}

async function handleDrop(slot) {
  showNotification({
    title:   'Drop Item',
    content: '<p>Are you sure you want to drop this item?</p>',
    buttons: [
      { label: 'Drop', onClick: async () => {
        const instanceId = Number(slot.dataset.instanceId);
        await dropItem(instanceId);
        await updatePlayer();
      }},
      { label: 'Cancel' }
    ]
  });
}



// ------ API CALLS ---------
export function equipWeapon(itemId) {

  return new Promise(async (resolve) => {
    try {
      const res = await fetch(`${API_URL}/inventory/equip`, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({item_id: itemId})
      });
      
      const data = await res.json();

      if (!res.ok) {
        showNotification({
          title:   'Cannot Equip',
          content: `<p>${data.message}</p>`,
          buttons: [{ label: 'Close' }]
        });
        return;
      }
      resolve(data)

    } catch {
      showNotification({
        title:   'Error',
        content: '<p>Cannot reach the server.</p>',
        buttons: [{ label: 'Close' }]
      });
    }
  })
}


export function dropItem(itemId) {

  return new Promise(async (resolve) => {
    const item = getItemData(itemId);

    try {
      const res = await fetch(`${API_URL}/inventory/drop`, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({item_id: itemId})
      });
      
      const data = await res.json();

      if (!res.ok) {
        showNotification({
          title:   'Cannot Drop',
          content: `<p>${data.message}</p>`,
          buttons: [{ label: 'Close' }]
        });
        return;
      }
      resolve(data)

    } catch {
      showNotification({
        title:   'Error',
        content: '<p>Cannot reach the server.</p>',
        buttons: [{ label: 'Close' }]
      });
    }
  })
}


export function buyItem(itemId, quantity = 1) {

  return new Promise((resolve) => {
    const item   = getItemData(itemId);
    const player = getPlayerData();

    showNotification({
      title:   'Confirm Purchase',
      content: `
        <p>Are you sure you want to buy</p>
        <p><strong>${item.name}</strong> for <strong>$ ${item.value * quantity}</strong>?</p>
        <p>Your gold: $ ${player.gold}</p>
      `,
      buttons: [
        {
          label: 'Buy',
          onClick: async () => {
            try {
              const res = await fetch(`${API_URL}/inventory/buy`, {
                method:  'POST',
                headers: {
                  'Content-Type':  'application/json',
                  'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({ item_id: itemId, quantity })
              });

              const data = await res.json();

              if (!res.ok) {
                showNotification({
                  title:   'Cannot Purchase',
                  content: `<p>${data.message}</p>`,
                  buttons: [{ label: 'Close' }]
                });
                return;
              }

              showNotification({
                  title:   'Success',
                  content: `<p>${data.message}</p>`,
                  buttons: [{ label: 'Close' }]
                });

              resolve(data);

            } catch {
              showNotification({
                title:   'Error',
                content: '<p>Cannot reach the server.</p>',
                buttons: [{ label: 'Close' }]
              });
            }
          }
        },
        { label: 'Cancel' }
      ]
    });
  });
}