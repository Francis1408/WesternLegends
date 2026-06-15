
import { getItemData } from "../gameData";
import { getPlayerData, updatePlayer } from "../playerState";
import { buyItem } from "../inventory";

export function renderGunshop(scenarioData) {

    const player = getPlayerData();
    const allItems  = scenarioData.items.map(id => getItemData(Number(id))).filter(Boolean);

    // Split into groups
    const weapons    = allItems.filter(i => i.type === 'weapon');
    const ammo       = allItems.filter(i => i.type === 'consumable' && i.ammo_type);
    const tools      = allItems.filter(i => i.type === 'consumable' && !i.ammo_type);

    const stars = (n) => Array.from({length:5}, (_,i) =>
        `<span class="gc-star ${i < n ? 'filled' : ''}">★</span>`
    ).join('');

    console.log(weapons)

    const renderItem = (w) => `
    <div class="gc-item">
      <div class="gc-img-wrap">
        <img src="../img/${w.drawing}" alt="${w.name}" onerror="this.style.display='none'" />
      </div>
      <div class="gc-info">
        <p class="gc-name">${w.name}</p>
        <div class="gc-rarity">${stars(w.rarity)}</div>
        ${w.description ? `<p class="gc-desc">${w.description}</p>` : ''}
        <div class="gc-stats">
          ${w.stats?.damage        ? `<span class="gc-stat">DMG <span>${w.stats.damage[0]}</span></span>` : ''}
          ${w.stats?.ammo_capacity ? `<span class="gc-stat">CAP <span>${w.stats.ammo_capacity}</span></span>` : ''}
          ${w.stats?.mining_stats  ? `<span class="gc-stat">MINE <span>+${w.stats.mining_stats}</span></span>` : ''}
          ${w.max_stack > 1        ? `<span class="gc-stat">STACK <span>${w.max_stack}</span></span>` : ''}
        </div>
        <div class="gc-footer">
          <span class="gc-price">${w.value === 0 ? 'Default' : '$ ' + w.value}</span>
          <button class="gc-buy-btn" data-item-id="${w.id}">Purchase</button>
        </div>
      </div>
    </div>`;

    const renderSection = (label, items) => items.length ? `
        <div class="gc-subheader">${label}</div>
        ${items.map(renderItem).join('')}
    ` : '';

    const buyList = `
        ${renderSection('Weapons',    weapons)}
        ${renderSection('Ammunition', ammo)}
        ${renderSection('Tools',      tools)}
    `;

    
    const ownedWeapons = [
        player.inventory.specialSlots.weapon,
        ...player.inventory.items.filter(i => i.type === 'weapon')
    ].filter(Boolean);

    const upgradeList = ownedWeapons.length ? ownedWeapons.map(o => {
    const w      = getItemData(o.id);
    const maxLvl = w.stats.damage.length;
    const isMax  = o.level >= maxLvl;
    const cost   = !isMax ? w.upgrade_cost[o.level - 1] : null;
    const pips   = Array.from({length: maxLvl}, (_,i) =>
        `<div class="gc-level-pip ${i < o.level ? 'filled' : ''}"></div>`
    ).join('');

    return `
      <div class="gc-upgrade-item">
        <div class="gc-img-wrap">
          <img src="../img/${w.drawing}" alt="${w.name}" />
        </div>
        <div class="gc-info">
          <p class="gc-name">${w.name}</p>
          <div class="gc-level-track">${pips}</div>
          <div class="gc-stats">
            <span class="gc-stat">DMG <span>${w.stats.damage[o.level-1]}</span></span>
            <span class="gc-stat">→</span>
            ${!isMax ? `<span class="gc-stat"><span>${w.stats.damage[o.level]}</span></span>` : ''}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.35rem">
          ${!isMax ? `<span class="gc-upgrade-cost">$ ${cost}</span>` : '<span class="gc-upgrade-cost" style="color:rgba(90,160,90,.7)">Max</span>'}
          <button class="gc-upgrade-btn" data-instance-id="${o.instance_id}" data-cost="${cost}" ${isMax ? 'disabled' : ''}>
            ${isMax ? 'Maxed' : 'Upgrade'}
          </button>
        </div>
      </div>
    `;
  }).join('') : `<div class="gc-empty">No weapons to upgrade</div>`;

  const html = `
    <div class="gc-wrap">
      <div class="gc-header">
        <h1 class="gc-header-title">★ &nbsp; Gun Catalog ; ★</h1>
        <p class="gc-header-sub">finest arms in the territory</p>
        <div class="gc-tabs">
          <input type="radio" name="gc-tab" id="tab-buy" checked />
          <label for="tab-buy">Buy</label>
          <input type="radio" name="gc-tab" id="tab-upgrade" />
          <label for="tab-upgrade">Upgrade</label>
        </div>
      </div>
      <div class="gc-list">
        <div class="gc-page active" id="gc-buy">${buyList}</div>
        <div class="gc-page" id="gc-upgrade">${upgradeList}</div>
      </div>
    </div>
  `;

  return { html, setup: setupGunshopEvents };
}


export function setupGunshopEvents() {

    const gcWrap = document.querySelector('.gc-wrap');

    gcWrap.querySelectorAll('input[name="gc-tab"]').forEach(radio => {
        radio.addEventListener('change', () => {
        gcWrap.querySelectorAll('.gc-page').forEach(p => p.classList.remove('active'));
        gcWrap.querySelector(radio.id === 'tab-buy' ? '#gc-buy' : '#gc-upgrade').classList.add('active');
        });
    });


    // Buy command
    gcWrap.querySelector('#gc-buy')?.addEventListener('click', async e => {
        const btn = e.target.closest('.gc-buy-btn');
        if (!btn) return;
        await buyItem(Number(btn.dataset.itemId), 1);
        await updatePlayer();
    });
}