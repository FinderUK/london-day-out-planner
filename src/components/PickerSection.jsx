import { DATA, gbp, urlFor } from '../data.js';
import { activityPrice, foodPrice, extraPrice } from '../pricing.js';

// Per-kind configuration so one component serves activities, food and extras.
const CONFIG = {
  activity: {
    list: () => DATA.activities, price: activityPrice, allowSearch: true, showLearn: true, addClass: "",
    stepNo: 3, emoji: "🎢", title: "Pick your activities",
    hint: "Choose from the list and press Add — tickets for everyone are added automatically. Lots are FREE! 🆓",
    dedupe: true,
    preview: (item, family) => item.free ? "FREE for everyone! 🎉" : `${gbp(activityPrice(item, family))} for your family`,
    chipNote: (item) => item.note || "",
  },
  food: {
    list: () => DATA.food, price: foodPrice, allowSearch: false, showLearn: true, addClass: "pink",
    stepNo: 4, emoji: "🍔", title: "Food & drinks",
    hint: "Add lunch, dinner and treats. Prices are per person, so feeding the whole family is counted for you.",
    dedupe: false,
    preview: (item, family) => `${gbp(foodPrice(item, family))} for your family`,
    chipNote: (item) => `£${item.adult.toFixed(2)} adult / £${item.kid.toFixed(2)} kid`,
  },
  extra: {
    list: () => DATA.extras, price: extraPrice, allowSearch: false, showLearn: false, addClass: "teal",
    stepNo: 5, emoji: "🎒", title: "Anything else?",
    hint: "The little things families always end up buying…",
    dedupe: true,
    preview: (item, family) => gbp(extraPrice(item, family)),
    chipNote: (item) => item.per === "family" ? "per family" : (item.per === "kid" ? "per kid" : "per person"),
  },
};

export default function PickerSection({ kind, options, selected, setSelected, added, setAdded, family }){
  const cfg = CONFIG[kind];
  const list = cfg.list();
  const selectedItem = list[selected];
  const categoryTotal = added.reduce((sum, i) => sum + cfg.price(list[i], family), 0);
  const learnUrl = cfg.showLearn && selectedItem ? urlFor(selectedItem, cfg.allowSearch) : null;

  const add = () => {
    if(cfg.dedupe && added.includes(selected)) return;
    setAdded([...added, selected]);
  };
  const remove = pos => setAdded(added.filter((_, p) => p !== pos));

  return (
    <section className="card">
      <h2>{cfg.emoji} {cfg.stepNo}. {cfg.title} <span className="cost-chip">{gbp(categoryTotal)}</span></h2>
      <p className="hint">{cfg.hint}</p>

      <div className="picker">
        <select value={selected} onChange={e => setSelected(+e.target.value)}>
          {options.map(({ item, i }) => <option key={i} value={i}>{item.name}</option>)}
        </select>
        <span className="price-preview">{selectedItem ? cfg.preview(selectedItem, family) : ""}</span>
        <button className={"add-btn " + cfg.addClass} onClick={add}>+ Add</button>
      </div>

      {learnUrl &&
        <div className="learn-row">
          <a className="learn" href={learnUrl} target="_blank" rel="noopener noreferrer" title="Open website in a new tab">
            🔎 Learn more about {selectedItem.name} ↗
          </a>
        </div>}

      <div className="chips">
        {added.map((i, pos) => {
          const item = list[i];
          const price = cfg.price(item, family);
          const note = cfg.chipNote(item);
          const url = cfg.showLearn ? urlFor(item, cfg.allowSearch) : null;
          return (
            <div className="chip" key={pos}>
              <span>{item.name}{note && <span className="who"> {note}</span>}</span>
              {url &&
                <a className="chip-link" href={url} target="_blank" rel="noopener noreferrer" title="Open website in a new tab">↗</a>}
              <span className={"chip-price" + (price === 0 ? " free" : "")}>{price === 0 ? "FREE 🎉" : gbp(price)}</span>
              <button onClick={() => remove(pos)} aria-label="remove">✕</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
