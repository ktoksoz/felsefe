const fs=require('fs');
const B={w:-12,e:126,s:2,n:60};
const out=process.argv[2];
function dp(pts,tol){ if(pts.length<3)return pts; const keep=new Uint8Array(pts.length); keep[0]=keep[pts.length-1]=1;
 const st=[[0,pts.length-1]]; while(st.length){const [a,b]=st.pop(); let md=0,mi=-1; const [ax,ay]=pts[a],[bx,by]=pts[b]; const dx=bx-ax,dy=by-ay,L=Math.hypot(dx,dy)||1e-9;
 for(let i=a+1;i<b;i++){const d=(dx||dy)?Math.abs(dy*pts[i][0]-dx*pts[i][1]+bx*ay-by*ax)/L:Math.hypot(pts[i][0]-ax,pts[i][1]-ay); if(d>md){md=d;mi=i;}} if(md>tol){keep[mi]=1;st.push([a,mi],[mi,b]);}}
 return pts.filter((_,i)=>keep[i]);}
const r2=v=>Math.round(v*100)/100;
function clampRing(r){ const o=[]; for(const [x,y] of r){const p=[r2(Math.max(B.w-1,Math.min(B.e+1,x))),r2(Math.max(B.s-1,Math.min(B.n+1,y)))]; const l=o[o.length-1]; if(!l||l[0]!==p[0]||l[1]!==p[1])o.push(p);} return o;}
const inB=r=>r.some(([x,y])=>x>=B.w&&x<=B.e&&y>=B.s&&y<=B.n);
function polys(g){return g.type==='Polygon'?[g.coordinates]:g.type==='MultiPolygon'?g.coordinates:[];}
function lines(g){return g.type==='LineString'?[g.coordinates]:g.type==='MultiLineString'?g.coordinates:[];}
const land=JSON.parse(fs.readFileSync('ne_50m_land.geojson'));
const L=[]; for(const f of land.features) for(const p of polys(f.geometry)){ const r=p[0]; if(!inB(r))continue; const c=dp(clampRing(r),0.06); if(c.length>=4) L.push(c);}
const lakes=JSON.parse(fs.readFileSync('ne_50m_lakes.geojson'));
const K=[]; for(const f of lakes.features) for(const p of polys(f.geometry)){ const r=p[0]; if(!inB(r))continue; if((f.properties.scalerank??9)>3)continue; const c=dp(clampRing(r),0.05); if(c.length>=4) K.push(c);}
const want=/^(Nile|Tigris|Euphrates|Indus|Ganges|Huang|Yangtze|Chang|Danube|Amu Darya|Syr Darya|Brahmaputra|Kızıl|Kizil|Menderes|Meander|Büyük Menderes|Rhône|Rhine|Po|Tiber|Jordan)/i;
const rv=JSON.parse(fs.readFileSync('ne_50m_rivers_lake_centerlines.geojson'));
const R=[]; const names=new Set();
for(const f of rv.features){ const n=f.properties.name||f.properties.name_en||''; if(!want.test(n)&&(f.properties.scalerank??9)>2)continue; for(const l of lines(f.geometry)){ if(!inB(l))continue; const c=dp(clampRing(l),0.04); if(c.length>=2){R.push(c);names.add(n);} }}
const enc=a=>a.map(r=>r.flat());
const js=`/* Harita verisi: Natural Earth 1:50m (kamu malı, naturalearthdata.com), kırpılmış ve sadeleştirilmiş.
   Biçim: her halka [boylam, enlem, boylam, enlem, ...] */
window.HARITA = ${JSON.stringify({sinir:B,kara:enc(L),gol:enc(K),nehir:enc(R)})};\n`;
fs.writeFileSync(out,js); console.log('land',L.length,'lakes',K.length,'rivers',R.length,[...names].join(', '),(js.length/1024).toFixed(0)+'KB');
// Ege ayrıntısı (1:10m)
if (fs.existsSync('ne_10m_land.geojson')) {
  const E={w:19.5,e:31,s:34.5,n:42.2};
  const l10=JSON.parse(fs.readFileSync('ne_10m_land.geojson'));
  const A=[];
  const cl=r=>{const o=[];for(const [x,y] of r){const p=[Math.round(Math.max(E.w-.3,Math.min(E.e+.3,x))*1000)/1000,Math.round(Math.max(E.s-.3,Math.min(E.n+.3,y))*1000)/1000];const q=o[o.length-1];if(!q||q[0]!==p[0]||q[1]!==p[1])o.push(p);}return o;};
  for(const f of l10.features) for(const p of polys(f.geometry)){const r=p[0]; if(!r.some(([x,y])=>x>=E.w&&x<=E.e&&y>=E.s&&y<=E.n))continue; const c=dp(cl(r),0.008); if(c.length>=4)A.push(c);}
  const js2=`/* Ege kıyıları ayrıntısı: Natural Earth 1:10m (kamu malı), kırpılmış ve sadeleştirilmiş. */\nwindow.HARITA_EGE = ${JSON.stringify({sinir:E,kara:A.map(r=>r.flat())})};\n`;
  fs.writeFileSync(out.replace('harita.js','harita-ege.js'),js2); console.log('ege',A.length,(js2.length/1024).toFixed(0)+'KB');
}
