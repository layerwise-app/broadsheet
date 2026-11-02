// Pith's cut-paper shape library. Every food is built from flat layers, the way
// the printed illustrations are: slightly off-true, no gradients, no shadows.
const TAU = Math.PI * 2;
const f1 = (n) => +n.toFixed(1);
function rng(seed) { let s = (seed * 2654435761) >>> 0 || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

// Closed Catmull-Rom through points, as cubic beziers.
function smooth(pts, tension = 0.5) {
  const n = pts.length; let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const k = tension / 3 * 2;
    d += `C${f1(p1[0] + (p2[0] - p0[0]) * k / 2)} ${f1(p1[1] + (p2[1] - p0[1]) * k / 2)} ${f1(p2[0] - (p3[0] - p1[0]) * k / 2)} ${f1(p2[1] - (p3[1] - p1[1]) * k / 2)} ${f1(p2[0])} ${f1(p2[1])}`;
  }
  return d + 'Z';
}
function poly(pts) { return 'M' + pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join('L') + 'Z'; }
function blobPts(cx, cy, rx, ry, n, j, r) { const out = []; for (let i = 0; i < n; i++) { const a = (i / n) * TAU; const k = 1 + (r() - 0.5) * j; out.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); } return out; }
function blob(cx, cy, rx, ry, fill, seed = 7, j = 0.035, n = 14) { return `<path fill="${fill}" d="${smooth(blobPts(cx, cy, rx, ry, n, j, rng(seed)))}"/>`; }
function P(d, fill) { return `<path fill="${fill}" d="${d}"/>`; }
function at(x, y, s, rot, inner) { return `<g transform="translate(${x} ${y}) rotate(${rot || 0}) scale(${s})">${inner}</g>`; }
function atF(x, y, sx, sy, rot, inner) { return `<g transform="translate(${x} ${y}) rotate(${rot || 0}) scale(${sx} ${sy})">${inner}</g>`; }
// A crescent on a circle of radius r, centred at the angle (degrees), `th` thick.
function crescent(r, angle, th, span = 150, cx = 0, cy = 0) {
  const a = (angle * Math.PI) / 180, s = ((span / 2) * Math.PI) / 180;
  const p1 = [cx + r * Math.cos(a - s), cy + r * Math.sin(a - s)], p2 = [cx + r * Math.cos(a + s), cy + r * Math.sin(a + s)];
  const mid = [cx + (r - th) * Math.cos(a), cy + (r - th) * Math.sin(a)];
  // Inner edge: circle through p1, mid, p2.
  const chord = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
  const sag = Math.abs((r - th) - r * Math.cos(s));
  const R2 = sag < 0.01 ? 9999 : (chord * chord) / (8 * sag) + sag / 2;
  return `M${f1(p1[0])} ${f1(p1[1])}A${r} ${r} 0 ${span > 180 ? 1 : 0} 1 ${f1(p2[0])} ${f1(p2[1])}A${f1(R2)} ${f1(R2)} 0 0 0 ${f1(p1[0])} ${f1(p1[1])}Z`;
}

/* ---------- Leaf ---------- */
function leaf(a = '#2C7A3F', b = '#1C5C31', vein = '#9CC96B', seed = 3) {
  const r = rng(seed), j = () => (r() - 0.5) * 3;
  const up = [[0, 0], [22, -21 + j()], [58, -30 + j()], [98, -20 + j()], [138, 0], [98, 0], [58, 0], [22, 0]];
  const dn = [[0, 0], [22, 19 + j()], [58, 28 + j()], [98, 18 + j()], [138, 0], [98, 0], [58, 0], [22, 0]];
  const stem = poly([[-22, -1.6], [8, -2], [132, -0.8], [132, 0.8], [8, 2], [-22, 1.6]]);
  return P(smooth(up, 0.42), a) + P(smooth(dn, 0.42), b) + P(stem, vein);
}

