// Festival ident: a slit of light, the beam opens on the river, the wordmark strikes, four cuts inside the letters, lock-up.
(function () {
  const AMBER = '#ffb81c', INK = '#0d0c0a';
  const ease = (x) => { const t = Math.min(1, Math.max(0, x)); return 1 - Math.pow(1 - t, 3); };
  const off = (W, H) => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
  const cache = {};
  function still(W, H, name, opts) {
    const key = name + W + JSON.stringify(opts);
    if (!cache[key]) { const c = off(W, H); HT.halftone(c, name, opts); cache[key] = c; }
    return cache[key];
  }
  function letters(ctx, size, x0, y0, reveal, fill) {
    ctx.font = size + 'px "Six Caps"';
    ctx.textBaseline = 'alphabetic';
    const word = 'MARGEM';
    let x = x0;
    for (let i = 0; i < word.length; i++) {
      const adv = ctx.measureText(word.slice(0, i + 1)).width - ctx.measureText(word.slice(0, i)).width;
      const r = reveal(i);
      if (r > 0) {
        ctx.save();
        const cx = x + adv / 2, half = (adv / 2 + 2) * r;
        ctx.beginPath(); ctx.rect(cx - half, 0, half * 2, ctx.canvas.height); ctx.clip();
        ctx.fillStyle = fill;
        ctx.fillText(word[i], x, y0);
        ctx.restore();
      }
      x += adv;
    }
  }
  function metrics(ctx, targetH) {
    ctx.font = '100px "Six Caps"';
    const m = ctx.measureText('MARGEM');
    const size = (100 * targetH) / m.actualBoundingBoxAscent;
    return { size, width: (m.width * size) / 100, left: (m.actualBoundingBoxLeft * size) / 100 };
  }
  window.drawIdent = function (canvas, t) {
    const W = canvas.width, H = canvas.height, k = W / 1280;
    const ctx = canvas.getContext('2d');
    ctx.globalAlpha = 1;
    ctx.fillStyle = INK; ctx.fillRect(0, 0, W, H);
    const cell = 8.5 * k;
    const ax = 0.36 * W, ay = 0.965 * H;
    const fit = metrics(ctx, H * 0.86);
    const wx = (W - fit.width) / 2, wy = H * 0.93;

    if (t < 0.5) return;
    if (t < 7.6) {
      if (t < 5.65) {
        // Slit, beam, river.
        const open = ease((t - 1.0) / 2.3);
        const slit = ease((t - 0.5) / 0.45);
        if (open <= 0) {
          ctx.fillStyle = AMBER;
          ctx.fillRect(ax - 34 * k * slit, ay - 4 * k, 68 * k * slit, 8 * k);
          return;
        }
        const river = off(W, H);
        HT.halftone(river, 'river', { cell, color: AMBER, ground: INK, t: t * 0.9, gamma: 1, exposure: Math.min(1, ease((t - 1.0) / 1.2) * 1.05), sceneA: W / H, scale: 1.02 });
        ctx.save();
        ctx.beginPath();
        const halfBase = 34 * k + open * 0.9 * W;
        const yTop = ay - open * H * 1.6;
        const spreadL = ax - (ax + 0.1 * W) * open * 1.5;
        const spreadR = ax + (W - ax + 0.1 * W) * open * 1.5;
        ctx.moveTo(ax - halfBase * Math.max(0, open - 0.42), H + 2);
        ctx.lineTo(ax - 34 * k - open * 0.9 * W * Math.max(0, open - 0.42), ay);
        ctx.lineTo(spreadL, yTop);
        ctx.lineTo(spreadR, yTop);
        ctx.lineTo(ax + 34 * k + open * W * Math.max(0, open - 0.42), ay);
        ctx.lineTo(ax + halfBase * Math.max(0, open - 0.42), H + 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(river, 0, 0);
        ctx.restore();
        // The wordmark strikes, one letter to each beat.
        letters(ctx, fit.size, wx, wy, (i) => ease((t - (3.3 + i * 0.3)) / 0.16), AMBER);
      } else {
        // Hard cuts inside the letters.
        const seq = [['road', { sceneA: 1.5, scale: 1.05, oy: 0.08 }], ['cinema', { sceneA: 1.5, scale: 1 }], ['moon', { sceneA: 1.5, scale: 1, ox: 0.08 }], ['quay', { sceneA: 1.5, scale: 1.1, oy: 0.06 }]];
        const idx = Math.min(3, Math.floor((t - 5.65) / 0.49));
        const [n, o] = seq[idx];
        const c = off(W, H);
        c.getContext('2d').drawImage(still(W, H, n, { cell: cell * 0.82, color: AMBER, ground: null, gamma: 0.8, floor: 0.36, ...o }), 0, 0);
        const x = c.getContext('2d');
        x.globalCompositeOperation = 'destination-in';
        x.fillStyle = '#000';
        x.font = fit.size + 'px "Six Caps"';
        x.fillText('MARGEM', wx, wy);
        ctx.drawImage(c, 0, 0);
      }
      return;
    }
    // Lock-up on the signal colour, printed.
    const close = t > 9.45 ? ease((t - 9.45) / 0.4) : 0;
    ctx.save();
    if (close > 0) {
      const hh = (H / 2) * (1 - close);
      ctx.beginPath(); ctx.rect(0, H / 2 - hh, W, hh * 2); ctx.clip();
    }
    ctx.fillStyle = AMBER; ctx.fillRect(0, 0, W, H);
    const lock = metrics(ctx, H * 0.86);
    const sizeL = lock.size * 0.82;
    const capL = H * 0.86 * 0.82;
    const lx = 44 * k, ly = H / 2 + capL / 2;
    ctx.font = sizeL + 'px "Six Caps"'; ctx.fillStyle = INK;
    ctx.fillText('MARGEM', lx, ly);
    const col = lx + lock.width * 0.82 + 40 * k;
    const bs = (px) => `800 ${px * k}px "Big Shoulders Display"`;
    if (t > 7.95) {
      const lines = [[bs(134), '12.º', 0], [bs(40), 'Festival de', 56], [bs(40), 'Cinema', 40], [bs(40), 'de Alvarim', 40]];
      let y = H / 2 - capL / 2 + 96 * k;
      for (const [font, s, dy] of lines) { ctx.font = font; y += dy * k; ctx.fillText(s, col, y); }
    }
    if (t > 8.3) {
      const b = H / 2 + capL / 2;
      ctx.font = bs(40); ctx.fillText('3–11 Outubro', col, b - 92 * k); ctx.fillText('2025', col, b - 52 * k);
      ctx.font = `700 ${24 * k}px "Archivo"`;
      ctx.fillText('84 filmes, 4 salas', col, b);
    }
    ctx.restore();
  };
})();
