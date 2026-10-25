(()=>{
  const API='https://abacus.jasoncameron.dev',NS='jorgenetobr-radar-apuracao-2026';
  const host=document.querySelector('header .ctrl');if(!host)return;
  const el=document.createElement('span');el.className='sub mono';el.id='cnt';el.title='Contador de acessos desta página';
  el.textContent='contando acessos…';host.prepend(el);
  const fmt=n=>Number(n||0).toLocaleString('pt-BR');
  const call=(op,k)=>fetch(`${API}/${op}/${NS}/${k}`,{cache:'no-store'}).then(r=>r.ok?r.json():{value:0}).catch(()=>null);
  const show=(a,u)=>{if(!a||!u){el.hidden=true;return}el.hidden=false;el.textContent=`${fmt(a.value)} acessos · ${fmt(u.value)} visitantes`};
  let newVisitor=true,newSession=true;
  try{newVisitor=!localStorage.getItem('radar26-visitante')}catch(e){}
  try{newSession=!sessionStorage.getItem('radar26-sessao')}catch(e){}
  Promise.all([call(newSession?'hit':'get','acessos'),call(newVisitor?'hit':'get','visitantes')]).then(([a,u])=>{
    try{localStorage.setItem('radar26-visitante','1');sessionStorage.setItem('radar26-sessao','1')}catch(e){}
    show(a,u);
  });
  setInterval(()=>Promise.all([call('get','acessos'),call('get','visitantes')]).then(([a,u])=>show(a,u)),60000);
})();
