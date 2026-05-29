export type MeterKey = "grip" | "wonder" | "surrender" | "certainty" | "vision" | "return";

export type Difficulty = "beginner" | "medium" | "hard";

export type ChoiceEffect = Partial<Record<MeterKey, number>>;

export type Choice = {
  id: string;
  text: string;
  effect: ChoiceEffect;
  tendency: string;
  unlocks?: string[];
  falsePathId?: string;
};

export type Scene = {
  id: number;
  slug: string;
  title: string;
  imageTitle: string;
  quote: string;
  story: string;
  image: string;
  mood: "peaceful" | "dark";
  music: string;
  objects: string[];
  choices: Choice[];
};

export type FalsePath = {
  id: string;
  title: string;
  sceneId: number;
  reward: string;
  realization: string;
  choices: string[];
};

export type Ending = {
  id: string;
  title: string;
  trigger: string;
  meaning: string;
  summary: string;
  image: string;
};

export type ProgressState = {
  currentScene: number;
  meters: Record<MeterKey, number>;
  path: string[];
  unlockedEndings: string[];
  unlockedArchive: string[];
  featheredObjects: string[];
  lastTendency: string;
};

export const initialMeters: Record<MeterKey, number> = {
  grip: 20,
  wonder: 30,
  surrender: 10,
  certainty: 25,
  vision: 10,
  return: 10
};

