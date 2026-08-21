import { gbp } from '../data.js';

export default function BudgetPanel({ budget, spent, remaining, level, pct, onBudget }){
  const showOk = level !== "over" && spent > 0 && remaining >= 0;
  const okText = remaining === 0
    ? "🎯 Spot on — every penny planned!"
    : `👍 Looking good! You'd still have ${gbp(remaining)} in your pocket.`;

  return (
    <div className="budget-panel">
      <div className="budget-row">
        <div className="budget-input">
          <label htmlFor="budget">💰 Your budget</label>
          <div className="money">£
            <input id="budget" type="number" min="0" step="5" inputMode="numeric"
                   value={budget}
                   onChange={e => onBudget(e.target.value)} />
          </div>
        </div>
        <div className="budget-stats">
          <div className="stat"><div className="lbl">Spent</div><div className="val">{gbp(spent)}</div></div>
          <div className="stat"><div className="lbl">Left to spend</div>
            <div className={"val " + level} id="remainingVal">{gbp(remaining)}</div>
          </div>
        </div>
      </div>
      <div className="bar">
        <div className={"bar-fill" + (level === "ok" ? "" : " " + level)} id="barFill"
             style={{ width: pct + "%" }} />
      </div>
      {level === "over" &&
        <div id="overMsg">🚨 Uh oh — you're over budget! Try removing something, picking a free museum, or packing a picnic. 🥪</div>}
      {showOk && <div id="okMsg">{okText}</div>}
    </div>
  );
}
