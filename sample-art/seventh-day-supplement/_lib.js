// Shared drawing kit: coarse 40-lpi-style halftone and scissor-cut shapes.
window.artReady = false;
const INK = '#171513', PAPER = '#E9E2D2';
const SPOT = { red: '#E03A1E', blue: '#1E4FC7', custard: '#F3BC12', green: '#17874B' };

function fitText(el, width) {
  el.style.display = 'inline-block';
  el.style.whiteSpace = 'nowrap';
  el.style.fontSize = '100px';
  el.style.fontSize = `${(100 * width) / el.offsetWidth}px`;
}
function fitAll(root = document) {
  root.querySelectorAll('[data-fit]').forEach((el) => fitText(el, Number(el.dataset.fit)));
}
function layer(W, H, scale = 2) {
  const canvas = document.createElement('canvas');
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  return { canvas, ctx, W, H, scale };
}
/** Turns a tone layer into printed dots on ctx. Dark, opaque tone gives big dots. */
function halftone(target, tone, { pitch = 16, angle = 45, color = INK, gamma = 1, gain = 1, floor = 0.02, clip } = {}) {
  const { W, H, scale, ctx } = target;
  const data = tone.ctx.getImageData(0, 0, tone.canvas.width, tone.canvas.height).data;
  const a = (angle * Math.PI) / 180, cos = Math.cos(a), sin = Math.sin(a);
  const reach = Math.hypot(W, H);
  ctx.save();
  if (clip) ctx.clip(clip);
  ctx.fillStyle = color;
  for (let u = -reach; u < reach; u += pitch) {
    for (let v = -reach; v < reach; v += pitch) {
      const x = W / 2 + u * cos - v * sin, y = H / 2 + u * sin + v * cos;
      if (x < -pitch || y < -pitch || x > W + pitch || y > H + pitch) continue;
      const px = Math.max(0, Math.min(tone.canvas.width - 1, Math.round(x * scale)));
      const py = Math.max(0, Math.min(tone.canvas.height - 1, Math.round(y * scale)));
      const i = (py * tone.canvas.width + px) * 4;
      const alpha = data[i + 3] / 255;
      if (alpha < 0.02) continue;
      const lum = (data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11) / 255;
      let t = Math.min(1, (1 - lum) * alpha * gain);
      t = Math.pow(t, gamma);
      if (t < floor) continue;
      const r = pitch * 0.74 * Math.sqrt(t);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 7);
      ctx.fill();
    }
  }
  ctx.restore();
}
function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;
}
/** A closed polygon whose edges wander slightly, like scissors. */
function cut(points, wobble = 0, seed = 1) {
  const r = rng(seed), p = new Path2D();
  points.forEach(([x, y], i) => {
    const nx = x + (r() - 0.5) * wobble, ny = y + (r() - 0.5) * wobble;
    if (i === 0) p.moveTo(nx, ny); else p.lineTo(nx, ny);
  });
  p.closePath();
  return p;
}
function star(cx, cy, outer, inner, n, rot = 0) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? inner : outer, a = rot + (i * Math.PI) / n;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return cut(pts);
}
/**
 * A show leek, drawn along an axis from root (x0,y0) at `deg` degrees.
 * Flat cut blades in ink and paper, with coarse dots modelling the shank.
 */
