import { getItemData } from '../gameData.js';
import { getPlayerData } from '../playerState.js';
// import { loadAvatar } from '../loader.js';


const MAX = { slots: 20, speed: 2000, strength: 20 }; // Capped horse status
const BAR_COUNT = 8;

let currentIndex = 0;
let horses = [];
// let stableScene = null;

export function renderStable(scenarioData) {

    // Get horses available
    horses = scenarioData.items.map(id => getItemData(id)).filter(Boolean);
    currentIndex = 0;


    const html = `
        <div class="st-wrap">
        <div class="st-header">
            <h1 class="st-header-title">Stable</h1>
        </div>

        <div class="st-carousel">
            <div class="st-arrow left" id="st-prev">&#10094;</div>
            <div class="st-arrow right" id="st-next">&#10095;</div>

            <div class="st-name-row">
            <span class="st-name" id="st-name"></span>
            </div>
            <div class="st-rarity" id="st-rarity" style="justify-content:center; margin-bottom:.3rem"></div>
            <p class="st-desc" id="st-desc"></p>

            <div class="st-stats">
            <div class="st-stat-row">
                <span class="st-stat-label">SLOTS</span>
                <div class="st-stat-bars" id="st-bars-slots"></div>
                <span class="st-stat-val" id="st-val-slots"></span>
            </div>
            <div class="st-stat-row">
                <span class="st-stat-label">SPEED</span>
                <div class="st-stat-bars" id="st-bars-speed"></div>
                <span class="st-stat-val" id="st-val-speed"></span>
            </div>
            <div class="st-stat-row">
                <span class="st-stat-label">POWER</span>
                <div class="st-stat-bars" id="st-bars-strength"></div>
                <span class="st-stat-val" id="st-val-strength"></span>
            </div>
            </div>

            <div class="st-footer">
            <span class="st-price" id="st-price"></span>
            <button class="st-buy-btn" id="st-buy-btn">Purchase</button>
            </div>
        </div>

        <div class="st-dots" id="st-dots"></div>
        </div>
    `;

    return { html, setup: setupStableEvents};

}

// ----- RENDER METHODS -------
function buildBars(type, value, max) {

    const filled = Math.round((value / max) * BAR_COUNT);
    return Array.from({length: BAR_COUNT}, (_,i) =>
        `<div class="st-stat-bar ${i < filled ? 'filled ' + type : ''}"></div>`
    ).join('');

}

function renderDots(wrap) {
  const dotsEl = wrap.querySelector('#st-dots');
  dotsEl.innerHTML = horses.map((_, i) =>
    `<div class="st-dot ${i === currentIndex ? 'active' : ''}" data-idx="${i}"></div>`
  ).join('');

  dotsEl.querySelectorAll('.st-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = Number(dot.dataset.idx);
      renderCard(wrap);
    });
  });
}

function stars(n) {
  return Array.from({length:5}, (_,i) =>
    `<span class="st-star ${i < n ? 'filled' : ''}">★</span>`
  ).join('');
}

function renderCard(wrap) {

    const h = horses[currentIndex];
    const player = getPlayerData();
    const owned  = player.inventory.specialSlots.horse?.id === h.id;

    wrap.querySelector('#st-name').textContent = h.name;
    wrap.querySelector('#st-desc').textContent = h.description;
    wrap.querySelector('#st-rarity').innerHTML = stars(h.rarity);

    wrap.querySelector('#st-bars-slots').innerHTML    = buildBars('slots', h.stats.slots, MAX.slots);
    wrap.querySelector('#st-bars-speed').innerHTML    = buildBars('speed', h.stats.speed, MAX.speed);
    wrap.querySelector('#st-bars-strength').innerHTML = buildBars('strength', h.stats.strength, MAX.strength);

    wrap.querySelector('#st-val-slots').textContent    = h.stats.slots;
    wrap.querySelector('#st-val-speed').textContent    = h.stats.speed;
    wrap.querySelector('#st-val-strength').textContent = h.stats.strength;

    const priceEl  = wrap.querySelector('#st-price');
    const buyBtn   = wrap.querySelector('#st-buy-btn');

    // Avoids player buys already owned horse
    if (owned) {

        priceEl.textContent = 'Owned';
        priceEl.className   = 'st-price owned';
        buyBtn.disabled      = true;
        buyBtn.textContent   = 'Owned';

    } else {

        priceEl.textContent = h.value === 0 ? 'Default' : '$ ' + h.value.toLocaleString();
        priceEl.className   = 'st-price';
        buyBtn.disabled      = false;
        buyBtn.textContent   = 'Purchase';
    }
    buyBtn.dataset.itemId = h.id;

    renderDots(wrap);

    // if (h.modelPath && stableScene) {
    //     loadAvatar(stableScene, h.modelPath);
    // }
}




function setupStableEvents() {

    const wrap = document.querySelector('.st-wrap');

    wrap.querySelector('#st-prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + horses.length) % horses.length;
        renderCard(wrap);
    });

    wrap.querySelector('#st-next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % horses.length;
        renderCard(wrap);
    });

    wrap.querySelector('#st-buy-btn').addEventListener('click', async (e) => {
        const itemId = Number(e.target.dataset.itemId);
        await buyHorse(itemId);
        await updatePlayer();
        renderCard(wrap);
    });

    renderCard(wrap);
}