/* ---------- Citrus ---------- */
const CITRUS = {
  orange: { rind: '#EE7A13', pith: '#FBEBC8', flesh: '#F39A1E', ves: '#FFBE4A', core: '#FBEBC8', shade: '#D25F0A' },
  blood: { rind: '#D9541A', pith: '#F8DEBF', flesh: '#C5202F', ves: '#E8505A', core: '#F8DEBF', shade: '#AC3F0E' },
  lemon: { rind: '#F5C911', pith: '#FDF3C7', flesh: '#F9DD3E', ves: '#FDEE8E', core: '#FDF3C7', shade: '#D9A800' },
  lime: { rind: '#5E9C2B', pith: '#E7EEB4', flesh: '#A8CC45', ves: '#CDE27A', core: '#E7EEB4', shade: '#467A1F' },
  grapefruit: { rind: '#F2B23E', pith: '#FDEFD2', flesh: '#F2715E', ves: '#F89B86', core: '#FDEFD2', shade: '#D3901F' }
};
function citrusHalf(kind = 'orange', seed = 11, segs = 10, pips = true) {
  const c = CITRUS[kind], r = rng(seed); let out = '';
  out += P(smooth(blobPts(0, 0, 100, 98, 22, 0.012, r)), c.rind);
  out += P(smooth(blobPts(0, 0, 91, 89, 22, 0.012, r)), c.pith);
  const off = r() * TAU, w = TAU / segs;
  for (let i = 0; i < segs; i++) {
    const a = off + i * w + (r() - 0.5) * 0.03, hw = w * 0.45, ro = 84 + r() * 1.5, ri = 8.5 + r() * 2;
    const pts = [
      [ri, a], [ri + (ro - ri) * 0.38, a - hw * 0.8], [ri + (ro - ri) * 0.76, a - hw * 0.96], [ro - 2.5, a - hw * 0.68],
      [ro, a], [ro - 2.5, a + hw * 0.68], [ri + (ro - ri) * 0.76, a + hw * 0.96], [ri + (ro - ri) * 0.38, a + hw * 0.8]
    ].map(([rad, an]) => [Math.cos(an) * rad, Math.sin(an) * rad]);
    out += P(smooth(pts, 0.46), c.flesh);
    // Juice vesicles: little flat slivers fanning out from the core.
    const nv = 5;
    for (let v = 0; v < nv; v++) {
      const b = a + ((v / (nv - 1)) - 0.5) * hw * 1.2 + (r() - 0.5) * 0.04, rr = 36 + r() * 36, l = 7 + r() * 6;
      const m = (rad, an) => [Math.cos(an) * rad, Math.sin(an) * rad];
      const sl = [m(rr - l, b), m(rr, b - 0.038), m(rr + l, b), m(rr, b + 0.038)];
      out += P(smooth(sl, 0.5), c.ves);
    }
    if (pips && i % 4 === 1) {
      const pr = 24, px = Math.cos(a) * pr, py = Math.sin(a) * pr;
      out += at(px, py, 1, (a * 180) / Math.PI, P(smooth([[-6, 0], [0, -3.2], [7, 0], [0, 3.2]], 0.5), c.pith));
    }
  }
  out += blob(0, 0, 5.4, 5.4, c.core, seed + 3, 0.2, 7);
  return out;
}
function citrusWhole(kind = 'orange', seed = 5, opts = {}) {
  const c = CITRUS[kind], r = rng(seed), lemon = kind === 'lemon'; let out = '';
  if (lemon) {
    const pts = []; for (let i = 0; i < 26; i++) { const a = (i / 26) * TAU; const nip = Math.pow(Math.abs(Math.cos(a)), 14) * 0.2; out; pts.push([Math.cos(a) * (100 + 100 * nip) * 1.02, Math.sin(a) * 78 * (1 + (r() - 0.5) * 0.015)]); }
    out += P(smooth(pts), c.rind);
    out += atF(0, 0, 1, 0.78, 0, P(crescent(100, 62, 20, 130), c.shade));
    for (let i = 0; i < 22; i++) { const x = (r() - 0.5) * 138, y = (r() - 0.5) * 100; if (x * x / 7000 + y * y / 3400 < 1) out += blob(x, y, 1.6, 1.6, c.shade, i + 2, 0.2, 6); }
    out += P(smooth([[-58, -38], [-34, -55], [-6, -60], [-8, -53], [-32, -46], [-50, -32]], 0.5), '#FFEE8C');
  } else {
    out += P(smooth(blobPts(0, 0, 100, 97, 24, 0.016, r)), c.rind);
    out += P(crescent(99, 58, 22, 142), c.shade);
    for (let i = 0; i < 40; i++) { const x = (r() - 0.5) * 170, y = (r() - 0.5) * 170; if (x * x + y * y < 7400) out += blob(x, y, 1.5, 1.5, c.shade, i + 2, 0.2, 6); }
    out += P(smooth([[-66, -38], [-46, -62], [-18, -74], [-20, -66], [-44, -52], [-58, -32]], 0.5), '#FFB45A');
    if (opts.nub !== false) { out += blob(4, -89, 9, 6.5, '#7A5A1E', seed + 1, 0.2, 7); out += blob(4, -90, 3.6, 2.8, '#3F6E2A', seed + 2, 0.2, 6); }
  }
  return out;
}
// A wedge of citrus, cut side towards the viewer.
function citrusWedge(kind = 'lemon', seed = 9) {
  const c = CITRUS[kind], r = rng(seed), arc = [];
  for (let i = 0; i <= 12; i++) { const a = Math.PI * (i / 12); arc.push([Math.cos(a) * 100, Math.sin(a) * 100 * (1 + (r() - 0.5) * 0.01)]); }
  const flat = [[-55, -2], [0, -4], [55, -2]];
  let out = P(smooth([...arc, ...flat.slice(0, 0), ...[[-100, 0]].slice(0, 0), ...flat], 0.3), c.rind);
  const inner = arc.map(([x, y]) => [x * 0.89, y * 0.89 - 1]);
  out += P(smooth([...inner, [-44, -1], [0, -3], [44, -1]], 0.3), c.pith);
  for (let i = 0; i < 4; i++) {
    const a0 = (Math.PI * i) / 4 + 0.05, a1 = (Math.PI * (i + 1)) / 4 - 0.05, m = (rad, an) => [Math.cos(an) * rad, Math.sin(an) * rad];
    const pts = [m(11, (a0 + a1) / 2), m(50, a0 + 0.02), m(77, a0 + 0.03), m(80, (a0 + a1) / 2), m(77, a1 - 0.03), m(50, a1 - 0.02)];
    out += P(smooth(pts, 0.46), c.flesh);
    for (let v = 0; v < 3; v++) { const b = a0 + ((v + 1) / 4) * (a1 - a0), rr = 42 + r() * 24, sl = [m(rr - 8, b), m(rr, b - 0.04), m(rr + 8, b), m(rr, b + 0.04)]; out += P(smooth(sl, 0.5), c.ves); }
  }
  return out;
}

