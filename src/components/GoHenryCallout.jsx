import Wordmark from './Wordmark.jsx';

export default function GoHenryCallout(){
  return (
    <section className="card gh-callout">
      <div className="gh-inner">
        <div className="gh-copy">
          <div className="gh-badge">
            <span className="tag">Sponsored by</span>
            <Wordmark onDark />
          </div>
          <h2>💪 Budgeting is a superpower</h2>
          <p>This planner is brought to you by gohenry — the money app and debit card that helps kids aged 6–18 learn to save, spend smart and earn their own pocket money. Plan today's trip here, then keep building those money skills every day.</p>
          <a className="gh-btn" href="https://www.gohenry.com/uk/" target="_blank" rel="noopener noreferrer">Discover gohenry ↗</a>
        </div>
        <div className="gh-figure">
          <img src="/gohenry-kid.webp" width="900" height="834" loading="lazy"
               alt="A smiling child holding their personalised gohenry debit card and the gohenry money app" />
        </div>
      </div>
    </section>
  );
}
