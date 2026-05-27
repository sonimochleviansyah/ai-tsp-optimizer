export function hillClimbing(cities, calculateTotalDistance) {
    let currentRoute = [...cities];
    let currentDistance = calculateTotalDistance(currentRoute);

    let improved = true;

    while (improved) {
        improved = false;

        for (let i = 1; i < currentRoute.length - 1; i++) {
            for (let j = i + 1; j < currentRoute.length; j++) {

                // copy route
                const newRoute = [...currentRoute];

                // swap kota
                [newRoute[i], newRoute[j]] =
                    [newRoute[j], newRoute[i]];

                const newDistance =
                    calculateTotalDistance(newRoute);

                // jika lebih baik
                if (newDistance < currentDistance) {
                    currentRoute = newRoute;
                    currentDistance = newDistance;

                    improved = true;
                }
            }
        }
    }

    return {
        bestRoute: currentRoute,
        bestDistance: currentDistance,
    };
}