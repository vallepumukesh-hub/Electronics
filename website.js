
/* ── THEME TOGGLE ── */
function toggleTheme(){
  const root = document.documentElement;
  const isDark = root.getAttribute('data-theme')==='dark';
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('modeLabel').textContent = isDark ? '☀️ Light' : '🌙 Dark';
  document.getElementById('pthumb').textContent     = isDark ? '☀️' : '🌙';
}

/* ── CART ── */
let n = parseInt(localStorage.getItem('vc') || '0');
document.getElementById('cCount').textContent = n;

function addCart(e, btn, name){
  n++;
  document.getElementById('cCount').textContent = n;
  localStorage.setItem('vc', n);
  // ripple
  const r = document.createElement('span');
  r.className = 'rip';
  const b = btn.getBoundingClientRect();
  r.style.left = (e.clientX-b.left-5)+'px';
  r.style.top  = (e.clientY-b.top -5)+'px';
  btn.appendChild(r);
  setTimeout(()=>r.remove(), 700);
  // bounce
  const cb = document.getElementById('cartBtn');
  cb.classList.remove('bump'); void cb.offsetWidth; cb.classList.add('bump');
  toast(`✅ <b>${name}</b> added to cart!`);
}
function cartToast(){ toast(`🛒 You have <b>${n}</b> item${n!==1?'s':''} in cart`) }

/* ── TOAST ── */
function toast(msg){
  const box = document.getElementById('toasts');
  const t = document.createElement('div');
  t.className='toast'; t.innerHTML=msg; box.appendChild(t);
  setTimeout(()=>{ t.classList.add('out'); setTimeout(()=>t.remove(),450) }, 2700);
}

/* ── SEARCH ── */
function doSearch(){
  const q = document.getElementById('srch').value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  let vis=0;
  cards.forEach(c=>{
    const ok = c.querySelector('.p-name').textContent.toLowerCase().includes(q);
    c.style.display = ok ? '' : 'none';
    if(ok) vis++;
  });
  document.getElementById('noRes').classList.toggle('show', vis===0 && q.length>0);
  document.getElementById('pCount').textContent = `${vis} item${vis!==1?'s':''}`;
}

/* ── FILTER ── */
function filterCat(cat,el){
  document.querySelectorAll('.catbar a').forEach(a=>a.classList.remove('active'));
  el.classList.add('active');
  let vis=0;
  document.querySelectorAll('.card').forEach((c,i)=>{
    const ok = cat==='all' || c.dataset.cat===cat;
    if(ok){
      c.style.display='';
      c.style.animation='none'; void c.offsetWidth;
      c.style.animation=`cardIn .45s ${i*.06}s both`;
      vis++;
    } else { c.style.display='none' }
  });
  document.getElementById('pCount').textContent = `${vis} item${vis!==1?'s':''}`;
  return false;
}

/* ── CONTACT ── */
function sendForm(){
  const n=document.getElementById('cName').value.trim();
  const e=document.getElementById('cEmail').value.trim();
  const m=document.getElementById('cMsg').value.trim();
  if(!n||!e||!m){ toast('⚠️ Please fill in all fields.'); return }
  toast(`🚀 Thanks <b>${n}</b>! We'll reply to ${e} soon.`);
  document.getElementById('cName').value='';
  document.getElementById('cEmail').value='';
  document.getElementById('cMsg').value='';
}

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(entries=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('on'); obs.unobserve(en.target) } });
},{threshold:0.12});
document.querySelectorAll('.sr').forEach(el=>obs.observe(el));

/* ── PREVENT DEFAULT ── */
document.querySelectorAll('.catbar a').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));