/* ---------- Sardine: 440 long, nose at 0,0, facing left ---------- */
const SARD = { back: '#17406B', mid: '#3B7FA6', belly: '#E9EEE6', head: '#B9CFD2', fin: '#102E4E', spot: '#0D2238', sheen: '#7CC1C6' };
function sardine(seed = 21, opts = {}) {
  const r = rng(seed), c = Object.assign({}, SARD, opts.colors || {}), j = () => (r() - 0.5) * 2.2; let out = '';
  // Tail, fins behind the body.
  out += P(`M366 -8C392 -20 416 -40 446 -56C434 -28 430 -12 431 1C430 14 434 30 446 58C416 42 392 22 366 8Z`, c.fin);
  out += P(smooth([[168, -46], [188, -74 + j()], [222, -66 + j()], [240, -40]], 0.34), c.fin);
  out += P(smooth([[92, 40], [112, 66 + j()], [134, 62], [136, 42]], 0.34), c.fin);
  out += P(smooth([[262, 34], [278, 54 + j()], [306, 44], [310, 23]], 0.34), c.fin);
  const body = [[0, 4], [24, -19], [70, -40], [150, -52 + j()], [240, -44 + j()], [318, -22], [372, -9], [372, 9], [318, 22], [240, 42 + j()], [150, 52], [70, 44], [24, 28]];
  out += P(smooth(body, 0.48), c.belly);
  const back = [[0, 4], [24, -19], [70, -40], [150, -52 + j()], [240, -44 + j()], [318, -22], [372, -9], [370, -2], [316, -6], [240, -11], [150, -11], [78, -4], [30, 2]];
  out += P(smooth(back, 0.46), c.back);
  const band = [[78, -6], [150, -14], [240, -14], [316, -8], [370, -3], [316, -1], [240, -3], [150, -2], [84, 2]];
  out += P(smooth(band, 0.46), c.mid);
  // Scales on the back, as rows of small paper chevrons.
  for (let row = 0; row < 3; row++) {
    for (let x = 94 + row * 8; x < 322 - row * 26; x += 15) {
      const y = -22 - row * 10 + Math.abs(x - 190) * 0.04 * (row + 1) + (x > 240 ? (x - 240) * 0.09 * (row + 1) : 0);
      out += P(`M${x} ${f1(y - 3.2)}q4.6 3.2 0 6.4q2 -3.2 0 -6.4Z`, c.sheen);
    }
  }
  // The row of dark spots a Lisbon sardine carries behind the gill.
  [[106, -24, 6.6], [128, -23, 5.2], [150, -26, 4.4], [172, -24, 3.6]].forEach(([x, y, s], i) => { out += blob(x, y, s, s * 0.92, c.spot, seed + i, 0.12, 8); });
  // Head.
  const head = [[0, 4], [24, -19], [62, -36], [84, -22], [90, 4], [82, 30], [62, 42], [24, 28]];
  out += P(smooth(head, 0.48), c.head);
  out += P(smooth([[0, 4], [24, -19], [62, -36], [70, -26], [52, -14], [24, -6], [6, 2]], 0.46), c.back);
  out += P(`M72 -24C86 -8 86 18 72 34C80 16 80 -6 72 -24Z`, c.back);
  out += blob(35, -4, 9.4, 9.4, '#F6F2DE', seed + 7, 0.05, 10);
  out += blob(35.5, -4, 5.8, 5.8, '#0D1A26', seed + 8, 0.05, 9);
  out += P(`M2 8C12 13 22 15 30 15C22 18 10 16 2 8Z`, c.fin);
  if (opts.char) {
    [130, 188, 246, 304].forEach((x, i) => {
      const h = [52, 48, 38, 26][i];
      out += P(smooth([[x - 5, -h + 7], [x + 2, -h + 9], [x - 3, h - 9], [x - 10, h - 7]], 0.25), '#1A1411');
    });
  }
  return out;
}

