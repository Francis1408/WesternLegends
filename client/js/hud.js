import { getPlayerData } from "./playerState";
import { clearSession } from './auth.js';

export function initHUD() {

    const player = getPlayerData()

    document.getElementById('hdr-player-name').textContent = player.name;
    document.getElementById('hdr-gold-val').textContent    = '$ ' + player.gold.toLocaleString();
    document.getElementById('hdr-lvl').textContent         = 'LVL ' + player.level;

    const xpPct = Math.round((player.experience / 100) * 100);
    document.getElementById('hdr-xp-bar').style.width = xpPct + '%';

    if (player.drawingUrl) {
        const img = document.createElement('img');
        img.src = player.drawingUrl;
        const avatar = document.getElementById('hdr-avatar');
        avatar.innerHTML = '';
        avatar.appendChild(img);
    }

    renderEnergyPips(player.energy);


    // Bind events
    document.getElementById('hdr-avatar').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('hdr-dropdown').classList.toggle('open');
    });

    document.addEventListener('click', () => {
    document.getElementById('hdr-dropdown').classList.remove('open');
    });

    document.getElementById('hdr-logout').addEventListener('click', () => {
        clearSession();
        window.location.href = '/auth.html';
    });


}

export function updateHUD(player) {

    document.getElementById('hdr-gold-val').textContent = '$ ' + player.gold.toLocaleString();
    document.getElementById('hdr-lvl').textContent      = 'LVL ' + player.level;
    document.getElementById('hdr-xp-bar').style.width   = Math.round((player.experience / 100) * 100) + '%';
    renderEnergyPips(player.energy);
}

function renderEnergyPips(energy) {

    const PIPS     = 6;
    const PIP_SIZE = 100;
    const wrap     = document.getElementById('hdr-energy-pips');
    wrap.innerHTML = '';

    for (let i = 0; i < PIPS; i++) {
    const filled = Math.min(Math.max(energy - i * PIP_SIZE, 0), PIP_SIZE);
    const pct    = Math.round((filled / PIP_SIZE) * 100);
    wrap.innerHTML += `
        <div class="hdr-pip">
        <div class="hdr-pip-fill" style="width:${pct}%"></div>
        </div>`;

    }
}