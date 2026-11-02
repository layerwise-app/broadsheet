// The catalogue's binding: a star-and-cross wall with blank conservators'
// infill tiles left where the title goes. Drawn in tile units (100 = one tile).
(function (global) {
  const { C, RNG, Pen, pat, tile, joints } = global.Tiles;

  // Lacunae: blank fills, as a conservator leaves them. [col, row]
  const blanks = new Set();
  for (let c = 1; c < 5; c++) for (let r = 2; r < 4; r++) blanks.add(`${c},${r}`);
  for (let c = 2; c < 6; c++) blanks.add(`${c},6`);

  function front() {
    let s = '';
    let n = 200;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 6; c++) {
        n += 11;
        if (blanks.has(`${c},${r}`)) {
          const rng = RNG(n);
          const p = new Pen(n);
          p.raw(`<rect width="100" height="100" fill="${C.bones[[1, 2, 5][Math.floor(rng() * 3)]]}"/>`);
          s += `<svg x="${c * 100}" y="${r * 100}" width="100" height="100" viewBox="0 0 100 100">${p}</svg>`;
        } else {
          const rng = RNG(n + 3);
          s += tile(c * 100, r * 100, 100, n, (p) => pat.star(p), { chipCount: rng() < 0.1 ? 1 : 0 });
        }
      }
    }
    s += joints(6, 8, 100, C.joint, 0.7);
    s += `<text x="116" y="292" font-family="'Cormorant Garamond', serif" font-weight="500" font-size="112" letter-spacing="-2" fill="${C.d}">Blue</text>`;
    s += `<text x="116" y="384" font-family="'Cormorant Garamond', serif" font-weight="500" font-size="112" letter-spacing="-2" fill="${C.d}">Hours</text>`;
    s += `<text x="218" y="640" font-family="'EB Garamond', serif" font-style="italic" font-size="19.5" fill="${C.d}">Five Centuries of Tin-Glaze</text>`;
    s += `<text x="218" y="668" font-family="'Hanken Grotesk', sans-serif" font-weight="600" font-size="9.4" letter-spacing="1.1" fill="${C.d}">MUSEU DA RIBEIRA, LISBOA</text>`;
    return s;
  }

  function back() {
    let s = '';
    let n = 900;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 6; c++) {
        n += 13;
        if (c === 1 && r === 1) {
          // The one tile left on the back: star and cross, chipped.
          s += tile(c * 100, r * 100, 100, n, (p) => pat.star(p), { chipCount: 1 });
        } else {
          const rng = RNG(n);
          const p = new Pen(n);
          p.raw(`<rect width="100" height="100" fill="${C.bones[[1, 2, 5][Math.floor(rng() * 3)]]}"/>`);
          s += `<svg x="${c * 100}" y="${r * 100}" width="100" height="100" viewBox="0 0 100 100">${p}</svg>`;
        }
      }
    }
    s += joints(6, 8, 100, C.joint, 0.7);
    const lines = [
      'Between 1498 and 1998 the workshops of the',
      'Tagus painted more wall than any other school',
      'of ceramics in Europe. Three hundred and six',
      'objects from thirty-one lenders, in the first',
      'survey to read their cobalt as a material record.'
    ];
    lines.forEach((text, i) => {
      s += `<text x="118" y="${328 + i * 27}" font-family="'EB Garamond', serif" font-size="19" fill="${C.d}">${text}</text>`;
    });
    const small = [
      'Edited by Inês Valadão and Tobias Reuter',
      'With essays by Marta Quintela, Oluwaseun Adeyi,',
      'Henrik Vos and Beatriz Almoster',
      '416 pages, 212 plates, 240 × 320 mm'
    ];
    small.forEach((text, i) => {
      s += `<text x="118" y="${496 + i * 17}" font-family="'Hanken Grotesk', sans-serif" font-weight="500" font-size="9.6" letter-spacing=".15" fill="${C.d}">${text}</text>`;
    });
    // Barcode: flat bars, hand set, on the bottom tile.
    const r = RNG(9786);
    let bx = 418;
    while (bx < 546) {
      const w = 1 + Math.floor(r() * 3);
      s += `<rect x="${bx}" y="690" width="${w}" height="58" fill="${C.d}"/>`;
      bx += w + 1 + Math.floor(r() * 3);
    }
    s += `<text x="418" y="764" font-family="'Hanken Grotesk', sans-serif" font-weight="500" font-size="9" letter-spacing=".7" fill="${C.d}">ISBN 978-972-0-41607-3</text>`;
    s += `<text x="118" y="764" font-family="'Hanken Grotesk', sans-serif" font-weight="600" font-size="9.4" letter-spacing="1.1" fill="${C.d}">MUSEU DA RIBEIRA, LISBOA</text>`;
    return s;
  }

  function spine() {
    // 40 units wide, 800 tall.
    return `<rect width="40" height="800" fill="${C.d}"/>
      <text transform="translate(13 40) rotate(90)" font-family="'Cormorant Garamond', serif" font-weight="500" font-size="28" fill="${C.bones[0]}">Blue Hours</text>
      <text transform="translate(13.5 200) rotate(90)" font-family="'EB Garamond', serif" font-style="italic" font-size="15" fill="${C.bones[0]}">Five Centuries of Tin-Glaze</text>
      <text transform="translate(15 632) rotate(90)" font-family="'Hanken Grotesk', sans-serif" font-weight="600" font-size="8.6" letter-spacing="1" fill="${C.bones[0]}">MUSEU DA RIBEIRA</text>`;
  }

  global.Book = { front, back, spine };
})(window);