/* ---------- Tomato ---------- */
let clipCount = 0;
const TOM = { skin: '#D92B1E', dark: '#AF1A16', hi: '#F36A4A', flesh: '#E94C33', wall: '#F58A66', gel: '#C8201E', seed: '#F6CF57', green: '#2E7D36', green2: '#1D5E2A' };
function calyx(s = 1, seed = 3, c = TOM) {
  const r = rng(seed); let out = '';
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * 360 + (r() - 0.5) * 16 - 15, l = 44 + r() * 15;
    const pts = [[0, 0], [l * 0.3, -8], [l * 0.7, -6 + (r() - .5) * 3], [l, 1], [l * 0.7, 5], [l * 0.3, 8]];
    const up = [[0, 0], [l * 0.3, -8], [l * 0.7, -6], [l, 1], [l * .7, 0], [l * .3, 0]];
    out += at(0, 0, 1, a, P(smooth(pts, 0.4), c.green) + P(smooth(up, 0.4), c.green2));
  }
  out += blob(0, 0, 7.5, 7.5, c.green, seed + 1, 0.1, 8);
  out += P(poly([[-3, 1], [3, 1], [5, -17], [-1, -18]]), c.green2);
  return at(0, 0, s, 0, out);
}
function tomato(seed = 13, opts = {}) {
  const c = Object.assign({}, TOM, opts.colors || {}), r = rng(seed), pts = [];
  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * TAU, lobes = 1 + 0.026 * Math.cos(a * 5 + seed) + 0.005 * Math.cos(a * 9 + seed * 2);
    const dip = Math.exp(-Math.pow((a - Math.PI * 1.5) / 0.32, 2)) * 0.12;
    pts.push([Math.cos(a) * 106 * lobes, Math.sin(a) * 94 * lobes * (1 - dip) + 4]);
  }
  const id = `tc${++clipCount}`, shape = smooth(pts);
  let out = `<clipPath id="${id}"><path d="${shape}"/></clipPath>` + P(shape, c.skin);
  out += `<g clip-path="url(#${id})">` + atF(0, 4, 1.09, 0.97, 0, P(crescent(104, 62, 22, 150), c.dark)) + `</g>`;
  // Ribs, cut as long slim slivers running from the shoulder.
  [[-44, -56, -74, 26], [40, -56, 70, 26]].forEach(([x0, y0, x1, y1]) => { out += P(`M${x0} ${y0}Q${x1} ${y0 + 24} ${x1} ${y1}Q${x1 - (x1 > 0 ? 8 : -8)} ${y0 + 34} ${x0} ${y0}Z`, c.dark); });
  out += P(smooth([[-82, -30], [-66, -56], [-40, -71], [-40, -62], [-62, -48], [-74, -24]], 0.5), c.hi);
  if (!opts.noCalyx) out += at(0, -76, 1, 0, calyx(1, seed + 2, c));
  return out;
}
function tomatoHalf(seed = 17, opts = {}) {
  const c = Object.assign({}, TOM, opts.colors || {}), r = rng(seed); let out = '';
  const n = opts.locules || 5, show = (name) => !opts.only || opts.only.includes(name);
  const skin = P(smooth(blobPts(0, 0, 106, 96, 26, 0.02, r)), c.skin), fl = P(smooth(blobPts(0, 0, 97, 87, 26, 0.02, r)), c.flesh);
  if (show('skin')) out += skin; if (show('flesh')) out += fl;
  const off = -Math.PI / 2 + r() * 0.4;
  for (let i = 0; i < n; i++) {
    const a = off + (i / n) * TAU, hw = (TAU / n) * 0.36, m = (rad, an) => [Math.cos(an) * rad * 1.08, Math.sin(an) * rad * 0.97];
    const pts = [m(25, a - hw * 0.34), m(52, a - hw), m(76, a - hw * 0.85), m(83, a), m(76, a + hw * 0.85), m(52, a + hw), m(25, a + hw * 0.34)];
    if (show('gel')) out += P(smooth(pts, 0.5), c.gel);
    for (let s = 0; s < 6; s++) {
      const b = a - hw * 0.62 + ((s % 3) / 2) * hw * 1.24 + (r() - 0.5) * hw * 0.2, rr = (s < 3 ? 42 : 62) + r() * 8, [x, y] = m(rr, b), rot = (b * 180) / Math.PI + (r() - 0.5) * 40;
      if (show('seed')) out += at(x, y, 1, rot, P(smooth([[-6, 0], [0, -2.7], [6, 0], [0, 2.7]], 0.5), c.seed));
    }
  }
  if (show('core')) out += blob(0, 0, 21, 19, c.wall, seed + 4, 0.14, 8);
  return out;
}

