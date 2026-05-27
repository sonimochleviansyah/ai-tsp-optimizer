import TSPCanvas from "./components/TSPCanvas";

function App() {

  return (
    <div className="app">

      {/* background effects */}
      <div className="bg-orb orb1"></div>
      <div className="bg-orb orb2"></div>
      <div className="bg-grid"></div>

      {/* floating particles */}
      <div className="particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* HERO */}
      <section className="hero">

        <div className="hero-badge">
          AI POWERED OPTIMIZATION
        </div>

        <h1 className="hero-title">
          AI TSP
          <span> Optimizer</span>
        </h1>

        <p className="hero-subtitle">
          Advanced Traveling Salesman
          Problem visualization using
          Hill Climbing, Simulated
          Annealing, and Genetic
          Algorithm with realtime AI
          optimization simulation.
        </p>

      </section>

      {/* MAIN */}
      <main className="dashboard">

        <TSPCanvas />

      </main>

      {/* FOOTER */}
      <footer className="footer">

        <div>
          Built with React + Artificial
          Intelligence Algorithms
        </div>

        <div className="footer-glow"></div>

      </footer>
    </div>
  );
}

export default App;