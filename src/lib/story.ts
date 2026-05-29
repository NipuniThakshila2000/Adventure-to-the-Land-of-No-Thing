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
  imageIdea: string;
  bibleVerse: {
    reference: string;
    text: string;
  };
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
    imageIdea: "A candlelit university archive with journal pages, brass instruments, and a faint stair-shaped light hidden in the shelves.",
    bibleVerse: { reference: "Genesis 11:6", text: "Nothing will be restrained from them, which they have imagined to do." },
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
      "The abandoned camp lies under a silver desert sky like a wilderness of false testimony. Mara Bethany, a careful epigrapher, waits beside the crates with a pet-like silver creature called Kip curled at her feet. Both sound wise, but both urge Elias to define each object before he dares to understand it.",
    image: "/images/scenes/scene-02-desert-of-false-names.png",
    imageIdea: "A moonlit desert excavation camp with mislabeled crates, a buried doorway, Mara Bethany, and Kip near the sand.",
    bibleVerse: { reference: "Genesis 2:19", text: "Whatsoever Adam called every living creature, that was the name thereof." },
    mood: "dark",
    music: "/audio/dark-secrets.mpeg",
    objects: ["Misnamed crates", "Broken lamp", "Half-buried doorway", "Mara Bethany's field notes", "Kip's silver collar"],
    choices: [
      { id: "official-labels", text: "Follow the official excavation labels.", effect: { certainty: 12, grip: 8 }, tendency: "Institutional trust", falsePathId: "rationalists-map" },
      { id: "remove-labels", text: "Remove every label from the crates.", effect: { surrender: 12, wonder: 8 }, tendency: "Released naming", unlocks: ["Feathered object: Misnamed crate"] },
      { id: "unknown", text: "Open only the crate marked Unknown.", effect: { wonder: 12, vision: 4 }, tendency: "Reverent curiosity" },
      { id: "private-journal", text: "Search for Sinclair's private journal.", effect: { certainty: 8, wonder: 6 }, tendency: "Disciplined search" },
      { id: "local-guide", text: "Ask the local guide what the objects were before foreigners named them.", effect: { return: 10, surrender: 8 }, tendency: "Returned attention" },
      { id: "mara-ledger", text: "Let Mara write one final definition for every crate.", effect: { certainty: 14, grip: 10 }, tendency: "Elegant definition", falsePathId: "mara-lexicon" },
      { id: "kip-whisper", text: "Follow Kip's soft command to name the doorway before entering.", effect: { grip: 12, vision: 6 }, tendency: "Sweet deception", falsePathId: "kip-collar" }
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
    imageIdea: "A chapel-like reliquary hall with ordinary objects on stone pedestals, warm scripture light, and long shadows.",
    bibleVerse: { reference: "Exodus 16:20", text: "Some of them left of it until the morning, and it bred worms." },
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
    imageIdea: "A dark bronze reflective surface in a ruined sanctuary, with names glowing faintly around Elias instead of a face.",
    bibleVerse: { reference: "1 Corinthians 13:12", text: "For now we see through a glass, darkly; but then face to face." },
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
    imageIdea: "A misted void of unfinished cities, angelic silhouettes, and dissolving journal pages floating like half-remembered dreams.",
    bibleVerse: { reference: "1 John 4:1", text: "Believe not every spirit, but try the spirits whether they are of God." },
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
    imageIdea: "A luminous blank place before language, with an empty notebook, white mist, and stone tablets not yet carved.",
    bibleVerse: { reference: "1 Kings 19:12", text: "And after the fire a still small voice." },
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
    imageIdea: "A Jacob's ladder-like stairway of stone and light rising and descending at once, with Sinclair holding a lantern.",
    bibleVerse: { reference: "Genesis 28:12", text: "Behold a ladder set up on the earth, and the top of it reached to heaven." },
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
  },
  {
    id: 8,
    slug: "court-of-measures",
    title: "The Court of Measures",
    imageTitle: "The Scales of Belshazzar",
    quote: "A weighed soul is not the same as a known soul.",
    story:
      "A ruined court appears beyond the stair. Gold scales hang over a dry fountain, and Mara reads the air like a legal tablet. Kip circles the fountain and purrs that every mystery becomes safe once it is measured.",
    image: "/images/scenes/scene-08-court-of-measures.png",
    imageIdea: "A moonlit ruined court with golden scales, cracked fountain stones, Mara holding a tablet, and Kip circling like a silver shadow.",
    bibleVerse: { reference: "Daniel 5:27", text: "Thou art weighed in the balances, and art found wanting." },
    mood: "dark",
    music: "/audio/dark-secrets.mpeg",
    objects: ["Gold scales", "Cracked fountain", "Mara's tablet", "Kip's pawprints"],
    choices: [
      { id: "weigh-heart", text: "Place Elias's journal on the scales.", effect: { certainty: 10, grip: 8 }, tendency: "Measured soul", falsePathId: "court-of-weights" },
      { id: "empty-scales", text: "Leave the scales empty and listen.", effect: { surrender: 12, wonder: 8 }, tendency: "Unweighed attention" },
      { id: "mara-proof", text: "Accept Mara's proof that weight equals truth.", effect: { certainty: 16, grip: 8 }, tendency: "Beautiful proof", falsePathId: "mara-lexicon" },
      { id: "kip-count", text: "Let Kip count each stair before Elias climbs.", effect: { certainty: 8, return: -4 }, tendency: "Counted faith" }
    ]
  },
  {
    id: 9,
    slug: "garden-of-borrowed-fruit",
    title: "The Garden of Borrowed Fruit",
    imageTitle: "The Orchard of Almost Eden",
    quote: "Wisdom offered too quickly often asks for ownership in return.",
    story:
      "A green garden grows inside the desert night. Fruit glows with names not yet spoken. Kip offers Elias one, saying it will define his purpose. Mara warns that an unnamed fruit is a wasted fruit.",
    image: "/images/scenes/scene-09-garden-of-borrowed-fruit.png",
    imageIdea: "An impossible moonlit orchard in the desert with glowing fruit, stair-shaped branches, and Kip offering a luminous fruit.",
    bibleVerse: { reference: "Genesis 3:6", text: "A tree to be desired to make one wise." },
    mood: "peaceful",
    music: "/audio/peaceful-ocean-reefs.mpeg",
    objects: ["Unbitten fruit", "Vine-wrapped stair", "Mara's pruning knife"],
    choices: [
      { id: "eat-purpose", text: "Eat the fruit named Purpose.", effect: { vision: 12, grip: 10 }, tendency: "Borrowed calling", falsePathId: "garden-serpent" },
      { id: "bless-fruit", text: "Bless the fruit and leave it hanging.", effect: { surrender: 12, wonder: 8 }, tendency: "Unowned wisdom" },
      { id: "catalog-orchard", text: "Catalog every fruit by name.", effect: { certainty: 14, grip: 6 }, tendency: "Eden indexed", falsePathId: "mara-lexicon" },
      { id: "share-fruit", text: "Carry fruit back for the hungry.", effect: { return: 14, surrender: 6 }, tendency: "Returned provision" }
    ]
  },
  {
    id: 10,
    slug: "well-of-echoes",
    title: "The Well of Echoes",
    imageTitle: "The Voice Beneath the Stone",
    quote: "An echo can sound like prophecy when the heart is lonely.",
    story:
      "At an ancient well, Elias hears Sinclair, his father, Mara, and his own voice rising from the water. Kip says the deepest echo must be the truest. The bucket waits like a question lowered into darkness.",
    image: "/images/scenes/scene-10-well-of-echoes.png",
    imageIdea: "A stone well under stars with glowing water, overlapping faces in the reflection, and a silver creature perched on the rim.",
    bibleVerse: { reference: "John 10:27", text: "My sheep hear my voice, and I know them, and they follow me." },
    mood: "dark",
    music: "/audio/dark-how-did-we-get-here.mpeg",
    objects: ["Stone well", "Rope bucket", "Echoing water"],
    choices: [
      { id: "father-echo", text: "Answer the voice of Elias's father.", effect: { grip: 12, vision: 8 }, tendency: "Echoed grief", falsePathId: "fathers-watch" },
      { id: "sinclair-echo", text: "Lower the bucket toward Sinclair's voice.", effect: { vision: 12, certainty: 4 }, tendency: "Guided descent" },
      { id: "own-echo", text: "Trust the voice that sounds most like Elias.", effect: { grip: 14, certainty: 8 }, tendency: "Self-confirming oracle", falsePathId: "well-of-self" },
      { id: "silence-well", text: "Wait until the well becomes silent.", effect: { surrender: 14, wonder: 6 }, tendency: "Echo released" }
    ]
  },
  {
    id: 11,
    slug: "scribe-market",
    title: "The Scribe Market",
    imageTitle: "The Bazaar of Final Words",
    quote: "The cheapest idol is a sentence that explains everything.",
    story:
      "Under red awnings, scribes sell definitions in sealed jars. Mara negotiates with perfect courtesy. Kip insists that one jar must contain the true name of the Stairway, if Elias is brave enough to buy it.",
    image: "/images/scenes/scene-11-scribe-market.png",
    imageIdea: "A night bazaar of scribes with shelves of glowing jars, parchment labels, red awnings, and Mara bargaining.",
    bibleVerse: { reference: "John 1:1", text: "In the beginning was the Word, and the Word was with God." },
    mood: "dark",
    music: "/audio/dark-margin.mpeg",
    objects: ["Sealed word jars", "Red awnings", "Ink scales"],
    choices: [
      { id: "buy-name", text: "Buy the jar labeled Stairway.", effect: { certainty: 16, grip: 12 }, tendency: "Purchased certainty", falsePathId: "jar-of-final-words" },
      { id: "break-jars", text: "Break every jar in anger.", effect: { grip: 8, wonder: -6 }, tendency: "Rejected language" },
      { id: "free-word", text: "Open one jar and let the word escape.", effect: { surrender: 12, wonder: 10 }, tendency: "Language freed" },
      { id: "ask-scribe", text: "Ask the oldest scribe what words are for.", effect: { return: 8, wonder: 8 }, tendency: "Humble grammar" }
    ]
  },
  {
    id: 12,
    slug: "chapel-of-empty-cups",
    title: "The Chapel of Empty Cups",
    imageTitle: "The Table Without Possession",
    quote: "A cup receives only because it is hollow.",
    story:
      "A small chapel waits with twelve empty cups on a stone table. No priest stands there. Mara says the cups must be assigned meanings. Kip noses one cup toward Elias and whispers that a chosen vessel must know what it is.",
    image: "/images/scenes/scene-12-chapel-of-empty-cups.png",
    imageIdea: "A candlelit chapel with twelve empty cups on a stone table and soft light falling through a high window.",
    bibleVerse: { reference: "Luke 22:20", text: "This cup is the new testament in my blood, which is shed for you." },
    mood: "peaceful",
    music: "/audio/peaceful-calming-crystals.mpeg",
    objects: ["Twelve empty cups", "Stone table", "Unlit candle"],
    choices: [
      { id: "name-cups", text: "Name each cup by virtue.", effect: { certainty: 10, grip: 8 }, tendency: "Holy arrangement", falsePathId: "saints-mask" },
      { id: "drink-empty", text: "Drink from the empty cup.", effect: { surrender: 14, wonder: 8 }, tendency: "Received emptiness" },
      { id: "serve-cups", text: "Set the cups for strangers not yet seen.", effect: { return: 14, surrender: 6 }, tendency: "Prepared hospitality" },
      { id: "chosen-cup", text: "Take the cup Kip calls chosen.", effect: { grip: 14, vision: 8 }, tendency: "Chosen vessel", falsePathId: "throne-of-the-chosen" }
    ]
  },
  {
    id: 13,
    slug: "river-of-unwritten-laws",
    title: "The River of Unwritten Laws",
    imageTitle: "The Command Before Stone",
    quote: "Law without love becomes a wall; love without law becomes fog.",
    story:
      "A river carries blank tablets downstream. Mara wants to carve rules before they vanish. Kip leaps from stone to stone, saying that undefined water cannot be crossed.",
    image: "/images/scenes/scene-13-river-of-unwritten-laws.png",
    imageIdea: "A pale river carrying blank stone tablets, with stepping stones, mist, and moonlight on moving water.",
    bibleVerse: { reference: "Jeremiah 31:33", text: "I will put my law in their inward parts, and write it in their hearts." },
    mood: "peaceful",
    music: "/audio/peaceful-alonia.mpeg",
    objects: ["Blank tablets", "River stones", "Carving chisel"],
    choices: [
      { id: "carve-law", text: "Carve a final law onto the tablet.", effect: { certainty: 16, grip: 8 }, tendency: "Law possessed", falsePathId: "tomb-of-certainty" },
      { id: "wash-tablet", text: "Wash the tablet and carry it blank.", effect: { surrender: 12, wonder: 8 }, tendency: "Law received" },
      { id: "bridge-tablets", text: "Build a bridge from the blank tablets.", effect: { return: 12, certainty: 4 }, tendency: "Useful doctrine" },
      { id: "follow-kip", text: "Follow Kip across only the named stones.", effect: { grip: 10, return: -4 }, tendency: "Named crossing", falsePathId: "kip-collar" }
    ]
  },
  {
    id: 14,
    slug: "tower-of-clear-speech",
    title: "The Tower of Clear Speech",
    imageTitle: "Babel Made Polite",
    quote: "Perfect speech can still refuse heaven.",
    story:
      "A white tower rises where every sentence is precise. Mara smiles here; nothing is ambiguous. Kip sleeps peacefully on a dictionary, as if the world has finally been made obedient.",
    image: "/images/scenes/scene-14-tower-of-clear-speech.png",
    imageIdea: "A white library tower with clean geometric stairs, dictionaries, and windows opening onto a stormy sky.",
    bibleVerse: { reference: "Genesis 11:4", text: "Let us build us a city and a tower, whose top may reach unto heaven." },
    mood: "dark",
    music: "/audio/dark-secrets.mpeg",
    objects: ["White tower", "Perfect dictionary", "Locked pulpit"],
    choices: [
      { id: "speak-perfect", text: "Speak the perfect sentence from the pulpit.", effect: { certainty: 18, grip: 10 }, tendency: "Polished Babel", falsePathId: "tower-of-definitions" },
      { id: "stammer-prayer", text: "Offer an unfinished prayer.", effect: { surrender: 14, wonder: 8 }, tendency: "Imperfect prayer" },
      { id: "translate-mercy", text: "Translate one hard word into mercy.", effect: { return: 12, surrender: 6 }, tendency: "Language descended" },
      { id: "burn-dictionary", text: "Burn the dictionary.", effect: { grip: 10, wonder: -4 }, tendency: "War on words" }
    ]
  },
  {
    id: 15,
    slug: "shepherds-moon",
    title: "The Shepherd's Moon",
    imageTitle: "The Field of Wandering Lights",
    quote: "A shepherd calls; a classifier counts.",
    story:
      "Under a low moon, small lights wander like sheep across a dark field. Kip darts among them, naming each one. Mara says no flock can be loved until it is numbered correctly.",
    image: "/images/scenes/scene-15-shepherds-moon.png",
    imageIdea: "A dark field beneath a huge crescent moon, wandering lantern-lights like sheep, and a distant shepherd staff.",
    bibleVerse: { reference: "Luke 15:4", text: "Doth not leave the ninety and nine... and go after that which is lost?" },
    mood: "peaceful",
    music: "/audio/peaceful-woodwind-reviere.mpeg",
    objects: ["Shepherd staff", "Wandering lights", "Moonlit grass"],
    choices: [
      { id: "count-flock", text: "Count every light before moving.", effect: { certainty: 12, grip: 8 }, tendency: "Counted flock" },
      { id: "call-lost", text: "Call gently to the light that wandered farthest.", effect: { return: 14, wonder: 6 }, tendency: "Shepherd attention" },
      { id: "name-brightest", text: "Name the brightest light as the true one.", effect: { vision: 12, grip: 8 }, tendency: "Brightest chosen", falsePathId: "throne-of-the-chosen" },
      { id: "walk-dark", text: "Walk through the dark without counting.", effect: { surrender: 14, wonder: 8 }, tendency: "Trusted night" }
    ]
  },
  {
    id: 16,
    slug: "archive-of-unmade-endings",
    title: "The Archive of Unmade Endings",
    imageTitle: "The Shelves of What Might Have Been",
    quote: "A possible ending is still a temptation if it asks to be worshiped.",
    story:
      "Shelves hold endings Elias has not chosen. Mara offers to arrange them by worth. Kip points to a golden ending and says it is the one that will finally define him.",
    image: "/images/scenes/scene-16-archive-of-unmade-endings.png",
    imageIdea: "An endless archive of glowing books, each showing a possible ending, with one golden book open on a central desk.",
    bibleVerse: { reference: "Proverbs 16:9", text: "A man's heart deviseth his way: but the LORD directeth his steps." },
    mood: "dark",
    music: "/audio/dark-how-did-we-get-here.mpeg",
    objects: ["Unmade endings", "Golden book", "Dusty ladder"],
    choices: [
      { id: "read-golden", text: "Read the golden ending first.", effect: { vision: 16, grip: 10 }, tendency: "Golden trap", falsePathId: "archive-of-visions" },
      { id: "shelve-all", text: "Shelve every ending without reading.", effect: { surrender: 12, wonder: 6 }, tendency: "Possible futures released" },
      { id: "rank-endings", text: "Let Mara rank the endings by holiness.", effect: { certainty: 14, grip: 8 }, tendency: "Ranked destiny", falsePathId: "mara-lexicon" },
      { id: "carry-blank", text: "Carry one blank book forward.", effect: { return: 10, surrender: 8 }, tendency: "Future unforced" }
    ]
  },
  {
    id: 17,
    slug: "stairway-returned",
    title: "The Stairway Returned",
    imageTitle: "The Descent into Living Rooms",
    quote: "The final sign was not above the world. It was mercy inside it.",
    story:
      "The Stairway opens into ordinary rooms: a classroom, a kitchen, a hospital corridor, a chapel at dawn. Sinclair lowers his lantern. Mara closes her ledger. Kip grows quiet. Elias sees that the last act is not to define the mystery, but to carry it gently among people.",
    image: "/images/scenes/scene-17-stairway-returned.png",
    imageIdea: "A luminous stairway descending into ordinary human spaces: classroom, kitchen, hospital corridor, and dawn chapel.",
    bibleVerse: { reference: "Micah 6:8", text: "Do justly, and to love mercy, and to walk humbly with thy God." },
    mood: "peaceful",
    music: "/audio/peaceful-woodwind-reviere.mpeg",
    objects: ["Sinclair's lantern", "Closed ledger", "Quiet collar", "Open doorway"],
    choices: [
      { id: "define-mercy", text: "Define mercy before offering it.", effect: { certainty: 16, grip: 8 }, tendency: "Mercy delayed", falsePathId: "tower-of-definitions" },
      { id: "hide-mystery", text: "Hide the Stairway from ordinary people.", effect: { grip: 12, return: -8 }, tendency: "Guarded sacred", falsePathId: "throne-of-the-chosen" },
      { id: "serve-first", text: "Serve first, explain later if asked.", effect: { return: 20, surrender: 10, wonder: 8 }, tendency: "Mercy descended" },
      { id: "walk-with-mara", text: "Invite Mara to walk without her ledger.", effect: { surrender: 10, return: 12 }, tendency: "Definition released" },
      { id: "loosen-collar", text: "Loosen Kip's collar and let the creature stop naming.", effect: { wonder: 12, grip: -8 }, tendency: "Cleverness humbled" }
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
  },
  {
    id: "mara-lexicon",
    title: "Mara's Perfect Lexicon",
    sceneId: 2,
    reward: "A wiser suspicion of elegant definitions.",
    realization: "Mara's words were careful, but care became control when every living thing had to fit the ledger.",
    choices: ["Define the crate.", "Define the guide.", "Define the gate.", "Close the ledger."]
  },
  {
    id: "kip-collar",
    title: "Kip's Silver Collar",
    sceneId: 2,
    reward: "A warning against charming certainty.",
    realization: "Kip sounded gentle because the collar made obedience feel like wisdom.",
    choices: ["Follow the soft voice.", "Name the doorway.", "Tighten the collar.", "Let the creature go quiet."]
  },
  {
    id: "court-of-weights",
    title: "The Court of Weights",
    sceneId: 8,
    reward: "A lighter conscience.",
    realization: "The scales could measure burden, but not mercy.",
    choices: ["Weigh the journal.", "Weigh the wound.", "Weigh the prayer.", "Step off the scale."]
  },
  {
    id: "garden-serpent",
    title: "The Garden's Polite Serpent",
    sceneId: 9,
    reward: "A cleaner hunger for wisdom.",
    realization: "The fruit did not lie. It simply offered wisdom before trust.",
    choices: ["Bite the fruit.", "Name the fruit.", "Guard the fruit.", "Leave it on the branch."]
  },
  {
    id: "well-of-self",
    title: "The Well of Self",
    sceneId: 10,
    reward: "A quieter ear.",
    realization: "The voice sounded true because it repeated Elias back to himself.",
    choices: ["Call into the well.", "Answer yourself.", "Drink the echo.", "Wait for silence."]
  },
  {
    id: "jar-of-final-words",
    title: "The Jar of Final Words",
    sceneId: 11,
    reward: "A loosened tongue.",
    realization: "The final word became false the moment Elias tried to own it.",
    choices: ["Seal the word.", "Sell the word.", "Preach the word.", "Open the jar."]
  },
  {
    id: "tower-of-definitions",
    title: "The Tower of Definitions",
    sceneId: 14,
    reward: "A humbled language.",
    realization: "The tower was clear, precise, and still too tall to kneel.",
    choices: ["Perfect the sentence.", "Correct the prayer.", "Lock the pulpit.", "Come down speaking mercy."]
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
  },
  8: {
    quote: "The scales can measure things, but they cannot measure mercy.",
    story: "Elias reaches a ruined court. Mara and Kip both suggest that the safest answer is to measure everything before trusting it.",
    choices: {
      "weigh-heart": "Put the journal on the scales.",
      "empty-scales": "Leave the scales empty.",
      "mara-proof": "Trust Mara's measurement.",
      "kip-count": "Let Kip count the stairs."
    }
  },
  9: {
    quote: "Quick wisdom can become a trap.",
    story: "A strange garden offers Elias glowing fruit. Kip says the fruit will define his purpose, but Elias must decide whether wisdom should be taken or received.",
    choices: {
      "eat-purpose": "Eat the fruit of Purpose.",
      "bless-fruit": "Bless the fruit and leave it.",
      "catalog-orchard": "Name every fruit.",
      "share-fruit": "Carry fruit to help others."
    }
  },
  10: {
    quote: "An echo may only repeat what Elias already wants to hear.",
    story: "At a stone well, Elias hears familiar voices. He must decide whether to follow the loudest voice or wait for silence.",
    choices: {
      "father-echo": "Answer his father's voice.",
      "sinclair-echo": "Listen for Sinclair.",
      "own-echo": "Trust the voice like his own.",
      "silence-well": "Wait for silence."
    }
  },
  11: {
    quote: "A final word can become an idol.",
    story: "In a market of scribes, people sell words in jars. Elias can buy a definition or let language stay alive.",
    choices: {
      "buy-name": "Buy the word Stairway.",
      "break-jars": "Break the jars.",
      "free-word": "Let one word escape.",
      "ask-scribe": "Ask what words are for."
    }
  },
  12: {
    quote: "An empty cup is ready to receive.",
    story: "A chapel holds twelve empty cups. Mara wants to assign meanings to them, and Kip tells Elias to choose the special cup.",
    choices: {
      "name-cups": "Name every cup.",
      "drink-empty": "Drink from the empty cup.",
      "serve-cups": "Prepare cups for strangers.",
      "chosen-cup": "Take Kip's chosen cup."
    }
  },
  13: {
    quote: "Rules need love, and love needs wisdom.",
    story: "Blank tablets float down a river. Elias can carve rules too quickly or carry the blank tablet humbly.",
    choices: {
      "carve-law": "Carve a final law.",
      "wash-tablet": "Carry the blank tablet.",
      "bridge-tablets": "Use tablets as a bridge.",
      "follow-kip": "Follow Kip's named stones."
    }
  },
  14: {
    quote: "Perfect words can still miss God.",
    story: "A white tower makes every sentence clear. Elias must choose between perfect explanation and humble prayer.",
    choices: {
      "speak-perfect": "Speak the perfect sentence.",
      "stammer-prayer": "Offer an unfinished prayer.",
      "translate-mercy": "Turn a hard word into mercy.",
      "burn-dictionary": "Burn the dictionary."
    }
  },
  15: {
    quote: "A shepherd loves before counting.",
    story: "Lights wander like sheep under the moon. Elias can count them all or call gently to the one farthest away.",
    choices: {
      "count-flock": "Count every light.",
      "call-lost": "Call the lost light.",
      "name-brightest": "Choose the brightest light.",
      "walk-dark": "Walk without counting."
    }
  },
  16: {
    quote: "Possible endings can tempt Elias away from the living path.",
    story: "An archive shows endings Elias has not chosen. Mara wants to rank them, while Kip points to the one that will define him.",
    choices: {
      "read-golden": "Read the golden ending.",
      "shelve-all": "Leave the endings unread.",
      "rank-endings": "Let Mara rank them.",
      "carry-blank": "Carry a blank book."
    }
  },
  17: {
    quote: "The journey ends by returning with mercy.",
    story: "The Stairway opens into ordinary rooms. Elias must decide whether to define mercy or simply begin serving.",
    choices: {
      "define-mercy": "Define mercy first.",
      "hide-mystery": "Hide the Stairway.",
      "serve-first": "Serve first.",
      "walk-with-mara": "Invite Mara to walk freely.",
      "loosen-collar": "Loosen Kip's collar."
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
  },
  8: {
    quote: "The weighed thing is not always the known thing.",
    story: "Mara and Kip lead Elias into a court of scales, where judgment begins to imitate wisdom.",
    choices: {
      "weigh-heart": "Weigh the journal.",
      "empty-scales": "Let the scales wait.",
      "mara-proof": "Accept Mara's proof.",
      "kip-count": "Count with Kip."
    }
  },
  9: {
    quote: "The orchard offers wisdom before trust.",
    story: "A garden glows in the desert. Its fruit promises purpose, but each promise asks to define Elias.",
    choices: {
      "eat-purpose": "Taste Purpose.",
      "bless-fruit": "Leave the fruit blessed.",
      "catalog-orchard": "Index Eden.",
      "share-fruit": "Carry provision."
    }
  },
  10: {
    quote: "The echo flatters the ear that made it.",
    story: "Voices rise from a well, each familiar enough to become a command.",
    choices: {
      "father-echo": "Answer grief.",
      "sinclair-echo": "Lower the bucket.",
      "own-echo": "Trust the familiar voice.",
      "silence-well": "Wait for quiet."
    }
  },
  11: {
    quote: "A jar can preserve a word and kill it.",
    story: "Scribes sell sealed language. The market is orderly, but every label wants a master.",
    choices: {
      "buy-name": "Purchase Stairway.",
      "break-jars": "Shatter the market.",
      "free-word": "Release a word.",
      "ask-scribe": "Question the scribe."
    }
  },
  12: {
    quote: "Hollowness can be readiness.",
    story: "Twelve cups wait on a stone table, and the temptation is to make each cup explain itself.",
    choices: {
      "name-cups": "Assign virtues.",
      "drink-empty": "Receive emptiness.",
      "serve-cups": "Set the table.",
      "chosen-cup": "Take Kip's cup."
    }
  },
  13: {
    quote: "The command before stone is not yet possession.",
    story: "Blank tablets drift on a river. Mara reaches for the chisel before Elias has listened.",
    choices: {
      "carve-law": "Carve certainty.",
      "wash-tablet": "Carry blankness.",
      "bridge-tablets": "Cross by use.",
      "follow-kip": "Step on named stones."
    }
  },
  14: {
    quote: "Babel can be courteous.",
    story: "The tower's speech is clean, exact, and too proud to descend.",
    choices: {
      "speak-perfect": "Speak perfection.",
      "stammer-prayer": "Pray unfinished.",
      "translate-mercy": "Translate mercy.",
      "burn-dictionary": "Reject the book."
    }
  },
  15: {
    quote: "Calling differs from counting.",
    story: "The field glows with wandering lights. Classification would be easy; shepherding is harder.",
    choices: {
      "count-flock": "Count the flock.",
      "call-lost": "Call the lost.",
      "name-brightest": "Crown the bright one.",
      "walk-dark": "Trust the dark."
    }
  },
  16: {
    quote: "Even futures can become idols.",
    story: "Unchosen endings line the shelves, each asking to be treated as destiny.",
    choices: {
      "read-golden": "Open gold.",
      "shelve-all": "Refuse the shelves.",
      "rank-endings": "Rank destiny.",
      "carry-blank": "Carry blankness."
    }
  },
  17: {
    quote: "Mercy descends before it explains itself.",
    story: "The Stairway reaches ordinary rooms. The last temptation is to define love before practicing it.",
    choices: {
      "define-mercy": "Define mercy.",
      "hide-mystery": "Guard mystery.",
      "serve-first": "Serve first.",
      "walk-with-mara": "Free the ledger.",
      "loosen-collar": "Loosen the collar."
    }
  }
};

export function sceneTextForDifficulty(scene: Scene, difficulty: Difficulty): DifficultySceneText {
  if (difficulty === "beginner" && beginnerSceneText[scene.id]) return beginnerSceneText[scene.id];
  if (difficulty === "medium" && mediumSceneText[scene.id]) return mediumSceneText[scene.id];

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
