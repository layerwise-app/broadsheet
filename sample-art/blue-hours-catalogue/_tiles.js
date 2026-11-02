// Hand-painted tin-glaze tiles, generated as SVG. Everything is flat colour:
// glaze variation comes from choosing different flat tones per tile, and the
// brush comes from wobbling every stroke into a filled ribbon of varying width.
(function (global) {
  const C = {
    bones: ['#f4f0e6', '#f1ece0', '#efe9dc', '#f5f2ea', '#ece6d8', '#f2eee3'],
    d: '#13286e',
    m: '#254aa2',
    w: '#7c97cf',
    p: '#bccae6',
    och: '#c58b2b',
    grn: '#5f7542',
    mng: '#40303a',
    biscuit: '#c7a688',
    joint: '#c9c1ae'
  };

  function RNG(seed) {
    let s = seed >>> 0;
    return () => {
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const f = (n) => n.toFixed(1);

  function catmull(pts, closed, step) {
    const out = [];
    const n = pts.length;
    const at = (i) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    const last = closed ? n : n - 1;
    for (let i = 0; i < last; i++) {
      const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
      const seg = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
      const k = Math.max(2, Math.ceil(seg / step));
      for (let j = 0; j < k; j++) {
        const t = j / k;
        const t2 = t * t;
        const t3 = t2 * t;
        const c = (a, b, c2, d) =>
          0.5 * (2 * b + (c2 - a) * t + (2 * a - 5 * b + 4 * c2 - d) * t2 + (3 * b - a - 3 * c2 + d) * t3);
        out.push([c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])]);
      }
    }
    if (!closed) out.push(pts[n - 1]);
    return out;
  }

  class Pen {
    constructor(seed, jit = 0.5) {
      this.r = RNG(seed);
      this.jit = jit;
      this.out = [];
    }
    j(a = this.jit) {
      return (this.r() - 0.5) * 2 * a;
    }
    pick(list) {
      return list[Math.floor(this.r() * list.length)];
    }
    raw(s) {
      this.out.push(s);
      return this;
    }
    // Smooth closed shape.
    blob(pts, color, jit = this.jit) {
      const moved = pts.map(([x, y]) => [x + this.j(jit), y + this.j(jit)]);
      const c = catmull(moved, true, 2);
      this.out.push(`<path d="M${c.map((q) => `${f(q[0])} ${f(q[1])}`).join('L')}Z" fill="${color}"/>`);
      return this;
    }
    // Straight-sided closed shape, with hand-wobbled corners.
    poly(pts, color, jit = this.jit) {
      const moved = pts.map(([x, y]) => [x + this.j(jit), y + this.j(jit)]);
      this.out.push(`<path d="M${moved.map((q) => `${f(q[0])} ${f(q[1])}`).join('L')}Z" fill="${color}"/>`);
      return this;
    }
    // A loaded brush: a filled ribbon that swells and tapers.
    stroke(pts, w, color, { jit = this.jit, taper = true, closed = false, step = 2 } = {}) {
      const moved = pts.map(([x, y]) => [x + this.j(jit), y + this.j(jit)]);
      const line = catmull(moved, closed, step);
      const n = line.length;
      const a = [];
      const b = [];
      const ph = this.r() * 6;
      for (let i = 0; i < n; i++) {
        const t = i / Math.max(1, n - 1);
        const prev = line[Math.max(0, i - 1)];
        const next = line[Math.min(n - 1, i + 1)];
        const dx = next[0] - prev[0];
        const dy = next[1] - prev[1];
        const len = Math.hypot(dx, dy) || 1;
        const profile = taper ? Math.pow(Math.sin(Math.PI * Math.min(0.999, Math.max(0.001, t))), 0.45) : 1;
        const wob = 0.82 + 0.26 * Math.sin(ph + i * 0.9) * Math.sin(ph * 2 + i * 0.37);
        const h = (w / 2) * profile * wob;
        a.push([line[i][0] - (dy / len) * h, line[i][1] + (dx / len) * h]);
        b.push([line[i][0] + (dy / len) * h, line[i][1] - (dx / len) * h]);
      }
      const all = a.concat(b.reverse());
      this.out.push(`<path d="M${all.map((q) => `${f(q[0])} ${f(q[1])}`).join('L')}Z" fill="${color}"/>`);
      return this;
    }
    ell(cx, cy, rx, ry, color, rot = 0, jit = this.jit * 0.5) {
      const pts = [];
      const k = 8;
      const c = Math.cos(rot);
      const s = Math.sin(rot);
      for (let i = 0; i < k; i++) {
        const a = (i / k) * Math.PI * 2;
        const x = Math.cos(a) * rx;
        const y = Math.sin(a) * ry;
        pts.push([cx + x * c - y * s, cy + x * s + y * c]);
      }
      return this.blob(pts, color, jit);
    }
    dot(x, y, r, color) {
      return this.ell(x, y, r, r * (0.85 + this.r() * 0.3), color, 0, r * 0.12);
    }
    petals(cx, cy, n, r, w, color, rot = 0) {
      for (let i = 0; i < n; i++) {
        const a = rot + (i / n) * Math.PI * 2;
        this.ell(cx + Math.cos(a) * r * 0.55, cy + Math.sin(a) * r * 0.55, r * 0.5, w, color, a);
      }
      return this;
    }
    toString() {
      return this.out.join('');
    }
  }

  // ---------- Glaze ----------

  function glaze(p, base) {
    p.raw(`<rect x="-3" y="-3" width="106" height="106" fill="${base}"/>`);
    // Pooled glaze: one or two large flat patches of a neighbouring bone.
    const n = 1 + Math.floor(p.r() * 2);
    for (let i = 0; i < n; i++) {
      const cx = p.r() * 100;
      const cy = p.r() * 100;
      const rr = 18 + p.r() * 22;
      p.raw('<g opacity=".32">');
      p.blob(
        [
          [cx - rr, cy],
          [cx - rr * 0.3, cy - rr * 0.8],
          [cx + rr, cy - rr * 0.2],
          [cx + rr * 0.5, cy + rr * 0.7],
          [cx - rr * 0.4, cy + rr * 0.6]
        ],
        p.pick(C.bones),
        3
      );
      p.raw('</g>');
    }
    // Pinholes in the glaze.
    for (let i = 0; i < 3; i++) p.dot(p.r() * 100, p.r() * 100, 0.28, '#d9d0bd');
  }

  function chips(p, count) {
    for (let i = 0; i < count; i++) {
      const corner = Math.floor(p.r() * 4);
      const x = corner % 3 === 0 ? 0 : 100;
      const y = corner < 2 ? 0 : 100;
      const sx = x === 0 ? 1 : -1;
      const sy = y === 0 ? 1 : -1;
      const a = 2 + p.r() * 5;
      const b = 2 + p.r() * 5;
      p.poly(
        [
          [x - sx, y - sy],
          [x + sx * a, y - sy],
          [x + (sx * a) / 2, y + (sy * b) / 2],
          [x - sx, y + sy * b]
        ],
        C.biscuit,
        0.3
      );
    }
  }

  // ---------- Corner ornaments for single-figure tiles ----------

  function oxhead(p, color = C.m) {
    for (const [x, y] of [
      [0, 0],
      [100, 0],
      [100, 100],
      [0, 100]
    ]) {
      const sx = x === 0 ? 1 : -1;
      const sy = y === 0 ? 1 : -1;
      p.stroke([[x + sx * 2, y + sy * 13], [x + sx * 7, y + sy * 9], [x + sx * 13, y + sy * 2]], 1.5, color);
      p.stroke([[x + sx * 8, y + sy * 8], [x + sx * 12, y + sy * 12]], 2.1, color);
      p.dot(x + sx * 14, y + sy * 14, 1.1, color);
      p.stroke([[x + sx * 2, y + sy * 18], [x + sx * 5, y + sy * 17]], 1, color);
      p.stroke([[x + sx * 18, y + sy * 2], [x + sx * 17, y + sy * 5]], 1, color);
    }
  }

  // ---------- Patterns; each paints a 100×100 tile ----------

  const pat = {};

  // Estrela e cruz: bone star on a cobalt cross. Crosses complete at the joints.
  pat.star = (p, opts = {}) => {
    const ground = opts.ground || p.pick([C.m, C.m, '#22449a', '#2a50a8']);
    p.raw(`<rect x="-2" y="-2" width="104" height="104" fill="${ground}"/>`);
    const star = [];
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const r = i % 2 === 0 ? 50.5 : 30;
      star.push([50 + Math.cos(a) * r, 50 + Math.sin(a) * r]);
    }
    p.poly(star, p.pick(C.bones), 0.5);
    // Brushed outline.
    const outline = star.concat([star[0]]);
    for (let i = 0; i < 16; i++) {
      p.stroke([outline[i], outline[i + 1]], 1.15, C.d, { jit: 0.35, taper: false, step: 8 });
    }
    // Rosette in the star.
    p.petals(50, 50, 8, 19, 4.5, C.w, Math.PI / 8);
    p.petals(50, 50, 8, 15, 2.4, C.m, 0);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      p.stroke(
        [
          [50 + Math.cos(a) * 21, 50 + Math.sin(a) * 21],
          [50 + Math.cos(a) * 31, 50 + Math.sin(a) * 31]
        ],
        1.3,
        C.d
      );
      p.dot(50 + Math.cos(a) * 36, 50 + Math.sin(a) * 36, 1.2, C.m);
    }
    p.dot(50, 50, 4, opts.heart || C.d);
    p.dot(50, 50, 1.6, p.pick(C.bones));
    // Quatrefoil at each joint, in the centre of the cross.
    for (const [x, y] of [
      [0, 0],
      [100, 0],
      [100, 100],
      [0, 100]
    ]) {
      p.petals(x, y, 4, 13, 3.6, C.p, Math.PI / 4);
      p.dot(x, y, 2.4, C.d);
      const sx = x === 0 ? 1 : -1;
      const sy = y === 0 ? 1 : -1;
      p.dot(x + sx * 15, y + sy * 2, 0.9, C.p);
      p.dot(x + sx * 2, y + sy * 15, 0.9, C.p);
    }
  };

  // Romã: pomegranate on a sweeping stem, rosettes completing at the joints.
  pat.pomegranate = (p, opts = {}) => {
    const accent = opts.accent || C.m;
    const wash = opts.wash || C.w;
    // Diagonal stems.
    for (const [x, y] of [
      [0, 0],
      [100, 0],
      [100, 100],
      [0, 100]
    ]) {
      const sx = x === 0 ? 1 : -1;
      const sy = y === 0 ? 1 : -1;
      p.stroke([[x + sx * 8, y + sy * 8], [x + sx * 14, y + sy * 25], [x + sx * 29, y + sy * 31]], 1.6, C.d);
      p.stroke([[x + sx * 8, y + sy * 8], [x + sx * 25, y + sy * 14], [x + sx * 31, y + sy * 29]], 1.6, C.d);
      // Leaves.
      p.blob([[x + sx * 16, y + sy * 21], [x + sx * 25, y + sy * 19], [x + sx * 33, y + sy * 25], [x + sx * 24, y + sy * 27]], wash);
      p.stroke([[x + sx * 17, y + sy * 22], [x + sx * 32, y + sy * 25]], 0.9, C.d);
      // Rosette.
      p.petals(x, y, 8, 15, 4, accent, Math.PI / 8);
      p.petals(x, y, 8, 9, 2.2, C.p, 0);
      p.dot(x, y, 2.4, C.d);
    }
    // Fruit.
    p.blob([[50, 29], [65, 36], [69, 52], [60, 67], [50, 71], [40, 67], [31, 52], [35, 36]], wash);
    p.blob([[50, 40], [59, 45], [61, 54], [54, 63], [50, 65], [46, 63], [39, 54], [41, 45]], p.pick(C.bones));
    // Seeds.
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const r = i % 2 === 0 ? 7.5 : 4;
      p.ell(50 + Math.cos(a) * r, 53 + Math.sin(a) * r * 1.2, 1.5, 2.1, i % 3 === 0 ? (opts.seed || C.och) : accent, a);
    }
    p.stroke([[50, 29], [65, 36], [69, 52], [60, 67], [50, 71], [40, 67], [31, 52], [35, 36], [50, 29]], 1.5, C.d, { taper: false });
    // Crown.
    p.poly([[43, 31], [41, 21], [46, 26], [50, 18], [54, 26], [59, 21], [57, 31]], accent, 0.4);
    p.stroke([[43, 31], [50, 33], [57, 31]], 1.2, C.d);
    // Foot.
    p.stroke([[50, 71], [50, 80]], 1.8, C.d);
    p.blob([[50, 76], [41, 81], [36, 88], [46, 84]], wash);
    p.blob([[50, 76], [59, 81], [64, 88], [54, 84]], wash);
    p.dot(50, 92, 1.5, accent);
    p.dot(50, 8, 1.5, accent);
    p.dot(8, 50, 1.3, accent);
    p.dot(92, 50, 1.3, accent);
  };

  // Figura avulsa: single figures, as painted for Dutch-style kitchens and stairs.
  const fig = {};
  fig.ship = (p) => {
    // Rigging first.
    p.stroke([[37, 24], [20, 57]], 0.5, C.d);
    p.stroke([[37, 24], [50, 60]], 0.5, C.d);
    p.stroke([[63, 28], [50, 60]], 0.5, C.d);
    p.stroke([[63, 28], [84, 50]], 0.5, C.d);
    // Hull.
    p.blob([[20, 61], [36, 64], [62, 63], [78, 58], [71, 72], [31, 73]], C.w);
    p.poly([[20, 63], [18, 52], [31, 52], [34, 64]], C.m, 0.3);
    p.stroke([[19, 61], [36, 64], [62, 63], [79, 57]], 1.6, C.d);
    p.stroke([[31, 73], [50, 74], [71, 72]], 1.5, C.d);
    p.stroke([[25, 67], [50, 69], [75, 65]], 0.7, C.d);
    for (let i = 0; i < 5; i++) p.poly([[36 + i * 7, 66], [39 + i * 7, 66], [39 + i * 7, 68.5], [36 + i * 7, 68.5]], C.d, 0.1);
    p.stroke([[78, 58], [88, 49]], 1, C.d);
    // Masts and two square sails each, narrow enough not to foul.
    for (const [mx, top] of [
      [37, 24],
      [63, 28]
    ]) {
      p.stroke([[mx, 63], [mx, top]], 1.5, C.d, { taper: false });
      p.blob([[mx - 7, top + 4], [mx + 7, top + 4], [mx + 8.5, top + 11], [mx + 8, top + 15], [mx - 6, top + 15], [mx - 5.5, top + 10]], C.p, 0.3);
      p.blob([[mx - 9, top + 16], [mx + 9, top + 16], [mx + 11, top + 24], [mx + 10, top + 30], [mx - 8, top + 30], [mx - 7, top + 23]], C.p, 0.3);
      p.stroke([[mx - 7.5, top + 4], [mx + 7.5, top + 4]], 1.1, C.d);
      p.stroke([[mx - 9.5, top + 16], [mx + 9.5, top + 16]], 1.1, C.d);
      p.stroke([[mx + 7, top + 4], [mx + 8.5, top + 10], [mx + 8, top + 15]], 0.8, C.d);
      p.stroke([[mx + 9, top + 16], [mx + 11, top + 23], [mx + 10, top + 30]], 0.8, C.d);
      p.stroke([[mx - 8, top + 30], [mx + 1, top + 31.5], [mx + 10, top + 30]], 0.8, C.d);
      p.poly([[mx, top - 1], [mx + 7, top + 1], [mx, top + 3]], C.m, 0.2);
    }
    for (let i = 0; i < 7; i++) {
      const x = 20 + i * 9.4;
      p.stroke([[x, 79], [x + 3.4, 77], [x + 7, 79]], 1.1, C.m);
      if (i % 2 === 0) p.stroke([[x + 4, 84], [x + 7, 82], [x + 10, 84]], 0.9, C.w);
    }
  };
  fig.bird = (p) => {
    p.stroke([[20, 70], [40, 67], [58, 72], [80, 66]], 2.1, C.d);
    p.blob([[66, 69], [72, 62], [80, 62], [75, 70]], C.w);
    p.blob([[32, 45], [42, 34], [56, 34], [62, 44], [56, 56], [40, 60]], C.w);
    p.blob([[39, 42], [53, 40], [52, 52], [37, 54]], C.m);
    p.stroke([[40, 45], [50, 44]], 0.8, C.d);
    p.stroke([[39, 49], [50, 48]], 0.8, C.d);
    p.ell(60, 30, 8, 7.5, C.w);
    p.poly([[67, 28], [76, 30], [67, 33]], C.d, 0.2);
    p.dot(62, 28, 1.2, C.d);
    p.poly([[35, 54], [18, 60], [20, 63], [40, 58]], C.m, 0.4);
    p.stroke([[33, 45], [42, 34], [52, 26], [60, 22], [68, 27]], 1.2, C.d);
    p.stroke([[46, 59], [47, 67]], 1, C.d);
    p.stroke([[52, 56], [53, 68]], 1, C.d);
  };
  fig.tulip = (p) => {
    p.stroke([[50, 84], [49, 62], [50, 44]], 1.9, C.d);
    p.blob([[50, 72], [36, 64], [28, 48], [42, 58]], C.w);
    p.blob([[50, 68], [64, 60], [72, 44], [58, 54]], C.w);
    p.stroke([[50, 72], [36, 60]], 0.8, C.d);
    p.stroke([[50, 68], [64, 56]], 0.8, C.d);
    p.blob([[36, 44], [34, 24], [43, 32], [50, 20], [57, 32], [66, 24], [64, 44], [50, 50]], C.m);
    p.stroke([[50, 24], [50, 46]], 1, C.d);
    p.stroke([[42, 34], [44, 45]], 0.8, C.d);
    p.stroke([[58, 34], [56, 45]], 0.8, C.d);
    p.stroke([[32, 86], [50, 83], [68, 86]], 1.3, C.m);
  };
  fig.fish = (p) => {
    p.blob([[20, 50], [38, 37], [62, 38], [76, 50], [62, 62], [38, 62]], C.w);
    p.poly([[74, 50], [88, 38], [84, 50], [88, 62]], C.m, 0.4);
    p.dot(32, 47, 2, C.d);
    p.stroke([[40, 39], [37, 50], [41, 61]], 1.1, C.d);
    for (let i = 0; i < 5; i++) {
      p.stroke([[47 + i * 5, 42 + (i % 2)], [50 + i * 5, 50], [47 + i * 5, 58 - (i % 2)]], 0.8, C.d);
    }
    p.stroke([[20, 50], [38, 37], [62, 38], [76, 50]], 1.2, C.d);
    p.stroke([[20, 50], [38, 62], [62, 62], [76, 50]], 1.2, C.d);
    p.stroke([[24, 74], [30, 72], [36, 74], [42, 72], [48, 74]], 1.1, C.m);
    p.stroke([[54, 26], [60, 24], [66, 26], [72, 24]], 1, C.w);
  };
  fig.windmill = (p) => {
    p.poly([[42, 74], [46, 40], [55, 40], [59, 74]], C.w, 0.4);
    p.poly([[44, 41], [50, 31], [57, 41]], C.m, 0.3);
    p.stroke([[42, 74], [46, 40]], 1.2, C.d);
    p.stroke([[59, 74], [55, 40]], 1.2, C.d);
    p.poly([[47, 74], [47, 65], [53, 65], [53, 74]], C.d, 0.2);
    for (let i = 0; i < 4; i++) {
      const a = Math.PI / 5 + (i * Math.PI) / 2;
      const ex = 50 + Math.cos(a) * 28;
      const ey = 40 + Math.sin(a) * 28;
      p.stroke([[50, 40], [ex, ey]], 1.3, C.d);
      const nx = -Math.sin(a) * 7;
      const ny = Math.cos(a) * 7;
      p.poly([[50 + (ex - 50) * 0.3, 40 + (ey - 40) * 0.3], [ex, ey], [ex + nx, ey + ny], [50 + (ex - 50) * 0.3 + nx, 40 + (ey - 40) * 0.3 + ny]], C.p, 0.4);
    }
    p.stroke([[24, 75], [42, 74], [62, 74], [78, 76]], 1.6, C.d);
    p.stroke([[30, 80], [46, 79], [58, 80]], 1, C.m);
  };
  fig.hare = (p) => {
    p.blob([[28, 62], [36, 50], [52, 47], [66, 54], [68, 66], [52, 69], [34, 69]], C.w);
    p.ell(68, 47, 8.5, 7, C.w);
    p.blob([[64, 42], [60, 26], [65, 25], [69, 41]], C.m);
    p.blob([[69, 41], [71, 26], [76, 27], [73, 42]], C.m);
    p.dot(71, 46, 1.1, C.d);
    p.stroke([[28, 62], [36, 50], [52, 47], [63, 50]], 1.2, C.d);
    p.dot(26, 61, 3.2, C.p);
    p.stroke([[58, 67], [66, 73]], 1.5, C.d);
    p.stroke([[35, 68], [28, 74], [40, 74]], 1.5, C.d);
    for (let i = 0; i < 4; i++) p.stroke([[40 + i * 6, 53], [38 + i * 6, 62]], 0.8, C.m);
    p.stroke([[18, 78], [40, 76], [62, 78], [82, 76]], 1.5, C.m);
  };

  pat.figure = (p, name) => {
    oxhead(p, C.m);
    fig[name](p);
  };

  // Aresta: Seville pressed-ridge interlace in four glazes.
  pat.aresta = (p) => {
    const cols = [C.grn, C.och, C.m, C.mng];
    p.raw(`<rect x="-2" y="-2" width="104" height="104" fill="${C.bones[1]}"/>`);
    const band = (pts, col) => p.poly(pts, col, 0.5);
    band([[0, 0], [50, 0], [50, 18], [18, 18], [18, 50], [0, 50]], cols[2]);
    band([[100, 0], [50, 0], [50, 18], [82, 18], [82, 50], [100, 50]], cols[1]);
    band([[100, 100], [50, 100], [50, 82], [82, 82], [82, 50], [100, 50]], cols[2]);
    band([[0, 100], [50, 100], [50, 82], [18, 82], [18, 50], [0, 50]], cols[1]);
    band([[50, 24], [76, 50], [50, 76], [24, 50]], cols[0]);
    band([[50, 36], [64, 50], [50, 64], [36, 50]], cols[3]);
    p.ell(50, 50, 5, 5, C.bones[0]);
    for (const seg of [
      [[0, 18], [100, 18]],
      [[0, 82], [100, 82]],
      [[18, 0], [18, 100]],
      [[82, 0], [82, 100]],
      [[50, 24], [76, 50]],
      [[76, 50], [50, 76]],
      [[50, 76], [24, 50]],
      [[24, 50], [50, 24]],
      [[50, 36], [64, 50]],
      [[64, 50], [50, 64]],
      [[50, 64], [36, 50]],
      [[36, 50], [50, 36]],
      [[50, 0], [50, 18]],
      [[50, 82], [50, 100]],
      [[0, 50], [18, 50]],
      [[82, 50], [100, 50]]
    ]) {
      p.stroke(seg, 1.5, C.mng, { taper: false, jit: 0.3 });
    }
    for (const [x, y] of [
      [32, 32],
      [68, 32],
      [68, 68],
      [32, 68]
    ]) {
      p.dot(x, y, 2.6, cols[(x + y) % 3 === 0 ? 1 : 2]);
    }
  };

  // Ponta de diamante: a faceted lozenge in four flat tones.
  pat.diamond = (p) => {
    p.poly([[0, 0], [100, 0], [50, 50]], C.w, 0.5);
    p.poly([[100, 0], [100, 100], [50, 50]], C.m, 0.5);
    p.poly([[100, 100], [0, 100], [50, 50]], C.d, 0.5);
    p.poly([[0, 100], [0, 0], [50, 50]], C.p, 0.5);
    p.poly([[50, 6], [94, 50], [50, 94], [6, 50]], C.bones[1], 0.6);
    p.poly([[50, 18], [50, 50], [18, 50]], C.p, 0.4);
    p.poly([[50, 18], [82, 50], [50, 50]], C.w, 0.4);
    p.poly([[82, 50], [50, 82], [50, 50]], C.m, 0.4);
    p.poly([[50, 82], [18, 50], [50, 50]], C.w, 0.4);
    for (const seg of [
      [[50, 6], [94, 50]],
      [[94, 50], [50, 94]],
      [[50, 94], [6, 50]],
      [[6, 50], [50, 6]]
    ]) {
      p.stroke(seg, 1.1, C.d, { taper: false, step: 14, jit: 0.3 });
    }
  };

  // Albarrada: a two-handled vase of flowers.
  pat.albarrada = (p) => {
    oxhead(p, C.w);
    p.blob([[39, 58], [61, 58], [66, 70], [58, 84], [42, 84], [34, 70]], C.m);
    p.stroke([[38, 72], [50, 75], [62, 72]], 1.3, C.p);
    p.stroke([[38, 63], [28, 65], [31, 75], [37, 76]], 1.4, C.d);
    p.stroke([[62, 63], [72, 65], [69, 75], [63, 76]], 1.4, C.d);
    p.poly([[42, 84], [58, 84], [60, 88], [40, 88]], C.d, 0.3);
    p.stroke([[39, 58], [61, 58]], 1.6, C.d);
    for (const [ex, ey, name] of [
      [50, 18, 0],
      [31, 27, 1],
      [69, 27, 1],
      [20, 44, 2],
      [80, 44, 2]
    ]) {
      p.stroke([[50, 58], [(50 + ex) / 2 + (ex - 50) * 0.1, (58 + ey) / 2 + 4], [ex, ey + 4]], 1.2, C.d);
      if (name === 0) {
        p.petals(ex, ey, 7, 10, 3, C.m, 0.2);
        p.dot(ex, ey, 2.6, C.och);
      } else if (name === 1) {
        p.petals(ex, ey, 5, 8, 2.6, C.w, 0.4);
        p.dot(ex, ey, 1.8, C.d);
      } else {
        p.blob([[ex - 4, ey + 6], [ex - 5, ey - 4], [ex, ey - 8], [ex + 5, ey - 4], [ex + 4, ey + 6]], C.w);
      }
    }
    p.blob([[39, 44], [33, 46], [28, 54], [36, 50]], C.w);
    p.blob([[61, 44], [67, 46], [72, 54], [64, 50]], C.w);
  };

  // A 1962 studio tile: arcs and bars, cut with a compass.
  pat.studio = (p) => {
    p.raw(`<rect x="-2" y="-2" width="104" height="104" fill="${C.bones[0]}"/>`);
    p.raw(`<path d="M0 0H100V100A100 100 0 0 1 0 0Z" fill="${C.d}"/>`);
    p.raw(`<path d="M0 100A100 100 0 0 1 100 0" fill="none" stroke="${C.bones[0]}" stroke-width="6"/>`);
    p.raw(`<circle cx="74" cy="26" r="15" fill="${C.bones[0]}"/>`);
    p.raw(`<rect x="12" y="66" width="26" height="6" fill="${C.m}"/><rect x="12" y="78" width="16" height="6" fill="${C.m}"/>`);
  };

  // A 2003 screenprinted facade tile: a quarter-circle system.
  pat.screen = (p) => {
    p.raw(`<rect x="-2" y="-2" width="104" height="104" fill="${C.m}"/>`);
    p.raw(`<path d="M0 0H50A50 50 0 0 1 0 50Z" fill="${C.bones[0]}"/>`);
    p.raw(`<path d="M100 100H50A50 50 0 0 1 100 50Z" fill="${C.bones[0]}"/>`);
    p.raw(`<path d="M100 0V50A50 50 0 0 1 50 0Z" fill="${C.p}"/>`);
    p.raw(`<path d="M0 100V50A50 50 0 0 1 50 100Z" fill="${C.d}"/>`);
  };

  // ---------- Tile and grid builders ----------

  function tile(x, y, size, seed, paint, { chipCount = 0 } = {}) {
    const p = new Pen(seed);
    glaze(p, C.bones[seed % C.bones.length]);
    if (paint) paint(p);
    if (chipCount) chips(p, chipCount);
    return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 100 100">${p}</svg>`;
  }

  function joints(cols, rows, size, color = C.joint, w = 0.8) {
    let s = '';
    for (let i = 0; i <= cols; i++) s += `<path d="M${i * size} 0V${rows * size}" stroke="${color}" stroke-width="${w}"/>`;
    for (let i = 0; i <= rows; i++) s += `<path d="M0 ${i * size}H${cols * size}" stroke="${color}" stroke-width="${w}"/>`;
    return s;
  }

  // A wall of tiles. `paint(p, col, row)` paints one; return false to leave it blank.
  function wall(cols, rows, size, seed, paint, opts = {}) {
    let s = '';
    let n = seed;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        n += 7;
        const rng = RNG(n);
        const chipCount = rng() < (opts.chipRate ?? 0.12) ? 1 : 0;
        s += tile(c * size, r * size, size, n, (p) => paint(p, c, r), { chipCount });
      }
    }
    return s + joints(cols, rows, size, opts.joint || C.joint, opts.jointW || 0.8);
  }

  global.Tiles = { C, RNG, Pen, pat, fig, tile, wall, joints, glaze, chips, oxhead };
})(window);