export const scenes: Scene[] = [
  {
    id: 1,
    slug: "university-of-names",
    title: "The University of Names",
    imageTitle: "The First Map of Meaning",
    quote: "The entrance is not hidden by stone. It is hidden by meaning, like a gate seen only after prayer.",
    story:
      "At St. Anselm's College, Elias Vale receives the final page of Dr. Arthur Sinclair's journal. The page does not describe coordinates. It describes names hardening around reality until the Stairway can no longer be seen, like Babel rebuilt inside the mind.",
    image: "/images/scenes/scene-01-university-of-names.png",
    mood: "peaceful",
    music: "/audio/peaceful-alonia.mpeg",
    objects: ["Sinclair's journal page", "Brass instruments", "Sealed maps"],
    choices: [
      { id: "archaeology", text: "Treat Sinclair's notes as archaeological clues.", effect: { certainty: 14, wonder: 4 }, tendency: "Rational inquiry" },
      { id: "symbols", text: "Treat Sinclair's notes as theological symbols.", effect: { wonder: 12, surrender: 5 }, tendency: "Symbolic humility" },
      { id: "ravings", text: "Treat Sinclair's notes as unstable ravings.", effect: { certainty: 10, grip: 8 }, tendency: "Dismissive certainty", falsePathId: "tomb-of-certainty" },
      { id: "prayer", text: "Read the notes aloud as prayer.", effect: { surrender: 12, wonder: 8 }, tendency: "Prayerful attention", unlocks: ["Sinclair quote: A named gate is still a gate."] },
      { id: "hidden-ink", text: "Burn one page to reveal hidden ink.", effect: { grip: 12, vision: 6 }, tendency: "Possessive risk", falsePathId: "rationalists-map" }
    ]
  },
  {
    id: 2,
    slug: "desert-of-false-names",
    title: "The Desert of False Names",
    imageTitle: "The Camp of Misnamed Things",
    quote: "The label was useful until Elias mistook it for a soul, forgetting Adam named the creatures without owning them.",
    story:
      "The abandoned camp lies under a silver desert sky like a wilderness of false testimony. Every crate is mislabeled. A lamp is called a relic, a lyre is listed as a weapon, and a doorway sleeps under sand with no name at all.",
    image: "/images/scenes/scene-02-desert-of-false-names.png",
    mood: "dark",
    music: "/audio/dark-secrets.mpeg",
    objects: ["Misnamed crates", "Broken lamp", "Half-buried doorway"],
    choices: [
      { id: "official-labels", text: "Follow the official excavation labels.", effect: { certainty: 12, grip: 8 }, tendency: "Institutional trust", falsePathId: "rationalists-map" },
      { id: "remove-labels", text: "Remove every label from the crates.", effect: { surrender: 12, wonder: 8 }, tendency: "Released naming", unlocks: ["Feathered object: Misnamed crate"] },
      { id: "unknown", text: "Open only the crate marked Unknown.", effect: { wonder: 12, vision: 4 }, tendency: "Reverent curiosity" },
      { id: "private-journal", text: "Search for Sinclair's private journal.", effect: { certainty: 8, wonder: 6 }, tendency: "Disciplined search" },
      { id: "local-guide", text: "Ask the local guide what the objects were before foreigners named them.", effect: { return: 10, surrender: 8 }, tendency: "Returned attention" }
    ]
  },
  {
    id: 3,
    slug: "hall-of-objects",
    title: "The Hall of Objects",
    imageTitle: "Relics of the Bound Self",
    quote: "A thing becomes a prison when the hand refuses to open, as manna spoils when hoarded.",
    story:
      "Pedestals hold ordinary objects: a cup, a rope, a compass, a watch, a veiled glass, a sealed letter, an old Bible, a skull, and a blank stone. Meaning gathers around each one like dust around a relic.",
    image: "/images/scenes/scene-03-hall-of-objects.png",
    mood: "peaceful",
    music: "/audio/peaceful-calming-crystals.mpeg",
    objects: ["Father's watch", "Brass compass", "Old Bible", "Blank stone"],
    choices: [
      { id: "watch", text: "Grip the father's watch.", effect: { grip: 18, vision: 4 }, tendency: "Grief made fixed", falsePathId: "fathers-watch" },
      { id: "feather-compass", text: "Feather the compass.", effect: { surrender: 12, wonder: 8, certainty: -4 }, tendency: "Feathering", unlocks: ["Feathered object: Compass"] },
      { id: "feather-bible", text: "Feather the Bible.", effect: { surrender: 10, wonder: 10 }, tendency: "Living doctrine", unlocks: ["Feathered object: Bible"] },
      { id: "letter", text: "Open the sealed letter.", effect: { grip: 8, vision: 8 }, tendency: "Private ache", falsePathId: "saints-mask" },
      { id: "blank-stone", text: "Stand before the blank stone.", effect: { surrender: 12, return: 6 }, tendency: "Unforced presence" }
    ]
  },
  {
    id: 4,
    slug: "mirror-without-face",
    title: "The Mirror Without a Face",
    imageTitle: "The Names That Look Back",
    quote: "The veiled glass did not show Elias. It showed the names he obeyed.",
    story:
      "A darkened bronze glass rises like a threshold, recalling how Paul wrote that we see through a glass dimly. Explorer. Orphan. Scholar. Son. Failure. Believer. Skeptic. Body. Mind. Elias. Each name asks to become the whole man.",
    image: "/images/scenes/scene-04-mirror-without-face.png",
    mood: "dark",
    music: "/audio/dark-how-did-we-get-here.mpeg",
    objects: ["Darkened bronze glass", "Dissolving names"],
    choices: [
      { id: "explorer", text: "Choose Explorer.", effect: { grip: 10, certainty: 8 }, tendency: "Heroic identity", falsePathId: "heros-road" },
      { id: "son", text: "Choose Son.", effect: { grip: 10, vision: 6 }, tendency: "Inherited grief", falsePathId: "fathers-watch" },
      { id: "believer", text: "Choose Believer.", effect: { certainty: 8, wonder: 4 }, tendency: "Chosen mask", falsePathId: "saints-mask" },
      { id: "failure", text: "Choose Failure.", effect: { grip: 12, surrender: -4 }, tendency: "Condemning name" },
      { id: "watch", text: "Watch the names without choosing.", effect: { surrender: 16, wonder: 8, grip: -8 }, tendency: "Identity released" }
    ]
  },
  {
    id: 5,
    slug: "shallow-void",
    title: "The Shallow Void",
    imageTitle: "The Threshold of Passing Visions",
    quote: "Not every radiant thing has asked to be followed; even light must be tested.",
    story:
      "The Shallow Void fills with half-formed cities, lost rooms, angelic silhouettes, and Sinclair's voice in the mist. Visions appear with the force of truth, like dreams before Pharaoh, then tremble as if waiting to be gripped.",
    image: "/images/scenes/scene-05-shallow-void.png",
    mood: "dark",
    music: "/audio/dark-margin.mpeg",
    objects: ["Passing visions", "Distant Sinclair", "Unfinished city"],
    choices: [
      { id: "sinclair-voice", text: "Chase the voice of Sinclair.", effect: { vision: 14, grip: 10 }, tendency: "Vision chase", falsePathId: "archive-of-visions" },
      { id: "father-image", text: "Follow the image of Elias's father.", effect: { vision: 12, grip: 12 }, tendency: "Grief chase", falsePathId: "fathers-watch" },
      { id: "record", text: "Record every vision in the notebook.", effect: { certainty: 12, grip: 8 }, tendency: "Captured vision", falsePathId: "archive-of-visions" },
      { id: "ignore", text: "Ignore all visions violently.", effect: { certainty: 8, wonder: -6, grip: 6 }, tendency: "Rejected mystery" },
      { id: "pass", text: "Let the visions appear and pass without gripping them.", effect: { surrender: 18, wonder: 8, grip: -10 }, tendency: "Non-reaction" }
    ]
  },
  {
    id: 6,
    slug: "no-thing",
    title: "NO-Thing",
    imageTitle: "The Place Before the Name",
    quote: "Every word disappeared. The silence did not; it waited like the still small voice.",
    story:
      "Elias enters the place before naming. No temple stands there, yet every temple feels possible. His notebook drinks the ink from each word until the page is blank and luminous, like stone before the commandment is carved.",
    image: "/images/scenes/scene-06-no-thing.png",
    mood: "peaceful",
    music: "/audio/peaceful-ocean-reefs.mpeg",
    objects: ["Dissolving notebook", "Luminous mist"],
    choices: [
      { id: "write-god", text: "Try to write God.", effect: { grip: 8, wonder: 8 }, tendency: "Holy possession" },
      { id: "write-void", text: "Try to write Void.", effect: { certainty: 8, surrender: -4 }, tendency: "Abstract control" },
      { id: "write-truth", text: "Try to write Truth.", effect: { certainty: 10, grip: 8 }, tendency: "Final definition", falsePathId: "tomb-of-certainty" },
      { id: "write-i", text: "Try to write I.", effect: { grip: 12, vision: 4 }, tendency: "Self named final", falsePathId: "throne-of-the-chosen" },
      { id: "stop-writing", text: "Stop writing.", effect: { surrender: 20, wonder: 10, grip: -12 }, tendency: "Silent surrender" }
    ]
  },
  {
    id: 7,
    slug: "stairway-of-sinclair",
    title: "The Stairway of Sinclair",
    imageTitle: "The Ascent and the Descent",
    quote: "Ascent without descent is escape. Descent without ascent is imprisonment.",
    story:
      "At the foot of a stairway made of stone and light, Sinclair waits older and peaceful. Like Jacob's ladder, the Stairway rises and descends at once. Elias understands that the journey was never away from the world, but through it.",
    image: "/images/scenes/scene-07-stairway-of-sinclair.png",
    mood: "peaceful",
    music: "/audio/peaceful-woodwind-reviere.mpeg",
    objects: ["Jacob's Stairway", "Sinclair's lantern"],
    choices: [
      { id: "stay", text: "Stay in NO-Thing.", effect: { surrender: 16, return: -8 }, tendency: "Unreturned surrender" },
      { id: "ascend", text: "Ascend the Stairway and never return.", effect: { vision: 16, return: -10 }, tendency: "Pure ascent" },
      { id: "descend", text: "Descend with Sinclair.", effect: { return: 20, surrender: 8 }, tendency: "Returned mystery" },
      { id: "map", text: "Try to map the Stairway.", effect: { certainty: 16, grip: 12 }, tendency: "Possession", falsePathId: "rationalists-map" },
      { id: "shrine", text: "Build a shrine at the entrance.", effect: { grip: 14, certainty: 8 }, tendency: "Sacred artifact", falsePathId: "throne-of-the-chosen" },
      { id: "world", text: "Return to the world and build stairways in men.", effect: { return: 18, wonder: 10, surrender: 6 }, tendency: "Ascending and descending" }
    ]
  }
];

