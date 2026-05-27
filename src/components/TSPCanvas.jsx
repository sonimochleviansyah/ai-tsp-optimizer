import { useEffect, useRef, useState } from "react";

import { hillClimbing } from "../algorithms/hillClimbing";
import { simulatedAnnealing } from "../algorithms/simulatedAnnealing";
import { geneticAlgorithm } from "../algorithms/geneticAlgorithm";

function TSPCanvas() {

    const canvasRef = useRef(null);

    const [distance, setDistance] =
        useState(0);

    const [iteration, setIteration] =
        useState(0);

    const [cityCount, setCityCount] =
        useState(20);

    const [algorithm, setAlgorithm] =
        useState("hillClimbing");

    const [comparison, setComparison] =
        useState({
            hillClimbing: 0,
            simulatedAnnealing: 0,
            geneticAlgorithm: 0,
        });

    // distance
    const calculateDistance = (
        cityA,
        cityB
    ) => {

        const dx =
            cityA.x - cityB.x;

        const dy =
            cityA.y - cityB.y;

        return Math.sqrt(
            dx * dx + dy * dy
        );
    };

    // total distance
    const calculateTotalDistance = (
        cities
    ) => {

        let total = 0;

        for (
            let i = 0;
            i < cities.length - 1;
            i++
        ) {

            total += calculateDistance(
                cities[i],
                cities[i + 1]
            );
        }

        total += calculateDistance(
            cities[cities.length - 1],
            cities[0]
        );

        return total;
    };

    // draw route
    const drawRoute = (
        ctx,
        route
    ) => {

        // background
        ctx.fillStyle =
            "#0f172a";

        ctx.fillRect(
            0,
            0,
            1200,
            700
        );

        // glow grid
        ctx.strokeStyle =
            "rgba(255,255,255,0.03)";

        for (
            let x = 0;
            x < 1200;
            x += 50
        ) {

            ctx.beginPath();

            ctx.moveTo(x, 0);

            ctx.lineTo(x, 700);

            ctx.stroke();
        }

        for (
            let y = 0;
            y < 700;
            y += 50
        ) {

            ctx.beginPath();

            ctx.moveTo(0, y);

            ctx.lineTo(1200, y);

            ctx.stroke();
        }

        // route line
        ctx.beginPath();

        ctx.moveTo(
            route[0].x,
            route[0].y
        );

        for (
            let i = 1;
            i < route.length;
            i++
        ) {

            ctx.lineTo(
                route[i].x,
                route[i].y
            );
        }

        ctx.lineTo(
            route[0].x,
            route[0].y
        );

        ctx.strokeStyle =
            "#00ffcc";

        ctx.shadowColor =
            "#00ffcc";

        ctx.shadowBlur = 20;

        ctx.lineWidth = 3;

        ctx.stroke();

        // cities
        route.forEach(
            (city, index) => {

                // glow
                ctx.beginPath();

                ctx.arc(
                    city.x,
                    city.y,
                    14,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "rgba(0,255,204,0.15)";

                ctx.fill();

                // node
                ctx.beginPath();

                ctx.arc(
                    city.x,
                    city.y,
                    7,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "#00ffcc";

                ctx.fill();

                // text
                ctx.fillStyle =
                    "white";

                ctx.font =
                    "14px Inter";

                ctx.fillText(
                    index,
                    city.x + 12,
                    city.y - 10
                );
            }
        );
    };

    // draw canvas
    const drawCanvas = async () => {

        const canvas =
            canvasRef.current;

        if (!canvas) return;

        const ctx =
            canvas.getContext("2d");

        // size
        canvas.width = 1200;
        canvas.height = 700;

        // generate cities
        const cities = [];

        for (
            let i = 0;
            i < cityCount;
            i++
        ) {

            cities.push({
                x:
                    Math.random() * 1000 + 80,

                y:
                    Math.random() * 550 + 80,
            });
        }

        // comparison
        const hillResult =
            hillClimbing(
                cities,
                calculateTotalDistance
            );

        const saResult =
            simulatedAnnealing(
                cities,
                calculateTotalDistance
            );

        const gaResult =
            geneticAlgorithm(
                cities,
                calculateTotalDistance
            );

        setComparison({
            hillClimbing:
                hillResult.bestDistance.toFixed(2),

            simulatedAnnealing:
                saResult.bestDistance.toFixed(2),

            geneticAlgorithm:
                gaResult.bestDistance.toFixed(2),
        });

        let result;

        // selected algorithm
        if (
            algorithm ===
            "hillClimbing"
        ) {

            result = hillClimbing(
                cities,
                calculateTotalDistance
            );

        } else if (
            algorithm ===
            "simulatedAnnealing"
        ) {

            result =
                simulatedAnnealing(
                    cities,
                    calculateTotalDistance
                );

        } else {

            result =
                geneticAlgorithm(
                    cities,
                    calculateTotalDistance
                );
        }

        const optimizedCities =
            result.bestRoute;

        // animation
        for (
            let step = 0;
            step < 30;
            step++
        ) {

            setIteration(step + 1);

            const animatedRoute = [
                ...optimizedCities
            ];

            const i = Math.floor(
                Math.random() *
                animatedRoute.length
            );

            const j = Math.floor(
                Math.random() *
                animatedRoute.length
            );

            [
                animatedRoute[i],
                animatedRoute[j]
            ] = [
                    animatedRoute[j],
                    animatedRoute[i]
                ];

            drawRoute(
                ctx,
                animatedRoute
            );

            await new Promise(
                (resolve) =>
                    setTimeout(resolve, 60)
            );
        }

        drawRoute(
            ctx,
            optimizedCities
        );

        setDistance(
            result.bestDistance.toFixed(2)
        );
    };

    useEffect(() => {
        drawCanvas();
    }, []);

    return (

        <div className="ai-layout">

            {/* LEFT PANEL */}
            <div className="left-panel">

                {/* control */}
                <div className="glass-card">

                    <h2 className="panel-title">
                        AI Control Center
                    </h2>

                    <button
                        onClick={drawCanvas}
                        className="generate-btn"
                    >
                        Generate New Route
                    </button>

                    <div className="input-group">

                        <label>
                            Number of Cities
                        </label>

                        <input
                            type="number"
                            value={cityCount}
                            onChange={(e) =>
                                setCityCount(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                        />

                    </div>

                    <div className="input-group">

                        <label>
                            Algorithm
                        </label>

                        <select
                            value={algorithm}
                            onChange={(e) =>
                                setAlgorithm(
                                    e.target.value
                                )
                            }
                        >

                            <option value="hillClimbing">
                                Hill Climbing
                            </option>

                            <option value="simulatedAnnealing">
                                Simulated Annealing
                            </option>

                            <option value="geneticAlgorithm">
                                Genetic Algorithm
                            </option>

                        </select>

                    </div>

                </div>

                {/* live metrics */}
                <div className="glass-card">

                    <h3 className="stats-title">
                        Live AI Metrics
                    </h3>

                    <div className="metric">

                        <span>
                            Distance
                        </span>

                        <strong>
                            {distance}
                        </strong>

                    </div>

                    <div className="metric">

                        <span>
                            Iteration
                        </span>

                        <strong>
                            {iteration}
                        </strong>

                    </div>

                    <div className="metric">

                        <span>
                            Active Algorithm
                        </span>

                        <strong>
                            {algorithm}
                        </strong>

                    </div>

                </div>

                {/* comparison */}
                <div className="glass-card">

                    <h3 className="stats-title">
                        Algorithm Comparison
                    </h3>

                    <div className="comparison-item">

                        <span>
                            Hill Climbing
                        </span>

                        <strong className="green">
                            {
                                comparison.hillClimbing
                            }
                        </strong>

                    </div>

                    <div className="comparison-item">

                        <span>
                            Simulated Annealing
                        </span>

                        <strong className="blue">
                            {
                                comparison.simulatedAnnealing
                            }
                        </strong>

                    </div>

                    <div className="comparison-item">

                        <span>
                            Genetic Algorithm
                        </span>

                        <strong className="pink">
                            {
                                comparison.geneticAlgorithm
                            }
                        </strong>

                    </div>

                </div>

            </div>

            {/* RIGHT PANEL */}
            <div className="right-panel">

                <div className="canvas-card">

                    <div className="canvas-header">

                        <h2>
                            Realtime AI Route
                            Visualization
                        </h2>

                        <div className="live-badge">
                            LIVE
                        </div>

                    </div>

                    <canvas
                        ref={canvasRef}
                        className="main-canvas"
                    />

                </div>

            </div>

        </div>
    );
}

export default TSPCanvas;