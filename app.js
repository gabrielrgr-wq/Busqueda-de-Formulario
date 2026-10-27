function cu(id,v){const el=document.getElementById(id),f=+el.textContent||0;if(matchMedia('(prefers-reduced-motion:reduce)').matches||f===v){el.textContent=v;return}const t0=performance.now();(function s(t){const p=Math.min(1,(t-t0)/450);el.textContent=Math.round(f+(v-f)*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(s)})(t0)}
const D=window.RECLAMOS||[];
const $=i=>document.getElementById(i);
const nz=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
D.forEach(z=>{z.y=z.d.slice(0,4)||'s/f';z.h={n:nz(z.n),m:nz(z.m),t:nz(z.t),a:nz(z.a+' '+z.e+' '+z.b),x:nz(z.x+' '+z.k)};z.h.all=Object.values(z.h).join(' ')});
const MUN=['Las Piedras','La Paz','18 de Mayo','Progreso'];
const ESC=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let st={m:'',q:'',sc:'all',t:'',e:'',y:'',g:''},shown=60,open=new Set(),cur=[];
function opts(el,vals,all){el.innerHTML=`<option value="">${all}</option>`+vals.map(v=>`<option>${ESC(v)}</option>`).join('')}
const cnt=k=>[...D.reduce((m,z)=>m.set(z[k],(m.get(z[k])||0)+1),new Map())].sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
opts($('ft'),cnt('t'),'Todas');opts($('fy'),[...new Set(D.map(z=>z.y))].sort().reverse(),'Todos');
const others=cnt('m').filter(m=>!MUN.includes(m));
$('chM').innerHTML=['Todos',...MUN,...others].map(m=>`<button class="chip" data-m="${m==='Todos'?'':ESC(m)}" aria-pressed="false">${m==='Todos'?'Todos los municipios':ESC(m)}</button>`).join('');
const fd=d=>d?d.split('-').reverse().join('/'):'Sin fecha';
function hl(txt,terms){let s=ESC(txt);if(!terms.length)return s;const re=new RegExp('('+terms.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','gi');
 // accent-insensitive highlight over plain text
 const n=nz(txt);if(n.length!==txt.length)return s;let o='',i=0;const ms=[...n.matchAll(re)];if(!ms.length)return s;
 for(const m of ms){o+=ESC(txt.slice(i,m.index))+'<mark>'+ESC(txt.slice(m.index,m.index+m[0].length))+'</mark>';i=m.index+m[0].length}return o+ESC(txt.slice(i))}
function filt(skipM){const terms=nz(st.q).split(/\s+/).filter(Boolean);
 return {terms,res:D.filter(z=>(skipM||!st.m||z.m===st.m)&&(!st.t||z.t===st.t)&&(st.e===''||z.r==st.e)&&(!st.y||z.y===st.y)&&(st.g===''||(st.g==='1'?z.g:!z.g))&&terms.every(w=>z.h[st.sc].includes(w)))}}
function render(){const {terms,res}=filt(false),base=filt(true).res;const act=terms.length||st.m||st.t||st.e!==''||st.y||st.g!=='';document.body.classList.toggle('on',!!act);cur=res;document.querySelectorAll('#chM .chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.m===st.m));if(!act){$('list').innerHTML='<div class="empty">Ingrese un n.º de formulario, una dirección o una palabra del reclamo, o elija un filtro, para ver los reclamos.</div>';$('more').hidden=true;$('waall').hidden=true;return}$('waall').hidden=!res.length;
 cu('k0',res.length);const r=res.filter(z=>z.r).length;cu('k1',r);cu('k2',res.length-r);cu('k3',res.filter(z=>z.g).length);
 const ms=[...new Set(base.map(z=>z.m))].sort((a,b)=>base.filter(z=>z.m===b).length-base.filter(z=>z.m===a).length),mx=Math.max(1,...ms.map(m=>base.filter(z=>z.m===m).length));
 $('bars').innerHTML=ms.map(m=>{const a=base.filter(z=>z.m===m),o=a.filter(z=>z.r).length;return `<button class="bar" data-m="${ESC(m)}" aria-pressed="${st.m===m}"><span>${ESC(m)}</span><span class="tr" style="width:${a.length/mx*100}%"><i class="o" style="width:${o/a.length*100}%"></i><i class="p" style="flex:1"></i></span><span>${a.length}</span></button>`}).join('')+'<div class="meta" style="margin-top:4px">Verde sólido: resueltos · rayado: pendientes. Toque un municipio para filtrar.</div>';
 document.querySelectorAll('#chM .chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.m===st.m));
 const v=res.slice(0,shown);
 $('list').innerHTML=v.length?v.map((z,i)=>{const id=z.n+'|'+z.d,o=open.has(id);return `<div class="item${o?' open':''}" data-r="${z.r}" data-id="${ESC(id)}"><button class="head" aria-expanded="${o}"><span class="num">${hl(z.n,terms)}<br><span class="meta">${fd(z.d)}</span></span><span><span class="addr">${hl(z.a||'Sin dirección',terms)}</span><br><span class="meta">${hl(z.m,terms)} · ${hl(z.t,terms)}</span></span><span class="tag ${z.r?'ok':'pe'}">${z.r?'Resuelto':'Pendiente'}</span></button>
 <div class="det"><dl><dt>N.º de formulario</dt><dd>${ESC(z.n)}</dd><dt>Fecha</dt><dd>${fd(z.d)}</dd><dt>Municipio</dt><dd>${ESC(z.m)}</dd><dt>Barrio</dt><dd>${ESC(z.b)||'—'}</dd><dt>Tarea</dt><dd>${ESC(z.t)} (${z.r?'resuelto':'pendiente'})</dd><dt>Dirección</dt><dd>${ESC(z.a)||'—'}</dd><dt>Entre calles</dt><dd>${ESC(z.e)||'—'}</dd><dt>Tipo de reclamo</dt><dd>${ESC(z.k)||'—'}</dd><dt>Descripción</dt><dd>${hl(z.x||'—',terms)}</dd></dl>
 <div class="gps">${z.g?`<a class="btn" href="${ESC(z.g)}" target="_blank" rel="noopener noreferrer">Ver ubicación en Google Maps</a><button class="btn s" data-copy="${ESC(z.g)}">Copiar enlace GPS</button>`:`<span class="nog">Sin ubicación GPS${z.gn?': '+ESC(z.gn):''}</span>`}<button class="btn wa" data-wa="${ESC(z.n)}|${z.d}">Enviar por WhatsApp</button></div></div></div>`}).join(''):'<div class="empty">No hay reclamos con esos criterios. Pruebe con menos palabras o toque «Limpiar filtros».</div>';
 $('more').hidden=res.length<=shown;$('more').textContent=`Mostrar más resultados (${res.length-shown} restantes)`}
function sendWA(t){const a=document.createElement('a');a.href='https://wa.me/?text='+encodeURIComponent(t);a.target='_blank';a.rel='noopener noreferrer';document.body.appendChild(a);a.click();a.remove()}
function oneMsg(z){return `*Reclamo ${z.n}* (${fd(z.d)})\nEstado: ${z.r?'Resuelto':'Pendiente'}\nMunicipio: ${z.m}${z.b?' – '+z.b:''}\nTarea: ${z.t}\nDirección: ${z.a||'—'}${z.e?' (entre '+z.e+')':''}\nDescripción: ${z.x||'—'}\nUbicación: ${z.g||'sin GPS'}`}
function allMsg(){const r=cur.filter(z=>z.r).length,c=[st.q&&'Búsqueda: “'+st.q+'”',st.m&&'Municipio: '+st.m,st.t&&'Tarea: '+st.t,st.e!==''&&(st.e==='1'?'Resueltos':'Pendientes'),st.y&&'Año: '+st.y].filter(Boolean).join(' · ');let m=`*Reclamos de obras: ${cur.length} resultados* (${r} resueltos, ${cur.length-r} pendientes)\n${c}\n`,n=0;for(const z of cur){const l=`\n• ${z.n} | ${z.m} | ${z.t} | ${z.r?'Resuelto':'Pendiente'} | ${z.a||'sin dirección'}${z.g?' | '+z.g:''}`;if((m+l).length>1500)break;m+=l;n++}if(n<cur.length)m+=`\n… y ${cur.length-n} más (afine la búsqueda para enviarlos).`;return m}
let tm;$('q').addEventListener('input',e=>{clearTimeout(tm);tm=setTimeout(()=>{st.q=e.target.value;shown=60;render()},150)});
$('sc').onchange=e=>{st.sc=e.target.value;shown=60;render()};
[['ft','t'],['fe','e'],['fy','y'],['fg','g']].forEach(([i,k])=>$(i).onchange=e=>{st[k]=e.target.value;shown=60;render()});
$('rs').onclick=()=>{st={m:'',q:'',sc:'all',t:'',e:'',y:'',g:''};$('q').value='';$('sc').value='all';['ft','fe','fy','fg'].forEach(i=>$(i).value='');shown=60;render()};
$('more').onclick=()=>{shown+=60;render()};
document.addEventListener('click',e=>{const c=e.target.closest('[data-m]');if(c){st.m=st.m===c.dataset.m?'':c.dataset.m;shown=60;render();return}
 const h=e.target.closest('.head');if(h){const it=h.parentElement,id=it.dataset.id;it.classList.toggle('open');h.setAttribute('aria-expanded',it.classList.contains('open'));it.classList.contains('open')?open.add(id):open.delete(id);return}
 if(e.target.closest('#waall')){sendWA(allMsg());return}
 const wa=e.target.closest('[data-wa]');if(wa){const z=D.find(x=>x.n+'|'+x.d===wa.dataset.wa);if(z)sendWA(oneMsg(z));return}
 const cp=e.target.closest('[data-copy]');if(cp){try{navigator.clipboard.writeText(cp.dataset.copy).then(()=>{cp.textContent='Enlace copiado'}).catch(()=>{cp.textContent=cp.dataset.copy})}catch(_){cp.textContent=cp.dataset.copy}}});
render();
