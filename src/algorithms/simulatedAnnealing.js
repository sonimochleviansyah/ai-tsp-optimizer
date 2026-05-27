export function simulatedAnnealing(
    cities,
    calculateTotalDistance
) {
    let currentRoute = [...cities];
    let bestRoute = [...cities];

    let currentDistance =
        calculateTotalDistance(currentRoute);

    let bestDistance = currentDistance;

    // suhu awal
    let temperature = 1000;

    // cooling rate
    const coolingRate = 0.995;

    while (temperature > 1) {

        // copy route
        const newRoute = [...currentRoute];

        // pilih 2 kota random
        const i = Math.floor(
            Math.random() * newRoute.length
        );

        const j = Math.floor(
            Math.random() * newRoute.length
        );

        // swap kota
        [newRoute[i], newRoute[j]] =
            [newRoute[j], newRoute[i]];

        const newDistance =
            calculateTotalDistance(newRoute);

        // selisih
        const delta =
            newDistance - currentDistance;

        // jika lebih baik
        // atau diterima probabilistik
        if (
            delta < 0 ||
            Math.random() <
            Math.exp(-delta / temperature)
        ) {
            currentRoute = [...newRoute];
            currentDistance = newDistance;
        }

        // update best
        if (currentDistance < bestDistance) {
            bestRoute = [...currentRoute];
            bestDistance = currentDistance;
        }

        // turunkan suhu
        temperature *= coolingRate;
    }

    return {
        bestRoute,
        bestDistance,
    };
}