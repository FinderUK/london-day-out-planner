/* =====================================================================
   PRICING DATABASE  (researched July 2026 from official sources:
   attraction websites, nationalrail.co.uk, tfl.gov.uk — see footnote)
   ===================================================================== */
export const DATA = {
  updated: "July 2026",

  // person categories
  categories: [
    { key:"adult",  name:"Adults",     emoji:"🧑",  ages:"16 – 59",        default:2 },
    { key:"teen",   name:"Older kids", emoji:"🧒",  ages:"11 – 15",        default:0 },
    { key:"child",  name:"Kids",       emoji:"👧",  ages:"5 – 10",         default:2 },
    { key:"infant", name:"Little ones",emoji:"👶",  ages:"Under 5",        default:0 },
    { key:"senior", name:"Grandparents", emoji:"🧓", ages:"60+",           default:0 },
  ],

  // ONE unified starting-location list. Each place carries everything the
  // travel modes need: rail (adult Off-Peak Day Return + London terminal),
  // driving miles (one way), and coach adult day-return (null = no direct coach).
  // Index 0 is "already in London" so the selector always has a sensible default.
  locations: [
    { name:"📍 Central London (I'm already here)", london:true },
    { name:"Aylesbury",            terminal:"Marylebone",       rail:18.50, miles:40, coach:null },
    { name:"Basingstoke",          terminal:"Waterloo",         rail:27.00, miles:48, coach:null },
    { name:"Bedford",              terminal:"St Pancras",       rail:26.00, miles:50, coach:null },
    { name:"Birmingham New Street",terminal:"Euston",           rail:45.00, miles:120, coach:14 },
    { name:"Brighton",             terminal:"Victoria",         rail:37.00, miles:54, coach:14 },
    { name:"Bristol Temple Meads", terminal:"Paddington",       rail:55.00, miles:120, coach:16 },
    { name:"Bromley South",        terminal:"Victoria",         rail:9.00,  miles:12, coach:null },
    { name:"Cambridge",            terminal:"King's Cross",     rail:27.60, miles:60, coach:15 },
    { name:"Chatham",              terminal:"Victoria",         rail:16.00, miles:30, coach:null },
    { name:"Chelmsford",           terminal:"Liverpool Street", rail:22.50, miles:33, coach:null },
    { name:"Colchester",           terminal:"Liverpool Street", rail:29.00, miles:57, coach:null },
    { name:"Coventry",             terminal:"Euston",           rail:40.00, miles:95, coach:13 },
    { name:"Croydon (East Croydon)",terminal:"Victoria",        rail:8.00,  miles:12, coach:null },
    { name:"Dartford",             terminal:"Charing Cross",    rail:10.50, miles:20, coach:null },
    { name:"Enfield Town",         terminal:"Liverpool Street", rail:7.50,  miles:12, coach:null },
    { name:"Epsom",                terminal:"Waterloo",         rail:12.00, miles:15, coach:null },
    { name:"Gatwick / Crawley",    terminal:"Victoria",         rail:20.00, miles:30, coach:null },
    { name:"Gravesend",            terminal:"Charing Cross",    rail:12.50, miles:24, coach:null },
    { name:"Guildford",            terminal:"Waterloo",         rail:20.00, miles:29, coach:null },
    { name:"Harrow-on-the-Hill",   terminal:"Marylebone",       rail:7.00,  miles:12, coach:null },
    { name:"Hemel Hempstead",      terminal:"Euston",           rail:16.00, miles:26, coach:null },
    { name:"High Wycombe",         terminal:"Marylebone",       rail:15.00, miles:30, coach:null },
    { name:"Ipswich",              terminal:"Liverpool Street", rail:36.00, miles:75, coach:16 },
    { name:"Kingston upon Thames", terminal:"Waterloo",         rail:9.00,  miles:12, coach:null },
    { name:"Luton",                terminal:"St Pancras",       rail:18.00, miles:32, coach:11 },
    { name:"Maidstone East",       terminal:"Victoria",         rail:21.50, miles:37, coach:null },
    { name:"Milton Keynes Central",terminal:"Euston",           rail:29.00, miles:50, coach:13 },
    { name:"Northampton",          terminal:"Euston",           rail:30.00, miles:70, coach:12 },
    { name:"Norwich",              terminal:"Liverpool Street", rail:42.00, miles:115, coach:18 },
    { name:"Oxford",               terminal:"Paddington",       rail:32.00, miles:56, coach:16 },
    { name:"Peterborough",         terminal:"King's Cross",     rail:32.00, miles:80, coach:14 },
    { name:"Portsmouth & Southsea",terminal:"Waterloo",         rail:40.00, miles:74, coach:17 },
    { name:"Reading",              terminal:"Paddington",       rail:28.30, miles:40, coach:14 },
    { name:"Redhill",              terminal:"Victoria",         rail:14.00, miles:22, coach:null },
    { name:"Richmond",             terminal:"Waterloo",         rail:6.50,  miles:10, coach:null },
    { name:"Romford",              terminal:"Liverpool Street", rail:8.50,  miles:16, coach:null },
    { name:"Sevenoaks",            terminal:"Charing Cross",    rail:15.50, miles:26, coach:null },
    { name:"Slough",               terminal:"Paddington",       rail:13.00, miles:22, coach:null },
    { name:"Southampton Central",  terminal:"Waterloo",         rail:41.00, miles:79, coach:18 },
    { name:"Southend Central",     terminal:"Fenchurch Street", rail:19.00, miles:42, coach:null },
    { name:"St Albans",            terminal:"St Pancras",       rail:16.00, miles:22, coach:null },
    { name:"Stevenage",            terminal:"King's Cross",     rail:17.00, miles:31, coach:null },
    { name:"Swindon",              terminal:"Paddington",       rail:42.00, miles:80, coach:15 },
    { name:"Tunbridge Wells",      terminal:"Charing Cross",    rail:22.50, miles:36, coach:null },
    { name:"Watford Junction",     terminal:"Euston",           rail:13.20, miles:18, coach:null },
    { name:"Winchester",           terminal:"Waterloo",         rail:35.00, miles:64, coach:null },
    { name:"Windsor & Eton",       terminal:"Waterloo",         rail:13.50, miles:24, coach:null },
    { name:"Woking",               terminal:"Waterloo",         rail:17.00, miles:25, coach:null },
  ],
  railDiscounts: {
    childPct: 0.5,             // 5-15 pay half
    familyRailcardAdult: 1/3,  // Family & Friends: 1/3 off adults
    familyRailcardChild: 0.6,  // and 60% off child fares
    seniorRailcard: 1/3,
  },
  coachChildPct: 0.5,

  // TfL daily caps (contactless, from March 2026; frozen to March 2027)
  tfl: {
    tubeCapZ12: 8.90,   // Zones 1-2 daily cap
    busCap: 5.25,       // bus & tram daily cap
    teenPct: 0.5,       // 11-15 with Zip pay ~half on the tube
  },

  driving: {
    pencePerMile: 0.17,     // fuel-only: petrol ~151p/litre at ~40mpg
    congestion: 18.00,      // rose £15 → £18 on 2 Jan 2026
    ulez: 12.50,
    parking: [
      { name:"Cheaper car park (outer, pre-booked)", cost:25 },
      { name:"Standard NCP / Q-Park day rate",       cost:40 },
      { name:"Premium West End car park",            cost:60 },
    ],
  },

  // Activities: per-person prices. child covers 5-10, teen 11-15 (same as child
  // unless attraction charges adult from 16+ anyway). senior = concession.
  // free:true items cost nothing.
  activities: [
    { name:"Tower of London 🏰",                adult:37.00, teen:18.50, child:18.50, senior:29.50, note:"under-5 free", url:"https://www.hrp.org.uk/tower-of-london/" },
    { name:"London Eye 🎡",                     adult:29.00, teen:26.00, child:26.00, infant:26.00, senior:29.00, note:"under-2 free; ages 2-4 pay child price", url:"https://www.londoneye.com/" },
    { name:"Madame Tussauds 🌟",                adult:29.00, teen:26.00, child:26.00, infant:26.00, senior:29.00, note:"under-3 free; online advance price", url:"https://www.madametussauds.com/london/" },
    { name:"SEA LIFE London Aquarium 🐠",       adult:28.00, teen:25.00, child:25.00, infant:25.00, senior:28.00, note:"under-3 free", url:"https://www.visitsealife.com/london/" },
    { name:"London Zoo 🦁",                     adult:31.80, teen:22.20, child:22.20, infant:22.20, senior:31.80, note:"under-3 free; online advance", url:"https://www.londonzoo.org/" },
    { name:"The View from The Shard 🏙️",       adult:24.95, teen:18.95, child:18.95, senior:24.95, note:"advance price; under-4 free", url:"https://www.theviewfromtheshard.com/" },
    { name:"The London Dungeon 🧛",             adult:29.00, teen:23.00, child:23.00, senior:29.00, note:"scary — 12+ recommended, no under-5s", url:"https://www.thedungeons.com/london/" },
    { name:"Shrek's Adventure 🟢",              adult:22.00, teen:20.00, child:20.00, infant:20.00, senior:22.00, note:"under-2 free", url:"https://www.shreksadventure.com/" },
    { name:"HMS Belfast ⚓",                    adult:26.80, teen:13.40, child:13.40, senior:24.10, note:"under-5 free", url:"https://www.iwm.org.uk/visits/hms-belfast" },
    { name:"St Paul's Cathedral ⛪",            adult:27.00, teen:10.50, child:10.50, senior:24.00, note:"under-6 free", url:"https://www.stpauls.co.uk/" },
    { name:"Westminster Abbey 🕍",              adult:31.00, teen:14.00, child:14.00, senior:28.00, note:"under-6 free", url:"https://www.westminster-abbey.org/" },
    { name:"Kew Gardens 🌸",                    adult:24.00, teen:5.00,  child:5.00,  senior:18.00, note:"under-4 free", url:"https://www.kew.org/" },
    { name:"Cutty Sark ⛵",                     adult:22.00, teen:11.00, child:11.00, senior:22.00, note:"summer offer often cheaper", url:"https://www.rmg.co.uk/cutty-sark" },
    { name:"Royal Observatory Greenwich 🔭",    adult:24.00, teen:12.00, child:12.00, senior:24.00, note:"combo ticket with Cutty Sark saves money", url:"https://www.rmg.co.uk/royal-observatory" },
    { name:"London Transport Museum 🚌",        adult:24.50, teen:0,     child:0,     senior:23.50, note:"kids under 18 FREE", url:"https://www.ltmuseum.co.uk/" },
    { name:"Kensington Palace 👑",              adult:24.70, teen:12.30, child:12.30, senior:19.70, url:"https://www.hrp.org.uk/kensington-palace/" },
    { name:"Hampton Court Palace 🫅",           adult:29.00, teen:14.00, child:14.00, senior:23.20, url:"https://www.hrp.org.uk/hampton-court-palace/" },
    { name:"IFS Cloud Cable Car 🚡",            adult:12.00, teen:6.00,  child:6.00,  senior:12.00, note:"return trip; under-5 free", url:"https://tfl.gov.uk/modes/london-cable-car/" },
    { name:"Up at The O2 climb 🧗",             adult:37.00, teen:37.00, child:37.00, senior:37.00, note:"age 8+ and min height 1.2m", url:"https://www.theo2.co.uk/up-at-the-o2" },
    { name:"Warner Bros. Studio Tour 🪄",       adult:58.50, teen:47.00, child:47.00, senior:58.50, note:"Harry Potter! In Watford — book ahead", url:"https://www.wbstudiotour.co.uk/" },
    { name:"Churchill War Rooms 🎖️",           adult:33.00, teen:16.50, child:16.50, senior:29.70, note:"under-5 free; pre-book", url:"https://www.iwm.org.uk/visits/churchill-war-rooms" },
    { name:"Tower Bridge Experience 🌉",        adult:13.40, teen:6.70,  child:6.70,  senior:10.30, note:"glass floor walkway; under-5 free", url:"https://www.towerbridge.org.uk/" },
    { name:"The Monument climb 🏛️",            adult:6.00,  teen:3.00,  child:3.00,  senior:4.60,  note:"311 steps to the top", url:"https://www.themonument.org.uk/" },
    { name:"Buckingham Palace State Rooms 👑",  adult:35.00, teen:20.00, child:20.00, senior:32.00, note:"summer opening only; under-5 free", url:"https://www.rct.uk/visit/the-state-rooms-buckingham-palace" },
    { name:"The Postal Museum & Mail Rail 📮",  adult:17.05, teen:10.35, child:10.35, senior:15.40, note:"ride the underground Mail Rail", url:"https://www.postalmuseum.org/" },
    { name:"Battersea Power Station – Lift 109 🏭", adult:21.50, teen:15.50, child:15.50, senior:21.50, note:"glass lift up the chimney", url:"https://www.lift109.co.uk/" },
    { name:"ArcelorMittal Orbit slide 🛝",      adult:17.50, teen:12.50, child:12.50, senior:17.50, note:"world's longest tunnel slide, Olympic Park", url:"https://www.arcelormittalorbit.com/" },
    { name:"Frameless immersive art 🎨",        adult:28.00, teen:21.00, child:21.00, senior:28.00, note:"digital art experience; under-5 free", url:"https://frameless.com/" },
    { name:"Ripley's Believe It or Not! 🙃",    adult:32.00, teen:27.00, child:27.00, senior:32.00, note:"Piccadilly Circus", url:"https://www.ripleyslondon.com/" },
    { name:"City Cruises Thames river trip 🛥️", adult:22.00, teen:11.00, child:11.00, senior:22.00, note:"hop-on river sightseeing; under-5 free", url:"https://www.cityexperiences.com/london/city-cruises/" },
    { name:"Wembley Stadium tour ⚽",           adult:28.00, teen:20.00, child:20.00, senior:24.00, note:"behind the scenes at Wembley", url:"https://www.wembleystadium.com/tours" },
    { name:"Emirates Stadium tour (Arsenal) 🔴", adult:30.00, teen:20.00, child:20.00, senior:25.00, note:"self-guided; under-5 free", url:"https://www.arsenal.com/tours" },
    { name:"Tottenham Hotspur Stadium tour ⚪", adult:35.00, teen:26.00, child:26.00, senior:30.00, note:"Spurs; Dare Skywalk extra", url:"https://www.tottenhamhotspur.com/the-stadium/stadium-tours/" },
    { name:"Stamford Bridge tour (Chelsea) 🔵", adult:35.00, teen:28.00, child:28.00, senior:30.00, note:"includes museum", url:"https://www.chelseafc.com/en/stamford-bridge-tour" },
    { name:"Twickenham Stadium & rugby tour 🏉", adult:30.00, teen:20.00, child:20.00, senior:24.00, note:"home of England rugby", url:"https://www.englandrugby.com/twickenham/tours-and-museum" },
    { name:"Natural History Museum 🦖 (FREE)",  free:true, url:"https://www.nhm.ac.uk/" },
    { name:"Science Museum 🚀 (FREE)",          free:true, url:"https://www.sciencemuseum.org.uk/" },
    { name:"British Museum 🏺 (FREE)",          free:true, url:"https://www.britishmuseum.org/" },
    { name:"National Gallery 🖼️ (FREE)",        free:true, url:"https://www.nationalgallery.org.uk/" },
    { name:"Tate Modern 🎨 (FREE)",             free:true, url:"https://www.tate.org.uk/visit/tate-modern" },
    { name:"V&A Museum 💎 (FREE)",             free:true, url:"https://www.vam.ac.uk/" },
    { name:"Sky Garden 🌿 (FREE — book ahead)", free:true, url:"https://skygarden.london/" },
    { name:"Changing of the Guard 💂 (FREE)",   free:true, url:"https://www.householddivision.org.uk/changing-the-guard" },
    { name:"Hyde Park & Diana Playground 🛝 (FREE)", free:true, url:"https://www.royalparks.org.uk/parks/hyde-park" },
    { name:"South Bank & Borough Market walk 🌉 (FREE)", free:true, url:"https://boroughmarket.org.uk/" },
    { name:"Greenwich Park picnic 🧺 (FREE)",   free:true, url:"https://www.royalparks.org.uk/parks/greenwich-park" },
    { name:"Imperial War Museum 🎖️ (FREE)",     free:true, url:"https://www.iwm.org.uk/visits/imperial-war-museum-london" },
    { name:"National Maritime Museum ⚓ (FREE)", free:true, url:"https://www.rmg.co.uk/national-maritime-museum" },
    { name:"Horniman Museum & Gardens 🦩 (FREE)", free:true, url:"https://www.horniman.ac.uk/" },
    { name:"Museum of London Docklands 🏗️ (FREE)", free:true },
    { name:"The Design Museum 🛋️ (FREE)",       free:true, url:"https://designmuseum.org/" },
    { name:"Horizon 22 viewpoint 🌆 (FREE — book ahead)", free:true, url:"https://horizon22.co.uk/" },
    { name:"Camden Market browse 🛍️ (FREE)",    free:true, url:"https://www.camdenmarket.com/" },
    { name:"Little Venice & canal walk 🛶 (FREE)", free:true },
  ],

  // Food: per-person. kid price applies to teen+child+infant (infants eat too!)
  food: [
    { name:"Packed lunch from home 🥪",        adult:2.50,  kid:2.00 },
    { name:"Picnic in the park 🧺",            adult:6.00,  kid:5.00 },
    { name:"Supermarket meal deal 🛒",         adult:4.50,  kid:4.00 },
    { name:"Greggs stop 🥐",                   adult:4.50,  kid:3.50, url:"https://www.greggs.co.uk/" },
    { name:"Pret a Manger 🥪",                 adult:9.00,  kid:5.50, url:"https://www.pret.co.uk/" },
    { name:"Museum / gallery café ☕",         adult:8.50,  kid:5.50 },
    { name:"Attraction café / kiosk 🍟",       adult:11.00, kid:7.00 },
    { name:"McDonald's 🍟",                    adult:7.50,  kid:4.30, url:"https://www.mcdonalds.com/gb/en-gb.html" },
    { name:"KFC 🍗",                           adult:8.00,  kid:5.00, url:"https://www.kfc.co.uk/" },
    { name:"Subway 🥖",                        adult:7.00,  kid:5.00, url:"https://www.subway.com/en-GB" },
    { name:"Itsu 🍱",                          adult:9.50,  kid:6.00, url:"https://www.itsu.com/" },
    { name:"Leon (healthier fast food) 🥗",    adult:10.00, kid:6.00, url:"https://leon.co/" },
    { name:"Fish & chips 🐟",                  adult:17.00, kid:9.00 },
    { name:"Five Guys 🍔",                     adult:16.00, kid:10.00, url:"https://www.fiveguys.co.uk/" },
    { name:"Nando's 🍗",                       adult:18.00, kid:6.25, url:"https://www.nandos.co.uk/" },
    { name:"Pizza Express 🍕",                 adult:18.50, kid:7.50, url:"https://www.pizzaexpress.com/" },
    { name:"Wagamama 🍜",                      adult:17.00, kid:7.00, url:"https://www.wagamama.com/" },
    { name:"Chinatown meal 🥢",                adult:16.00, kid:9.00, url:"https://chinatown.co.uk/" },
    { name:"Pub lunch 🍽️",                    adult:19.00, kid:8.00 },
    { name:"Borough Market street food 🌮",    adult:13.00, kid:9.00, url:"https://boroughmarket.org.uk/" },
    { name:"Seven Dials Market 🍜",            adult:11.00, kid:7.00, url:"https://www.sevendialsmarket.com/" },
    { name:"KERB street food market 🌭",       adult:11.00, kid:7.00, url:"https://www.kerbfood.com/" },
    { name:"Boxpark 📦",                       adult:11.00, kid:7.00, url:"https://www.boxpark.co.uk/" },
    { name:"Mercato Metropolitano 🇮🇹",        adult:12.00, kid:7.50, url:"https://www.mercatometropolitano.com/" },
    { name:"Afternoon tea (budget) 🫖",        adult:25.00, kid:15.00 },
    { name:"Ice cream stop 🍦",               adult:4.50,  kid:3.50 },
    { name:"Krispy Kreme doughnuts 🍩",        adult:3.50,  kid:3.50, url:"https://www.krispykreme.co.uk/" },
    { name:"Pub / café soft drink 🥤",         adult:3.50,  kid:2.75 },
    { name:"Bottled water 💧",                 adult:1.50,  kid:1.50 },
    { name:"Hot chocolate 🍫",                 adult:3.75,  kid:3.00 },
    { name:"Juice / smoothie 🧃",              adult:4.00,  kid:3.00 },
    { name:"Milkshake 🥤",                     adult:5.00,  kid:4.50 },
    { name:"Bubble tea 🧋",                    adult:6.00,  kid:5.00 },
    { name:"Coffee & babyccino break ☕",      adult:4.00,  kid:1.50 },
    { name:"Snacks & drinks for the day 🍫",   adult:5.00,  kid:4.00 },
  ],

  // Extras: per person (kids only where sensible) or per family
  extras: [
    { name:"Souvenir shop budget 🧸",     cost:10, per:"kid" },
    { name:"Attraction photo 📸",         cost:15, per:"family" },
    { name:"Rain ponchos ☔",             cost:6,  per:"person" },
    { name:"Sun cream & hats 🧢",         cost:12, per:"family" },
    { name:"Programme / guidebook 📖",    cost:7,  per:"family" },
    { name:"Emergency fund 🆘",           cost:20, per:"family" },
    { name:"Baby supplies 🍼",            cost:8,  per:"family" },
    { name:"Left-luggage locker 🧳",      cost:15, per:"family" },
  ],
};

