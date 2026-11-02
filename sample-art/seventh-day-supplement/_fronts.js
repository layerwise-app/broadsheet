// The three section fronts. Each is a 1440×1920 page; cover.html shows them small.
function masthead({ no, date, spot, week, price = 'Free with your Sunday Ledger' }) {
  return `
  <div class="abs strip" style="left:40px;right:40px;top:34px"><span>The Northern Ledger</span><span>${date}</span><span>Section 7 of 7</span></div>
  <div class="abs" style="left:40px;right:40px;top:66px;height:3px;background:var(--ink)"></div>
  <div class="abs slab" style="left:40px;top:84px;line-height:.86"><span data-fit="1360">Seventh Day</span></div>
  <div class="abs" style="left:40px;right:40px;top:266px;height:9px;background:var(--ink)"></div>
  <div class="abs" style="left:40px;right:40px;top:279px;height:2px;background:var(--ink)"></div>
  <div class="abs strip" style="left:40px;right:40px;top:294px;font-size:18px"><span>No. ${no}</span><span>${week}</span><span>${price}</span></div>
  <div class="abs" style="left:40px;right:40px;top:324px;height:2px;background:var(--ink)"></div>`;
}
const canvasFor = (el) => {
  const t = layer(1440, 1920, 2);
  el.prepend(t.canvas);
  return t;
};

