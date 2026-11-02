window.artReady = false;
const I = {
 jan:{no:733,pt:'Janeiro',en:'January',bg:'#E9E2D0',fg:'#16181A',a:'#2456A6',t:'The Lighthouse Keepers’ Union',by:'Tomás Aldeia',m:['Letters from Cape Espichel','A new chart of the Tagus bar']},
 feb:{no:734,pt:'Fevereiro',en:'February',bg:'#1C3553',fg:'#EDE6D3',a:'#E8B53C',t:'What the Tide Tables Leave Out',by:'Harriet Lowe',m:['The moon, audited','Fiction by Graça Monteverde']},
 mar:{no:735,pt:'Março',en:'March',bg:'#D5DDD3',fg:'#12211F',a:'#2F6E67',t:'Cod: A Reckoning',by:'Dário Penha',m:['Five centuries of salted debt','Portfolio: net menders of Peniche']},
 apr:{no:736,pt:'Abril',en:'April',bg:'#E8B53C',fg:'#1B1A16',a:'#F3ECD9',t:'Who Owns the Sandbar?',by:'Lídia Ferrão',m:['Property law at low water','On reading a pilot book in bed']},
 may:{no:737,pt:'Maio',en:'May',bg:'#EFE8D6',fg:'#15171A',a:'#D1361F',t:'Rope: A History<br>of Holding On',by:'Inês Valadão',m:['The last ropewalk in Setúbal','Why sailors stopped singing']},
 jun:{no:738,pt:'Junho',en:'June',bg:'#F2EEE4',fg:'#1B1F2E',a:'#6F8CA8',t:'Salt Is a Political Substance',by:'Rui Sotomaior',m:['The pans at Castro Marim','A tax that started three wars']},
 jul:{no:739,pt:'Julho',en:'July',bg:'#E4572E',fg:'#14202B',a:'#F3ECD9',t:'The Last Ferry to Cacilhas',by:'Inês Valadão',m:['Pilots of the Sado, all over sixty','The grammar of knots']},
 aug:{no:740,pt:'Agosto',en:'August',bg:'#BFD8D2',fg:'#12211F',a:'#EE5A24',t:'Against Swimming',by:'Marta Quental',m:['A polemic in eleven strokes','Beach reading, reread']},
 sep:{no:741,pt:'Setembro',en:'September',bg:'#EDE6D3',fg:'#201A17',a:'#7C2D2A',t:'The Sailmaker’s Arithmetic',by:'Harriet Lowe',m:['What a seam can carry','Notes from the Alfama loft']},
 oct:{no:742,pt:'Outubro',en:'October',bg:'#18302E',fg:'#E9E4D2',a:'#7FA89C',t:'A Census of Drowned Villages',by:'Dário Penha',m:['Under the reservoir at Alqueva','The priest who kept the register']},
 nov:{no:743,pt:'Novembro',en:'November',bg:'#D9D4C4',fg:'#121212',a:'#B3201A',t:'Storm Names, and Who Chooses Them',by:'Lídia Ferrão',m:['Inside the naming committee','The gale of 1941, retold']},
 dec:{no:744,pt:'Dezembro',en:'December',bg:'#2A3A6B',fg:'#F0EAD8',a:'#D98F2B',t:'The Anchor Problem',by:'Tomás Aldeia',m:['Holding ground, a philosophy','The year in letters']}
};
const A='var(--a)',F='var(--fg)',B='var(--bg)';
const poly=(p,c)=>`<polygon points="${p}" fill="${c}"/>`;
const scallop=(y,n,h,c,x0=0,w=100,bottom=80)=>{const s=w/n;let d=`M${x0},${y}`;for(let i=0;i<n;i++){d+=`q${s/2},${-h} ${s},0`}d+=`V${bottom}H${x0}Z`;return `<path d="${d}" fill="${c}"/>`};
const ART={
 jan:()=>poly('50,20 100,3 100,27',A)+poly('44.5,17 54.5,17 59,70 40,70',F)+poly('43.4,30 55.6,30 56.2,37 42.8,37',B)+poly('42.1,44 56.9,44 57.5,51 41.5,51',B)+poly('45,8 54,8 55.5,15.6 43.5,15.6',F)+`<path d="M44,8 Q49.5,1.5 55,8Z" fill="${F}"/>`+poly('47.6,10 51.4,10 51.4,14.6 47.6,14.6',A)+scallop(70,7,4,A),
 feb:()=>`<circle cx="70" cy="22" r="17" fill="${A}"/><circle cx="62.5" cy="19" r="15.5" fill="${B}"/>`+[32,41,50,59,68].map((y,i)=>scallop(y,[5,7,5,7,5][i],5.5-i*.35,i%2?A:F,0,100)).join(''),
 mar:()=>`<path d="M5,40 C17,17 54,12 76,35 L95,17 L90,40 L96,63 L76,45 C54,68 18,64 5,40Z" fill="${F}"/>`+poly('33,19 44,7 56,19',A)+poly('58,23 66,14 70,31',A)+poly('34,60 42,72 52,60',A)+`<circle cx="16" cy="35" r="2.6" fill="${B}"/><path d="M26,24 Q33,40 26,56" fill="none" stroke="${B}" stroke-width="1.5"/><path d="M28,40 Q50,34 76,40" fill="none" stroke="${A}" stroke-width="1.4"/><path d="M9,47 q-1,6 3,9" fill="none" stroke="${F}" stroke-width="1"/>`,
 apr:()=>poly('0,58 12,52 29,50 51,44 70,46 86,51 100,50 100,66 0,66',A)+[[24,'#1B1A16',22],[50,'#E4572E',14],[74,'#1C3553',26]].map(([x,c,top])=>poly(`${x},${top} ${x+1},${top} ${x+1},50 ${x},50`,F)+poly(`${x+1},${top} ${x+13},${top+4.5} ${x+1},${top+9}`,c)).join('')+[68,73].map((y,i)=>`<path d="M${i*5},${y}${' l4,-2 l4,2'.repeat(12)}" fill="none" stroke="${F}" stroke-width="1.2"/>`).join(''),
 may:()=>{
  // A figure-eight knot from its parametric form. Runs alternate over and under.
  const k=10.4,cx=50,cy=43,w=6.6,h=9.6;
  const P=t=>{const r=2+Math.cos(2*t);return [cx+k*r*Math.sin(3*t),cy-k*r*Math.cos(3*t)]};
  const bez=(a,b,c,d,n)=>{const o=[];for(let i=0;i<=n;i++){const u=i/n,v=1-u;o.push([v*v*v*a[0]+3*v*v*u*b[0]+3*v*u*u*c[0]+u*u*u*d[0],v*v*v*a[1]+3*v*v*u*b[1]+3*v*u*u*c[1]+u*u*u*d[1]])}return o};
  const top=P(0);
  const runs=[];const N=8,S=80;
  for(let j=0;j<N;j++){const o=[];for(let i=0;i<=S;i++)o.push(P((j+i/S)*Math.PI/4));runs.push({over:j%2===0,pts:o})}
  const head=bez([-8,31],[10,31],[28,top[1]],top,50),tail=bez(top,[72,top[1]],[92,9],[108,-5],50);
  const d=p=>'M'+p.map(q=>q[0].toFixed(2)+','+q[1].toFixed(2)).join('L');
  const lay=p=>{let out='',acc=0;for(let i=1;i<p.length;i++){const dx=p[i][0]-p[i-1][0],dy=p[i][1]-p[i-1][1],l=Math.hypot(dx,dy);acc+=l;if(acc>=2.1){acc=0;const ux=dx/l,uy=dy/l,nx=-uy,ny=ux;const hw=w/2,sk=1.5;out+=`<path d="M${(p[i][0]-nx*hw-ux*sk).toFixed(2)},${(p[i][1]-ny*hw-uy*sk).toFixed(2)}L${(p[i][0]+nx*hw+ux*sk).toFixed(2)},${(p[i][1]+ny*hw+uy*sk).toFixed(2)}" stroke="${B}" stroke-width=".36"/>`}}return out};
  const draw=(p,halo)=>(halo?`<path d="${d(p)}" stroke="${B}" stroke-width="${h}" fill="none"/>`:'')+`<path d="${d(p)}" stroke="${A}" stroke-width="${w}" fill="none"/>`+lay(p);
  // the two free ends lie under everything
  let out=draw(head,false)+draw(tail,false);
  runs.filter(r=>!r.over).forEach(r=>out+=draw(r.pts,false));
  runs.filter(r=>r.over).forEach(r=>out+=draw(r.pts,true));
  return out},
 jun:()=>{let s='';const cols=[0,26,50,76,100],rows=[46,56,68,80];for(let r=0;r<3;r++)for(let c=0;c<4;c++){const on=(r*3+c*2)%3;s+=poly(`${cols[c]+.8},${rows[r]+.8} ${cols[c+1]-.8},${rows[r]+.8} ${cols[c+1]-.8},${rows[r+1]-.8} ${cols[c]+.8},${rows[r+1]-.8}`,on==0?F:on==1?A:'none')+(on==2?`<rect x="${cols[c]+.8}" y="${rows[r]+.8}" width="${cols[c+1]-cols[c]-1.6}" height="${rows[r+1]-rows[r]-1.6}" fill="none" stroke="${F}" stroke-width=".5"/>`:'')}return poly('50,6 74,44 26,44',A)+poly('50,6 58,44 44,44',F)+s},
 jul:()=>`<circle cx="77" cy="19" r="12" fill="${A}"/>`+poly('6,44 94,44 88,60 12,60',F)+poly('16,32 80,32 83,44 13,44',A)+poly('24,22 62,22 64,32 22,32',F)+poly('68,12 75,12 75,32 68,32',F)+poly('68,16 75,16 75,20 68,20',A)+[20,28,36,44,52,60,68].map(x=>`<rect x="${x}" y="35.4" width="4.4" height="4.8" fill="${F}"/>`).join('')+[28,36,44,52].map(x=>`<rect x="${x}" y="24.6" width="4" height="3.8" fill="${A}"/>`).join('')+scallop(60,8,3.4,A)+scallop(68,6,3.2,F),
 aug:()=>`<circle cx="50" cy="38" r="26" fill="none" stroke="${F}" stroke-width="15"/><circle cx="50" cy="38" r="26" fill="none" stroke="${A}" stroke-width="15" stroke-dasharray="20.42 20.42" stroke-dashoffset="10.2"/><circle cx="50" cy="38" r="36" fill="none" stroke="${F}" stroke-width=".9" stroke-dasharray="19 9.3"/>`+scallop(55,6,4,B)+scallop(62,8,3.2,F)+scallop(70,6,3,B),
 sep:()=>{const c=[[53,3],[53,62],[92,62]];let s='';const n=7;for(let i=0;i<n;i++){const y0=3+59*i/n,y1=3+59*(i+1)/n,xa=53+39*i/n,xb=53+39*(i+1)/n;s+=poly(`53,${y0} ${xa},${y0} ${xb},${y1} 53,${y1}`.replace(/\s+/g,' '),i%2?A:F)}let t='';for(let i=0;i<5;i++){const y0=14+48*i/5,y1=14+48*(i+1)/5,xa=48-24*i/5,xb=48-24*(i+1)/5;t+=poly(`48,${y0} ${xa},${y0} ${xb},${y1} 48,${y1}`,i%2?F:A)}return s+t+poly('50,0 51.4,0 51.4,70 50,70',F)+poly('14,66 90,66 80,76 22,76',F)},
 oct:()=>{let s=poly('0,74 100,74 100,80 0,80',A);s+=poly('42,44 53,44 53,74 42,74',F)+poly('42,44 47.5,33 53,44',F)+poly('53,56 78,56 78,74 53,74',F)+poly('53,56 65.5,46 78,56',F)+poly('20,60 38,60 38,74 20,74',F)+poly('20,60 29,51 38,60',F)+poly('84,62 96,62 96,74 84,74',F)+poly('84,62 90,56 96,62',F)+`<rect x="46" y="49" width="3" height="6" fill="${B}"/><rect x="62" y="62" width="4" height="6" fill="${B}"/>`;[10,18,26].forEach((y,i)=>{s+=scallop(y,[5,7,6][i],3,'none');s+=`<path d="M0,${y}${[...Array([5,7,6][i])].map(()=>` q${50/[5,7,6][i]},-3 ${100/[5,7,6][i]},0`).join('')}" fill="none" stroke="${A}" stroke-width="1.8"/>`});return s},
 nov:()=>poly('14,0 16,0 16,80 14,80',F)+poly('16,6 56,10 56,38 16,34',A)+poly('28,15.5 44,17 44,29 28,27.5',F)+poly('16,40 56,44 56,72 16,68',A)+poly('28,49.5 44,51 44,63 28,61.5',F)+[12,27,42,57].map((y,i)=>`<path d="M62,${y} q10,-${5-i} 19,0 t17,0" fill="none" stroke="${F}" stroke-width="${2.2-i*.3}"/>`).join(''),
 dec:()=>`<circle cx="50" cy="9" r="5.4" fill="none" stroke="${F}" stroke-width="2.6"/>`+poly('30,16.5 70,16.5 70,20.5 30,20.5',A)+poly('47.4,13.5 52.6,13.5 53,66 47,66',F)+`<path d="M12,42 Q16,70 50,74 Q84,70 88,42 L79,46 L83,50 Q76,62 53,64 L47,64 Q24,62 17,50 L21,46Z" fill="${F}"/>`+poly('12,42 3,54 21,46',A)+poly('88,42 97,54 79,46',A)
};
function cover(key,w,opts={}){
 const c=I[key],h=opts.h||Math.round(w*1.39);
 const fs=w/100;
 const big=opts.ttl||10.4;
 return `<article class="cv" style="font-size:${fs}px;height:${h/fs}em;--bg:${c.bg};--fg:${c.fg};--a:${c.a}">
 <div class="mh" data-fit><span>Halyard</span></div>
 <div class="strap"><span>N.º ${c.no}</span><span>${c.pt} / ${c.en} 2025</span><span>€7,50</span></div>
 <div class="art"><svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid ${opts.fit||'meet'}">${ART[key]()}</svg></div>
 <div class="ttl" style="font-size:${big}em">${c.t}</div>
 <div class="sub"><div class="by">by ${c.by}</div><div class="more">${c.m.join('<br>')}</div></div>
</article>`;
}
function fitMastheads(){
 document.querySelectorAll('[data-fit]').forEach(el=>{
  const span=el.querySelector('span');
  el.style.fontSize='100px';
  const w=span.getBoundingClientRect().width;
  const target=el.getBoundingClientRect().width;
  el.style.fontSize=(100*target/w*0.997)+'px';
 });
}
function done(){document.fonts.load('100px "Abril Fatface"').then(()=>document.fonts.ready).then(()=>{fitMastheads();window.artReady=true})}
