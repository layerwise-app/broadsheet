// The Salt Library: the twelve jackets, drawn as SVG on a 516 × 792 unit front
// panel (4 units = 1 mm; the book is 129 × 198 mm). Everything prints as two
// spot inks on one uncoated stock, so inks multiply over the stock and each other.
const INK = { black:'#1e1b18', harbour:'#143d6b', vermilion:'#e3401b', ochre:'#e6a418', green:'#1f6a49', rose:'#f28f80', sky:'#6db7d2', oxide:'#8e2f16' };
const INKNAME = { black:'Ostra Black', harbour:'Harbour Blue', vermilion:'Signal Vermilion', ochre:'Salt Ochre', green:'Net Green', rose:'Pan Rose', sky:'Low Sky', oxide:'Hull Oxide' };
const STOCK = { kraft:'#c9a87b', bone:'#efe7d3' };
const FONT_T = "'Besley',serif", FONT_S = "'Familjen Grotesk',sans-serif";

const BOOKS = [
 { n:1, l:['The Tide','Clerk'], a:'Amaro Seixal', stock:'bone', A:'harbour', B:'ochre', mm:20, pp:212, lang:'Portuguese', tr:'Helen Marchbank', yr:1958, flood:false, spine:'A',
   blurb:'For thirty-one years Evaristo has written down the height of the water at the port of Vila Sardão. When the ministry replaces his ledgers with an automatic gauge, he keeps recording anyway, and the two sets of figures begin to disagree.',
   bio:'Amaro Seixal (1911–1979) worked for the Portuguese hydrographic service until his dismissal in 1961. He published four novels.' },
 { n:2, l:['Salt Pans','at Noon'], a:'Idalina Furtado', stock:'bone', A:'black', B:'rose', mm:17, pp:168, lang:'Portuguese', tr:'Rui Calder', yr:1949, spine:'A',
   blurb:'One summer in the pans of Aldeia da Marinha, told hour by hour by the women who rake them. A marriage is arranged, a dyke is breached, and nobody stops work.',
   bio:'Idalina Furtado (1920–2003) taught school in the Sado estuary. This was her only novel, withdrawn from sale within a year of publication.' },
 { n:3, l:['Nets for the','Widow Brava'], a:'Djamila Tavares Lopes', stock:'kraft', A:'green', B:'vermilion', mm:24, pp:288, lang:'Cape Verdean Creole', tr:'Ana Fortes & Paul Whitlow', yr:1966, spine:'A',
   blurb:'Every boat on the island owes Nha Brava for its nets, and every man who owes her has gone to America. She sets out, at sixty-four, to collect.',
   bio:'Djamila Tavares Lopes (1928–1994) wrote in Creole when no press on the islands would set it. The manuscript circulated by hand for nine years.' },
 { n:4, l:['The Keeperless','Light'], a:'Xoán Bermúdez Rial', stock:'bone', A:'black', B:'ochre', mm:26, pp:304, lang:'Galician', tr:'Marta Doyle', yr:1953, flood:true, spine:'B',
   blurb:'The lamp on Illa Sagres still turns, though its keeper left the island in the autumn of 1936 and nobody will say who winds it. A novel about what a village chooses not to ask.',
   bio:'Xoán Bermúdez Rial (1904–1971) was a ship’s purser and an exile in Montevideo. He wrote in Galician for a readership he did not expect to meet.' },
 { n:5, l:['Ribs of the','Santa Clara'], a:'Henrique Valadão', stock:'kraft', A:'vermilion', B:'harbour', mm:31, pp:416, lang:'Portuguese', tr:'Helen Marchbank', yr:1961, spine:'B',
   blurb:'A wooden cod schooner takes four years to build and one long novel to describe. Valadão follows the yard at Gafanha from the laying of the keel to the launch nobody attends.',
   bio:'Henrique Valadão (1908–1985) trained as a shipwright. He is the only Portuguese novelist of his generation to have drawn his own lines plans.' },
 { n:6, l:['A Table','for Eleven'], a:'Olinda Morais', stock:'bone', A:'vermilion', B:'black', mm:19, pp:196, lang:'Portuguese', tr:'Rui Calder', yr:1957, spine:'A',
   blurb:'A family sits down to Sunday lunch in Coimbra with one chair removed. Across eleven courses and eleven chapters, each of them explains why the absent brother is not to be mentioned.',
   bio:'Olinda Morais (1917–1998) wrote for women’s magazines under six names. *A Table for Eleven* is the only book she signed.' },
 { n:7, l:['The Year','of Ash'], a:'Baltasar Évora', stock:'kraft', A:'black', B:'vermilion', mm:22, pp:244, lang:'Cape Verdean Creole', tr:'Ana Fortes', yr:1964, flood:false, spine:'A',
   blurb:'The mountain on Fogo opens in the first week of the novel and does not close until the last. Évora writes the eruption as a village’s accounts: what was owed, what was buried, what was dug up.',
   bio:'Baltasar Évora (1922–1989) kept the parish register at São Lourenço. His two novels were printed in Dakar.' },
 { n:8, l:['Low Water','at Arnela'], a:'Rosalía Outeiro', stock:'kraft', A:'green', B:'black', mm:18, pp:176, lang:'Galician', tr:'Marta Doyle', yr:1951, spine:'A',
   blurb:'Twice a month the ría at Arnela drains far enough to walk to the wreck, and a girl and her grandfather go out with a bucket. A short book about how little there is to salvage.',
   bio:'Rosalía Outeiro (1913–1990) was a shellfish inspector at Cambados and a contributor to the Galician reviews of the 1930s.' },
 { n:9, l:['The Sardine','Almanac'], a:'Teodoro Pinhal', stock:'kraft', A:'harbour', B:'vermilion', mm:21, pp:228, lang:'Portuguese', tr:'Paul Whitlow', yr:1955, spine:'B',
   blurb:'Twelve chapters, one for each month of a canning town’s year, with a recipe and a death in each. The foreman’s wife has the best lines. The factory has the last word.',
   bio:'Teodoro Pinhal (1915–1977) was a labour inspector in Matosinhos. His reports were suppressed; his novel, oddly, was not.' },
 { n:10, l:['Morna for a','Closed Port'], a:'Eugénia Sena', stock:'bone', A:'harbour', B:'rose', mm:23, pp:260, lang:'Cape Verdean Creole', tr:'Ana Fortes & Paul Whitlow', yr:1969, spine:'B',
   blurb:'The port of Mindelo loses its coaling trade and the singers lose their sailors. Sena wrote the novel in the metre of the songs, and Fortes and Whitlow have kept it.',
   bio:'Eugénia Sena (1931–2011) sang in the bars of Mindelo before she wrote about them. She published one novel and recorded nothing.' },
 { n:11, l:['Seven Windows','on Rua do Sal'], a:'Clara Nogueira Bento', stock:'kraft', A:'harbour', B:'vermilion', mm:25, pp:296, lang:'Portuguese', tr:'Helen Marchbank', yr:1959, spine:'A',
   blurb:'A boarding house in Setúbal has seven windows on the street and a police informer behind one of them. Each lodger narrates in turn, and each is sure it is someone else.',
   bio:'Clara Nogueira Bento (1919–1996) ran a boarding house in Setúbal from 1942. She said she had invented nothing but the ending.' },
 { n:12, l:['Washing Day','on Maio'], a:'Zeferino Andrade', stock:'kraft', A:'harbour', B:'vermilion', mm:20, pp:204, lang:'Cape Verdean Creole', tr:'Ana Fortes', yr:1962, spine:'B',
   blurb:'On the island of Maio the whole village can read a household from its line: who has come home, who has been ill, who no longer sleeps there. Andrade’s narrator reads them all, and then hangs out something of her own.',
   bio:'Zeferino Andrade (1926–1992) was a salt-boat captain and a bachelor. Nobody on Maio has explained how he knew what he knew.' },
];
BOOKS.forEach(b => { b.id = String(b.n).padStart(2,'0'); b.title = b.l.join(' ');
  const base = '978989994' + String(b.n).padStart(2,'0') + '0';
  // 978 989 994 NN 0 + check digit
  const d = base.split('').map(Number); let s=0; d.forEach((x,i)=>s+=x*(i%2?3:1));
  b.ean = base + ((10-s%10)%10);
});

