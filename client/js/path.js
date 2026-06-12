import { getDistances } from "./gameData";


const VB_W = 508;
const VB_H = 285.75;

function movePlayer(svgPoint) {
  const player = document.getElementById('player_pin');
  player.style.left = (svgPoint.x / VB_W * 100) + '%';
  player.style.top  = (svgPoint.y / VB_H * 100) + '%';
}

export function calculateTrip(origin, destination) {

    const { distance, partial_distances, path } = dijkstra(origin, destination);

    
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

// Calculate the shortest path to a spot
export function dijkstra(start, end) {

    const graph = getDistances()

    const distances = {};
    const visited = new Set();
    const previous = {};

    // Initialize distances
    for (const vertex in graph) {
        distances[vertex] = Infinity;
        previous[vertex] = null;
    }

    distances[start] = 0;

    while (true) {
        let closestVertex = null;
        let shortestDistance = Infinity;

        // Find unvisited vertex with smallest distance
        for (const vertex in distances) {
            if (
                !visited.has(vertex) &&
                distances[vertex] < shortestDistance
            ) {
                shortestDistance = distances[vertex];
                closestVertex = vertex;
            }
        }

        // No reachable vertex left
        if (closestVertex === null) {
            break;
        }

        // Reached destination
        if (closestVertex === end) {
            break;
        }

        visited.add(closestVertex);

        // Update neighbors
        for (const neighbor in graph[closestVertex]) {
            const weight = graph[closestVertex][neighbor];
            const newDistance = distances[closestVertex] + weight;

            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previous[neighbor] = closestVertex;
            }
        }
    }

    // Reconstruct path
    const path = [];
    let current = end;
    let partial_distances = []

    while (current !== null) {
        path.unshift(current);
        const prev = previous[current];

        if (prev !== null) {
            partial_distances.unshift(graph[prev][current]);
        }
        
        current = prev;
    }

    return {
        distance: distances[end],
        partial_distances: partial_distances,
        path,
    };
}
   
