import { DATA } from './data.js';

export const famTotal = family => Object.values(family).reduce((a, b) => a + b, 0);

const locOf = s => DATA.locations[s.origin];

/* ---- Getting-to-London costs (each returns {total, lines, note}) ---- */
function railCost(s){
  const L = locOf(s);
  if(!L || L.london) return { total:0, lines:[], note: L && L.london ? "You're already in London — no train needed! 🎉" : "" };
  if(L.rail == null) return { total:0, lines:[], note:`No direct train from ${L.name} in this planner — try Car or Coach.` };
  const d = DATA.railDiscounts;
  let adultFare = L.rail, childFare = L.rail * d.childPct, seniorFare = L.rail;
  if(s.railcard){ adultFare *= (1 - d.familyRailcardAdult); childFare *= (1 - d.familyRailcardChild); }
  if(s.seniorRailcard){ seniorFare *= (1 - d.seniorRailcard); }
  const f = s.family;
  const lines = [];
  const aCost = f.adult * adultFare, kCost = (f.teen + f.child) * childFare, sCost = f.senior * seniorFare;
  if(f.adult)         lines.push([`${f.adult} × adult return (${L.name} → ${L.terminal})`, aCost]);
  if(f.teen + f.child) lines.push([`${f.teen + f.child} × child return (half fare)`, kCost]);
  if(f.infant)        lines.push([`${f.infant} × under-5 — free! 🎉`, 0]);
  if(f.senior)        lines.push([`${f.senior} × 60+ return`, sCost]);
  return { total: aCost + kCost + sCost, lines, note:"" };
}

function carCost(s){
  const L = locOf(s);
  if(!L || L.london) return { total:0, lines:[], note: L && L.london ? "You're already in London — no drive needed! 🎉" : "" };
  const fuel = L.miles * 2 * DATA.driving.pencePerMile;
  const park = DATA.driving.parking[s.parking].cost;
  const lines = [[`⛽ Fuel (~${L.miles * 2} miles round trip)`, fuel], [`🅿️ ${DATA.driving.parking[s.parking].name}`, park]];
  let total = fuel + park;
  if(s.congestion){ total += DATA.driving.congestion; lines.push(["🏙️ Congestion Charge", DATA.driving.congestion]); }
  if(s.ulez){ total += DATA.driving.ulez; lines.push(["💨 ULEZ charge", DATA.driving.ulez]); }
  return { total, lines, note:"" };
}

function coachCost(s){
  const L = locOf(s);
  if(!L || L.london) return { total:0, lines:[], note: L && L.london ? "You're already in London — no coach needed! 🎉" : "" };
  if(L.coach == null) return { total:0, lines:[], note:`No direct coach from ${L.name} in this planner — try Train or Car.` };
  const f = s.family;
  const kidFare = L.coach * DATA.coachChildPct;
  const payers = f.adult + f.senior, kids = f.teen + f.child;
  const total = payers * L.coach + kids * kidFare;
  const lines = [];
  if(payers) lines.push([`${payers} × adult coach return (${L.name})`, payers * L.coach]);
  if(kids)   lines.push([`${kids} × child coach return`, kids * kidFare]);
  if(f.infant) lines.push([`${f.infant} × under-3 — free! 🎉`, 0]);
  return { total, lines, note:"" };
}

function aroundTownCost(s){
  const f = s.family, t = DATA.tfl, lines = [];
  let total = 0;
  if(s.tube){
    const a = (f.adult + f.senior) * t.tubeCapZ12, k = f.teen * t.tubeCapZ12 * t.teenPct;
    total += a + k;
    lines.push([`🚇 Tube day cap × ${f.adult + f.senior} adults`, a]);
    if(f.teen) lines.push([`🚇 Tube × ${f.teen} (11–15 half)`, k]);
    if(f.child + f.infant) lines.push([`🚇 ${f.child + f.infant} under-11s — free! 🎉`, 0]);
  }
  if(s.bus){
    const a = (f.adult + f.senior) * t.busCap;
    total += a;
    lines.push([`🚌 Bus day cap × ${f.adult + f.senior} adults`, a]);
    if(f.teen + f.child + f.infant) lines.push([`🚌 ${f.teen + f.child + f.infant} kids — free on buses! 🎉`, 0]);
  }
  return { total, lines };
}

export function travelCost(s){
  let main = { total:0, lines:[], note:"" };
  if(s.travelMode === "train") main = railCost(s);
  if(s.travelMode === "car")   main = carCost(s);
  if(s.travelMode === "coach") main = coachCost(s);
  const around = aroundTownCost(s);
  return { total: main.total + around.total, lines: [...main.lines, ...around.lines], note: main.note || "" };
}

/* ---- Per-item prices ---- */
export function activityPrice(a, family){
  if(a.free) return 0;
  const f = family;
  return f.adult * a.adult
       + f.teen * (a.teen ?? a.adult)
       + f.child * (a.child ?? a.adult)
       + f.infant * (a.infant ?? 0)        // most attractions are free for under-5s
       + f.senior * (a.senior ?? a.adult);
}

export function foodPrice(fd, family){
  const f = family;
  return (f.adult + f.senior) * fd.adult + (f.teen + f.child + f.infant) * fd.kid;
}

export function extraPrice(x, family){
  const f = family;
  if(x.per === "family") return x.cost;
  if(x.per === "kid")    return x.cost * (f.teen + f.child + f.infant);
  return x.cost * famTotal(family);
}

const sum = arr => arr.reduce((a, b) => a + b, 0);

export function totals(s){
  const travel = travelCost(s).total;
  const acts   = sum(s.activities.map(i => activityPrice(DATA.activities[i], s.family)));
  const food   = sum(s.food.map(i => foodPrice(DATA.food[i], s.family)));
  const extras = sum(s.extras.map(i => extraPrice(DATA.extras[i], s.family)));
  return { travel, acts, food, extras, grand: travel + acts + food + extras };
}
