// Settings for the tetrapod swarm on the front page.
// These are all the settings with their default values. Change any of them,
// or delete lines you don't need: anything left out uses the default.
// The swarm itself is the prebuilt public/ledwork/ledwork-swarm.min.js.

const swarmConfig: Record<string, any> = {
  count: 30,              // number of tetrapods (1 to 64)
  boxSize: 12,            // edge of the invisible cube they float in (leg length = 1)
  seed: null,             // a number gives the same start every time; null = random
  timescale: 1,           // simulation speed (2 = twice as fast)
  maxPixelRatio: 1.75,    // render resolution cap, lower = faster on big screens
  // Text shown at the bottom until the first drag or tap. false = no hint.
  hint: 'Drag a loose tetrapod to change its colour \u00b7 drag elsewhere to rotate \u00b7 tap to release',
  fallback: "Your browser does not support WebGL 2, so the tetrapods can't be shown.",

  startColour: {
    // Each tetrapod starts with a random colour picked from these ranges.
    hue: [0, 360],        // degrees; ignored when `hues` is set
    hues: null,           // e.g. [0, 200, 290]: pick one of these hues instead
    saturation: [0.85, 1],
    brightness: 1,
  },

  drift: {
    speed: 0.28,          // typical travel speed of a single tetrapod (units / s)
    spin: 0.16,           // typical tumbling speed of a single tetrapod (rad / s)
    wander: [0.025, 0.07],// how often the drift direction changes (Hz, random per tetrapod)
    steer: 0.35,          // how quickly motion follows the drift (1 / s); lower = floatier
  },

  magnet: {
    range: 0.55,          // tip-to-tip distance at which a tip starts pulling another tip
    facing: -0.5,         // legs must point at each other at least this much (-1 = head on)
    pullTime: 1.4,        // seconds from first pull to snapped together
    retry: 1.5,           // after a pair can't fit (bodies would overlap), wait this long
    // After you spin a loose tetrapod, it is extra magnetic for a while.
    boostTime: 5,         // seconds
    boostRange: 1.6,      // tip-to-tip reach while boosted (instead of range)
    boostFacing: 0.2,     // legs need to face each other less while boosted
    boostPull: 0.35,      // gentle drift towards the nearest tetrapod while boosted
    boostPullRange: 4.5,  // ...if it is within this distance
  },

  mixing: {
    // Weight of a newly connected neighbour, based on how many neighbours
    // were already connected: base + step * existing, capped at max.
    // 0 existing -> 0.5 (equal mix), 1 -> 0.6, 2 -> 0.7, 3 -> 0.8.
    baseWeight: 0.5,
    weightStep: 0.1,
    maxWeight: 0.9,
    sampleInterval: 2.0,  // seconds before a leg reads its neighbour's colour again
    rate: 0.45,           // how fast a colour glides towards what it read (1 / s)
    space: 'oklch',       // 'oklch' keeps colours vivid, 'oklab' / 'rgb' blend straight through
  },

  release: {
    duration: 2.0,        // seconds the magnetism stays inverted after a tap
    push: 1.4,            // speed it is pushed away from its old neighbours (units / s)
    repel: 2.0,           // strength with which it pushes others away meanwhile
    range: 4.0,           // distance over which it repels
  },

  spinColour: {
    // Dragging a free tetrapod spins it, and spinning shifts its hue,
    // like the single tetrapod did: about one palette colour per quarter turn.
    hueDegreesPerQuarterTurn: 51,
    spinDecay: 3.7,       // how quickly it stops spinning after you let go (1 / s)
  },

  breathing: {
    periods: [5.2, 6.1, 4.7, 5.7], // seconds, one per leg (same for every tetrapod)
    depth: 0.4,           // brightness swing at activity 80, fraction of the glow
    hue: 60,              // hue sway at activity 80, degrees peak to peak
    holdFade: 0.35,       // time constant (s) for breathing to fade out while you turn it (~1 s to settle)
  },

  activity: {
    // Every tetrapod has an activity level from 0 to 100.
    start: [40, 80],      // random starting range
    // Breathing size relative to how it breathes at 80 (0 -> barely, 100 -> a bit more).
    amplitudeAt0: 0.1,
    amplitudeAt100: 1.35,
    // Breathing speed relative to how it breathes at 80.
    speedAt0: 0.7,
    speedAt100: 1.2,
    // How much say a neighbour gets. Each side's influence is
    // ((activity + soften) / (100 + soften)) ^ influencePower, and the
    // neighbour's odds in the mix are scaled by the ratio of the two. A power
    // above 1 makes high activity count disproportionately: with power 3, a
    // tetrapod at 100 outweighs one at 70 about 2.6 times and one at 40
    // about 10 times. `soften` keeps 0 from meaning "no say at all".
    soften: 10,
    influencePower: 3,
    // Optional extra: below 1, a tetrapod also glides more slowly towards
    // calmer neighbours (scaled by the influence ratio, never below this
    // floor), so a very active one holds its colour much harder. 1 = off.
    // Tried 0.05: one active tetrapod then turned a whole cluster its colour.
    calmerListenFloor: 1,
    // On connecting, the less active one rises to halfway between the two
    // (once, not on every re-read), gliding there at this rate (1 / s).
    pullUpRate: 0.8,
    decayPerSecond: 100 / 180, // straight line: 100 -> 0 in about 3 minutes
    // Turning a loose tetrapod raises activity by gain * angle * (speed / briskSpeed):
    // about 2 to 3 seconds of brisk spinning takes it from 0 to 100.
    spinGain: 5,          // activity per radian at brisk speed
    briskSpeed: 7,        // rad / s
    flashTime: 0.2,       // seconds of white flash on reaching 100 (a quick, hard flash)
    // Above this activity the colour is pushed to full saturation, fading in
    // between fullColourFrom and fullColourAt so there is never a jump.
    fullColourFrom: 70,
    fullColourAt: 80,
    fullColourRate: 0.8,  // how fast it saturates (1 / s)
    // Running out of energy: below `letGoBelow`, every time activity drops by
    // a whole point there is a `letGoChance` chance that one connected leg
    // lets go. At 0 it lets go on all sides and restarts at `restartAt`.
    letGoBelow: 20,
    letGoChance: 0.1,
    restartAt: 50,
    letGoPush: 0.25,      // gentle drift apart after a leg lets go (units / s)
    letGoCooldown: 6,     // seconds before those two tips may snap together again
  },
};

export default swarmConfig;
