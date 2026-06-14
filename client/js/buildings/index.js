
import { renderGunshop } from "./gunshop.js";
import { renderStable } from "./stable.js";
import { renderBank } from "./bank.js";
import { renderTradingPost } from './tradingPost.js';

import { getPlayerData } from "../playerState.js";


const RENDERERS = {
  "Gun_shop":      renderGunshop,
  "Stable":        renderStable,
  "Bank":          renderBank,
  "Trading_Post":  renderTradingPost,
};

export function renderBuilding(scenarioData) {
  const render = RENDERERS[scenarioData.id];
  if (!render) return { html: '<h1>UNKNOWN</h1>', setup: () => {} };
  return render(scenarioData);
}