/* ---------- Bread ---------- */
const BREAD = { crust: '#A85D1F', crustD: '#7E4114', crumb: '#F3D9A4', hole: '#DFB877', flour: '#F7E8C8', char: '#2A1A12' };
function loaf(seed = 31) {
  const c = BREAD, r = rng(seed); let out = P(smooth(blobPts(0, 0, 190, 92, 22, 0.024, r)), c.crust);
  out += atF(0, 0, 1.9, 0.92, 0, P(crescent(99, 80, 20, 150), c.crustD));
  [-92, -32, 28, 88].forEach((x, i) => {
    const pts = [[x - 26, 40 - i * 2], [x - 12, 0], [x + 18, -40 + i * 2], [x + 30, -44 + i * 2], [x + 12, 4], [x - 12, 46 - i * 2]];
    out += P(smooth(pts, 0.42), c.flour);
    out += P(smooth([[x - 16, 38 - i * 2], [x - 3, 4], [x + 22, -38], [x + 8, 6], [x - 8, 40]], 0.42), c.hole);
  });
  return out;
}
// A slice. 200 wide, top crown, flat at the base.
function slice(seed = 33, opts = {}) {
  const c = BREAD, r = rng(seed), j = () => (r() - 0.5) * 3.5;
  const outer = [[-108, -40], [-112, -96], [-70, -136], [0, -148], [74, -138], [114, -98], [110, -32], [106, 42], [76, 94], [0, 108], [-78, 96], [-106, 44]].map(([x, y]) => [x + j(), y + j()]);
  let out = P(smooth(outer, 0.46), c.crust);
  const inner = outer.map(([x, y]) => [x * 0.885, (y + 18) * 0.885 - 18 + 2]);
  out += P(smooth(inner, 0.46), opts.toast ? '#EBBB6B' : c.crumb);
  for (let i = 0; i < 26; i++) { const x = (r() - 0.5) * 170, y = -112 + r() * 200, s = 2.5 + r() * r() * 11; if (Math.abs(x) < 76 - Math.abs(y + 18) * 0.12 - (y < -80 ? (-80 - y) * 0.4 : 0)) out += blob(x, y, s, s * (0.7 + r() * 0.5), opts.toast ? '#C98F3E' : c.hole, i + seed, 0.25, 7); }
  return out;
}

/* ---------- Beans ---------- */
function beanGeom(L = 100, W = 56, bend = 0.5, fat = 0.72) {
  const R = bend > 0.01 ? L / bend : 1e5;
  const c = (t) => { const a = (t - 0.5) * bend; return [R * Math.sin(a), R * Math.cos(a) - R, Math.sin(a), Math.cos(a)]; };
  const w = (t) => (W / 2) * Math.pow(Math.max(1 - Math.pow(Math.abs(2 * t - 1), 2.5), 0), 0.58 + fat * 0.1);
  const map = (u, v) => { const [x, y, nx, ny] = c(u); const wd = w(u); return [x + nx * wd * v, y + ny * wd * v]; };
  const pts = [], N = 16, at_ = (i) => (1 - Math.cos((Math.PI * i) / N)) / 2;
  for (let i = 0; i <= N; i++) pts.push(map(at_(i), 1));
  for (let i = N - 1; i >= 1; i--) pts.push(map(at_(i), -1));
  return { pts, map };
}
function uvBlob(g, u, v, du, dv, fill, r, n = 8) { const pts = []; for (let i = 0; i < n; i++) { const a = (i / n) * TAU, k = 1 + (r() - 0.5) * 0.5; pts.push(g.map(Math.min(0.985, Math.max(0.015, u + Math.cos(a) * du * k)), Math.max(-0.97, Math.min(0.97, v + Math.sin(a) * dv * k)))); } return P(smooth(pts, 0.46), fill); }
// spec: { base, hi, hilum, pattern, p1, p2, L, W, bend, fat, seed }
function bean(spec) {
  const s = Object.assign({ L: 100, W: 56, bend: 0.5, fat: 0.72, seed: 3, base: '#F0E4C9', hi: '#FBF4E2', hilum: '#FFFDF0' }, spec), r = rng(s.seed), g = beanGeom(s.L, s.W, s.bend * 1.9, s.fat * 0.72);
  const id = `bc${++clipCount}`, d = smooth(g.pts, 0.5);
  let out = `<clipPath id="${id}"><path d="${d}"/></clipPath>` + P(d, s.base) + `<g clip-path="url(#${id})">`;
  if (s.pattern === 'speckle') for (let i = 0; i < (s.n || 34); i++) out += uvBlob(g, 0.08 + r() * 0.84, -0.8 + r() * 1.6, 0.012 + r() * 0.018, 0.05 + r() * 0.07, s.p1, r, 6);
  if (s.pattern === 'streak') for (let i = 0; i < (s.n || 16); i++) out += uvBlob(g, 0.08 + r() * 0.84, -0.86 + r() * 1.72, 0.035 + r() * 0.09, 0.06 + r() * 0.1, r() < 0.7 ? s.p1 : (s.p2 || s.p1), r, 8);
  if (s.pattern === 'flame') for (let i = 0; i < (s.n || 9); i++) { const u = 0.1 + (i / (s.n || 9)) * 0.82; out += uvBlob(g, u, (r() - 0.5) * 0.4, 0.014 + r() * 0.016, 0.62 + r() * 0.3, s.p1, r, 8); }
  if (s.pattern === 'half') { const pts = []; for (let i = 0; i <= 8; i++) pts.push(g.map(0.5 + 0.05 * Math.sin(i * 1.9), -0.99 + (i / 8) * 1.98)); for (let i = 1; i <= 6; i++) pts.push(g.map(0.5 + (i / 6) * 0.49, 0.99)); for (let i = 6; i >= 1; i--) pts.push(g.map(0.5 + (i / 6) * 0.49, -0.99)); out += P(smooth(pts, 0.22), s.p1); for (let i = 0; i < 12; i++) out += uvBlob(g, 0.12 + r() * 0.34, -0.8 + r() * 1.6, 0.012 + r() * 0.02, 0.07 + r() * 0.11, s.p1, r, 6); }
  if (s.pattern === 'cattle') { [[0.24, 0.1, 0.14, 0.66], [0.72, -0.1, 0.17, 0.74]].forEach(([u, v, du, dv]) => { out += uvBlob(g, u, v, du, dv, s.p1, r, 9); }); for (let i = 0; i < 18; i++) out += uvBlob(g, 0.08 + r() * 0.84, -0.86 + r() * 1.72, 0.012 + r() * 0.014, 0.06 + r() * 0.06, s.p1, r, 6); }
  if (s.pattern === 'eye') { out += uvBlob(g, 0.5, -0.62, 0.14, 0.46, s.p1, r, 10); }
  out += `</g>`;
  // Flat highlight along the back.
  out += P(smooth([g.map(0.22, 0.72), g.map(0.42, 0.8), g.map(0.62, 0.72), g.map(0.42, 0.62)], 0.46), s.hi);
  // Hilum: the little scar on the inner curve.
  if (s.hilum) out += P(smooth([g.map(0.455, -0.95), g.map(0.5, -0.78), g.map(0.545, -0.95), g.map(0.5, -1)], 0.46), s.hilum);
  return out;
}
function chickpea(seed = 8, base = '#E9C983', dark = '#C89F54') {
  const r = rng(seed); let out = P(smooth(blobPts(0, 0, 40, 37, 12, 0.08, r)), base);
  out += P(smooth([[30, -24], [41, -28], [41, -18], [36, -12]], 0.4), base);
  out += P(`M-6 -35C10 -22 12 6 -2 34C4 8 2 -18 -6 -35Z`, dark);
  out += P(crescent(38, 120, 8, 120), dark);
  return out;
}