export const falsePaths: FalsePath[] = [
  {
    id: "rationalists-map",
    title: "The Rationalist's Map",
    sceneId: 1,
    reward: "A sharper eye for patterns.",
    realization: "The map was not false because it was rational. It was false because Elias tried to make it final.",
    choices: ["Measure the threshold.", "Classify the symbols.", "Correct Sinclair's margins.", "Return to the moment of gripping."]
  },
  {
    id: "tomb-of-certainty",
    title: "The Tomb of Certainty",
    sceneId: 1,
    reward: "A warning against sealed conclusions.",
    realization: "Certainty became a tomb when it refused wonder.",
    choices: ["Name the chamber.", "Seal the entrance.", "Defend the thesis.", "Return to the unanswered page."]
  },
  {
    id: "fathers-watch",
    title: "The Father's Watch",
    sceneId: 3,
    reward: "A softened grief.",
    realization: "Love did not require Elias to imprison the dead inside an object.",
    choices: ["Wind the watch.", "Follow the ticking.", "Call it fate.", "Place it down gently."]
  },
  {
    id: "heros-road",
    title: "The Hero's Road",
    sceneId: 4,
    reward: "Courage without self-worship.",
    realization: "The hero was useful only while he served the journey.",
    choices: ["Take the torch.", "Refuse help.", "Claim the discovery.", "Step back from the statue."]
  },
  {
    id: "saints-mask",
    title: "The Saint's Mask",
    sceneId: 3,
    reward: "A cleaner reverence.",
    realization: "Holiness became costume when Elias used it to escape humility.",
    choices: ["Wear the name.", "Judge the doubter.", "Polish the relic.", "Remove the mask."]
  },
  {
    id: "archive-of-visions",
    title: "The Archive of Visions",
    sceneId: 5,
    reward: "A disciplined imagination.",
    realization: "A vision loses its gift when captured as proof.",
    choices: ["Catalog the light.", "Cross-reference the voices.", "Bind the pages.", "Let one page remain blank."]
  },
  {
    id: "throne-of-the-chosen",
    title: "The Throne of the Chosen",
    sceneId: 6,
    reward: "A humbled vocation.",
    realization: "Elias was chosen only when he stopped needing to be exceptional.",
    choices: ["Sit above the crowd.", "Bless the map.", "Guard the entrance.", "Walk down the steps."]
  }
];

