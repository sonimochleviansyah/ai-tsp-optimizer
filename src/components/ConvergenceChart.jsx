import {
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function ConvergenceChart({
    comparison,
}) {

    const data = {
        labels: [
            "Hill Climbing",
            "Simulated Annealing",
            "Genetic Algorithm",
        ],

        datasets: [
            {
                label: "Distance",

                data: [
                    Number(
                        comparison.hillClimbing
                    ),

                    Number(
                        comparison.simulatedAnnealing
                    ),

                    Number(
                        comparison.geneticAlgorithm
                    ),
                ],

                borderColor: "#00ffcc",

                backgroundColor:
                    "rgba(0,255,204,0.2)",

                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,

        plugins: {
            legend: {
                labels: {
                    color: "white",
                },
            },

            title: {
                display: true,

                text:
                    "Algorithm Performance",

                color: "white",
            },
        },

        scales: {
            x: {
                ticks: {
                    color: "white",
                },
            },

            y: {
                ticks: {
                    color: "white",
                },
            },
        },
    };

    return (
        <div
            style={{
                width: "700px",
                margin: "0 auto",
                backgroundColor: "#1f2937",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "30px",
            }}
        >
            <Line
                data={data}
                options={options}
            />
        </div>
    );
}

export default ConvergenceChart;