function leek(t, { x0, y0, deg = 0, L = 1000, w = 120, pitch = 13, angle = 45, seed = 3, bladeInk = INK, shank = PAPER, dot = INK }) {
  const { ctx, W, H, scale } = t;
  const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  const P = (x, y) => [x0 + x * c - y * s, y0 + x * s + y * c];
  const r = rng(seed);
  const shankEnd = L * 0.56;
  const shankOut = [
    [L * 0.012, -w * 0.3], [L * 0.03, -w * 0.5], [L * 0.09, -w * 0.53], [L * 0.2, -w * 0.47], [shankEnd * 0.8, -w * 0.43], [shankEnd, -w * 0.42],
    [shankEnd, w * 0.42], [shankEnd * 0.8, w * 0.43], [L * 0.2, w * 0.47], [L * 0.09, w * 0.53], [L * 0.03, w * 0.5], [L * 0.012, w * 0.3]
  ].map(([x, y]) => P(x, y));
  // Roots: short ink whiskers.
  ctx.strokeStyle = INK;
  ctx.lineCap = 'round';
  for (let i = 0; i < 46; i++) {
    const y = (i / 45 - 0.5) * w * 0.68;
    const len = L * (0.02 + r() * 0.055);
    const [ax, ay] = P(L * 0.016, y * 0.75);
    const [bx, by] = P(-len, y * (1.2 + r() * 0.9) + (r() - 0.5) * 16);
    const [mx, my] = P(-len * 0.5, y + (r() - 0.5) * 22);
    ctx.lineWidth = 1.4 + r() * 1.8;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.quadraticCurveTo(mx, my, bx, by);
    ctx.stroke();
  }
  // Blades: fan out of the shank, back to front.
  const blade = (off, len, width, bend, kind, sd) => {
    const b = L * 0.46;
    const tipx = shankEnd + len * Math.cos(off), tipy = len * Math.sin(off) + bend;
    const pts = [
      P(b, -width * 0.42 + off * w * 0.5), P(shankEnd + len * 0.26 * Math.cos(off), len * 0.26 * Math.sin(off) - width * 0.5 + bend * 0.1),
      P(shankEnd + len * 0.62 * Math.cos(off), len * 0.62 * Math.sin(off) - width * 0.42 + bend * 0.42),
      P(shankEnd + len * 0.88 * Math.cos(off), len * 0.88 * Math.sin(off) - width * 0.2 + bend * 0.8),
      P(tipx, tipy),
      P(shankEnd + len * 0.86 * Math.cos(off), len * 0.86 * Math.sin(off) + width * 0.2 + bend * 0.78),
      P(shankEnd + len * 0.6 * Math.cos(off), len * 0.6 * Math.sin(off) + width * 0.46 + bend * 0.4),
      P(shankEnd + len * 0.24 * Math.cos(off), len * 0.24 * Math.sin(off) + width * 0.52 + bend * 0.08),
      P(b, width * 0.42 + off * w * 0.5)
    ];
    const path = cut(pts, 3, sd);
    if (kind === 'ink') {
      ctx.fillStyle = bladeInk;
      ctx.fill(path);
      // A knocked-out midrib, cut in one go.
      const rib = cut([P(shankEnd, -2.4), P(shankEnd + len * 0.6 * Math.cos(off), len * 0.6 * Math.sin(off) - 1.4 + bend * 0.42), P(shankEnd + len * 0.92 * Math.cos(off), len * 0.92 * Math.sin(off) + bend * 0.85), P(shankEnd + len * 0.6 * Math.cos(off), len * 0.6 * Math.sin(off) + 1.4 + bend * 0.42), P(shankEnd, 2.4)]);
      ctx.fillStyle = shank;
      ctx.fill(rib);
    } else {
      ctx.fillStyle = shank;
      ctx.fill(path);
      const tone = layer(W, H, scale);
      tone.ctx.fillStyle = '#000';
      tone.ctx.filter = `blur(${w * 0.09}px)`;
      const [p0, p1] = [P(b, 0), P(tipx, tipy)];
      tone.ctx.lineWidth = width * 0.5;
      tone.ctx.strokeStyle = '#666';
      tone.ctx.beginPath(); tone.ctx.moveTo(p0[0], p0[1]); tone.ctx.lineTo(p1[0], p1[1]); tone.ctx.stroke();
      halftone(t, tone, { pitch, angle, color: dot, clip: path, gain: 1.1 });
    }
  };
  const bladeW = w * 0.74;
  blade(-0.2, L * 0.47, bladeW, -L * 0.04, 'ink', seed + 1);
  blade(0.2, L * 0.46, bladeW, L * 0.04, 'ink', seed + 2);
  blade(-0.1, L * 0.45, bladeW, -L * 0.012, 'tone', seed + 3);
  blade(0.1, L * 0.44, bladeW, L * 0.012, 'tone', seed + 4);
  blade(0, L * 0.42, bladeW * 0.96, 0, 'ink', seed + 5);
  // Shank: a pale tube with dots gathering at its edges.
  const shankPath = cut(shankOut, 2, seed + 6);
  ctx.fillStyle = shank;
  ctx.fill(shankPath);
  const tone = layer(W, H, scale);
  const tc = tone.ctx;
  tc.lineCap = 'butt';
  const blurW = w * 0.09;
  tc.filter = `blur(${blurW}px)`;
  for (const side of [-1, 1]) {
    const q = side === 1 ? 0.9 : 0.42;
    const [p0, p1] = [P(0, side * w * 0.5), P(shankEnd, side * w * 0.42)];
    tc.strokeStyle = side === 1 ? '#222' : '#666';
    tc.lineWidth = w * (side === 1 ? 0.3 : 0.18);
    tc.beginPath(); tc.moveTo(p0[0], p0[1]); tc.lineTo(p1[0], p1[1]); tc.stroke();
  }
  // Soil-darkened foot and green-going top of the shank.
  tc.fillStyle = '#222';
  const foot = P(0, 0);
  tc.beginPath(); tc.arc(foot[0], foot[1], w * 0.42, 0, 7); tc.fill();
  const top = P(shankEnd, 0);
  tc.fillStyle = '#111';
  tc.beginPath(); tc.arc(top[0], top[1], w * 0.62, 0, 7); tc.fill();
  tc.filter = 'none';
  halftone(t, tone, { pitch, angle, color: dot, clip: shankPath, gain: 1, floor: 0.012 });
  return { shankPath };
}