/* ---------- Fava pod ---------- */
const FAVA = { pod: '#4F9A2E', podD: '#2D6E20', lining: '#EEF3C8', bean: '#B5D65A', beanD: '#7FAE36', scar: '#2D4F1B' };
function favaBean(seed = 3, s = 1) {
  const g = beanGeom(112, 74, 0.62, 0.42), r = rng(seed);
  let out = P(smooth(g.pts, 0.5), FAVA.bean);
  out += P(smooth([g.map(0.2, 0.76), g.map(0.46, 0.84), g.map(0.7, 0.76), g.map(0.46, 0.62)], 0.46), '#D8EA8E');
  out += P(smooth([g.map(0.06, -0.3), g.map(0.13, -0.86), g.map(0.2, -0.3), g.map(0.13, 0.42)], 0.46), FAVA.scar);
  void r; return at(0, 0, s, 0, out);
}
// Closed pod, 620 long along x: a stout sleeve with a bulge at each bean.
function favaPod(seed = 41, beans = 5) {
  const r = rng(seed), L = 620, top = [], bot = [];
  const env = (t) => Math.pow(Math.sin(Math.PI * t), 0.42);
  for (let i = 1; i < 40; i++) {
    const t = i / 40, bump = 0.86 + 0.14 * Math.pow(Math.abs(Math.sin(Math.PI * beans * t)), 0.8);
    top.push([t * L, -74 * env(t) * bump + (r() - 0.5) * 1.5]);
    bot.unshift([t * L, 74 * env(t) * bump + (r() - 0.5) * 1.5]);
  }
  const outline = [[-46, -1], [-14, -2], ...top, [L + 6, -2], [L + 46, -10], [L + 14, 8], ...bot, [-14, 3], [-46, 2]];
  const id = `pc${++clipCount}`, d = smooth(outline, 0.48);
  let out = `<clipPath id="${id}"><path d="${d}"/></clipPath>` + P(d, FAVA.pod) + `<g clip-path="url(#${id})">`;
  out += P(smooth([[-46, 40], ...Array.from({ length: 13 }, (_, i) => [((i + 1) / 14) * L, 46 * env((i + 1) / 14) * (i % 2 ? 0.92 : 1)]), [L + 40, 40], [L + 40, 120], [-46, 120]], 0.46), FAVA.podD);
  for (let k = 0; k < beans; k++) { const x = ((k + 0.5) / beans) * L, y = -6, w = 44 * env((k + 0.5) / beans); out += blob(x, y, w, w * 1.02, '#70B23C', seed + k, 0.04, 12); out += P(smooth([[x - w * 0.62, y - w * 0.32], [x - w * 0.1, y - w * 0.74], [x + w * 0.42, y - w * 0.52], [x - w * 0.1, y - w * 0.46]], 0.46), '#A5D65E'); }
  out += `</g>`;
  return out;
}
// An open pod, seen from above, with its beans in a white lining.
function favaOpen(seed = 43, n = 5) {
  const L = 620, r = rng(seed), o = [], i2 = [], a = [], b = [];
  const arch = (t) => -Math.sin(Math.PI * t) * 26, env = (t) => Math.pow(Math.sin(Math.PI * t), 0.42);
  for (let i = 1; i < 20; i++) { const t = i / 20, x = t * L; o.push([x, arch(t) - 90 * env(t) + (r() - .5) * 2.5]); i2.unshift([x, arch(t) + 90 * env(t) + (r() - .5) * 2.5]); a.push([x, arch(t) - 74 * env(t)]); b.unshift([x, arch(t) + 74 * env(t)]); }
  let out = P(smooth([[-44, 2], [-14, 1], ...o, [L + 8, 0], [L + 44, -12], [L + 18, 8], ...i2], 0.48), FAVA.pod);
  out += P(smooth([[10, 2], ...a, [L - 10, 0], ...b], 0.48), FAVA.lining);
  for (let k = 0; k < n; k++) { const t = (k + 0.62) / (n + 0.24), y = arch(t) + (k % 2 ? 5 : -5); out += at(t * L, y, 0.9, 90 + (k % 2 ? 6 : -6), favaBean(seed + k)); }
  return out;
}