export const endings: Ending[] = [
  {
    id: "scholars-return",
    title: "The Scholar's Return",
    trigger: "Reasoning choices mixed with humility",
    meaning: "Knowledge becomes a servant of wonder.",
    summary: "Elias returns to St. Anselm's with fewer claims and better questions.",
    image: "/images/scenes/scene-01-university-of-names.png"
  },
  {
    id: "feathered-world",
    title: "The Feathered World",
    trigger: "Feathering objects and releasing fixed meanings",
    meaning: "Elias returns to reality without being captured by labels.",
    summary: "Objects keep their use, but lose their power to imprison him.",
    image: "/images/scenes/scene-03-hall-of-objects.png"
  },
  {
    id: "nameless",
    title: "The Nameless Ending",
    trigger: "Surrendering identity labels",
    meaning: "Elias ascends beyond the biography of himself.",
    summary: "The names fall away. What remains is not absence, but presence before biography.",
    image: "/images/scenes/scene-06-no-thing.png"
  },
  {
    id: "failed-possession",
    title: "The Failed Possession Ending",
    trigger: "Trying to map, own, prove, or display the Stairway",
    meaning: "The sacred becomes an artifact.",
    summary: "Elias preserves a perfect record and loses the living threshold.",
    image: "/images/scenes/scene-07-stairway-of-sinclair.png"
  },
  {
    id: "ascending-descending",
    title: "The Ascending and Descending Ending",
    trigger: "Balanced inquiry, surrender, feathering, non-reaction, and return",
    meaning: "Elias learns to ascend into mystery and descend back into reality.",
    summary: "Sinclair and Elias return carrying no trophy, only a way of walking.",
    image: "/images/scenes/scene-07-stairway-of-sinclair.png"
  }
];

