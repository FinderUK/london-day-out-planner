import { DATA, MODES, gbp } from '../data.js';
import { travelCost } from '../pricing.js';

function Toggle({ checked, onChange, children }){
  return (
    <label className={"toggle" + (checked ? " on" : "")}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      {children}
    </label>
  );
}

export default function TravelSection({ s, onOrigin, onMode, onParking, onToggle, onTube, onBus }){
  const tb = travelCost(s);

  return (
    <section className="card">
      <h2>🚂 2. Getting to London <span className="cost-chip">{gbp(tb.total)}</span></h2>
      <p className="hint">First pick where you're starting from, then choose how you'll travel. The price updates for your whole family automatically.</p>

      <div className="field">
        <label htmlFor="originSel">📍 Starting location</label>
        <select id="originSel" value={s.origin} onChange={e => onOrigin(+e.target.value)}>
          {DATA.locations.map((L, i) => <option key={i} value={i}>{L.name}</option>)}
        </select>
      </div>

      <div className="mode-tabs">
        {MODES.map(m => (
          <button key={m.key}
                  className={"mode-tab" + (s.travelMode === m.key ? " active" : "")}
                  onClick={() => onMode(m.key)}>{m.label}</button>
        ))}
      </div>

      {s.travelMode === "train" &&
        <div className="travel-pane">
          <div className="toggles">
            <Toggle checked={s.railcard} onChange={v => onToggle("railcard", v)}>
              🎫 Family &amp; Friends Railcard <span className="who">(⅓ off adults, 60% off kids)</span>
            </Toggle>
            <Toggle checked={s.seniorRailcard} onChange={v => onToggle("seniorRailcard", v)}>
              🎫 Senior Railcard <span className="who">(⅓ off 60+ fares)</span>
            </Toggle>
          </div>
        </div>}

      {s.travelMode === "car" &&
        <div className="travel-pane">
          <div className="inline-fields">
            <div className="field">
              <label htmlFor="parkingSel">🅿️ Parking</label>
              <select id="parkingSel" value={s.parking} onChange={e => onParking(+e.target.value)}>
                {DATA.driving.parking.map((p, i) =>
                  <option key={i} value={i}>{p.name} — £{p.cost.toFixed(2)}</option>)}
              </select>
            </div>
          </div>
          <div className="toggles">
            <Toggle checked={s.congestion} onChange={v => onToggle("congestion", v)}>🏙️ Congestion Charge zone</Toggle>
            <Toggle checked={s.ulez} onChange={v => onToggle("ulez", v)}>💨 ULEZ charge (older vehicles)</Toggle>
          </div>
        </div>}

      {s.travelMode === "coach" &&
        <div className="travel-pane">
          <p className="hint" style={{ marginBottom: 0 }}>Budget option! A typical National Express / megabus day return to London Victoria.</p>
        </div>}

      {s.travelMode === "local" &&
        <div className="travel-pane">
          <p className="hint" style={{ marginBottom: 0 }}>Already in London? No getting-there cost — just pick how you'll get around below. 👇</p>
        </div>}

      <h2 style={{ marginTop: 20 }}>🚇 Getting around London</h2>
      <div className="toggles">
        <Toggle checked={s.tube} onChange={onTube}>🚇 Tube &amp; rail day cap (Zones 1–2)</Toggle>
        <Toggle checked={s.bus} onChange={onBus}>🚌 Buses only (day cap)</Toggle>
        <Toggle checked={s.walk} onChange={v => onToggle("walk", v)}>🚶 Walking (free!)</Toggle>
      </div>
      <p className="hint" style={{ marginTop: 8 }}>Kids under 11 travel free on TfL with an adult; 11–15s with a Zip card go free on buses and half price on the tube. Tick tube <em>or</em> bus — buses are cheaper but slower.</p>

      <div className="breakdown">
        {tb.note && <div className="note"><span>{tb.note}</span><span></span></div>}
        {tb.lines.map(([label, cost], i) => (
          <div key={i}><span>{label}</span><span className="money-sm">{cost === 0 ? "FREE" : gbp(cost)}</span></div>
        ))}
        {tb.lines.length > 0 &&
          <div className="total"><span><strong>Travel total</strong></span><span className="money-sm"><strong>{gbp(tb.total)}</strong></span></div>}
        {tb.lines.length === 0 && !tb.note &&
          <div><span>No travel costs yet — choose an option above.</span><span></span></div>}
      </div>
    </section>
  );
}