/* ---------- Bits and pieces ---------- */
function garlic(seed = 51) {
  const r = rng(seed);
  let out = P(smooth([[-6, -94], [6, -94], [12, -60], [52, -38], [82, 6], [70, 52], [20, 76], [-20, 76], [-70, 52], [-82, 6], [-52, -38], [-12, -60]], 0.48), '#F4EEDD');
  out += P(`M-8 -62C-46 -36 -60 20 -22 74C-34 22 -24 -28 -2 -62Z`, '#DCCFE0');
  out += P(`M8 -62C46 -36 62 20 24 74C36 22 26 -28 3 -62Z`, '#C9B3CF');
  out += P(`M-2 -60C-8 -10 -6 40 -3 74C2 40 6 -10 3 -60Z`, '#8E6A99');
  out += P(`M-54 42C-60 58 -30 74 -16 74C-30 66 -46 58 -54 42Z`, '#8E6A99');
  void r; return out;
}
function olive(seed = 53, a = '#5C6A22', b = '#3F4A14') { return blob(0, 0, 26, 19, a, seed, 0.05, 10) + P(crescent(19, 70, 5, 130), b) + blob(-13, -6, 4, 2.4, '#A2AF50', seed + 1, 0.1, 6); }
function chilli(seed = 55, c = '#D21F1B') { return P(smooth([[0, 0], [22, -15], [70, -14], [120, -2], [178, 16], [120, 12], [70, 16], [22, 16]], 0.46), c) + P(smooth([[22, 15], [70, 16], [120, 12], [178, 16], [120, 6], [70, 6], [22, 6]], 0.46), '#A0100F') + P(poly([[-22, -8], [2, -14], [8, 14], [-4, 10], [-14, 2], [-36, 2], [-36, -3]]), '#2E7D36'); }
function parsley(seed = 57, c1 = '#2E8A3A', c2 = '#1E6A2C') {
  const leafy = (s, fill, sd) => { const q = rng(sd), pts = []; for (let i = 0; i < 30; i++) { const a = (i / 30) * TAU, k = 1 + 0.2 * Math.cos(3 * a) + 0.07 * Math.cos(9 * a) + (q() - 0.5) * 0.02; pts.push([Math.cos(a) * 26 * s * k, Math.sin(a) * 26 * s * k]); } return P(smooth(pts), fill); };
  let out = P(poly([[-130, 2.2], [-130, -2.2], [10, -2], [10, 2]]), c2);
  [[-92, -14, 0.62, 1], [-86, 14, 0.66, 0], [-48, -22, 0.82, 0], [-42, 22, 0.86, 1], [2, -22, 0.98, 1], [8, 22, 0.94, 0], [28, 0, 1.08, 0]].forEach(([x, y, sc, flip], i) => { out += P(poly([[x, y - 1.6], [x, y + 1.6], [x + y * 0.1 - 18, 1], [x - y * 0.1 - 18, -1]]), c2); out += at(x, y, 1, i * 40, leafy(sc, flip ? c1 : c2, seed + i)); });
  return out;
}
function plate(r = 200, rim = '#F7F0DF', well = '#ECE1C7', line = '#2045A8') {
  return blob(0, 0, r, r, rim, 91, 0.006, 30) + blob(0, 0, r * 0.97, r * 0.97, line, 92, 0.006, 30) + blob(0, 0, r * 0.945, r * 0.945, rim, 93, 0.006, 30) + blob(0, 0, r * 0.68, r * 0.68, well, 94, 0.008, 28);
}
function knife() {
  return P(`M0 -14C70 -18 200 -20 300 -18L306 16C200 20 80 16 0 6Z`, '#E8E6DC') + P(`M0 -14C70 -18 200 -20 300 -18L302 -8C200 -8 70 -6 0 -4Z`, '#BEBDB3') + P(smooth([[-4, -16], [-140, -18], [-180, -10], [-182, 8], [-140, 16], [-4, 12]], 0.3), '#3A2013') + [-40, -90, -140].map((x) => blob(x, -2, 5, 5, '#D8B67A', x + 200, 0.1, 7)).join('');
}
function saltDish(r = 62) { let out = blob(0, 0, r, r, '#1C2A6E', 96, 0.012, 16) + blob(0, 0, r * 0.8, r * 0.8, '#F6F1E3', 97, 0.03, 14); const q = rng(61); for (let i = 0; i < 44; i++) { const a = q() * TAU, d = q() * r * 0.72; out += at(Math.cos(a) * d, Math.sin(a) * d, 1, q() * 90, `<rect x="-2.2" y="-2.2" width="4.4" height="4.4" fill="#C9C0AA"/>`); } return out; }
function esc(s) { return s.replace(/&/g, '&amp;'); }