export const archiveFragments = [
  "Journal fragment: Sinclair stopped calling the Stairway a site and began calling it a mercy.",
  "Object: A compass that points best when held lightly.",
  "Sinclair quote: The symbol is a door, not a cage.",
  "Journal fragment: The shallow void flatters every unfinished desire.",
  "Object: The blank stone, heavy only when named."
];

type DifficultySceneText = {
  quote: string;
  story: string;
  choices: Record<string, string>;
};

const beginnerSceneText: Record<number, DifficultySceneText> = {
  1: {
    quote: "Sinclair's page is not a map. It is a warning that names can hide truth.",
    story: "Elias finds Sinclair's final journal page at St. Anselm's College. It says the Stairway is hidden when people cling too tightly to labels, proof, and control.",
    choices: {
      archaeology: "Study the notes carefully as clues.",
      symbols: "Look for spiritual meaning in the notes.",
      ravings: "Dismiss the notes as nonsense.",
      prayer: "Read the notes aloud as prayer.",
      "hidden-ink": "Burn a page to search for secret writing."
    }
  },
  2: {
    quote: "The camp teaches Elias that a name is useful, but it is not the whole truth.",
    story: "In the desert camp, many objects have the wrong labels. Elias must decide whether to trust the labels or look more humbly at what is really there.",
    choices: {
      "official-labels": "Trust the official labels.",
      "remove-labels": "Remove the labels and look again.",
      unknown: "Open the crate marked Unknown.",
      "private-journal": "Search for Sinclair's private journal.",
      "local-guide": "Ask the local guide for wisdom."
    }
  },
  3: {
    quote: "Objects can help Elias, but they can also trap him if he clings to them.",
    story: "A hall displays a watch, compass, Bible, letter, and blank stone. Each object tests whether Elias can hold meaning lightly instead of turning it into an idol.",
    choices: {
      watch: "Hold tightly to the father's watch.",
      "feather-compass": "Release control over the compass.",
      "feather-bible": "Read the Bible with humility.",
      letter: "Open the sealed letter.",
      "blank-stone": "Stand quietly before the blank stone."
    }
  },
  4: {
    quote: "Elias sees the identities that try to control him.",
    story: "A dim bronze glass shows Elias many names: Explorer, Son, Believer, Failure. He must decide whether to cling to one name or let God see him beyond all labels.",
    choices: {
      explorer: "Define yourself as Explorer.",
      son: "Define yourself as Son.",
      believer: "Define yourself as Believer.",
      failure: "Define yourself as Failure.",
      watch: "Watch the names without choosing one."
    }
  },
  5: {
    quote: "Not every vision should be followed.",
    story: "The void shows Elias beautiful and frightening visions. Some may teach him, but chasing them too strongly can lead him away from truth.",
    choices: {
      "sinclair-voice": "Chase Sinclair's voice.",
      "father-image": "Follow the image of Elias's father.",
      record: "Write down every vision as proof.",
      ignore: "Reject every vision.",
      pass: "Let the visions appear and pass."
    }
  },
  6: {
    quote: "Elias reaches silence before words.",
    story: "In NO-Thing, words disappear from Elias's notebook. This scene asks whether he will try to control mystery or surrender quietly.",
    choices: {
      "write-god": "Try to write God.",
      "write-void": "Try to write Void.",
      "write-truth": "Try to write Truth.",
      "write-i": "Try to write I.",
      "stop-writing": "Stop writing and surrender."
    }
  },
  7: {
    quote: "The Stairway is not an escape. It is a way to return changed.",
    story: "Sinclair waits at the Stairway of stone and light. Elias must choose whether to escape upward, possess the mystery, or return to the world with humility.",
    choices: {
      stay: "Stay in NO-Thing.",
      ascend: "Ascend and never return.",
      descend: "Descend with Sinclair.",
      map: "Try to make a final map.",
      shrine: "Build a shrine and guard it.",
      world: "Return to help others find the way."
    }
  }
};

