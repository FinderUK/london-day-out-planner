import { DATA } from '../data.js';

export default function FamilyPicker({ family, onStep }){
  return (
    <section className="card">
      <h2>👨‍👩‍👧‍👦 1. Who's coming?</h2>
      <p className="hint">Tickets and train fares are worked out for every person automatically.</p>
      <div className="fam-grid">
        {DATA.categories.map(c => (
          <div className="fam-tile" key={c.key}>
            <div className="emoji">{c.emoji}</div>
            <div className="name">{c.name}</div>
            <div className="ages">{c.ages}</div>
            <div className="stepper">
              <button onClick={() => onStep(c.key, -1)} aria-label={"fewer " + c.name}>−</button>
              <span className="count">{family[c.key]}</span>
              <button onClick={() => onStep(c.key, 1)} aria-label={"more " + c.name}>+</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