export const MODES = [
  { key:"train", label:"🚆 Train" },
  { key:"car",   label:"🚗 Car" },
  { key:"coach", label:"🚌 Coach" },
  { key:"local", label:"📍 Already in London" },
];

/* A completely blank slate — everything at zero. The app opens on this,
   and "Start over" returns to it. */
export function blankState(){
  return {
    budget: 0,
    family: Object.fromEntries(DATA.categories.map(c => [c.key, 0])),
    travelMode: "local",              // no getting-there cost
    origin: 0, parking: 1,            // 0 = Central London
    railcard: false, seniorRailcard: false,
    congestion: false, ulez: false,
    tube: false, bus: false, walk: true,
    activities: [], food: [], extras: [],
  };
}

/* ---- helpers shared across components ---- */
export const gbp = n => (n < 0 ? "-£" : "£") + Math.abs(n).toFixed(2);

// Strip emoji / "(FREE …)" so names sort and search cleanly.
export function cleanName(name){
  return name.replace(/\([^)]*\)/g, "")
             .replace(/[^\x20-\x7E]/g, "")
             .replace(/\s+/g, " ").trim();
}
function sortKey(name){ return cleanName(name).replace(/^the\s+/i, "").toLowerCase(); }

// A "learn more" URL: the official `url` when we have one; otherwise (for
// activities) a Google search of the name so the link always resolves.
export function urlFor(item, allowSearch){
  if(item.url) return item.url;
  if(allowSearch) return "https://www.google.com/search?q=" + encodeURIComponent(cleanName(item.name) + " London");
  return null;
}

// [{ item, i }] sorted A→Z, where i is the ORIGINAL index (all pricing keys off it).
function alphaEntries(list){
  return list.map((item, i) => ({ item, i }))
             .sort((a, b) => sortKey(a.item.name).localeCompare(sortKey(b.item.name)));
}
export const ACT_OPTS   = alphaEntries(DATA.activities);
export const FOOD_OPTS  = alphaEntries(DATA.food);
export const EXTRA_OPTS = alphaEntries(DATA.extras);
