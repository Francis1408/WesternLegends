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

const VB_W = 508;
const VB_H = 285.75;

function movePlayer(svgPoint) {
  const player = document.getElementById('player_pin');
  player.style.left = (svgPoint.x / VB_W * 100) + '%';
  player.style.top  = (svgPoint.y / VB_H * 100) + '%';
}

export function travelRoute(origin, destination, duration = 4000, onComplete = null) {


    const main_path = `route-${origin}-${destination}`.toLowerCase()


    // Get the element
    const path = document.getElementById(main_path);
  

    const len = path.getTotalLength();

    path.style.strokeDasharray  = len;
    path.style.strokeDashoffset = len;
    path.style.visibility = 'visible';

    movePlayer(path.getPointAtLength(0))

    let startTime = null;

    // Handles the move animation
    function animate(timestamp) {

        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        path.style.strokeDashoffset = len * (1 - progress);

        // If reversed, walk from len → 0 instead of 0 → len
        const distance = len * progress;
        movePlayer(path.getPointAtLength(distance));

        if (progress < 1) {
        requestAnimationFrame(animate);
        } else {
        path.style.visibility = 'hidden';
        if (onComplete) onComplete();
        }
  }

  requestAnimationFrame(animate);
}

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

