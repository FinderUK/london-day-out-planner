import { gbp } from '../data.js';
import { famTotal } from '../pricing.js';

function Line({ emoji, label, value }){
  return (
    <div className="summary-line">
      <span className="cat">{emoji} {label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function Summary({ s, t }){
  const people = famTotal(s.family);
  return (
    <section className="card">
      <h2>🧾 Your day out</h2>
      <div className="summary-list">
        <Line emoji="👨‍👩‍👧‍👦" label="Family" value={`${people} ${people === 1 ? "person" : "people"}`} />
        <Line emoji="🚆" label="Travel" value={gbp(t.travel)} />
        <Line emoji="🎢" label={`Activities (${s.activities.length})`} value={gbp(t.acts)} />
        <Line emoji="🍔" label={`Food (${s.food.length})`} value={gbp(t.food)} />
        <Line emoji="🎒" label={`Extras (${s.extras.length})`} value={gbp(t.extras)} />
      </div>
      <div className="grand"><span>Total cost</span><span>{gbp(t.grand)}</span></div>
    </section>
  );
}
