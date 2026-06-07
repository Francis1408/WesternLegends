// const path   = document.getElementById('route-redrock-terminus');
// const player = document.getElementById('player');

// const len      = path.getTotalLength();
// const duration = 4000; // ms — adjust for travel speed

// // Set up the dash trick — path starts invisible
// path.style.strokeDasharray  = len;
// path.style.strokeDashoffset = len;

// // Place player at start
// const start_point = path.getPointAtLength(0);
// player.setAttribute('cx', start_point.x);
// player.setAttribute('cy', start_point.y);

// // Animate
// let startTime = null;

// function animate(timestamp) {
//   if (!startTime) startTime = timestamp;

//   const progress = Math.min((timestamp - startTime) / duration, 1); // 0 → 1

//   // Draw the trail
//   path.style.strokeDashoffset = len * (1 - progress);

//   // Move the player
//   const point = path.getPointAtLength(progress * len);
//   player.setAttribute('cx', point.x);
//   player.setAttribute('cy', point.y);

//   if (progress < 1) requestAnimationFrame(animate);
// }

// requestAnimationFrame(animate);

export async function loadRoutes() {

    const res  = await fetch('../img/routes.svg');
    const text = await res.text();
    const parser = new DOMParser();
    const svg = parser.parseFromString(text, 'image/svg+xml').querySelector('svg');

    // Apply the overlay classes
    svg.classList.add('map_svg');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    document.querySelector('.map_display').insertBefore(
        svg,
        document.querySelector('.map_display .pin') // insert before the first pin
    );

}