const mediumSceneText: Record<number, DifficultySceneText> = {
  1: {
    quote: "A gate can vanish beneath the names laid over it.",
    story: "Sinclair's last page gives Elias no coordinates. It suggests that the Stairway has been covered by the names people use to master reality.",
    choices: {
      archaeology: "Read the page as evidence.",
      symbols: "Read the page as symbol.",
      ravings: "Call the page broken.",
      prayer: "Speak the page as prayer.",
      "hidden-ink": "Risk the page for hidden fire."
    }
  },
  2: {
    quote: "The false label is not the false thing.",
    story: "In the desert camp, names have been placed badly on useful things. Elias must decide whether to trust order or see beneath it.",
    choices: {
      "official-labels": "Keep the official order.",
      "remove-labels": "Let the objects stand unnamed.",
      unknown: "Open what is unnamed.",
      "private-journal": "Seek Sinclair's hidden account.",
      "local-guide": "Ask what came before the foreign names."
    }
  },
  3: {
    quote: "The hand makes relics heavy.",
    story: "Ordinary objects wait on pedestals. Each can guide Elias, but each can also become a small golden calf.",
    choices: {
      watch: "Keep the watch close.",
      "feather-compass": "Lighten the compass.",
      "feather-bible": "Let scripture breathe.",
      letter: "Break the seal.",
      "blank-stone": "Wait before the blank stone."
    }
  },
  4: {
    quote: "The dim glass gives back borrowed names.",
    story: "The bronze surface returns Elias as titles and wounds. Each name offers a throne, and each throne asks for worship.",
    choices: {
      explorer: "Take Explorer.",
      son: "Take Son.",
      believer: "Take Believer.",
      failure: "Take Failure.",
      watch: "Let the names pass."
    }
  },
  5: {
    quote: "Radiance is not always revelation.",
    story: "Images rise with sacred force. Elias must learn which lights guide him and which only flatter hunger.",
    choices: {
      "sinclair-voice": "Follow Sinclair's voice.",
      "father-image": "Follow the father image.",
      record: "Bind every vision into proof.",
      ignore: "Strike the visions away.",
      pass: "Let each vision pass."
    }
  },
  6: {
    quote: "Before the word, the silence remains.",
    story: "The page goes blank in Elias's hand. Every word he reaches for becomes a way to possess what cannot be possessed.",
    choices: {
      "write-god": "Name the holy.",
      "write-void": "Name the absence.",
      "write-truth": "Name the final truth.",
      "write-i": "Name the self.",
      "stop-writing": "Leave the page blank."
    }
  },
  7: {
    quote: "Jacob's ladder rises only because it also touches earth.",
    story: "Sinclair waits where ascent and descent meet. Elias can flee, claim, worship the threshold, or return changed.",
    choices: {
      stay: "Remain above the world.",
      ascend: "Rise without return.",
      descend: "Go down with Sinclair.",
      map: "Fix the Stairway into a map.",
      shrine: "Guard the entrance as holy property.",
      world: "Carry the Stairway back into life."
    }
  }
};

export function sceneTextForDifficulty(scene: Scene, difficulty: Difficulty): DifficultySceneText {
  if (difficulty === "beginner") return beginnerSceneText[scene.id];
  if (difficulty === "medium") return mediumSceneText[scene.id];

  return {
    quote: scene.quote,
    story: scene.story,
    choices: Object.fromEntries(scene.choices.map((choice) => [choice.id, choice.text]))
  };
}

export function getInitialProgress(): ProgressState {
  return {
    currentScene: 1,
    meters: { ...initialMeters },
    path: [],
    unlockedEndings: [],
    unlockedArchive: [archiveFragments[0]],
    featheredObjects: [],
    lastTendency: "The page waits."
  };
}

export function clampMeter(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function endingForState(state: ProgressState): string {
  const { meters, featheredObjects, path } = state;
  const possessive = meters.grip + meters.certainty > 138 || path.some((item) => item.includes("map") || item.includes("shrine"));
  const balanced = meters.wonder >= 50 && meters.surrender >= 50 && meters.return >= 42 && featheredObjects.length >= 2;

  if (balanced) return "ascending-descending";
  if (possessive) return "failed-possession";
  if (featheredObjects.length >= 2 && meters.grip < 45) return "feathered-world";
  if (meters.surrender >= 68 && meters.return < 30) return "nameless";
  return "scholars-return";
}
