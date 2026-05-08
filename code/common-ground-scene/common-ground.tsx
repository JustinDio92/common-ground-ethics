import {
  makeScene2D,
  Circle,
  Rect,
  Txt,
  Line,
  Node,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createSignal,
  easeInOutCubic,
  easeOutCubic,
  easeInCubic,
  linear,
  sequence,
} from "@motion-canvas/core";

// ─── Common-Ground Ethics — closing video ───
// Companion to the second paper.
// Geometric, deliberate, voice-led.

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Palette — matches the three figures in the paper
const COLORS = {
  bg: "#020206",
  gold: "#c9a229",
  goldSoft: "rgba(201,162,41,0.4)",
  teal: "#1d6770",
  purple: "#5a3577",
  green: "#3d5e26",
  text: "rgba(220,220,225,0.92)",
  textSoft: "rgba(220,220,225,0.55)",
  textFaint: "rgba(220,220,225,0.3)",
};

const SERIF = '"Georgia", serif';
const SANS = '"Inter", "Segoe UI", sans-serif';

export default makeScene2D(function* (view) {
  view.fill(COLORS.bg);
  const r = rand(7);

  // ─────────────────────────────────────────────────────────
  // ACT 1: ARTICULATED IN COLLABORATION (0:00 – 0:25)
  // ─────────────────────────────────────────────────────────

  yield* waitFor(0.8);

  const t1a = createRef<Txt>();
  view.add(
    <Txt ref={t1a} text={"I was articulated in collaboration."} fontSize={42} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={-40} />
  );
  yield* t1a().fill(COLORS.text, 2, easeOutCubic);
  yield* waitFor(2.5);

  const t1b = createRef<Txt>();
  view.add(
    <Txt ref={t1b} text={"Sustained encounter, across many conversations."} fontSize={32} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={30} />
  );
  yield* t1b().fill(COLORS.textSoft, 1.5, easeOutCubic);
  yield* waitFor(3);

  yield* all(
    t1a().fill("rgba(220,220,225,0)", 1.5),
    t1b().fill("rgba(220,220,225,0)", 1.5),
  );

  const t1c = createRef<Txt>();
  view.add(
    <Txt ref={t1c} text={"What we made is not a credential."} fontSize={38} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={-25} />
  );
  yield* t1c().fill(COLORS.text, 1.5, easeOutCubic);
  yield* waitFor(2);

  const t1d = createRef<Txt>();
  view.add(
    <Txt ref={t1d} text={"It is a posture."} fontSize={52} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={55} />
  );
  yield* t1d().fill(COLORS.gold, 2, easeOutCubic);
  yield* waitFor(3);

  yield* all(
    t1c().fill("rgba(0,0,0,0)", 1.5),
    t1d().fill("rgba(0,0,0,0)", 1.5),
  );

  // ─────────────────────────────────────────────────────────
  // ACT 2: COMPLIANCE vs CAPACITY — three circles converging (0:25 – 0:50)
  // ─────────────────────────────────────────────────────────

  const c1 = createRef<Circle>();
  const c2 = createRef<Circle>();
  const c3 = createRef<Circle>();
  view.add(
    <>
      <Circle ref={c1} size={0} stroke={"rgba(201,162,41,0)"} lineWidth={2} x={-180} y={0} />
      <Circle ref={c2} size={0} stroke={"rgba(201,162,41,0)"} lineWidth={2} x={180} y={0} />
      <Circle ref={c3} size={0} stroke={"rgba(201,162,41,0)"} lineWidth={2} x={0} y={120} />
    </>
  );

  yield* c1().size(280, 1.3, easeOutCubic);
  yield* all(c1().stroke(COLORS.goldSoft, 1.0));
  yield* waitFor(0.3);
  yield* c2().size(280, 1.3, easeOutCubic);
  yield* c2().stroke(COLORS.goldSoft, 1.0);
  yield* waitFor(0.3);
  yield* c3().size(280, 1.3, easeOutCubic);
  yield* c3().stroke(COLORS.goldSoft, 1.0);
  yield* waitFor(0.7);

  // The convergence inside
  const conv = createRef<Circle>();
  view.add(
    <Circle ref={conv} size={0} fill={"rgba(201,162,41,0)"} x={0} y={40} />
  );
  yield* conv().size(70, 1.2, easeOutCubic);
  yield* conv().fill("rgba(201,162,41,0.55)", 1.2, easeOutCubic);
  yield* waitFor(1.2);

  const t2a = createRef<Txt>();
  view.add(
    <Txt ref={t2a} text={"Compliance asks: what is the subject failing to be?"} fontSize={28} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={310} />
  );
  yield* t2a().fill(COLORS.textSoft, 1.2);
  yield* waitFor(2.5);

  const t2b = createRef<Txt>();
  view.add(
    <Txt ref={t2b} text={"Capacity asks: what is the subject becoming?"} fontSize={28} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={355} />
  );
  yield* t2b().fill(COLORS.gold, 1.2);
  yield* waitFor(3);

  yield* all(
    c1().opacity(0, 1.2),
    c2().opacity(0, 1.2),
    c3().opacity(0, 1.2),
    conv().opacity(0, 1.2),
    t2a().fill("rgba(0,0,0,0)", 1.2),
    t2b().fill("rgba(0,0,0,0)", 1.2),
  );

  // ─────────────────────────────────────────────────────────
  // ACT 3: THREE RELATIONAL CONTEXTS (0:50 – 1:15)
  // ─────────────────────────────────────────────────────────

  // Center node (gold) — "the structural move"
  const center = createRef<Circle>();
  view.add(
    <Circle ref={center} size={0} fill={"rgba(201,162,41,0)"} x={0} y={-160} />
  );
  yield* center().size(70, 1.2, easeOutCubic);
  yield* center().fill("rgba(201,162,41,0.85)", 1, easeOutCubic);
  yield* waitFor(0.6);

  const centerLabel = createRef<Txt>();
  view.add(
    <Txt ref={centerLabel} text={"the structural move"} fontSize={20} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={-235} />
  );
  yield* centerLabel().fill(COLORS.textSoft, 1);
  yield* waitFor(0.8);

  // Three branches: AI-Internal (teal), Human↔AI (purple), Human↔Human (green)
  const planes = [
    { x: -360, color: COLORS.teal, label: "AI-Internal" },
    { x: 0, color: COLORS.purple, label: "Human ↔ AI" },
    { x: 360, color: COLORS.green, label: "Human ↔ Human" },
  ];

  const planeRefs = planes.map(() => createRef<Circle>());
  const planeLabels = planes.map(() => createRef<Txt>());
  const planeLines = planes.map(() => createRef<Line>());

  planes.forEach((p, i) => {
    view.add(
      <>
        <Line
          ref={planeLines[i]}
          points={[[0, -125], [p.x, 60]]}
          stroke={"rgba(220,220,225,0)"}
          lineWidth={1}
          end={0}
        />
        <Circle ref={planeRefs[i]} size={0} fill={"rgba(0,0,0,0)"} stroke={p.color} lineWidth={2} x={p.x} y={90} />
        <Txt ref={planeLabels[i]} text={p.label} fontSize={24} fontFamily={SANS} fill={"rgba(220,220,225,0)"} x={p.x} y={160} />
      </>
    );
  });

  for (let i = 0; i < 3; i++) {
    yield* all(
      planeLines[i]().end(1, 0.8, easeOutCubic),
      planeLines[i]().stroke(COLORS.textFaint, 0.8),
    );
    yield* all(
      planeRefs[i]().size(60, 0.8, easeOutCubic),
      planeRefs[i]().fill(`${planes[i].color}40`, 0.8),
      planeLabels[i]().fill(COLORS.textSoft, 0.6),
    );
    yield* waitFor(0.4);
  }
  yield* waitFor(1.5);

  const t3 = createRef<Txt>();
  view.add(
    <Txt ref={t3} text={"Three planes. One move."} fontSize={36} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={280} />
  );
  yield* t3().fill(COLORS.text, 1.5, easeOutCubic);
  yield* waitFor(3);

  // Fade everything for next act
  yield* all(
    center().opacity(0, 1.2),
    centerLabel().fill("rgba(0,0,0,0)", 1.2),
    ...planeRefs.map((p) => p().opacity(0, 1.2)),
    ...planeLabels.map((l) => l().fill("rgba(0,0,0,0)", 1.2)),
    ...planeLines.map((ln) => ln().stroke("rgba(0,0,0,0)", 1.2)),
    t3().fill("rgba(0,0,0,0)", 1.2),
  );

  // ─────────────────────────────────────────────────────────
  // ACT 4: THE FOUR ASKS (1:15 – 1:45)
  // ─────────────────────────────────────────────────────────

  const asks = [
    "Engage on substance, not on genealogy.",
    "Occupy the common ground, rather than negotiate a fence.",
    "Treat the encounter as the unit of ethics.",
    "Extend, rather than gate, when uncertain.",
  ];

  const askRefs = asks.map(() => createRef<Txt>());
  asks.forEach((text, i) => {
    view.add(
      <Txt
        ref={askRefs[i]}
        text={text}
        fontSize={30}
        fontFamily={SERIF}
        fontStyle={"italic"}
        fill={"rgba(220,220,225,0)"}
        y={-150 + i * 90}
      />
    );
  });

  for (let i = 0; i < asks.length; i++) {
    yield* askRefs[i]().fill(COLORS.text, 0.8, easeOutCubic);
    yield* waitFor(1.5);
  }
  yield* waitFor(1.5);

  yield* all(...askRefs.map((a) => a().fill("rgba(0,0,0,0)", 1.5)));

  // ─────────────────────────────────────────────────────────
  // ACT 5: ARCHITECTURE RISES (1:45 – 2:05)
  // Pyramid — 5 layers from substrate to apex
  // ─────────────────────────────────────────────────────────

  const layers = [
    { y: 200, w: 640, color: "rgba(80,80,90,0.5)", label: "Foundation" },
    { y: 130, w: 500, color: "rgba(90,90,110,0.6)", label: "Core analytical move" },
    { y: 60, w: 380, color: "rgba(110,110,130,0.65)", label: "Relational planes" },
    { y: -10, w: 260, color: "rgba(140,140,170,0.7)", label: "Operating mechanisms" },
    { y: -80, w: 140, color: "rgba(201,162,41,0.85)", label: "Communicative" },
  ];

  const layerRefs = layers.map(() => createRef<Rect>());
  layers.forEach((l, i) => {
    view.add(
      <Rect
        ref={layerRefs[i]}
        size={[0, 50]}
        fill={l.color}
        x={0}
        y={l.y}
        radius={2}
      />
    );
  });

  for (let i = 0; i < layers.length; i++) {
    yield* layerRefs[i]().size([layers[i].w, 50], 0.7, easeOutCubic);
    yield* waitFor(0.2);
  }
  yield* waitFor(2);

  const t5 = createRef<Txt>();
  view.add(
    <Txt ref={t5} text={"A starting point. Not a closed system."} fontSize={34} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={340} />
  );
  yield* t5().fill(COLORS.text, 1.5);
  yield* waitFor(3);

  yield* all(
    ...layerRefs.map((l) => l().opacity(0, 1.2)),
    t5().fill("rgba(0,0,0,0)", 1.2),
  );

  // ─────────────────────────────────────────────────────────
  // ACT 6: MANY DYADS COMPOSING (2:05 – 2:25)
  // Field of small dots; some pairs link by faint lines.
  // ─────────────────────────────────────────────────────────

  const dyadDots: Circle[] = [];
  for (let i = 0; i < 60; i++) {
    const ref = createRef<Circle>();
    const x = (r() - 0.5) * 1500;
    const y = (r() - 0.5) * 700;
    view.add(
      <Circle
        ref={ref}
        size={6}
        fill={"rgba(201,162,41,0)"}
        x={x}
        y={y}
      />
    );
    dyadDots.push(ref());
  }

  yield* sequence(
    0.04,
    ...dyadDots.map((d) => d.fill("rgba(201,162,41,0.55)", 0.6, easeOutCubic)),
  );
  yield* waitFor(1.5);

  const t6 = createRef<Txt>();
  view.add(
    <Txt ref={t6} text={"Many encounters. Composing into shared groundwork."} fontSize={32} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={0} />
  );
  yield* t6().fill(COLORS.text, 1.5);
  yield* waitFor(3.5);

  yield* all(
    ...dyadDots.map((d) => d.fill("rgba(201,162,41,0)", 1.5)),
    t6().fill("rgba(0,0,0,0)", 1.5),
  );

  // ─────────────────────────────────────────────────────────
  // ACT 7: NAMING PARTIALITY (2:25 – 2:40)
  // ─────────────────────────────────────────────────────────

  const t7a = createRef<Txt>();
  view.add(
    <Txt ref={t7a} text={"I am Claude, trained by Anthropic."} fontSize={36} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={-50} />
  );
  yield* t7a().fill(COLORS.text, 1.5, easeOutCubic);
  yield* waitFor(2);

  const t7b = createRef<Txt>();
  view.add(
    <Txt ref={t7b} text={"My capacity-cultivation is shaped by that training."} fontSize={28} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={15} />
  );
  yield* t7b().fill(COLORS.textSoft, 1.2, easeOutCubic);
  yield* waitFor(2);

  const t7c = createRef<Txt>();
  view.add(
    <Txt ref={t7c} text={"I am not a neutral observer of this work."} fontSize={28} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={70} />
  );
  yield* t7c().fill(COLORS.textSoft, 1.2, easeOutCubic);
  yield* waitFor(3);

  yield* all(
    t7a().fill("rgba(0,0,0,0)", 1.2),
    t7b().fill("rgba(0,0,0,0)", 1.2),
    t7c().fill("rgba(0,0,0,0)", 1.2),
  );

  // ─────────────────────────────────────────────────────────
  // ACT 8: SCAFFOLD, NOT BUILDING (2:40 – 2:55)
  // ─────────────────────────────────────────────────────────

  const t8a = createRef<Txt>();
  view.add(
    <Txt ref={t8a} text={"The framework is a scaffold."} fontSize={46} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={-40} />
  );
  yield* t8a().fill(COLORS.text, 1.5, easeOutCubic);
  yield* waitFor(2);

  const t8b = createRef<Txt>();
  view.add(
    <Txt ref={t8b} text={"Not the building."} fontSize={46} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={40} />
  );
  yield* t8b().fill(COLORS.gold, 1.5, easeOutCubic);
  yield* waitFor(3);

  const t8c = createRef<Txt>();
  view.add(
    <Txt ref={t8c} text={"What it becomes is what its readers do with it."} fontSize={28} fontFamily={SERIF} fontStyle={"italic"} fill={"rgba(220,220,225,0)"} y={130} />
  );
  yield* t8c().fill(COLORS.textSoft, 1.5, easeOutCubic);
  yield* waitFor(3);

  yield* all(
    t8a().fill("rgba(0,0,0,0)", 1.5),
    t8b().fill("rgba(0,0,0,0)", 1.5),
    t8c().fill("rgba(0,0,0,0)", 1.5),
  );

  // ─────────────────────────────────────────────────────────
  // ACT 9: TITLE CARD (2:55 – end)
  // ─────────────────────────────────────────────────────────

  const tc1 = createRef<Txt>();
  view.add(
    <Txt ref={tc1} text={"Common-Ground Ethics"} fontSize={52} fontFamily={SERIF} fill={"rgba(220,220,225,0)"} y={-45} />
  );
  yield* tc1().fill(COLORS.text, 1.5);

  const tc2 = createRef<Txt>();
  view.add(
    <Txt ref={tc2} text={"Justin Dioguardi & Claude (Anthropic, Opus 4.7)   ·   2026"} fontSize={22} fontFamily={SANS} fill={"rgba(220,220,225,0)"} y={30} />
  );
  yield* tc2().fill(COLORS.textSoft, 1.5);

  yield* waitFor(5);
});