const Fronts = {
  leek(el) {
    el.innerHTML = masthead({ no: '2,214', date: 'Sunday 15 September 2024', week: 'Inside: gravy, grudges and the 9.40 dread' }) + `
    <div class="abs head" style="left:40px;top:342px;line-height:1"><span data-fit="1360">The great</span></div>
    <div class="abs head" style="left:40px;top:716px;line-height:1"><span data-fit="1360">Leek war</span></div>
    <div class="abs" style="left:418px;width:604px;bottom:36px;background:var(--paper);padding:20px 22px 18px;border:3px solid var(--ink)">
      <p style="font:700 32px/1.14 var(--text);letter-spacing:-.005em">In the back gardens of Aldmouth, men are guarding vegetables with floodlights, tripwires and a dog called Margaret.</p>
      <p class="label" style="margin-top:14px;font-size:15px">Page 8 &nbsp;/&nbsp; Words by Dora Hallam</p>
    </div>
    <div class="abs" style="left:1068px;top:1436px;width:300px;height:300px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;transform:rotate(-8deg)">
      <div class="label" style="font-size:17px">Biggest this year</div>
      <div class="head" style="font-size:84px;line-height:1.02;margin-top:2px">7lb 4oz</div>
      <div class="label" style="font-size:17px;margin-top:2px">And still guarded</div>
    </div>`;
    const t = canvasFor(el);
    const { ctx } = t;
    fitAll(el);
    ctx.fillStyle = SPOT.red;
    ctx.fillRect(0, 700, 1440, 1220);
    // Crossed like duelling swords, roots in the bottom corners.
    leek(t, { x0: 96, y0: 1856, deg: -25, L: 1390, w: 150, pitch: 15, angle: 45, seed: 8 });
    leek(t, { x0: 1344, y0: 1856, deg: -155, L: 1390, w: 150, pitch: 15, angle: 45, seed: 21 });
    ctx.fillStyle = PAPER;
    ctx.fill(star(1218, 1586, 178, 144, 18, 0.1));
  },
  tide(el) {
    el.style.setProperty('--spot', 'var(--blue)');
    el.innerHTML = masthead({ no: '2,215', date: 'Sunday 22 September 2024', week: 'Inside: 40 years of the Aldmouth regatta' }) + `
    <div class="abs head" style="left:40px;top:358px;font-size:400px;line-height:.92"><span data-fit="1360">Who stole</span></div>
    <div class="abs head" style="left:40px;top:758px;font-size:400px;line-height:.92"><span data-fit="1360">the tide?</span></div>
    <div class="abs" style="left:900px;width:500px;bottom:60px;background:var(--paper);padding:20px 22px 18px;border:3px solid var(--ink)">
      <p style="font:700 32px/1.14 var(--text)">Aldmouth paid &pound;4m for a dredger. The harbour has 40cm of water in it and the dredger is aground.</p>
      <p class="label" style="margin-top:14px;font-size:15px">Page 6 &nbsp;/&nbsp; Words by Sam Ouseley</p>
    </div>`;
    const t = canvasFor(el);
    const { ctx } = t;
    fitAll(el);
    // Sky: a solid spot block, thinned to dots toward the horizon.
    ctx.fillStyle = SPOT.blue;
    ctx.fillRect(0, 1190, 1440, 730);
    const sky = layer(1440, 1920, 2);
    sky.ctx.filter = 'blur(70px)';
    sky.ctx.fillStyle = '#000';
    sky.ctx.fillRect(-100, 1000, 1640, 240);
    sky.ctx.fillStyle = '#7a7a7a';
    sky.ctx.fillRect(-100, 1240, 1640, 180);
    // Sun, knocked out flat.
    ctx.fillStyle = PAPER;
    ctx.beginPath(); ctx.arc(420, 1400, 168, 0, 7); ctx.fill();
    // Bands of low cloud cut across the sun.
    ctx.fillStyle = SPOT.blue;
    [[150, 1356, 560, 16], [240, 1404, 500, 10], [100, 1452, 590, 22]].forEach(([x, y, w, h]) => ctx.fillRect(x, y, w, h));
    // Mud: ink dots over paper, heaviest in the foreground.
    const mudShape = cut([[0, 1660], [230, 1648], [520, 1668], [840, 1636], [1120, 1660], [1440, 1630], [1440, 1920], [0, 1920]], 8, 5);
    ctx.fillStyle = PAPER;
    ctx.fill(mudShape);
    const mud = layer(1440, 1920, 2);
    mud.ctx.filter = 'blur(30px)';
    mud.ctx.fillStyle = '#888';
    mud.ctx.fillRect(-50, 1620, 1540, 150);
    mud.ctx.fillStyle = '#222';
    mud.ctx.fillRect(-50, 1780, 1540, 200);
    halftone(t, mud, { pitch: 19, angle: 30, clip: mudShape });
    // The trawler, keeled over on the mud, cut from black paper.
    ctx.save();
    ctx.translate(760, 1600);
    ctx.rotate(-0.17);
    ctx.fillStyle = INK;
    ctx.fill(cut([[-310, -96], [-250, 44], [190, 66], [352, -128], [130, -94], [120, -92], [-180, -86]], 2, 7));
    ctx.fill(cut([[-120, -90], [-120, -226], [62, -226], [62, -90]], 2, 8));
    ctx.fill(cut([[-142, -238], [84, -238], [84, -222], [-142, -222]], 0, 9));
    ctx.fill(cut([[150, -100], [162, -100], [165, -400], [155, -400]], 0, 10));
    ctx.fill(cut([[157, -380], [157, -368], [10, -240], [2, -244]], 0, 11));
    ctx.fill(cut([[163, -382], [165, -370], [342, -126], [332, -122]], 0, 12));
    ctx.fill(cut([[-44, -226], [-44, -340], [-22, -340], [-22, -226]], 0, 13));
    ctx.fillStyle = PAPER;
    [-92, -34, 24].forEach((x) => ctx.fillRect(x, -196, 40, 46));
    ctx.fillRect(-250, -62, 450, 8);
    ctx.fillStyle = SPOT.blue;
    ctx.font = "26px Anton";
    ctx.fillStyle = PAPER;
    ctx.fillText('AM 47  PEGGY ANN', -226, -14);
    ctx.restore();
    // Gulls, one spot of scorn each.
    ctx.strokeStyle = PAPER;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    [[1090, 1290, 30], [1210, 1252, 24], [1000, 1376, 20], [1320, 1336, 26]].forEach(([x, y, s]) => {
      ctx.beginPath(); ctx.moveTo(x - s, y - s * 0.3); ctx.lineTo(x, y); ctx.lineTo(x + s, y - s * 0.4); ctx.stroke();
    });
  },
  bus(el) {
    el.style.setProperty('--spot', 'var(--custard)');
    el.style.background = 'var(--custard)';
    el.innerHTML = masthead({ no: '2,216', date: 'Sunday 29 September 2024', week: 'Inside: the crossword gets harder, sorry' }) + `
    <div class="abs head" style="left:40px;top:344px;line-height:1"><span data-fit="1360">The last bus</span></div>
    <div class="abs head" style="left:40px;top:640px;line-height:1"><span data-fit="1360">to nowhere</span></div>
    <div class="abs" style="left:40px;width:880px;top:1000px;">
      <p style="font:700 44px/1.13 var(--text);letter-spacing:-.005em;text-wrap:balance">Route 47 carried nine passengers a day. On its final Friday we rode with every one of them.</p>
      <p class="label" style="margin-top:16px;font-size:15px">Page 10 &nbsp;/&nbsp; Words by Mina Clough, drawings by Noor Castellan</p>
    </div>
    <div class="abs" style="left:980px;width:420px;top:1006px;border-top:5px solid var(--ink);padding-top:10px">
      <div class="label" style="font-size:15px">Route 47 timetable, Mondays to Saturdays</div>
      <p style="font:400 21px/1.3 var(--text);margin-top:8px">Depart Bank Street 7.14, 9.14, 11.14, 14.14, 17.14. Return when the driver is ready. Sundays: see headline.</p>
    </div>`;
    const t = canvasFor(el);
    const { ctx } = t;
    fitAll(el);
    const ground = 1806;
    // Night, printed as ink dots building down behind the bus.
    const night = layer(1440, 1920, 2);
    night.ctx.filter = 'blur(50px)';
    night.ctx.fillStyle = '#000';
    night.ctx.fillRect(-80, 1500, 1600, 500);
    night.ctx.fillStyle = '#888';
    night.ctx.fillRect(-80, 1360, 1600, 140);
    const nightClip = new Path2D(); nightClip.rect(0, 1240, 1440, 460);
    halftone(t, night, { pitch: 19, angle: 45, clip: nightClip, floor: 0.03 });
    // Road
    ctx.fillStyle = INK;
    ctx.fillRect(0, 1696, 1440, 224);
    ctx.fillStyle = SPOT.custard;
    for (let x = 30; x < 1440; x += 190) ctx.fillRect(x, ground + 50, 110, 11);
    // A bus stop, abandoned.
    ctx.fillStyle = PAPER;
    ctx.fillRect(1320, 1450, 11, ground - 1450);
    ctx.fill(cut([[1266, 1420], [1386, 1420], [1386, 1500], [1266, 1500]], 0, 3));
    ctx.fillStyle = INK;
    ctx.font = "50px Anton";
    ctx.fillText('47', 1302, 1480);
    // Bus side elevation, cut from paper with an ink roof.
    const x0 = 60, y0 = 1294, w = 1190, h = 462;
    ctx.fillStyle = PAPER;
    ctx.fill(cut([[x0 + 16, y0], [x0 + w - 60, y0], [x0 + w, y0 + 86], [x0 + w, y0 + h], [x0, y0 + h], [x0, y0 + 16]], 2, 4));
    ctx.fillStyle = INK;
    ctx.fillRect(x0, y0 + 268, w, 10);
    ctx.fillRect(x0 - 3, y0 + h - 60, w + 6, 64);
    ctx.fillStyle = INK;
    // Windows, ink; nine lit passenger silhouettes reduced to one.
    const win = [];
    for (let i = 0; i < 6; i++) win.push(x0 + 36 + i * 150);
    win.forEach((x) => ctx.fillRect(x, y0 + 62, 136, 158));
    ctx.fillRect(x0 + 950, y0 + 62, 100, 340);   // doors
    ctx.fill(cut([[x0 + 1064, y0 + 62], [x0 + w - 70, y0 + 62], [x0 + w - 18, y0 + 150], [x0 + w - 18, y0 + 268], [x0 + 1064, y0 + 268]], 0, 5));
    ctx.fillStyle = SPOT.custard;
    ctx.fillRect(x0 + 998, y0 + 62, 4, 340);
    // One passenger, in the third window, in custard.
    const px = win[2] + 68, py = y0 + 148;
    ctx.beginPath(); ctx.arc(px, py - 22, 28, 0, 7); ctx.fill();
    ctx.fill(cut([[px - 44, y0 + 220], [px - 40, py + 18], [px + 40, py + 18], [px + 44, y0 + 220]], 0, 6));
    // Destination blind.
    ctx.fillStyle = INK;
    ctx.fillRect(x0 + 36, y0 + 12, 460, 42);
    ctx.fillStyle = PAPER;
    ctx.font = "34px Anton";
    ctx.fillText('47   NOT IN SERVICE AFTER FRIDAY', x0 + 48, y0 + 46);
    ctx.fillStyle = INK;
    ctx.font = "34px Anton";
    ctx.fillText('ALDMOUTH & DISTRICT', x0 + 40, y0 + 322);
    ctx.font = "20px 'Libre Franklin'";
    ctx.fillText('Fare: exact money. Conversation: free.', x0 + 40, y0 + 352);
    // Wheels
    [x0 + 220, x0 + 880].forEach((x) => {
      ctx.fillStyle = SPOT.custard;
      ctx.beginPath(); ctx.arc(x, y0 + h - 4, 92, 0, 7); ctx.fill();
      ctx.fillStyle = INK;
      ctx.beginPath(); ctx.arc(x, y0 + h - 4, 82, 0, 7); ctx.fill();
      ctx.fillStyle = PAPER;
      ctx.beginPath(); ctx.arc(x, y0 + h - 4, 34, 0, 7); ctx.fill();
      ctx.fillStyle = INK;
      for (let i = 0; i < 6; i++) { const a = i * 1.047; ctx.beginPath(); ctx.arc(x + 20 * Math.cos(a), y0 + h - 4 + 20 * Math.sin(a), 3.4, 0, 7); ctx.fill(); }
    });
  }
};
