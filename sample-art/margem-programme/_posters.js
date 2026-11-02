// The five section posters. Every poster prints in two inks.
window.POSTERS = {
  competition: { scene:'quay', section:'Competição', sub:'Competition<br>22 first and second features', beam:'polygon(0 0,100% 0,100% 58%,62% 100%,26% 100%,0 66%)', alt:false, ox:-0.02, oy:0.05, scale:1.18 },
  crossings: { scene:'river', section:'Travessias', sub:'Crossings<br>12 films on the moving ferry', beam:'polygon(0 0,100% 0,100% 100%,54% 100%,0 40%)', alt:true, ox:0.12, oy:0.08, scale:1.4 },
  midnights: { scene:'road', section:'Meia-Noite', sub:'Midnights<br>9 films, last ferry 00:40', beam:'polygon(0 0,100% 0,100% 44%,70% 100%,30% 100%,0 44%)', alt:false, ox:0.04, oy:0.1, scale:1.2 },
  openair: { scene:'moon', section:'Ar Livre', sub:'Open Air<br>9 nights in the Customs Garden', beam:'polygon(0 0,100% 0,100% 40%,46% 100%,0 100%)', alt:true, ox:0.06, oy:0.1, scale:1.28 },
  archive: { scene:'cinema', section:'Arquivo', sub:'Archive<br>32 restorations and newsreels', beam:'polygon(0 0,100% 0,100% 100%,38% 100%,0 62%)', alt:false, ox:0, oy:0.08, scale:1.08 }
};
window.makePoster = function (key, widthPx, dpr = 2) {
  const p = window.POSTERS[key];
  const el = document.createElement('div');
  el.className = 'poster' + (p.alt ? ' alt' : '');
  el.style.width = widthPx + 'px';
  const H = widthPx * 1.4, m = widthPx * 0.04;
  el.innerHTML = `
    <canvas></canvas>
    <div class="head"><span>12.º Festival de Cinema<br>de Alvarim</span><span>3–11 Outubro 2025<br>Rio Sorna</span><span>84 filmes<br>4 salas, 9 dias</span></div>
    <div class="section"><b>${p.section}</b><i>${p.sub}</i></div>
    <svg class="wordsvg" width="${widthPx}" height="${H}" viewBox="0 0 ${widthPx} ${H}" style="position:absolute;left:0;top:0"><text font-family="Six Caps" fill="currentColor">MARGEM</text></svg>`;
  el._draw = () => {
    const top = widthPx * 0.115;
    const stillH = H * 0.385;
    const c = el.querySelector('canvas');
    c.width = widthPx * dpr; c.height = stillH * dpr;
    c.style.height = stillH + 'px'; c.style.top = top + 'px';
    c.style.clipPath = p.beam;
    window.HT.halftone(c, p.scene, { cell: Math.max(4.4, widthPx * dpr * 0.0072), color:'#ffb81c', ground:'#0d0c0a', scale:p.scale, ox:p.ox, oy:p.oy, gamma:1.02 });
    // Fit the wordmark to the measure, sitting on the bottom margin.
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.font = '100px "Six Caps"';
    const mt = ctx.measureText('MARGEM');
    const ink = mt.actualBoundingBoxRight + mt.actualBoundingBoxLeft;
    const size = (100 * (widthPx - 2 * m)) / ink;
    const cap = (mt.actualBoundingBoxAscent * size) / 100;
    const t = el.querySelector('text');
    t.setAttribute('font-size', size);
    t.setAttribute('x', m + (mt.actualBoundingBoxLeft * size) / 100);
    t.setAttribute('y', H - m);
    el.querySelector('.section').style.bottom = m + cap + widthPx * 0.034 + 'px';
  };
  return el;
};
