// The Cais da Ribeira panel: a 20 × 10 tile harbour scene, painted brush by
// brush in scene units (100 = one tile), then cut into tiles with each one
// slightly out of register, as a set really is once it has been fired and hung.
(function (global) {
  const { C, Pen, RNG } = global.Tiles;

  function hatch(p, x, y, w, h, gap, len, tilt, weight, color) {
    for (let yy = y; yy < y + h; yy += gap) {
      for (let xx = x + p.r() * len; xx < x + w; xx += len * (1.4 + p.r() * 0.6)) {
        p.stroke([[xx, yy + p.j(0.8)], [xx + len, yy + tilt + p.j(0.8)]], weight, color, { jit: 0.3 });
      }
    }
  }

  function cloud(p, cx, cy, s) {
    // A cumulus built from overlapping puffs: fill first, then only the arcs
    // that show, as a painter contours an engraved cloud.
    const puffs = [];
    const n = 7;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const r = s * (0.2 + 0.2 * Math.sin(Math.PI * t) + p.r() * 0.05);
      puffs.push([cx - s * 0.82 + 1.64 * s * t, cy - r * 0.55 - Math.sin(Math.PI * t) * s * 0.12, r]);
    }
    for (let i = 1; i < n - 1; i += 2) {
      puffs.push([puffs[i][0] + p.j(s * 0.06), puffs[i][1] - puffs[i][2] * 0.72, puffs[i][2] * 0.72]);
    }
    for (const [x, y, r] of puffs) p.ell(x, y, r, r * 0.9, C.bones[3], 0, 0.6);
    p.blob([[cx - s * 0.78, cy - 1], [cx - s * 0.3, cy - s * 0.035], [cx + s * 0.4, cy - s * 0.03], [cx + s * 0.8, cy], [cx + s * 0.3, cy + s * 0.05], [cx - s * 0.35, cy + s * 0.05]], C.p, 0.9);
    for (const [x, y, r] of puffs) {
      let run = [];
      const flush = () => {
        if (run.length > 2) p.stroke(run, 1.25, C.m, { jit: 0.4, step: 4 });
        run = [];
      };
      for (let a = -Math.PI * 1.02; a <= 0.02; a += Math.PI / 10) {
        const q = [x + Math.cos(a) * r, y + Math.sin(a) * r * 0.9];
        const hidden = puffs.some(([ox, oy, or]) => (ox !== x || oy !== y) && Math.hypot(q[0] - ox, (q[1] - oy) / 0.9) < or * 0.97);
        if (hidden) flush();
        else run.push(q);
      }
      flush();
    }
    // Shadow lines under the belly, then soft hatching inside.
    for (let i = 0; i < 5; i++) {
      const y = cy + 1 + i * 2.6;
      const half = s * (0.62 - i * 0.09);
      p.stroke([[cx - half, y], [cx + half * 0.3, y + 0.8], [cx + half, y]], 0.95, C.w, { jit: 0.5 });
    }
    for (let i = 0; i < 6; i++) {
      const x = cx + s * (0.02 + i * 0.11);
      p.stroke([[x, cy - s * 0.2 + p.j(3)], [x + s * 0.06, cy - s * 0.1 + p.j(3)]], 0.8, C.p, { jit: 0.3 });
    }
  }

  function house(p, x, base, w, h, roof) {
    p.poly([[x, base], [x, base - h], [x + w, base - h], [x + w, base]], C.bones[1], 0.3);
    p.poly([[x + w * 0.62, base], [x + w * 0.62, base - h], [x + w, base - h], [x + w, base]], C.p, 0.3);
    if (roof === 'pitch') p.poly([[x - 1, base - h], [x + w * 0.5, base - h - w * 0.45], [x + w + 1, base - h]], C.w, 0.3);
    else p.poly([[x - 1, base - h], [x + w * 0.2, base - h - w * 0.3], [x + w * 0.8, base - h - w * 0.3], [x + w + 1, base - h]], C.w, 0.3);
    p.stroke([[x, base], [x, base - h], [x + w, base - h], [x + w, base]], 0.7, C.d, { taper: false, jit: 0.25, step: 10 });
    const rows = Math.max(1, Math.floor(h / 9));
    const cols = Math.max(1, Math.floor(w / 7));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        p.poly(
          [
            [x + 2 + (c * (w - 3)) / cols, base - h + 3 + (r * h) / rows],
            [x + 3.8 + (c * (w - 3)) / cols, base - h + 3 + (r * h) / rows],
            [x + 3.8 + (c * (w - 3)) / cols, base - h + 6 + (r * h) / rows],
            [x + 2 + (c * (w - 3)) / cols, base - h + 6 + (r * h) / rows]
          ],
          C.d,
          0.15
        );
      }
    }
  }

  function church(p, x, base, s) {
    house(p, x, base, 32 * s, 26 * s, 'pitch');
    for (const tx of [x - 8 * s, x + 32 * s]) {
      p.poly([[tx, base], [tx, base - 48 * s], [tx + 9 * s, base - 48 * s], [tx + 9 * s, base]], C.bones[1], 0.3);
      p.poly([[tx + 5 * s, base], [tx + 5 * s, base - 48 * s], [tx + 9 * s, base - 48 * s], [tx + 9 * s, base]], C.p, 0.3);
      p.poly([[tx - 1, base - 48 * s], [tx + 4.5 * s, base - 60 * s], [tx + 10 * s, base - 48 * s]], C.m, 0.3);
      p.poly([[tx + 3 * s, base - 42 * s], [tx + 6 * s, base - 42 * s], [tx + 6 * s, base - 35 * s], [tx + 3 * s, base - 35 * s]], C.d, 0.15);
      p.stroke([[tx, base], [tx, base - 48 * s], [tx + 9 * s, base - 48 * s], [tx + 9 * s, base]], 0.7, C.d, { taper: false, jit: 0.25, step: 10 });
      p.stroke([[tx + 4.5 * s, base - 60 * s], [tx + 4.5 * s, base - 66 * s]], 0.7, C.d);
    }
    p.ell(x + 16 * s, base - 39 * s, 8 * s, 9 * s, C.w);
    p.stroke([[x + 8 * s, base - 37 * s], [x + 16 * s, base - 49 * s], [x + 24 * s, base - 37 * s]], 0.8, C.d);
    p.stroke([[x + 16 * s, base - 49 * s], [x + 16 * s, base - 56 * s]], 0.7, C.d);
  }

  function town(p) {
    // Hill behind the town.
    p.blob([[100, 480], [100, 300], [200, 262], [330, 248], [470, 290], [610, 370], [720, 440], [790, 480]], C.p, 4);
    hatch(p, 110, 290, 340, 90, 7, 16, 2, 0.8, C.w);
    // Castle crown.
    p.poly([[240, 262], [240, 226], [250, 226], [250, 232], [260, 232], [260, 226], [270, 226], [270, 232], [280, 232], [280, 226], [290, 226], [290, 232], [300, 232], [300, 226], [310, 226], [310, 262]], C.w, 0.4);
    p.poly([[262, 232], [262, 196], [288, 196], [288, 232]], C.bones[1], 0.4);
    p.poly([[277, 232], [277, 196], [288, 196], [288, 232]], C.p, 0.3);
    p.stroke([[240, 262], [240, 226], [310, 226], [310, 262]], 0.9, C.d, { taper: false, step: 10 });
    p.stroke([[262, 232], [262, 196], [288, 196], [288, 232]], 0.9, C.d, { taper: false, step: 10 });
    p.stroke([[275, 196], [275, 176]], 0.9, C.d);
    p.poly([[275, 176], [290, 181], [275, 186]], C.m, 0.3);
    // Tiers of houses, back to front.
    const tiers = [
      [300, 110, 470, 26],
      [340, 110, 560, 30],
      [382, 105, 650, 36],
      [420, 105, 720, 40],
      [462, 105, 800, 46]
    ];
    tiers.forEach(([base, x0, x1, h]) => {
      for (let x = x0; x < x1; ) {
        const w = 22 + p.r() * 22;
        house(p, x, base + p.j(3), w, h * (0.7 + p.r() * 0.5), p.r() > 0.5 ? 'pitch' : 'hip');
        x += w - 1;
      }
    });
    church(p, 390, 340, 1.5);
    church(p, 640, 430, 1.05);
    // Quay wall below the town.
    p.poly([[100, 462], [810, 462], [830, 482], [100, 482]], C.w, 0.6);
    p.stroke([[100, 462], [810, 462], [830, 482]], 1.2, C.d, { taper: false, step: 14 });
    // Headland, far right.
    p.blob([[1320, 482], [1420, 440], [1560, 410], [1720, 392], [1900, 396], [1900, 482]], C.p, 3);
    hatch(p, 1450, 420, 440, 50, 7, 14, 1.6, 0.7, C.w);
    // Lighthouse.
    p.poly([[1684, 396], [1690, 330], [1704, 330], [1710, 396]], C.bones[1], 0.3);
    p.poly([[1698, 396], [1698, 330], [1704, 330], [1710, 396]], C.w, 0.3);
    p.poly([[1686, 330], [1697, 312], [1708, 330]], C.m, 0.3);
    p.stroke([[1684, 396], [1690, 330], [1704, 330], [1710, 396]], 0.9, C.d, { taper: false, step: 12 });
    for (let x = 1520; x < 1650; x += 30) house(p, x, 416 - (x - 1520) * 0.1, 22, 12, 'pitch');
  }

  function sail(p, x, top, w, h, belly, cross) {
    const shape = [
      [x - w / 2, top],
      [x + w / 2, top],
      [x + w / 2 + belly, top + h * 0.5],
      [x + w / 2 + 2, top + h],
      [x, top + h - 5],
      [x - w / 2 - 2, top + h],
      [x - w / 2 + belly * 0.8, top + h * 0.5]
    ];
    p.blob(shape, C.bones[3], 0.8);
    // Shaded half, two flat tones.
    p.blob([[x + w * 0.12, top + 1], [x + w / 2, top], [x + w / 2 + belly, top + h * 0.5], [x + w / 2 + 2, top + h], [x + w * 0.14, top + h - 5], [x + w * 0.24, top + h * 0.5]], C.p, 0.8);
    for (let i = 0; i < 5; i++) {
      const t = (i + 0.8) / 6;
      p.stroke([[x - w * 0.14, top + h * t], [x + w * 0.28, top + h * t + 2], [x + w * 0.5 + belly * 0.8, top + h * t]], 0.7, C.m, { jit: 0.5 });
    }
    p.stroke([[x - w / 2, top], [x + w / 2, top]], 1.9, C.d, { jit: 0.3 });
    p.stroke([[x + w / 2, top], [x + w / 2 + belly, top + h * 0.5], [x + w / 2 + 2, top + h]], 1.1, C.d);
    p.stroke([[x - w / 2, top], [x - w / 2 + belly * 0.8, top + h * 0.5], [x - w / 2 - 2, top + h]], 1, C.d);
    p.stroke([[x - w / 2 - 2, top + h], [x, top + h - 5], [x + w / 2 + 2, top + h]], 1.1, C.d);
    if (cross) {
      const cy = top + h * 0.5;
      const s = Math.min(w, h) * 0.2;
      p.poly([[x - s, cy - s * 0.3], [x + s, cy - s * 0.3], [x + s, cy + s * 0.3], [x - s, cy + s * 0.3]], C.m, 0.3);
      p.poly([[x - s * 0.3, cy - s], [x + s * 0.3, cy - s], [x + s * 0.3, cy + s], [x - s * 0.3, cy + s]], C.m, 0.3);
    }
  }

  function ship(p, x, y, s, flip) {
    const X = (v) => x + (flip ? -v : v) * s;
    const Y = (v) => y + v * s;
    // Rigging behind sails.
    for (const [mx, top] of [
      [-52, -176],
      [8, -212],
      [64, -164]
    ]) {
      p.stroke([[X(mx), Y(top)], [X(mx - 44), Y(-46)]], 0.5, C.d, { jit: 0.2, step: 16 });
      p.stroke([[X(mx), Y(top)], [X(mx + 44), Y(-38)]], 0.5, C.d, { jit: 0.2, step: 16 });
      p.stroke([[X(mx), Y(top * 0.72)], [X(mx - 30), Y(-46)]], 0.5, C.d, { jit: 0.2, step: 16 });
      p.stroke([[X(mx), Y(top * 0.72)], [X(mx + 30), Y(-38)]], 0.5, C.d, { jit: 0.2, step: 16 });
    }
    p.stroke([[X(96), Y(-40)], [X(136), Y(-68)]], 1.6 * s, C.d, { taper: false });
    p.stroke([[X(136), Y(-68)], [X(64), Y(-164)]], 0.5, C.d, { jit: 0.2, step: 16 });
    for (const [mx, top] of [
      [-52, -176],
      [8, -212],
      [64, -164]
    ]) {
      p.stroke([[X(mx), Y(-30)], [X(mx), Y(top)]], 2.1 * s, C.d, { taper: false, jit: 0.2, step: 16 });
    }
    // Hull.
    const hull = [
      [X(-106), Y(-52)],
      [X(-70), Y(-44)],
      [X(-30), Y(-30)],
      [X(50), Y(-30)],
      [X(100), Y(-42)],
      [X(92), Y(-14)],
      [X(60), Y(2)],
      [X(-74), Y(2)],
      [X(-98), Y(-18)]
    ];
    p.blob(hull, C.w, 0.7);
    p.blob([[X(-96), Y(-20)], [X(-68), Y(-14)], [X(60), Y(-13)], [X(90), Y(-20)], [X(82), Y(-6)], [X(58), Y(2)], [X(-74), Y(2)]], C.m, 0.7);
    // Stern castle.
    p.poly([[X(-108), Y(-74)], [X(-72), Y(-68)], [X(-68), Y(-40)], [X(-106), Y(-46)]], C.bones[1], 0.5);
    for (let i = 0; i < 4; i++) {
      p.poly([[X(-103 + i * 8), Y(-68 + i)], [X(-98 + i * 8), Y(-67 + i)], [X(-98 + i * 8), Y(-54 + i)], [X(-103 + i * 8), Y(-55 + i)]], C.m, 0.2);
    }
    p.stroke([[X(-108), Y(-74)], [X(-72), Y(-68)], [X(-68), Y(-40)]], 1.2, C.d, { taper: false, step: 12 });
    p.stroke([[X(-110), Y(-60)], [X(-106), Y(-46)]], 1.2, C.d);
    p.stroke(hull.concat([hull[0]]), 1.5, C.d, { taper: false, step: 10 });
    // Planking and gun ports.
    p.stroke([[X(-94), Y(-34)], [X(-30), Y(-22)], [X(50), Y(-22)], [X(94), Y(-32)]], 0.8, C.d);
    p.stroke([[X(-92), Y(-26)], [X(-30), Y(-16)], [X(50), Y(-16)], [X(90), Y(-24)]], 0.7, C.d);
    for (let i = 0; i < 9; i++) {
      const gx = -60 + i * 16;
      p.poly([[X(gx), Y(-13)], [X(gx + 6), Y(-13)], [X(gx + 6), Y(-7)], [X(gx), Y(-7)]], C.d, 0.2);
    }
    // Sails.
    const sails = [
      [-52, -168, 58, 44, 8, false],
      [-52, -118, 72, 62, 9, true],
      [8, -204, 62, 44, 8, false],
      [8, -154, 88, 56, 10, false],
      [8, -92, 104, 56, 10, true],
      [64, -156, 52, 40, 7, false],
      [64, -110, 66, 58, 8, true]
    ];
    for (const [mx, top, w, h, belly, cross] of sails) {
      sail(p, X(mx), Y(top), w * s, h * s, (flip ? -belly : belly) * s, cross);
    }
    // Pennants.
    for (const [mx, top, len] of [
      [-52, -178, 34],
      [8, -214, 46],
      [64, -166, 30]
    ]) {
      p.stroke([[X(mx), Y(top - 12)], [X(mx), Y(top)]], 1 * s, C.d);
      p.poly([[X(mx), Y(top - 12)], [X(mx + len * 0.5), Y(top - 8)], [X(mx + len), Y(top - 5)], [X(mx + len * 0.5), Y(top - 3)], [X(mx), Y(top - 5)]], C.m, 0.4);
    }
    // Reflection and bow wave.
    for (let i = 0; i < 12; i++) {
      const wx = -96 + i * 17 + p.j(4);
      p.stroke([[X(wx), Y(6 + (i % 3) * 3)], [X(wx + 8), Y(4 + (i % 3) * 3)], [X(wx + 16), Y(6 + (i % 3) * 3)]], 1.1, C.m, { jit: 0.4 });
    }
  }

  function skiff(p, x, y, s) {
    p.blob([[x - 46 * s, y - 9 * s], [x + 48 * s, y - 13 * s], [x + 34 * s, y + 5 * s], [x - 30 * s, y + 6 * s]], C.w, 0.5);
    p.stroke([[x - 46 * s, y - 9 * s], [x, y - 7 * s], [x + 48 * s, y - 13 * s]], 1.6, C.d);
    p.stroke([[x - 30 * s, y + 6 * s], [x, y + 7 * s], [x + 34 * s, y + 5 * s]], 1.3, C.d);
    for (const fx of [-22, 2, 26]) {
      p.blob([[x + (fx - 6) * s, y - 9 * s], [x + (fx - 5) * s, y - 28 * s], [x + (fx + 5) * s, y - 28 * s], [x + (fx + 6) * s, y - 9 * s]], C.m, 0.4);
      p.ell(x + fx * s, y - 33 * s, 4.4 * s, 4.8 * s, C.bones[3]);
      p.stroke([[x + (fx - 4) * s, y - 37 * s], [x + fx * s, y - 39 * s], [x + (fx + 4) * s, y - 37 * s]], 1, C.d);
    }
    p.stroke([[x - 4 * s, y - 16 * s], [x - 26 * s, y + 12 * s]], 1.1, C.d);
    p.stroke([[x + 20 * s, y - 16 * s], [x + 2 * s, y + 12 * s]], 1.1, C.d);
  }

  // A standing figure, painted like the staffage of a tile panel after an engraving.
  function person(p, x, y, h, { coat = C.m, skirt = false, prop = null, flip = 1, hat = 'tricorne' } = {}) {
    const s = h / 100;
    const X = (v) => x + v * flip * s;
    const Y = (v) => y - v * s;
    if (skirt) {
      p.blob([[X(-8), Y(62)], [X(9), Y(62)], [X(22), Y(4)], [X(-20), Y(4)]], coat, 0.5);
      for (let i = 0; i < 4; i++) p.stroke([[X(-5 + i * 4), Y(56)], [X(-16 + i * 11), Y(7)]], 0.9, C.d);
      p.stroke([[X(-20), Y(4)], [X(0), Y(1)], [X(22), Y(4)]], 1, C.d);
    } else {
      p.stroke([[X(-5), Y(46)], [X(-7), Y(22)], [X(-8), Y(4)]], 3.6 * s + 1.2, C.d, { taper: false });
      p.stroke([[X(6), Y(46)], [X(8), Y(22)], [X(10), Y(4)]], 3.6 * s + 1.2, C.d, { taper: false });
      p.stroke([[X(-13), Y(3)], [X(-5), Y(3)]], 2.2, C.d);
      p.stroke([[X(7), Y(3)], [X(15), Y(3)]], 2.2, C.d);
    }
    // Torso and coat.
    p.blob([[X(-9), Y(80)], [X(10), Y(80)], [X(13), Y(58)], [X(17), Y(32)], [X(-16), Y(32)], [X(-12), Y(58)]], skirt ? C.w : coat, 0.5);
    p.stroke([[X(1), Y(79)], [X(2), Y(33)]], 0.9, C.d);
    p.stroke([[X(-9), Y(80)], [X(-12), Y(58)], [X(-16), Y(32)]], 1, C.d);
    p.stroke([[X(10), Y(80)], [X(13), Y(58)], [X(17), Y(32)]], 1, C.d);
    p.stroke([[X(-16), Y(32)], [X(0), Y(30)], [X(17), Y(32)]], 1, C.d);
    if (!skirt) for (let i = 0; i < 3; i++) p.stroke([[X(-11 + i * 3), Y(38)], [X(-11 + i * 3), Y(58)]], 0.7, C.d);
    // Head.
    p.ell(X(1), Y(88), 6.2 * s + 0.4, 7 * s + 0.4, C.bones[3]);
    p.stroke([[X(5), Y(93)], [X(7), Y(88)], [X(5), Y(83)]], 0.9, C.d);
    p.dot(X(3.4), Y(89), 0.55, C.d);
    if (hat === 'tricorne') {
      p.blob([[X(-11), Y(93)], [X(1), Y(100)], [X(13), Y(93)], [X(1), Y(95)]], C.d, 0.4);
    } else if (hat === 'scarf') {
      p.blob([[X(-7), Y(92)], [X(1), Y(99)], [X(8), Y(93)], [X(5), Y(90)], [X(-3), Y(91)], [X(-7), Y(80)], [X(-10), Y(85)]], C.d, 0.4);
    } else if (hat === 'cap') {
      p.blob([[X(-7), Y(92)], [X(1), Y(98)], [X(8), Y(92)]], C.m, 0.3);
    }
    // Arms and props.
    const arm = (pts) => p.stroke(pts.map(([a, b]) => [X(a), Y(b)]), 4.6 * s + 1, skirt ? C.w : coat, { taper: false, jit: 0.3 });
    if (prop === 'basket') {
      arm([[-9, 76], [-17, 88], [-12, 102]]);
      arm([[10, 76], [18, 88], [13, 102]]);
      p.blob([[X(-20), Y(114)], [X(21), Y(114)], [X(14), Y(100)], [X(-13), Y(100)]], C.w, 0.4);
      for (let i = 0; i < 6; i++) p.stroke([[X(-16 + i * 6), Y(113)], [X(-11 + i * 4.4), Y(101)]], 0.7, C.d);
      p.stroke([[X(-20), Y(114)], [X(21), Y(114)]], 1.3, C.d);
      for (let i = 0; i < 5; i++) p.ell(X(-13 + i * 6.5), Y(117), 3.8 * s, 2 * s, C.m, 0.2);
    } else if (prop === 'staff') {
      arm([[10, 74], [20, 62], [28, 58]]);
      arm([[-9, 74], [-14, 56], [-10, 44]]);
      p.stroke([[X(30), Y(84)], [X(30), Y(2)]], 1.4, C.d, { taper: false });
    } else if (prop === 'point') {
      arm([[10, 75], [24, 77], [38, 82]]);
      arm([[-9, 74], [-14, 56], [-10, 44]]);
    } else if (prop === 'jar') {
      arm([[-9, 76], [-16, 90], [-6, 100]]);
      arm([[10, 74], [14, 56], [10, 44]]);
      p.blob([[X(-11), Y(101)], [X(-1), Y(100)], [X(4), Y(112)], [X(-5), Y(122)], [X(-15), Y(112)]], C.w, 0.3);
      p.stroke([[X(-11), Y(121)], [X(0), Y(121)]], 1.3, C.d);
    } else if (prop === 'bale') {
      arm([[10, 76], [20, 88], [16, 100]]);
      arm([[-9, 76], [-19, 88], [-15, 100]]);
      p.blob([[X(-20), Y(120)], [X(20), Y(121)], [X(23), Y(98)], [X(-22), Y(97)]], C.w, 0.4);
      p.stroke([[X(0), Y(121)], [X(1), Y(97)]], 1.1, C.d);
      p.stroke([[X(-21), Y(109)], [X(21), Y(109)]], 1.1, C.d);
      p.stroke([[X(-20), Y(120)], [X(20), Y(121)], [X(23), Y(98)], [X(-22), Y(97)], [X(-20), Y(120)]], 0.9, C.d, { taper: false, step: 12 });
    } else {
      arm([[10, 75], [15, 56], [12, 42]]);
      arm([[-9, 75], [-14, 56], [-11, 42]]);
    }
  }

  function barrel(p, x, y, s) {
    p.blob([[x - 12 * s, y - 34 * s], [x + 12 * s, y - 34 * s], [x + 16 * s, y - 17 * s], [x + 12 * s, y], [x - 12 * s, y], [x - 16 * s, y - 17 * s]], C.w, 0.4);
    p.blob([[x + 3 * s, y - 34 * s], [x + 12 * s, y - 34 * s], [x + 16 * s, y - 17 * s], [x + 12 * s, y], [x + 3 * s, y]], C.m, 0.3);
    p.stroke([[x - 15 * s, y - 25 * s], [x, y - 23 * s], [x + 15 * s, y - 25 * s]], 1.2, C.d);
    p.stroke([[x - 15 * s, y - 9 * s], [x, y - 7 * s], [x + 15 * s, y - 9 * s]], 1.2, C.d);
    p.ell(x, y - 34 * s, 12 * s, 3 * s, C.bones[2]);
    p.stroke([[x - 12 * s, y - 34 * s], [x, y - 31 * s], [x + 12 * s, y - 34 * s]], 0.9, C.d);
  }

  function crate(p, x, y, w, h) {
    p.poly([[x, y], [x, y - h], [x + w, y - h], [x + w, y]], C.p, 0.4);
    for (let i = 1; i < 4; i++) p.stroke([[x, y - (h * i) / 4], [x + w, y - (h * i) / 4]], 0.7, C.d);
    p.stroke([[x, y], [x, y - h], [x + w, y - h], [x + w, y], [x, y]], 1.1, C.d, { taper: false, step: 12 });
    p.stroke([[x, y], [x + w, y - h]], 0.8, C.d);
  }

  function coil(p, x, y, s) {
    for (let i = 0; i < 4; i++) {
      p.ell(x, y - i * 4 * s, (17 - i * 2) * s, 4.5 * s, i % 2 ? C.w : C.p);
      p.stroke([[x - (17 - i * 2) * s, y - i * 4 * s], [x, y - i * 4 * s + 4 * s], [x + (17 - i * 2) * s, y - i * 4 * s]], 0.8, C.d);
    }
  }

  function anchor(p, x, y, s) {
    p.stroke([[x, y - 70 * s], [x + 2 * s, y - 4 * s]], 3.4 * s, C.d, { taper: false });
    p.stroke([[x - 14 * s, y - 62 * s], [x + 14 * s, y - 62 * s]], 2.6 * s, C.d, { taper: false });
    p.stroke([[x - 28 * s, y - 16 * s], [x - 18 * s, y - 3 * s], [x + 2 * s, y], [x + 22 * s, y - 3 * s], [x + 30 * s, y - 16 * s]], 3 * s, C.d);
    p.dot(x, y - 74 * s, 3.2 * s, C.d);
  }

  function sea(p) {
    p.raw(`<rect x="100" y="478" width="1800" height="294" fill="${C.bones[0]}"/>`);
    // Flat islands of wash, not bands.
    const islands = [
      [100, 482, 620, 18], [760, 486, 460, 14], [1300, 482, 600, 22],
      [160, 556, 380, 12], [620, 548, 300, 14], [1320, 566, 460, 12],
      [100, 622, 560, 20], [860, 612, 320, 12], [1500, 622, 400, 18],
      [100, 700, 1800, 70]
    ];
    islands.forEach(([x, y, w, h], i) => {
      p.blob([[x, y + h * 0.6], [x + w * 0.2, y], [x + w * 0.55, y + h * 0.1], [x + w * 0.85, y + h * 0.05], [x + w, y + h * 0.5], [x + w * 0.8, y + h], [x + w * 0.4, y + h * 0.9], [x + w * 0.1, y + h]], C.p, 1.5);
    });
    // Wave strokes grow toward the viewer.
    for (let row = 0; row < 30; row++) {
      const t = row / 29;
      const y = 490 + t * t * 276;
      const len = 13 + t * 30;
      const weight = 0.7 + t * 1.25;
      for (let x = 100 + p.r() * len; x < 1900; x += len * (1.35 + p.r() * 0.9)) {
        const col = t > 0.62 ? C.d : t > 0.32 ? C.m : C.w;
        p.stroke([[x, y + p.j(2)], [x + len / 2, y - 3 - t * 5 + p.j(1.5)], [x + len, y + p.j(2)]], weight, col, { jit: 0.5 });
      }
    }
  }

  function sky(p) {
    p.raw(`<rect x="100" y="100" width="1800" height="400" fill="${C.bones[0]}"/>`);
    // Engraved sky: horizontal lines thinning toward the horizon.
    for (let row = 0; row < 22; row++) {
      const t = row / 21;
      const y = 112 + t * 200;
      for (let x = 100 + p.r() * 30; x < 1900; x += 60 + p.r() * 90) {
        const len = 30 + (1 - t) * 90 + p.r() * 40;
        p.stroke([[x, y + p.j(1.5)], [x + len, y + p.j(1.5)]], 1.1 - t * 0.5, t < 0.4 ? C.w : C.p, { jit: 0.6 });
      }
    }
    cloud(p, 980, 280, 200);
    cloud(p, 520, 200, 150);
    cloud(p, 1500, 225, 170);
    cloud(p, 1240, 360, 110);
    cloud(p, 780, 370, 90);
    // Birds.
    for (const [x, y, s] of [
      [1120, 170, 1],
      [1164, 192, 0.8],
      [1094, 206, 0.7],
      [320, 170, 0.9],
      [1760, 170, 0.9],
      [1790, 196, 0.7]
    ]) {
      p.stroke([[x - 13 * s, y - 3 * s], [x - 6 * s, y - 8 * s], [x, y]], 1.2, C.d);
      p.stroke([[x, y], [x + 7 * s, y - 8 * s], [x + 14 * s, y - 3 * s]], 1.2, C.d);
    }
  }

  function quay(p) {
    // Stone wall.
    p.poly([[100, 770], [1900, 766], [1900, 900], [100, 900]], C.bones[1], 1);
    p.blob([[100, 770], [1900, 766], [1900, 786], [100, 790]], C.p, 1.5);
    p.stroke([[100, 770], [1000, 768], [1900, 766]], 2.2, C.d, { taper: false, step: 24 });
    // Top of quay is hatched ground.
    for (let row = 0; row < 7; row++) {
      const y = 778 + row * 5;
      for (let x = 100 + p.r() * 40; x < 1900; x += 30 + p.r() * 50) {
        p.stroke([[x, y], [x + 16 + p.r() * 14, y + p.j(1)]], 0.9, C.w, { jit: 0.4 });
      }
    }
    // Cobble suggestion, sparse.
    for (let i = 0; i < 180; i++) {
      const x = 110 + p.r() * 1780;
      const y = 815 + p.r() * 80;
      p.stroke([[x, y], [x + 7, y - 1], [x + 12, y + 1]], 0.8, C.w, { jit: 0.5 });
    }
    // Bollards.
    for (const x of [300, 980, 1660]) {
      p.blob([[x - 11, 786], [x + 11, 786], [x + 8, 812], [x - 8, 812]], C.m, 0.5);
      p.ell(x, 786, 13, 4.5, C.d);
    }
    // Stores and staffage, left to right.
    crate(p, 142, 862, 64, 50);
    crate(p, 200, 868, 54, 36);
    barrel(p, 278, 870, 1.45);
    barrel(p, 326, 876, 1.45);
    barrel(p, 300, 822, 1.2);
    person(p, 410, 886, 152, { coat: C.m, prop: 'bale', hat: 'cap' });
    person(p, 500, 880, 148, { coat: C.d, prop: 'staff', hat: 'tricorne' });
    person(p, 600, 884, 148, { coat: C.w, prop: 'point', flip: -1, hat: 'tricorne' });
    person(p, 738, 888, 150, { coat: C.m, skirt: true, prop: 'basket', hat: 'scarf' });
    person(p, 820, 884, 146, { coat: C.w, skirt: true, prop: 'jar', hat: 'scarf', flip: -1 });
    anchor(p, 918, 842, 1.15);
    coil(p, 1080, 846, 1.4);
    crate(p, 1136, 850, 62, 46);
    person(p, 1262, 888, 154, { coat: C.d, prop: 'point', hat: 'tricorne' });
    person(p, 1352, 884, 150, { coat: C.m, prop: 'basket', hat: 'cap', flip: -1 });
    coil(p, 1438, 880, 1.3);
    person(p, 1520, 888, 150, { coat: C.w, skirt: true, prop: 'basket', hat: 'scarf' });
    person(p, 1610, 882, 148, { coat: C.d, prop: 'staff', hat: 'tricorne', flip: -1 });
    barrel(p, 1700, 874, 1.45);
    barrel(p, 1750, 868, 1.45);
    crate(p, 1786, 870, 92, 62);
    // Dog.
    p.blob([[648, 874], [668, 864], [690, 866], [698, 854], [710, 858], [706, 874], [684, 880], [660, 880]], C.w, 0.4);
    p.stroke([[656, 880], [654, 892]], 1.7, C.d);
    p.stroke([[692, 880], [694, 892]], 1.7, C.d);
    p.stroke([[648, 874], [638, 864]], 1.4, C.d);
    p.dot(704, 862, 0.8, C.d);
  }

  function volute(p, cx, cy, r, dir, weight, col) {
    const pts = [];
    for (let i = 0; i <= 22; i++) {
      const t = i / 22;
      const a = dir * (t * Math.PI * 3.2);
      const rr = r * (1 - t * 0.86);
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
    p.stroke(pts, weight, col, { jit: 0.3, step: 4 });
  }

  function frameTile(p, x, y, flip, horizontal, even) {
    // One tile of running rinceau: the stem meets its neighbours at the joints.
    const T = (u, v) => {
      const uu = flip ? 100 - u : u;
      return horizontal ? [x + uu, y + v] : [x + v, y + uu];
    };
    const sgn = even ? 1 : -1;
    const V = (v) => 50 + sgn * (v - 50);
    p.poly([T(0, 7), T(100, 7), T(100, 93), T(0, 93)], C.p, 0.4);
    p.poly([T(0, 0), T(100, 0), T(100, 7), T(0, 7)], C.m, 0.3);
    p.poly([T(0, 93), T(100, 93), T(100, 100), T(0, 100)], C.d, 0.3);
    // Stem.
    p.stroke([T(0, 50), T(22, V(24)), T(52, V(22)), T(78, V(38)), T(100, 50)], 3, C.d, { taper: false, jit: 0.3 });
    // Volute off the stem, curling into the bay.
    const [cx, cy] = T(50, V(56));
    p.ell(cx, cy, 25, 25, C.bones[1], 0, 0.5);
    volute(p, cx, cy, 24, (flip ? -1 : 1) * sgn * (horizontal ? 1 : -1), 2.4, C.d);
    p.dot(cx, cy, 1.7, C.m);
    // Acanthus.
    const leaf = (u, v, du, dv, col = C.w) => {
      const a = T(u, V(v));
      const b = T(u + du * 0.5 + dv * 0.32, V(v + dv * 0.5 - du * 0.32));
      const c = T(u + du, V(v + dv));
      const d = T(u + du * 0.5 - dv * 0.32, V(v + dv * 0.5 + du * 0.32));
      p.blob([a, b, c, d], col, 0.4);
      p.stroke([a, c], 1, C.d, { jit: 0.25 });
    };
    leaf(22, 25, -16, -12, C.m);
    leaf(22, 25, -4, 26);
    leaf(84, 42, 12, 22);
    leaf(70, 32, 18, -18);
    leaf(52, 22, 10, -11, C.m);
    const d1 = T(90, V(80));
    p.dot(d1[0], d1[1], 1.8, C.m);
    const d2 = T(10, V(82));
    p.dot(d2[0], d2[1], 1.8, C.m);
  }

  function frame(p) {
    for (let c = 1; c < 19; c++) {
      const flip = c >= 10;
      frameTile(p, c * 100, 0, flip, true, c % 2 === 0);
      frameTile(p, c * 100, 900, flip, true, c % 2 === 1);
    }
    for (let r = 1; r < 9; r++) {
      const flip = r >= 5;
      frameTile(p, 0, r * 100, flip, false, r % 2 === 0);
      frameTile(p, 1900, r * 100, flip, false, r % 2 === 1);
    }
    for (const [x, y] of [
      [0, 0],
      [1900, 0],
      [0, 900],
      [1900, 900]
    ]) {
      p.poly([[x, y], [x + 100, y], [x + 100, y + 100], [x, y + 100]], C.m, 0.4);
      p.petals(x + 50, y + 50, 8, 40, 11, C.p, Math.PI / 8);
      p.petals(x + 50, y + 50, 8, 26, 6, C.d, 0);
      p.dot(x + 50, y + 50, 7, C.bones[1]);
      p.dot(x + 50, y + 50, 3, C.d);
    }
    // Inner fillet: four straight pulls of the brush.
    for (const seg of [
      [[100, 100], [1900, 100]],
      [[1900, 100], [1900, 900]],
      [[1900, 900], [100, 900]],
      [[100, 900], [100, 100]]
    ]) {
      p.stroke(seg, 2.8, C.d, { taper: false, jit: 0.5, step: 40 });
    }
    // Cartouche, breaking the frame at the bottom.
    const cx = 1000;
    const outline = [[cx - 170, 930], [cx - 196, 890], [cx - 140, 862], [cx, 848], [cx + 140, 862], [cx + 196, 890], [cx + 170, 930], [cx + 120, 958], [cx, 966], [cx - 120, 958]];
    p.blob(outline, C.bones[1], 0.8);
    p.stroke(outline.concat([outline[0]]), 2.8, C.d, { taper: false, step: 10, jit: 0.5 });
    p.stroke(outline.map(([x, y]) => [cx + (x - cx) * 0.93, 906 + (y - 906) * 0.84]).concat([[cx + (outline[0][0] - cx) * 0.93, 906 + (outline[0][1] - 906) * 0.84]]), 1, C.m, { taper: false, step: 10, jit: 0.5 });
    volute(p, cx - 204, 906, 19, 1, 2.8, C.d);
    volute(p, cx + 204, 906, 19, -1, 2.8, C.d);
    p.raw(`<text x="${cx}" y="901" text-anchor="middle" font-family="'IM Fell English SC', serif" font-size="25" letter-spacing="2.4" fill="${C.d}">O CAIS DA RIBEIRA</text>`);
    p.raw(`<text x="${cx}" y="934" text-anchor="middle" font-family="'IM Fell English', serif" font-style="italic" font-size="21" letter-spacing=".8" fill="${C.m}">Anno de MDCCXXXVIII</text>`);
    // Top shell, breaking the frame.
    const sx = 1000;
    const shell = [[sx - 104, 18], [sx, -2], [sx + 104, 18], [sx + 86, 106], [sx + 28, 140], [sx - 28, 140], [sx - 86, 106]];
    p.blob(shell, C.bones[1], 0.8);
    for (let i = 0; i < 9; i++) {
      const a = Math.PI * (0.12 + (i / 8) * 0.76);
      p.stroke([[sx, 132], [sx - Math.cos(a) * 94, 132 - Math.sin(a) * 114]], 2.3, i % 2 ? C.m : C.d, { jit: 0.4 });
      p.dot(sx - Math.cos(a) * 100, 132 - Math.sin(a) * 120, 2.8, C.d);
    }
    p.stroke(shell.concat([shell[0]]), 2.5, C.d, { taper: false, step: 12, jit: 0.4 });
    p.dot(sx, 130, 8, C.m);
    p.dot(sx, 130, 3, C.bones[0]);
  }

  /** The whole painted scene, in scene units. */
  function paintScene() {
    const p = new Pen(1738, 0.7);
    p.raw(`<rect width="2000" height="1000" fill="${C.bones[0]}"/>`);
    sky(p);
    sea(p);
    town(p);
    ship(p, 1180, 620, 1.05, false);
    ship(p, 1640, 548, 0.62, true);
    ship(p, 920, 540, 0.42, false);
    skiff(p, 640, 694, 1.5);
    skiff(p, 1500, 712, 1.2);
    quay(p);
    frame(p);
    return p.toString();
  }

  /**
   * A window on the panel as a nested SVG, cut into tiles with each tile a
   * little out of register, with its own flat glaze tone over it.
   */
  function panel({ x = 0, y = 0, width, height, view = [0, 0, 2000, 1000], seed = 7 }) {
    const [vx, vy, vw, vh] = view;
    const r = RNG(seed);
    const scene = paintScene();
    let s = `<svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${vx} ${vy} ${vw} ${vh}" preserveAspectRatio="xMidYMid slice"><defs><g id="scene">${scene}</g></defs>`;
    const c0 = Math.floor(vx / 100);
    const r0 = Math.floor(vy / 100);
    const c1 = Math.ceil((vx + vw) / 100);
    const r1 = Math.ceil((vy + vh) / 100);
    for (let row = r0; row < r1; row++) {
      for (let col = c0; col < c1; col++) {
        const tx = col * 100;
        const ty = row * 100;
        // Registration differs a little from tile to tile.
        const dx = (r() - 0.5) * 1.8;
        const dy = (r() - 0.5) * 1.8;
        s += `<svg x="${tx}" y="${ty}" width="100" height="100" viewBox="${tx + dx} ${ty + dy} 100 100"><use href="#scene"/></svg>`;
        const tone = r();
        if (tone < 0.42) {
          // Flat tonal shift: a warmer or cooler firing.
          const fill = tone < 0.16 ? '#8d7a4a' : tone < 0.3 ? '#1a3a96' : '#ffffff';
          const op = tone < 0.16 ? 0.05 : tone < 0.3 ? 0.035 : 0.09;
          s += `<rect x="${tx}" y="${ty}" width="100" height="100" fill="${fill}" fill-opacity="${op}"/>`;
        }
        if (r() < 0.05) {
          const pen = new Pen(col * 31 + row);
          pen.raw('');
          const cx = r() < 0.5 ? tx : tx + 100;
          const cy = r() < 0.5 ? ty : ty + 100;
          const sx = cx === tx ? 1 : -1;
          const sy = cy === ty ? 1 : -1;
          pen.poly([[cx, cy], [cx + sx * 6, cy], [cx + sx * 3, cy + sy * 2], [cx, cy + sy * 5]], C.biscuit, 0.3);
          s += pen.toString();
        }
      }
    }
    for (let col = c0; col <= c1; col++) {
      s += `<path d="M${col * 100} ${vy}V${vy + vh}" stroke="${C.joint}" stroke-width=".7" vector-effect="non-scaling-stroke"/>`;
    }
    for (let row = r0; row <= r1; row++) {
      s += `<path d="M${vx} ${row * 100}H${vx + vw}" stroke="${C.joint}" stroke-width=".7" vector-effect="non-scaling-stroke"/>`;
    }
    return `${s}</svg>`;
  }

  global.Panel = { paintScene, panel };
})(window);
