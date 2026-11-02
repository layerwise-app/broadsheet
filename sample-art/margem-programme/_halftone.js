// Tone fields for generated "stills", printed through a coarse round-dot screen.
(function () {
  const fract = (x) => x - Math.floor(x);
  const hash = (x, y) => fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453);
  const ss = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  function noise(x, y) {
    const i = Math.floor(x), j = Math.floor(y), f = x - i, g = y - j;
    const u = f * f * (3 - 2 * f), v = g * g * (3 - 2 * g);
    const a = hash(i, j), b = hash(i + 1, j), c = hash(i, j + 1), d = hash(i + 1, j + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, y, o = 4) {
    let s = 0, a = 0.5;
    for (let k = 0; k < o; k++) { s += a * noise(x, y); x *= 2.03; y *= 2.03; a *= 0.5; }
    return s;
  }
  function inPoly(x, y, p) {
    let c = false;
    for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
      const [xi, yi] = p[i], [xj, yj] = p[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  }
  const ell = (x, y, cx, cy, rx, ry) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
  const seg = (x, y, ax, ay, bx, by, w) => {
    const px = x - ax, py = y - ay, dx = bx - ax, dy = by - ay;
    const h = Math.max(0, Math.min(1, (px * dx + py * dy) / (dx * dx + dy * dy)));
    return Math.hypot(px - dx * h, py - dy * h) < w;
  };

  // A human figure seen from behind or in profile, feet at (cx, fy), height h.
  function figure(x, v, cx, fy, h) {
    const hy = fy - h;
    if (ell(x, v, cx, hy + h * 0.072, h * 0.058, h * 0.074) < 1) return true;
    const t = (v - (hy + h * 0.135)) / (h * 0.865);
    if (t < 0 || t > 1) return false;
    let w;
    if (t < 0.04) w = h * 0.032;
    else if (t < 0.1) w = h * (0.032 + ((t - 0.04) / 0.06) * 0.098);
    else if (t < 0.5) w = h * (0.13 - ((t - 0.1) / 0.4) * 0.03);
    else w = h * 0.1;
    if (t > 0.6) return Math.abs(Math.abs(x - cx) - h * 0.05) < h * 0.046;
    return Math.abs(x - cx) < w;
  }

  const scenes = {
    // River at night: far town, quay lamps and their streaked reflections, a boat with a poled figure.
    river(x, v, a, t = 0) {
      const u = x / a, h = 0.47;
      const lamps = [0.05, 0.13, 0.2, 0.31, 0.38, 0.47, 0.58, 0.66, 0.74, 0.86, 0.95];
      const boat = [[0.56, 0.71], [0.86, 0.71], [0.82, 0.752], [0.6, 0.752]].map(([px, py]) => [px * a, py]);
      if (inPoly(x, v, boat)) return 0;
      if (figure(x, v, 0.665 * a, 0.712, 0.2)) return 0;
      if (seg(x, v, 0.625 * a, 0.77, 0.73 * a, 0.42, 0.0035)) return 0;
      let tone;
      if (v < h) {
        const col = Math.floor(u * 46);
        const roof = h - 0.035 - 0.085 * hash(col, 4) * (0.45 + 0.9 * noise(u * 3, 2));
        const hill = h - 0.09 - 0.1 * fbm(u * 4 + 7, 1, 3);
        tone = 0.03 + 0.2 * Math.exp(-(h - v) / 0.1) + 0.1 * ss(0.5, 0.75, fbm(x * 3, v * 7 + 3)) * (1 - v);
        if (v > hill) tone = 0.05;
        if (v > roof) {
          tone = 0.012;
          const wx = Math.floor(u * 150), wy = Math.floor(v * 90);
          if (hash(wx, wy) > 0.965) tone = 0.6;
        }
      } else {
        tone = 0.014 + 0.05 * ss(0.5, 0.8, noise(x * 8, v * 90)) * (1 - (v - h));
        tone += 0.34 * Math.exp(-((u - 0.7) ** 2) / 0.05 - ((v - 0.68) ** 2) / 0.012) * ss(0.25, 0.65, noise(x * 7, v * 120));
      }
      for (const [i, lx] of lamps.entries()) {
        if (v < h + 0.002) {
          const d = ((u - lx) * a) ** 2 + (v - (h - 0.022 - (i % 3) * 0.004)) ** 2;
          tone += Math.exp(-d / 0.00009) * 1.4 + 0.3 * Math.exp(-d / 0.004);
        } else {
          const dv = v - h;
          const dx = (u - lx) * a + (noise(v * 62 + t * 1.6, i * 3.1) - 0.5) * (0.03 + dv * 0.2);
          const w = 0.0042 + 0.026 * dv;
          const streak = 0.34 + 0.66 * ss(0.32, 0.7, noise(x * 16, v * 130 + t * 2.2 + i));
          tone += Math.exp(-(dx * dx) / (2 * w * w)) * Math.exp(-dv * 2.5) * streak * 1.08;
        }
      }
      if (v > 0.752 && v < 0.84) {
        const s = Math.abs(x - 0.71 * a) < 0.15 * a * (1 - (v - 0.752) / 0.09) ? 0.2 : 1;
        tone *= s;
      }
      return tone;
    },

    // The backs of an audience, a lit screen, the beam overhead.
    cinema(x, v, a, t = 0) {
      const u = x / a;
      let tone = 0.015 + 0.02 * noise(x * 3, v * 3);
      const scr = u > 0.2 && u < 0.8 && v > 0.14 && v < 0.56;
      if (scr) {
        const sky = 0.97 - 0.22 * v;
        const ridge = 0.42 - 0.06 * fbm(u * 5, 6, 3);
        tone = v > ridge ? 0.34 : sky;
        if (ell(x, v, 0.63 * a, 0.27, 0.042, 0.042) < 1) tone = 0.28;
      } else {
        const glow = Math.exp(-(((u - 0.5) * a * 0.9) ** 2 + (v - 0.36) ** 2) / 0.16);
        tone += 0.25 * glow;
      }
      // Beam from the projection box, top right.
      const k = (u - 0.98) / (v + 0.02 - 0.0);
      const bu = 0.98 + (0.5 - 0.98) * (v / 0.36);
      const beamW = 0.003 + (v / 0.36) * 0.24;
      if (v < 0.36 && Math.abs(u - bu) < beamW && !scr) {
        tone += 0.16 + 0.26 * ss(0.3, 0.75, fbm(x * 11 + t, v * 15 - t * 0.5, 3));
      }
      void k;
      const rows = [[0.66, 0.05, 0.075, 0.148, 0.024], [0.78, 0.066, 0.1, 0.19, -0.05], [0.93, 0.09, 0.135, 0.26, 0.05]];
      for (const [fy, rx, ry, step, off] of rows) {
        const cell = Math.round((x - off) / (step * a * 0.95));
        for (const n of [cell - 1, cell, cell + 1]) {
          const cx = n * step * a * 0.95 + off + (hash(n, fy * 10) - 0.5) * 0.05;
          const lift = (hash(n + 3, fy * 7) - 0.5) * 0.03;
          const hd = ell(x, v, cx, fy - ry * 0.72 + lift, rx * 0.86, ry * 0.86);
          if (hd < 1) return hd > 0.8 && v < fy - ry * 0.95 + lift ? 0.34 : 0;
          if (Math.abs(x - cx) < rx * 0.42 && v > fy - ry * 0.2 + lift && v < fy + ry * 0.5 + lift) return 0;
          const shoulder = ell(x, v, cx, fy + ry * 1.18 + lift, rx * 2.05, ry * 0.92);
          if (shoulder < 1) return 0;
          if (v > fy + ry * 1.18 + lift && Math.abs(x - cx) < rx * 2.05) return 0;
        }
      }
      return tone;
    },

    // Low stone bridge with lamps, mist behind.
    bridge(x, v, a, t = 0) {
      const u = x / a, wl = 0.66, deck = 0.36;
      let tone = 0.05 + 0.26 * Math.exp(-Math.abs(v - 0.46) / 0.14) * (0.6 + 0.8 * fbm(x * 2, v * 5 + 2, 3));
      const hill = 0.47 - 0.12 * fbm(u * 3.2, 9, 3);
      if (v > hill && v < wl) tone = 0.09 + 0.14 * fbm(x * 9, v * 9, 3);
      const span = 0.205;
      const n = Math.floor(u / span);
      const cx = (n + 0.5) * span;
      const pier = Math.abs(u - cx) > span * 0.42;
      const arch = ell(u * a, v, cx * a, wl, span * 0.42 * a, wl - deck - 0.07);
      if (v > deck && v < wl && (pier || arch > 1)) {
        tone = 0.018 + 0.05 * (noise(x * 60, v * 60) > 0.72 ? 1 : 0);
      }
      if (v > deck - 0.022 && v < deck) tone = 0.0;
      for (let i = 0; i < 6; i++) {
        const lx = (i + 0.5) * span * a;
        if (seg(x, v, lx, deck, lx, deck - 0.1, 0.0022)) return 0;
        const d = (x - lx) ** 2 + (v - (deck - 0.108)) ** 2;
        tone += Math.exp(-d / 0.00012) * 1.5 + 0.2 * Math.exp(-d / 0.005);
      }
      if (v >= wl) {
        const dv = v - wl;
        const my = wl - dv * 0.92;
        const rippled = x + (noise(v * 90 + t * 2, 3) - 0.5) * (0.012 + dv * 0.12);
        tone = Math.min(0.92, scenes.bridge(rippled, Math.max(my, 0.02), a, t) * (0.72 - dv * 0.8));
        tone *= 0.5 + 0.7 * ss(0.3, 0.6, noise(x * 10, v * 110 + t * 2));
      }
      return tone;
    },

    // A road through hills, one car's headlights.
    road(x, v, a) {
      const u = x / a, hz = 0.46;
      let tone = 0.03 + 0.34 * Math.exp(-(hz - v) / 0.12) * (v < hz ? 1 : 0);
      if (v < hz) {
        for (let k = 0; k < 3; k++) {
          const top = hz - 0.03 - (0.17 - k * 0.055) * fbm(u * (2.3 + k * 1.4) + k * 9, 4.2, 3) * 1.5;
          if (v > top) tone = 0.13 - k * 0.055;
        }
        const stars = hash(Math.floor(x * 120), Math.floor(v * 120));
        if (stars > 0.994 && v < 0.24) tone = 0.8;
      } else {
        tone = 0.018 + 0.03 * noise(x * 24, v * 40);
      }
      if (v > hz) {
        const p = (v - hz) / (1 - hz);
        const centre = (0.56 + (0.42 - 0.56) * p) * a;
        const half = 0.004 + 0.58 * p;
        const dist = Math.abs(x - centre);
        if (dist < half) {
          tone = 0.05 + 0.03 * noise(x * 70, v * 80);
          const dash = Math.floor(Math.log(p + 0.02) * 7) % 2 === 0;
          if (dash && dist < half * 0.022) tone = 0.72;
          if (Math.abs(dist - half * 0.94) < half * 0.012) tone = 0.4;
          // Headlight pool on the near lane.
          const cp = 0.3;
          if (p > cp) {
            const q = (p - cp) / (1 - cp);
            const lc = centre + half * 0.47;
            const lw = half * 0.42;
            const dx = Math.abs(x - lc);
            if (dx < lw) tone += (0.86 - q * 0.62) * (1 - (dx / lw) ** 2);
          }
        }
        const carP = 0.3;
        const carX = (0.56 + (0.42 - 0.56) * carP) * a + (0.004 + 0.58 * carP) * 0.47;
        const carY = hz + carP * (1 - hz);
        for (const s2 of [-1, 1]) {
          const d = (x - (carX + s2 * 0.03)) ** 2 + (v - carY) ** 2;
          tone += Math.exp(-d / 0.00007) * 2 + 0.5 * Math.exp(-d / 0.0022);
        }
      }
      // Telegraph poles receding.
      for (let i = 0; i < 6; i++) {
        const p = 0.09 + i * i * 0.028;
        const px = (0.52 - 0.5 * p * 1.25) * a, py = hz + p * 0.42, hgt = 0.04 + p * 0.56;
        if (seg(x, v, px, py, px, py - hgt, 0.0012 + p * 0.0052)) return 0;
        if (seg(x, v, px - hgt * 0.14, py - hgt * 0.92, px + hgt * 0.14, py - hgt * 0.92, 0.001 + p * 0.0036)) return 0;
      }
      return tone;
    },

    // A low moon over reeds.
    moon(x, v, a) {
      const u = x / a, wl = 0.74;
      let tone = 0.022 + 0.12 * Math.exp(-(wl - v) / 0.3);
      const mx = 0.62 * a, my = 0.38, mr = 0.17;
      const d = Math.hypot(x - mx, v - my);
      tone += 0.26 * Math.exp(-((d / 0.42) ** 2));
      if (d < mr) tone = 0.88 + 0.12 * fbm(x * 12, v * 12, 3) - 0.34 * ss(0.56, 0.68, fbm(x * 6 + 2, v * 6, 4));
      const cl = ss(0.5, 0.7, fbm(x * 2.6, v * 16 + 5, 4));
      if (v < wl) tone *= 1 - 0.7 * cl * (d < mr + 0.15 ? 0.7 : 0.3);
      if (v > wl) {
        const dv = v - wl;
        const dx = x - mx + (noise(v * 80, 2) - 0.5) * (0.03 + dv * 0.5);
        const w = mr * (0.72 + dv * 1.3);
        tone = 0.028 + Math.exp(-(dx * dx) / (2 * w * w)) * (0.14 + 0.92 * ss(0.32, 0.66, noise(x * 9, v * 150))) * (1 - dv * 1.3);
      }
      // Reeds: stems rooted below the water line, heads above.
      const stemN = Math.floor(x * 34);
      for (const n of [stemN - 2, stemN - 1, stemN, stemN + 1, stemN + 2]) {
        const r = hash(n, 1);
        const dens = 0.42 + 0.7 * ss(0.32, 0.0, u) + 0.5 * ss(0.8, 1, u);
        if (r > dens) continue;
        const base = 1.02, top = 0.74 - hash(n, 2) * (0.1 + 0.34 * (ss(0.5, 0.05, u) + ss(0.85, 1, u)));
        const lean = (hash(n, 3) - 0.5) * 0.12 + 0.02;
        const sx = (n + hash(n, 5)) / 34;
        const p = (base - v) / (base - top);
        if (p < 0 || p > 1.08) continue;
        const cx = sx + lean * p * p;
        if (Math.abs(x - cx) < 0.0034 + (1 - p) * 0.0034) return 0;
        if (p > 0.86 && Math.abs(x - cx) < 0.0072 * (1.08 - p) * 5 * 0.55) return 0;
      }
      return tone;
    },

    // Two figures at the end of a quay under a single lamp.
    quay(x, v, a) {
      const u = x / a, wl = 0.52;
      let tone = 0.022 + 0.1 * Math.exp(-(wl - v) / 0.22) * (v < wl ? 1 : 0);
      const lx = 0.34 * a, ly = 0.17;
      if (v < wl) {
        const m = fbm(x * 3 + 1, v * 7, 4);
        tone += 0.11 * ss(0.42, 0.72, m);
        const far = wl - 0.018 - 0.022 * fbm(u * 9, 2, 3);
        if (v > far) tone = 0.012;
      } else {
        tone = 0.018 + 0.05 * ss(0.5, 0.75, noise(x * 11, v * 110));
      }
      const quayTop = 0.68 + (u - 0.2) * 0.02;
      const edgeX = 0.82 * a - (v - 0.68) * 1.2;
      const onQuay = v > quayTop && x < edgeX;
      if (onQuay) {
        const d = Math.hypot((x - lx) * 0.8, (v - 0.8) * 1.6);
        tone = 0.42 * Math.exp(-((d / 0.36) ** 2)) + 0.03;
        const sx = Math.floor(x * 18 + (v - 0.68) * 8), sy = Math.floor((v - 0.68) * 38);
        tone *= 0.72 + 0.46 * hash(sx, sy);
        if (Math.abs(fract(x * 18 + (v - 0.68) * 8) - 0.5) > 0.47) tone *= 0.35;
        if (Math.abs(fract((v - 0.68) * 38) - 0.5) > 0.44) tone *= 0.35;
      }
      // Lamp cone.
      const cone = (v - ly) * 0.44;
      if (v > ly && v < quayTop && Math.abs(x - lx) < cone) {
        tone += (0.34 - v * 0.27) * (0.74 + 0.5 * fbm(x * 14, v * 18, 3));
      }
      const d = (x - lx) ** 2 + (v - ly) ** 2;
      tone += Math.exp(-d / 0.0002) * 1.8 + 0.34 * Math.exp(-d / 0.012);
      if (seg(x, v, lx, ly, lx, 0.72, 0.0048)) return 0;
      if (seg(x, v, lx - 0.04, ly - 0.006, lx, ly - 0.006, 0.003)) return 0;
      // Long shadows, then figures.
      const shadow = (cx, fy, hgt) => {
        const p = (v - fy) / 0.32;
        if (p < 0 || p > 1) return false;
        const sx = cx + (cx - lx) * p * 1.1;
        return Math.abs(x - sx) < 0.01 + p * 0.016 && p < hgt * 2;
      };
      if (onQuay && (shadow(0.405 * a, 0.8, 0.26) || shadow(0.452 * a, 0.812, 0.24))) tone *= 0.1;
      if (figure(x, v, 0.405 * a, 0.8, 0.27)) return 0;
      if (figure(x, v, 0.452 * a, 0.812, 0.235)) return 0;
            // A moored hull at the right.
      const hull = [[0.86, 0.6], [1.1, 0.585], [1.1, 0.72], [0.9, 0.72]].map(([px, py]) => [px * a, py]);
      if (inPoly(x, v, hull)) return 0.008;
      return tone;
    },

    // A window at night with a seated silhouette, seen from inside.
    window(x, v, a) {
      const u = x / a;
      let tone = 0.024 + 0.02 * noise(x * 5, v * 5);
      const wx0 = 0.34, wx1 = 0.8, wy0 = 0.1, wy1 = 0.66;
      const spill = Math.exp(-(((u - 0.57) * a) ** 2) / 0.22 - ((v - 0.42) ** 2) / 0.4);
      tone += 0.12 * spill;
      if (u > wx0 && u < wx1 && v > wy0 && v < wy1) {
        const fu = (u - wx0) / (wx1 - wx0), fv = (v - wy0) / (wy1 - wy0);
        const mull = Math.abs(fu - 0.5) < 0.012 || Math.abs(fv - 0.42) < 0.01;
        if (mull) return 0;
        tone = 0.86 - fv * 0.34 + 0.14 * fbm(x * 4, v * 6, 3);
        const hills = 0.72 - 0.1 * fbm(fu * 5, 3, 3);
        if (fv > hills) tone = 0.3 + 0.08 * noise(x * 40, v * 40);
      }
      if (v > 0.8) tone = 0.04 + 0.34 * Math.exp(-(((u - 0.56 - (v - 0.8) * 0.8) * a) ** 2) / 0.05) * (1 - (v - 0.8) * 2.4);
      if (v > 0.66 && v < 0.69 && u > wx0 - 0.03 && u < wx1 + 0.03) return 0.01;
      // Seated figure from the shoulders up, a table edge.
      if (ell(x, v, 0.5 * a, 0.38, 0.062, 0.078) < 1) return 0;
      if (ell(x, v, 0.5 * a, 0.62, 0.19, 0.14) < 1) return 0;
      if (v > 0.62 && Math.abs(x - 0.5 * a) < 0.19) return 0;
      if (seg(x, v, 0.5 * a, 0.44, 0.5 * a, 0.52, 0.04)) return 0;
            return tone;
    }
  };

  // Paints `scene` through a rotated dot screen.
  function halftone(canvas, sceneName, opts = {}) {
    const { cell = 9, angle = 45, color = '#f1eadb', ground = '#0d0c0a', exposure = 1, gamma = 1.12, t = 0, scale = 1, ox = 0, oy = 0, floor = 0, sceneA = 0 } = opts;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height, a = W / H, A = sceneA || a;
    if (ground) { ctx.fillStyle = ground; ctx.fillRect(0, 0, W, H); }
    ctx.fillStyle = color;
    const c = Math.cos((angle * Math.PI) / 180), s = Math.sin((angle * Math.PI) / 180);
    const D = Math.hypot(W, H);
    const f = scenes[sceneName];
    ctx.beginPath();
    for (let i = -D / cell; i < D / cell; i++) {
      for (let j = -D / cell; j < D / cell; j++) {
        const gx = i * cell, gy = j * cell;
        const px = W / 2 + gx * c - gy * s, py = H / 2 + gx * s + gy * c;
        if (px < -cell || py < -cell || px > W + cell || py > H + cell) continue;
        const X = A / 2 + ((px / W - 0.5) * a) / scale + ox * A, v = (py / H - 0.5) / scale + 0.5 + oy;
        let tone = f(X, v, A, t) * exposure;
        tone = Math.max(0, Math.min(1, tone));
        tone = floor + (1 - floor) * Math.pow(tone, gamma);
        if (tone < 0.012) continue;
        const r = cell * 0.73 * Math.sqrt(tone);
        ctx.moveTo(px + r, py);
        ctx.arc(px, py, r, 0, Math.PI * 2);
      }
    }
    ctx.fill();
  }

  window.HT = { scenes, halftone, noise, fbm, hash, ss };
})();