function rng(seed){ return () => { seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
const f1 = v => Math.round(v*10)/10;

// Paper: a flat stock with its fibres.
function paper(stock,w,h,seed){
  const r=rng(seed), kraft=stock==='kraft', n=Math.round((kraft?260:80)*(w*h)/(516*792));
  let o=`<rect width="${w}" height="${h}" fill="${STOCK[stock]}"/>`;
  for(let i=0;i<n;i++){ const x=r()*w,y=r()*h,a=r()*Math.PI,l=2+r()*6;
    const col = kraft ? (r()>.45?'#94744e':'#dcc59c') : '#cfbe9a';
    o+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x+Math.cos(a)*l)}" y2="${f1(y+Math.sin(a)*l)}" stroke="${col}" stroke-width=".5" opacity="${kraft?.34:.4}"/>`; }
  return o;
}
const defs = `<defs><filter id="cut" x="-1000" y="-60" width="3000" height="940" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency=".018" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="3.2"/></filter></defs>`;
const inkG = (col,inner,cut=true) => `<g fill="${col}" style="mix-blend-mode:multiply"${cut?' filter="url(#cut)"':''}>${inner}</g>`;

function wave(y,amp,wl,ph,x0=-30,x1=560){ let p=[]; for(let x=x0;x<=x1;x+=8) p.push([x,f1(y+Math.sin((x/wl)*Math.PI*2+ph)*amp)]); return p; }
const pl = pts => pts.map(p=>p.join(',')).join(' L');
function fish(x,y,L,H,flip=false){ const P=(a,b)=>`${f1(flip? x+L-a*L : x+a*L)} ${f1(y+b*H)}`;
  return `<path d="M${P(0,0)} C${P(.2,-.62)} ${P(.6,-.5)} ${P(.8,-.07)} L${P(1,-.46)} L${P(.94,0)} L${P(1,.46)} L${P(.8,.07)} C${P(.6,.5)} ${P(.2,.62)} ${P(0,0)}Z"/>`; }
function boat(x,y,s,rot=0){ return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M-60 0 C-40 34 40 34 62 -6 L40 2 L-60 0Z"/><rect x="-3" y="-92" width="6" height="94"/><path d="M6 -88 L44 -10 L6 -10Z"/></g>`; }
function arch(x,y,w,h){ return `<path d="M${x} ${y+h} V${y+w/2} A${w/2} ${w/2} 0 0 1 ${x+w} ${y+w/2} V${y+h}Z"/>`; }
function rib(cx,top,b,R,t){ const r2=R-t*.55; return `<path d="M${cx-R} ${top} C${cx-R} ${top+(b-top)*.66} ${cx-R*.58} ${b} ${cx} ${b} C${cx+R*.58} ${b} ${cx+R} ${top+(b-top)*.66} ${cx+R} ${top} C${cx+r2} ${top+(b-top)*.62} ${cx+r2*.56} ${b-t} ${cx} ${b-t} C${cx-r2*.56} ${b-t} ${cx-r2} ${top+(b-top)*.62} ${cx-R} ${top}Z"/>`; }

// The laundry runs round the jacket: x < 0 is the spine and back panel.
const LINE1 = x => 232 + 58*Math.pow(Math.sin(((x+620)/1136)*Math.PI*2.5),2);
const LINE2 = x => 468 + 46*Math.pow(Math.sin(((x+790)/1136)*Math.PI*3),2);
function shirt(x,y,s,rot){ return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M-30 0 L-74 16 L-108 84 L-76 100 L-52 66 L-52 190 L52 190 L52 66 L76 100 L108 84 L74 16 L30 0 C18 20 -18 20 -30 0Z"/></g>`; }
function sheet(x,y,w,h,rot,seed){ const r=rng(seed); let d=`M0 0 L${w} 0 L${w} ${h}`; const n=5; for(let i=n;i>=0;i--){ d+=` L${f1(w*i/n)} ${f1(h+(i%2?10:-8)*r())}`; } return `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="${d}Z"/></g>`; }
function trousers(x,y,s,rot){ return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M-46 0 L46 0 L58 210 L12 210 L0 70 L-12 210 L-58 210Z"/></g>`; }
function washingArt(lo,hi){
  const A=[],B=[];
  const on=(fn,x)=>f1(fn(x));
  A.push(shirt(70,on(LINE1,70),.92,-5)); B.push(sheet(170,on(LINE1,170)-4,130,190,3,3)); A.push(trousers(372,on(LINE1,372),.9,4)); B.push(shirt(462,on(LINE1,462),.8,-3));
  B.push(sheet(8,on(LINE2,8)-2,104,170,-2,8)); A.push(sheet(120,on(LINE2,120)-3,156,210,2,5)); B.push(trousers(330,on(LINE2,330),.84,-4)); A.push(shirt(446,on(LINE2,446),.9,4));
  // back panel
  B.push(shirt(-204,on(LINE1,-204),.84,4)); A.push(sheet(-340,on(LINE1,-340)-3,132,180,-2,11)); B.push(trousers(-420,on(LINE1,-420),.8,-3)); A.push(shirt(-540,on(LINE1,-540),.82,3));
  A.push(trousers(-166,on(LINE2,-166),.68,3)); B.push(sheet(-340,on(LINE2,-340)-3,140,160,2,13)); A.push(shirt(-470,on(LINE2,-470),.84,-4)); B.push(sheet(-610,on(LINE2,-610),76,150,3,17));
  const lines = fn => `<path fill="none" stroke-width="3.5" d="M${pl(Array.from({length:Math.ceil((hi-lo)/10)+1},(_,i)=>[lo+i*10,on(fn,lo+i*10)]))}"/>`;
  return {A:A.join(''),B:B.join(''),lines:lines(LINE1)+lines(LINE2)};
}

const ART = {
 1(c){ // tide: a gauge staff and the water climbing it
   let w=''; const levels=[[352,18,250,.4,40],[428,20,300,1.6,38],[500,16,230,2.8,42],[572,20,320,.9,42],[648,14,260,2.1,44]];
   levels.forEach(([y,a,l,p,h])=>{ const t=wave(y,a,l,p), b=wave(y+h,a*.8,l,p+.3).reverse(); w+=`<path d="M${pl(t)} L${pl(b)}Z"/>`; });
   w+=`<path d="M${pl(wave(736,8,240,1))} L560 840 L-30 840Z"/>`;
   let staff=''; for(let i=0;i<9;i++){ staff+=`<rect x="34" y="${196+i*17}" width="${i%3==0?46:24}" height="9"/>`; }
   return inkG(c.b,`<circle cx="356" cy="318" r="118"/>`)+inkG(c.a,w+staff);
 },
 2(c){ // salt pans from the air, with the raked heaps on the far dyke
   const pans=[[[-10,392],[176,376],[160,500],[-10,516]],[[188,375],[398,362],[390,462],[174,500]],[[410,361],[530,356],[530,470],[402,461]],
     [[-10,528],[110,520],[100,664],[-10,690]],[[122,519],[300,492],[296,620],[112,662]],[[312,490],[530,482],[530,600],[308,618]],
     [[-10,702],[96,676],[88,810],[-10,810]],[[108,674],[292,632],[280,810],[100,810]],[[304,630],[530,612],[530,810],[292,810]]];
   let p=pans.map(q=>`<path d="M${q.map(a=>a.join(' ')).join(' L')}Z"/>`).join('');
   let heaps=''; [[56,292,96],[142,262,120],[244,300,84],[330,240,132],[446,282,108]].forEach(([x,y,w])=>heaps+=`<path d="M${x-w/2} 368 L${x} ${y} L${x+w/2} 368Z"/>`);
   let rakes=''; for(let i=0;i<8;i++) rakes+=`<path d="M${122+i*2} ${540+i*14-4} L${298} ${512+i*14-4} L${298} ${512+i*14+3} L${122+i*2} ${540+i*14+3}Z"/>`;
   return inkG(c.b,p+`<circle cx="402" cy="232" r="56"/>`)+inkG(c.a,heaps+`<rect x="-10" y="366" width="540" height="7"/>`+rakes);
 },
 3(c){ // a net gathered to a point, floats on its head rope
   const top=214,H=560,cx=258; const X=(u,v)=>{ const half=292*(1-Math.pow(v,1.5)*.9); return [f1(cx+u*half+Math.sin(v*5)*10*(1-v)),f1(top+v*H+Math.cos(u*2)*-14*(1-v))]; };
   let d=''; for(let s=-1;s<=1;s+=2) for(let u0=-2.4;u0<=2.4;u0+=.21){ let seg=[]; for(let v=0;v<=1.001;v+=.02){ const u=u0+s*v*1.8; if(Math.abs(u)<=1){seg.push(X(u,v));} else if(seg.length){d+=`M${pl(seg)} `;seg=[];} } if(seg.length>1)d+=`M${pl(seg)} `; }
   const rope=[]; for(let u=-1.1;u<=1.1;u+=.05) rope.push(X(u,0));
   let edge=''; [-1,1].forEach(u=>{ const e=[]; for(let v=0;v<=1.001;v+=.02) e.push(X(u,v)); edge+=`<path d="M${pl(e)}" fill="none" stroke="${c.a}" stroke-width="9"/>`; });
   let floats=''; for(let u=-.9;u<=.91;u+=.3){ const [x,y]=X(u,0); floats+=`<circle cx="${x}" cy="${y}" r="17"/>`; }
   const catchF=fish(150,470,240,92,false);
   return inkG(c.b,floats+catchF)+inkG(c.a,`<path d="${d}" fill="none" stroke="${c.a}" stroke-width="6.5"/>${edge}<path d="M${pl(rope)}" fill="none" stroke="${c.a}" stroke-width="9"/><path d="M258 770 L252 800 L266 800Z"/>`);
 },
 4(c){ // the beam, cut out of a black night
   const lamp=[132,520];
   const beam=`<path d="M${lamp[0]} ${lamp[1]} L560 196 L560 640Z"/><path d="M${lamp[0]} ${lamp[1]} L-30 440 L-30 566Z"/>`;
   const inner=`<path d="M${lamp[0]} ${lamp[1]} L560 300 L560 470Z"/>`;
   const tw=(y0,y1)=>{ const L=y=>112-(y-528)*18/156, R=y=>152+(y-528)*18/156; return `<path d="M${f1(L(y0))} ${y0} L${f1(R(y0))} ${y0} L${f1(R(y1))} ${y1} L${f1(L(y1))} ${y1}Z"/>`; };
   const tower=tw(528,578)+tw(604,638)+tw(664,684);
   let sea=''; [[690,3],[706,4],[724,5]].forEach(([y,h],i)=>{ const t=wave(y,3,120+i*40,i), b=wave(y+h,3,120+i*40,i+.1).reverse(); sea+=`<path d="M${pl(t)} L${pl(b)}Z"/>`; });
   return inkG(c.a,`<rect x="-20" y="-20" width="560" height="840"/>`,false)
     +`<g fill="${c.s}" filter="url(#cut)">${beam}${tower}<circle cx="${lamp[0]}" cy="${lamp[1]-8}" r="20"/></g>`
     +inkG(c.b,inner)
     
     +`<g fill="${c.s}" filter="url(#cut)">${sea}</g>`;
 },
 5(c){ // a schooner's frames seen from the stem
   let r=''; const set=[[238,214,724,40],[192,276,664,34],[148,340,606,30],[106,404,552,26],[66,462,506,22]];
   set.forEach(([R,t,b,w])=>r+=rib(258,t,b,R,w));
   let water=`<path d="M${pl(wave(628,12,300,.6))} L560 840 L-30 840Z"/>`;
   return inkG(c.a,r+`<rect x="250" y="196" width="16" height="312"/>`)+inkG(c.b,water);
 },
 6(c){ // Sunday lunch from above: twelve places, eleven laid
   const T=[150,366]; let plates='',dots='',chairs=''; const ys=[262,352,442,532,622,712];
   ys.forEach((y,i)=>{ [[T[0]+46,'l'],[T[1]-46,'r']].forEach(([x,side])=>{ if(side==='r'&&i===3) return;
     plates+=`<circle cx="${x}" cy="${y}" r="35"/>`; dots+=`<circle cx="${x}" cy="${y}" r="13"/>`;
     chairs+= side==='l'?`<rect x="${T[0]-48}" y="${y-30}" width="30" height="60"/>`:`<rect x="${T[1]+18}" y="${y-30}" width="30" height="60"/>`; }); });
   const loaf=`<g transform="rotate(90 258 400)">${fish(148,400,220,52)}</g><circle cx="258" cy="600" r="12"/><circle cx="236" cy="640" r="12"/><circle cx="280" cy="640" r="12"/>`;
   return inkG(c.a,`<rect x="${T[0]}" y="196" width="${T[1]-T[0]}" height="640"/>`)
     +`<g fill="${c.s}" filter="url(#cut)">${plates}</g>`+inkG(c.b,dots+chairs+loaf);
 },
 7(c){ // ash falling on a split cone
   const r=rng(44); let dots=''; for(let row=0;row<15;row++){ const y=198+row*26; for(let col=-1;col<15;col++){ const x=col*36+(row%2?18:0)+8; const rad=1.4+row*.62+r()*.6; dots+=`<circle cx="${x}" cy="${y}" r="${f1(rad)}"/>`; } }
   const cone=`<path d="M-30 800 L204 372 L226 398 L252 372 L284 402 L314 370 L546 800Z"/>`;
   const lava=`<path d="M250 378 L276 404 L262 470 L298 532 L270 590 L322 664 L290 800 L208 800 L240 690 L206 612 L246 540 L224 462Z"/>`;
   return inkG(c.a,dots+cone)+`<g fill="${c.s}" filter="url(#cut)">${lava}</g>`+inkG(c.b,lava+`<circle cx="258" cy="300" r="64"/>`);
 },
 8(c){ // ripple sand at low water, and the boat left on it
   let r=''; for(let i=0;i<11;i++){ const y=290+i*42, th=10+i*1.4; const t=wave(y,8+i*.4,360-i*6,i*.9), b=wave(y+th,4+i*.3,360-i*6,i*.9+.5).reverse(); r+=`<path d="M${pl(t)} L${pl(b)}Z"/>`; }
   return inkG(c.a,r)+inkG(c.b,boat(300,420,1.75,-13)+`<rect x="-20" y="196" width="560" height="10"/><rect x="-20" y="216" width="560" height="5"/>`);
 },
 9(c){ // twelve fish, one month each
   const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; let a='',b='',kn='';
   for(let i=0;i<12;i++){ const row=Math.floor(i/2), col=i%2, flip=row%2===1; const x=(col?262:18)+(row%2?-8:8), y=236+row*90; const f=fish(x,y,236,74,flip);
     if(i===6) b+=f; else a+=f;
     const ex=flip? x+236-34 : x+34; const lx=flip? x+236-92 : x+92;
     kn+=`<circle cx="${ex}" cy="${y-6}" r="5"/><text x="${lx}" y="${y+6}" font-family="${FONT_T}" font-weight="700" font-size="17" text-anchor="middle">${M[i]}</text>`;
   }
   return inkG(c.a,a)+inkG(c.b,b)+`<g fill="${c.s}">${kn}</g>`;
 },
 10(c){ // a harbour ring with its mouth barred; five stave lines and one boat
   const cx=258,cy=474,R=232,r=168,ga=.26; const pt=(rad,a)=>[f1(cx+rad*Math.sin(a)),f1(cy+rad*Math.cos(a))];
   const [ox1,oy1]=pt(R,ga),[ox2,oy2]=pt(R,-ga),[ix2,iy2]=pt(r,-ga),[ix1,iy1]=pt(r,ga);
   const ring=`<path d="M${ox1} ${oy1} A${R} ${R} 0 1 0 ${ox2} ${oy2} L${ix2} ${iy2} A${r} ${r} 0 1 1 ${ix1} ${iy1}Z"/>`;
   const bar=`<rect x="${cx-74}" y="${cy+R-40}" width="148" height="20"/>`;
   let stave=''; for(let i=0;i<5;i++) stave+=`<rect x="60" y="${cy-56+i*28}" width="396" height="4"/>`;
   return inkG(c.b,`<circle cx="${cx}" cy="${cy}" r="${r+14}"/>`)+`<g fill="${c.s}" filter="url(#cut)">${stave}</g>`+inkG(c.a,ring+bar+boat(cx+20,cy+22,.92,-4));
 },
 11(c){ // a Setúbal boarding house; one lit window, seven in all
   const wall=`<path d="M-20 262 L150 262 L150 214 L366 214 L366 262 L540 262 L540 820 L-20 820Z"/>`;
   const win=[[58,300],[216,262],[374,300],[58,510],[216,484],[374,510]]; let w=win.map(([x,y])=>arch(x,y,86,166)).join('');
   w+=arch(216,664,86,160);
   const lit=arch(374,510,86,166);
   let rail=''; [[46,474,110],[204,436,110],[362,474,110]].forEach(([x,y,l])=>{ rail+=`<rect x="${x}" y="${y}" width="${l}" height="6"/>`; });
   return inkG(c.a,wall)+`<g fill="${c.s}" filter="url(#cut)">${w}${rail}</g>`+inkG(c.b,lit)
     +inkG(c.a,[58,216,374].map(x=>`<rect x="${x+40}" y="${x===216?300:338}" width="6" height="128"/>`).join('')+`<rect x="98" y="548" width="6" height="128"/><rect x="256" y="522" width="6" height="128"/>`);
 },
 12(c){ const w=washingArt(-30,546); return inkG(c.b,w.B)+inkG(c.a,w.A+`<g stroke="${c.a}">${w.lines}</g>`); },
};

function bookColours(b){ return { a:INK[b.A], b:INK[b.B], s:STOCK[b.stock] }; }

const onInk=(fill,c)=>fill===c.s?'':' style="mix-blend-mode:multiply"';
function foot(b,fill){ const c=bookColours(b); return `<g${onInk(fill,c)} font-family="${FONT_S}" font-weight="600" font-size="13" letter-spacing=".6" fill="${fill}"><text x="34" y="768">The Salt Library</text><text x="482" y="768" text-anchor="end">No. ${b.id}</text></g>`; }
function titleBlock(b,fill){ const [l1,l2]=b.l; const c=bookColours(b); return `<g fill="${fill}"${onInk(fill,c)}><text x="34" y="54" font-family="${FONT_S}" font-weight="600" font-size="19">${b.a}</text><text font-family="${FONT_T}" font-weight="800" font-size="46" letter-spacing="-.6"><tspan x="32" y="106">${l1}</tspan><tspan x="32" y="156">${l2}</tspan></text></g>`; }
const REVERSED_FOOT = new Set([1,4,5,7,11]);
function frontInner(b){ const c=bookColours(b); const reversedTitle = b.flood;
  return paper(b.stock,516,792,b.n*31)+ART[b.n](c)+titleBlock(b,reversedTitle?c.s:c.a)+foot(b,REVERSED_FOOT.has(b.n)?c.s:c.a); }
function front(n){ const b=BOOKS[n-1]; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 516 792" style="display:block;width:100%;height:auto;isolation:isolate">${defs}${frontInner(b)}</svg>`; }

function mark(cx,cy,r,fill,bg){ return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${fill}" stroke-width="${f1(r*.26)}"/><circle cx="${f1(cx+r*.2)}" cy="${f1(cy-r*.18)}" r="${f1(r*.26)}" fill="${fill}"/>`; }
function spineColours(b){ const c=bookColours(b); const bg=b.spine==='A'?c.a:c.b; const light=['ochre','rose','sky'].includes(b.spine==='A'?b.A:b.B); return {bg,fg: light?c.a:c.s, light}; }
function spineInner(b,w){ const {bg,fg}=spineColours(b);
  return `<g style="mix-blend-mode:multiply"><rect x="0" y="0" width="${w}" height="792" fill="${bg}"/></g>
  <g fill="${fg}"><text x="${w/2}" y="58" text-anchor="middle" font-family="${FONT_T}" font-weight="800" font-size="30" letter-spacing="-.5">${b.id}</text>
  <text transform="translate(${w/2} 96) rotate(90)" y="9" font-family="${FONT_T}" font-weight="700" font-size="25">${b.title}</text>
  <text transform="translate(${w/2} 700) rotate(90)" y="6" text-anchor="end" font-family="${FONT_S}" font-weight="600" font-size="17">${b.a}</text></g>
  ${mark(w/2,744,13,fg)}`; }
function spine(n,h){ const b=BOOKS[n-1], w=b.mm*4; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 792" style="display:block;height:100%;width:auto;isolation:isolate">${paper(b.stock,w,792,b.n*7)}${spineInner(b,w)}</svg>`; }

// EAN-13, encoded properly.
function ean(code,x,y,mod=1.5,h=70,fg='#000'){ const L=['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'], G=L.map(s=>s.split('').map(c=>c==='0'?'1':'0').reverse().join('')), R=L.map(s=>s.split('').map(c=>c==='0'?'1':'0').join(''));
  const P=['LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'][+code[0]];
  let bits='101'; for(let i=1;i<=6;i++) bits+=(P[i-1]==='L'?L:G)[+code[i]]; bits+='01010'; for(let i=7;i<=12;i++) bits+=R[+code[i]]; bits+='101';
  let o=''; for(let i=0;i<bits.length;i++) if(bits[i]==='1'){ const guard=i<3||i>91||(i>=45&&i<50); o+=`<rect x="${f1(x+i*mod)}" y="${y}" width="${mod}" height="${guard?h+7:h}" fill="${fg}"/>`; }
  o+=`<text x="${f1(x+47*mod)}" y="${y+h+17}" font-family="${FONT_S}" font-size="12" text-anchor="middle" fill="${fg}" letter-spacing="1.6">${code[0]} ${code.slice(1,7)} ${code.slice(7)}</text>`;
  return o; }

function html(x,y,w,h,fill,style,body){ return `<foreignObject x="${x}" y="${y}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" style="color:${fill};${style}">${body}</div></foreignObject>`; }
const bodyStyle = `font-family:${FONT_T};font-size:17px;line-height:23px;font-weight:400;`;

// Flat jacket: flap | back | spine | front | flap. Width is fixed at 440 mm; the flaps absorb the spine.
function unfoldedInner(n,opts={}){ const b=BOOKS[n-1], c=bookColours(b); const sp=b.mm*4; const flap=(1760-1032-sp)/2; const fg = c.a;
  const backX=flap, spineX=flap+516, frontX=spineX+sp, flap2X=frontX+516; let o=paper(b.stock,1760,792,b.n*91);
  const back = (()=>{ let t='';
    t+=html(backX+34,34,448,190,fg,bodyStyle+'font-size:18px;line-height:24px;font-weight:500;',b.blurb);
    t+=`<g fill="${fg}" font-family="${FONT_S}" font-weight="600" font-size="13" letter-spacing=".6"><text x="${backX+34}" y="768">Ostra Press, Setúbal</text></g>`;
    t+=`<rect x="${backX+318}" y="664" width="164" height="110" fill="${STOCK[b.stock]}"/>`+ean(b.ean,backX+330,672,1.5,66,c.a);
    t+=html(backX+34,676,250,70,fg,`font-family:${FONT_S};font-size:13px;line-height:17px;font-weight:500;`,`Translated from the ${b.lang} by ${b.tr}<br/>Fiction · ${b.pp} pp · €17.50`);
    return t; })();
  let art='';
  if(n===12){ const w=washingArt(-540,540); art=`<g transform="translate(${frontX} 0)">${inkG(c.b,w.B)}${inkG(c.a,w.A+`<g stroke="${c.a}">${w.lines}</g>`)}</g>`; }
  else { art=`<svg x="${frontX}" y="0" width="516" height="792" viewBox="0 0 516 792" overflow="hidden">${ART[n](c)}</svg>`; }
  const panelCover = n===12 ? `<g fill="${STOCK[b.stock]}"><rect x="${flap2X}" y="0" width="${flap}" height="792"/><rect x="0" y="0" width="${flap}" height="792"/></g>` : '';
  o+=art+panelCover;
  o+=`<g transform="translate(${frontX} 0)">${titleBlock(b,b.flood?c.s:c.a)}${foot(b,REVERSED_FOOT.has(b.n)?c.s:c.a)}</g>`;
  o+=back;
  o+=`<g transform="translate(${spineX} 0)">${spineInner(b,sp)}</g>`;
  // flaps
  o+=html(flap2X+30,34,flap-52,500,fg,bodyStyle+'font-size:15.5px;line-height:21px;',`<div style="font:600 13px ${FONT_S};letter-spacing:.6px;margin-bottom:14px">The Salt Library</div><div style="font:500 12.5px/19.5px ${FONT_S}">`+BOOKS.map(x=>`<div style="display:flex;gap:9px${x.n===b.n?';font-weight:700':''}"><span>${x.id}</span><span>${x.title}</span></div>`).join('')+`</div>`);
  o+=`<g transform="translate(${flap2X+30} 0)">${mark(16,750,13,fg)}<text x="42" y="755" font-family="${FONT_S}" font-weight="600" font-size="13" letter-spacing=".6" fill="${fg}">Ostra Press</text></g>`;
  o+=html(30,34,flap-52,560,fg,bodyStyle+'font-size:15.5px;line-height:21px;',`<div style="font:600 13px ${FONT_S};letter-spacing:.6px;margin-bottom:14px">The author</div>${b.bio.replace(/\*(.+?)\*/g,'<i>$1</i>')}<br/><br/>${b.tr.includes('&')?'The translators live':'The translator lives'} in Lisbon and Porto.`);
  o+=`<text x="30" y="755" font-family="${FONT_S}" font-weight="500" font-size="12" fill="${fg}">Jacket: Noor Castellan</text>`;
  // fold lines, flat hairlines
  if(opts.folds!==false) [flap,spineX,frontX,flap2X].forEach(x=>o+=`<line x1="${x}" y1="0" x2="${x}" y2="792" stroke="${fg}" stroke-width=".8" opacity=".35"/>`);
  return o;
}
function unfolded(n){ return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1760 792" style="display:block;width:100%;height:auto;isolation:isolate">${defs}${unfoldedInner(n)}</svg>`; }
