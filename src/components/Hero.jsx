import Wordmark from './Wordmark.jsx';

export default function Hero(){
  return (
    <header className="hero">
      <div className="sponsor-pill">
        <span className="sponsor-label">Sponsored by</span>
        <Wordmark />
      </div>
      <h1>🎡 London Day Out Planner 🇬🇧</h1>
      <p>Plan your family's perfect day — and see if it fits your budget!</p>
    </header>
  );
}
