import { gbp } from '../data.js';

export default function StickyBar({ remaining, level, onReset }){
  return (
    <div className="sticky-bar">
      <span>💰 Left to spend:</span>
      <span className={"big " + level}>{gbp(remaining)}</span>
      <span>{level === "over" ? "🚨 over budget!" : ""}</span>
      <button id="resetBtn" title="Clear everything and start again" onClick={onReset}>🔄 Start over</button>
    </div>
  );
}
