import { useState } from 'react';
import { DATA, blankState, gbp, ACT_OPTS, FOOD_OPTS, EXTRA_OPTS } from './data.js';
import { totals } from './pricing.js';
import Hero from './components/Hero.jsx';
import BudgetPanel from './components/BudgetPanel.jsx';
import FamilyPicker from './components/FamilyPicker.jsx';
import TravelSection from './components/TravelSection.jsx';
import PickerSection from './components/PickerSection.jsx';
import Summary from './components/Summary.jsx';
import GoHenryCallout from './components/GoHenryCallout.jsx';
import StickyBar from './components/StickyBar.jsx';
import Wordmark from './components/Wordmark.jsx';

export default function App(){
  const [s, setS] = useState(blankState);
  // Which option is highlighted in each picker (defaults to the alphabetically first).
  const [actSel, setActSel]     = useState(ACT_OPTS[0].i);
  const [foodSel, setFoodSel]   = useState(FOOD_OPTS[0].i);
  const [extraSel, setExtraSel] = useState(EXTRA_OPTS[0].i);

  const update = patch => setS(prev => ({ ...prev, ...patch }));

  const stepFamily = (k, d) =>
    setS(prev => ({ ...prev, family: { ...prev.family, [k]: Math.max(0, Math.min(12, prev.family[k] + d)) } }));

  const setOrigin = i => setS(prev => {
    // keep mode sensible: Central London → "already here"; a real town → default to train
    const mode = DATA.locations[i].london ? "local" : (prev.travelMode === "local" ? "train" : prev.travelMode);
    return { ...prev, origin: i, travelMode: mode };
  });

  const setTube = v => update({ tube: v, ...(v ? { bus: false } : {}) });
  const setBus  = v => update({ bus: v, ...(v ? { tube: false } : {}) });

  const reset = () => {
    if(!window.confirm("Start over? This clears your budget, family and everything you've picked.")) return;
    setS(blankState());
    setActSel(ACT_OPTS[0].i);
    setFoodSel(FOOD_OPTS[0].i);
    setExtraSel(EXTRA_OPTS[0].i);
  };

  const t = totals(s);
  const remaining = s.budget - t.grand;
  const level = remaining < 0 ? "over" : (s.budget > 0 && remaining < s.budget * 0.15 ? "warn" : "ok");
  const pct = s.budget > 0 ? Math.min(100, t.grand / s.budget * 100) : (t.grand > 0 ? 100 : 0);

  return (
    <>
      <Hero />
      <div className="wrap">
        <BudgetPanel budget={s.budget} spent={t.grand} remaining={remaining} level={level} pct={pct}
          onBudget={v => update({ budget: Math.max(0, +v || 0) })} />

        <FamilyPicker family={s.family} onStep={stepFamily} />

        <TravelSection s={s}
          onOrigin={setOrigin}
          onMode={m => update({ travelMode: m })}
          onParking={i => update({ parking: i })}
          onToggle={(k, v) => update({ [k]: v })}
          onTube={setTube} onBus={setBus} />

        <PickerSection kind="activity" options={ACT_OPTS} selected={actSel} setSelected={setActSel}
          added={s.activities} setAdded={a => update({ activities: a })} family={s.family} />
        <PickerSection kind="food" options={FOOD_OPTS} selected={foodSel} setSelected={setFoodSel}
          added={s.food} setAdded={a => update({ food: a })} family={s.family} />
        <PickerSection kind="extra" options={EXTRA_OPTS} selected={extraSel} setSelected={setExtraSel}
          added={s.extras} setAdded={a => update({ extras: a })} family={s.family} />

        <Summary s={s} t={t} />

        <GoHenryCallout />

        <p className="footnote">
          {`Prices last checked ${DATA.updated} from official sources (attraction websites, National Rail, TfL). `}
          Real prices change and can vary by date, time and how far ahead you book — always double-check before you travel!
        </p>

        <div className="sponsor-footer">
          <span className="sponsor-label">Sponsored by</span>
          <a href="https://www.gohenry.com/uk/" target="_blank" rel="noopener noreferrer" aria-label="gohenry">
            <Wordmark />
          </a>
        </div>
      </div>

      <StickyBar remaining={remaining} level={level} onReset={reset} />
    </>
  );
}