/* ---------- The four covers. Each is a 1000×1600 drawing. ---------- */
const SERIF = `font-family:Fraunces;font-variation-settings:'SOFT' 100,'WONK' 1,'opsz' 144`;
const SANS = `font-family:'Hanken Grotesk'`;
function masthead(color, extra = '') { return `<text x="58" y="438" fill="${color}" style="${SERIF};font-size:462px;font-weight:800;letter-spacing:-22px" ${extra}>Pith</text>`; }
function strip(color, left, mid, right) {
  return `<g fill="${color}" style="${SANS};font-size:25px;font-weight:600;letter-spacing:1.2px"><text x="64" y="62">${left}</text><text x="500" y="62" text-anchor="middle">${mid}</text><text x="936" y="62" text-anchor="end">${right}</text></g>`;
}
function lines(color, arr, x = 64, y = 1370, size = 44) {
  return arr.map((t, i) => `<text x="${x}" y="${y + i * size * 1.14}" fill="${color}" style="font-family:Fraunces;font-variation-settings:'SOFT' 100,'WONK' 1,'opsz' 72;font-style:italic;font-size:${size}px;font-weight:500">${esc(t)}</text>`).join('');
}
const COVERS = {
  winter: () => {
    const g = '#0E4F48', cream = '#F9ECCF';
    return rect(g) + strip(cream, 'Nº 9', 'Winter 2025', '€18') + masthead(cream)
      + at(668, 985, 4.3, 14, citrusHalf('orange', 12, 10))
      + at(172, 690, 1.86, -22, citrusHalf('blood', 23, 9))
      + at(112, 1012, 1.32, -8, citrusHalf('lemon', 29, 8, false))
      + at(330, 1140, 0.9, 200, leaf('#3F9C4B', '#2A7A3B', '#BFE08C', 4))
      + at(250, 1262, 1.42, -16, citrusWhole('lemon', 15))
      + lines(cream, ['The orange is mostly not orange.', 'Nineteen uses for the part you bin.'], 64, 1442, 41)
      ;
  },
  spring: () => {
    const g = '#F6B9C4', ink = '#0F4A2B';
    return rect(g) + strip(ink, 'Nº 10', 'Spring 2026', '€18') + masthead(ink)
      + at(-30, 735, 1.05, -9, favaPod(44, 5))
      + at(-90, 1010, 1.86, -9, favaOpen(47, 4))
      + at(430, 1285, 0.98, -9, favaPod(49, 5))
      + at(112, 1290, 0.92, -42, favaBean(5)) + at(262, 1352, 0.78, 26, favaBean(6)) + at(805, 546, 0.96, 18, favaBean(3)) + at(610, 545, 0.72, -40, favaBean(4))
      + lines(ink, ['Double-podding: a defence.', 'What Trás-os-Montes does with a bean.'], 64, 1462, 37);
  },
  summer: () => {
    const g = '#F8B90C', red = '#C51D15', ink = '#2A1208';
    return rect(g) + strip(ink, 'Nº 11', 'Summer 2026', '€18') + masthead(red)
      + at(320, 800, 2.8, -10, tomato(13))
      + at(790, 1100, 2.4, 14, tomatoHalf(17))
      + at(205, 1230, 1.58, 12, tomato(19, { colors: { skin: '#E44A1F', dark: '#BE3414', hi: '#F7835A' } }))
      + at(815, 628, 1.3, 16, tomato(26, { colors: { skin: '#5E9C2B', dark: '#3F7A1E', hi: '#94C451', green: '#1F5E26', green2: '#123F18' } }))
      + at(540, 1330, .84, 150, tomatoHalf(37, { locules: 3 }))
      + lines(ink, ['Seven tomatoes and how to tell them apart.', 'A case against the fridge.'], 64, 1484, 35);
  },
  autumn: () => {
    const g = '#C8421A', cream = '#FAEBD0', ink = '#1A0F0A';
    const s = (x, y, rot, seed, flip, ch) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${flip ? -1.56 : 1.56} 1.56)">${sardine(seed, { char: ch })}</g>`;
    return rect(g) + strip(cream, 'Nº 12', 'Autumn 2026', '€18') + masthead(cream)
      + s(70, 568, 4, 21) + s(930, 758, -4, 22, true) + s(70, 930, 3, 23, false, false) + s(930, 1116, -3, 24, true) + s(70, 1288, 2, 25)
      + lines(cream, ['The last good sardine of the year.', 'Bread, on the day after.'], 64, 1490, 38);
  }
};
function rect(fill) { return `<rect width="1000" height="1600" fill="${fill}"/>`; }
function coverSVG(season, attrs = '') { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1600" ${attrs} role="img">${COVERS[season]()}</svg>`; }
