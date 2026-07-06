# 🎡 London Day Out Planner

A kid-friendly, single-page web app that helps families plan and budget a day out in London.

Set a budget at the top, add your family members, then pick travel, activities, food and
extras — the running total and "left to spend" update live so kids can see exactly what
fits their budget.

## Features

- **Adjustable budget** with a live progress bar and over/under-budget warnings.
- **Flexible family** — steppers for adults, older kids (11–15), kids (5–10), little ones
  (under 5) and grandparents (60+). Every price is worked out per person automatically.
- **Dynamic travel** from one **starting location** selector that drives all modes:
  - 🚆 **Train** — adult Off-Peak Day Returns to the right London terminal, with 50% child
    fares, free under-5s, and Family & Friends / Senior Railcard discounts.
  - 🚗 **Car** — fuel estimate by distance, parking tiers, Congestion Charge and ULEZ.
  - 🚌 **Coach** — typical day-return fares where a direct service exists.
  - 📍 **Already in London** — no getting-there cost.
  - 🚇 **Getting around London** — TfL tube/bus daily caps with correct child concessions.
- **Activities** — 30+ options including many **free** museums and parks; tickets for the
  whole family are added automatically.
- **Food & drink** — per-person prices with kids' menu rates.
- **Extras** — souvenirs, photos, ponchos, contingency and more.
- **Live summary** and a sticky "left to spend" bar.
- Plans are saved to `localStorage`, so a refresh keeps your choices.

## Running it

It's a single self-contained file — no build step, no dependencies.

```bash
# just open it
open index.html

# or serve it locally
python3 -m http.server 8000   # then visit http://localhost:8000
```

## About the prices

Prices were researched (July 2026) from official sources — attraction websites,
[National Rail](https://www.nationalrail.co.uk) and [TfL](https://tfl.gov.uk) — and are
baked into the `DATA` object in [`index.html`](index.html). Real prices change and vary by
date, time and how far ahead you book, so **always double-check before you travel**. To
update a price, edit the relevant entry in `DATA`.

## Tech

Plain HTML, CSS and vanilla JavaScript in one file. No frameworks, no external requests.
