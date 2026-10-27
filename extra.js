(function(){
const root=document.documentElement,mm=matchMedia('(prefers-color-scheme:dark)');
try{const s=localStorage.getItem('th');if(s)root.dataset.theme=s}catch(_){}
$('thm').onclick=()=>{const dk=root.dataset.theme?root.dataset.theme==='dark':mm.matches,n=dk?'light':'dark';root.dataset.theme=n;try{localStorage.setItem('th',n)}catch(_){}};
function go(v){['buscar','panel'].forEach(x=>$('v-'+x).hidden=x!==v);document.querySelectorAll('.tabs button').forEach(b=>b.setAttribute('aria-current',b.dataset.go===v?'page':'false'));if(v==='panel'&&!$('pn').dataset.ok){panel();$('pn').dataset.ok=1}scrollTo(0,0)}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>go(b.dataset.go));
$('pn').addEventListener('click',e=>{if(e.target.closest('[data-m]'))go('buscar')});
const grp=k=>{const m=new Map();D.forEach(z=>{const a=m.get(z[k])||[0,0];a[z.r?0:1]++;m.set(z[k],a)});return[...m].sort((a,b)=>b[1][0]+b[1][1]-a[1][0]-a[1][1])};
function bars(rows,link){const mx=Math.max(1,...rows.map(r=>r[1][0]+r[1][1]));return rows.map(([l,[o,p]])=>{const t=link?'button':'div';return `<${t} class="bar"${link?` data-m="${ESC(l)}"`:''}><span>${ESC(l)}</span><span class="tr" style="width:${(o+p)/mx*100}%"><i class="o" style="width:${o/(o+p)*100}%"></i><i class="p" style="flex:1"></i></span><span>${o+p}</span></${t}>`}).join('')}
function panel(){const T=D.length,R=D.filter(z=>z.r).length,p=T?R/T*100:0,G=D.filter(z=>z.g).length;
const ms=[...new Set(D.map(z=>z.d.slice(0,7)).filter(Boolean))].sort().slice(-12),L='EFMAMJJASOND',
cn=ms.map(m=>{const a=D.filter(z=>z.d.startsWith(m)),o=a.filter(z=>z.r).length;return[m,o,a.length-o]}),mx=Math.max(1,...cn.map(c=>c[1]+c[2]));
const svg=cn.map(([m,o,q],i)=>{const x=6+i*29,ho=o/mx*105,hp=q/mx*105;return `<rect x="${x}" y="${120-ho-hp}" width="22" height="${hp}" rx="3" fill="url(#h)" stroke="var(--pe)"/><rect x="${x}" y="${120-ho}" width="22" height="${ho}" rx="3" fill="var(--ok)"/><text class="t" x="${x+11}" y="${116-ho-hp}">${o+q}</text><text x="${x+11}" y="132">${L[+m.slice(5)-1]}</text><text x="${x+11}" y="141">${m.slice(2,4)}</text>`}).join('');
$('pn').innerHTML=`<div class="kpis"><div class="k"><b>${T}</b><span>reclamos registrados</span></div><div class="k ok"><b>${R}</b><span>resueltos</span></div><div class="k pe"><b>${T-R}</b><span>pendientes</span></div><div class="k"><b>${G}</b><span>con ubicación GPS</span></div></div>
<div class="card"><h2>Estado general</h2><div class="donutw"><svg class="donut" viewBox="0 0 42 42" role="img" aria-label="${p.toFixed(0)}% resueltos"><circle cx="21" cy="21" r="15.915" fill="none" stroke="var(--pe)" stroke-width="6"/><circle class="a" cx="21" cy="21" r="15.915" fill="none" stroke="var(--ok)" stroke-width="6" stroke-dasharray="${p} ${100-p}"/><text x="21" y="22">${p.toFixed(0)}%</text></svg><div class="lg"><div><i style="background:var(--ok)"></i>Resueltos <b>${R}</b></div><div><i style="background:var(--pe)"></i>Pendientes <b>${T-R}</b></div></div></div></div>
<div class="card"><h2>Reclamos por mes (últimos 12)</h2><svg class="mc" viewBox="0 0 360 146" role="img" aria-label="Reclamos por mes"><defs><pattern id="h" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="5" fill="var(--peb)"/><line x1="0" y1="0" x2="0" y2="5" stroke="var(--pe)" stroke-width="2"/></pattern></defs>${svg}</svg><div class="meta">Verde: resueltos · rayado: pendientes</div></div>
<div class="card"><h2>Por municipio</h2>${bars(grp('m'),true)}<div class="meta" style="margin-top:4px">Toque un municipio para buscar sus reclamos.</div></div>
<div class="card"><h2>Por tarea</h2>${bars(grp('t').slice(0,8),false)}</div>`}
let dp;addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;$('inst').hidden=false});
$('inst').onclick=()=>{if(dp){dp.prompt();dp=null;$('inst').hidden=true}};
if('serviceWorker' in navigator&&location.protocol.indexOf('http')===0)navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
