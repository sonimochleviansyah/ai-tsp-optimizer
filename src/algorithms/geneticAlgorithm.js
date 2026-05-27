export function geneticAlgorithm(
    cities,
    calculateTotalDistance
) {

    const populationSize = 50;
    const generations = 200;
    const mutationRate = 0.02;

    // shuffle route
    const shuffle = (array) => {
        const arr = [...array];

        for (
            let i = arr.length - 1;
            i > 0;
            i--
        ) {
            const j = Math.floor(
                Math.random() * (i + 1)
            );

            [arr[i], arr[j]] =
                [arr[j], arr[i]];
        }

        return arr;
    };

    // buat populasi awal
    let population = [];

    for (
        let i = 0;
        i < populationSize;
        i++
    ) {
        population.push(shuffle(cities));
    }

    let bestRoute = population[0];
    let bestDistance =
        calculateTotalDistance(bestRoute);

    // evolusi
    for (
        let generation = 0;
        generation < generations;
        generation++
    ) {

        // sort berdasarkan fitness
        population.sort(
            (a, b) =>
                calculateTotalDistance(a) -
                calculateTotalDistance(b)
        );

        // solusi terbaik
        if (
            calculateTotalDistance(population[0]) <
            bestDistance
        ) {
            bestRoute = population[0];

            bestDistance =
                calculateTotalDistance(bestRoute);
        }

        const newPopulation = [];

        // elitism
        newPopulation.push(population[0]);

        while (
            newPopulation.length <
            populationSize
        ) {

            // parent selection
            const parent1 =
                population[
                Math.floor(
                    Math.random() * 10
                )
                ];

            const parent2 =
                population[
                Math.floor(
                    Math.random() * 10
                )
                ];

            // crossover sederhana
            const child = [];

            const start = Math.floor(
                Math.random() * cities.length
            );

            const end = Math.floor(
                Math.random() * cities.length
            );

            for (
                let i = Math.min(start, end);
                i <= Math.max(start, end);
                i++
            ) {
                child[i] = parent1[i];
            }

            parent2.forEach((city) => {
                if (!child.includes(city)) {

                    for (
                        let i = 0;
                        i < cities.length;
                        i++
                    ) {
                        if (!child[i]) {
                            child[i] = city;
                            break;
                        }
                    }
                }
            });

            // mutasi
            if (Math.random() < mutationRate) {

                const i = Math.floor(
                    Math.random() * cities.length
                );

                const j = Math.floor(
                    Math.random() * cities.length
                );

                [child[i], child[j]] =
                    [child[j], child[i]];
            }

            newPopulation.push(child);
        }

        population = newPopulation;
    }

    return {
        bestRoute,
        bestDistance,
    };
}