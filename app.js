const D=window.SAMS_DATA; const app=document.getElementById('app');
const esc=s=>String(s??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\\':'&#39;'}[m]));
function band(name){return D.bands.find(b=>b.slug===name)}
const BANDCAMP_TITLES = {
  'split-my-pants-emr-and-my-friend-tim': 'Split My Pants — EMR and My Friend Tim',
  'my-friend-tim-ogre-house-demo': 'Ogre House Demo',
  'long-division-5-song-demo': '5 Song Demo',
  'young-country': 'Young Country',
  'waking-up-the-neighborhood-tonight-cassette': 'Waking Up the Neighborhood Tonight',
  'free-your-ass-and-your-mind-will-follow': 'Free Your Ass and Your Mind Will Follow',
  'gnarly-davidson': 'Gnarly Davidson',
  'jabberjaw-coffin-nail': 'Jabberjaw / Coffin Nail',
  'slaw-unreleased': 'Slaw — Unreleased'
};
function bandcampLabel(u){
  const m=u.match(/\/album\/([^?#]+)/i);
  if(m){
    const key=decodeURIComponent(m[1]).toLowerCase();
    if(BANDCAMP_TITLES[key]) return BANDCAMP_TITLES[key];
    return key.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
  }
  return 'Record';
}
function linksHtml(b){if(!b.links.length)return '<div class="notice">Bandcamp / video links can be added as they are discovered.</div>';return '<div class="links">'+b.links.map((u,i)=>{let label=/bandcamp/i.test(u)?bandcampLabel(u):/youtube|youtu\.be/i.test(u)?'YouTube':'Link '+(i+1);return `<a href="${esc(u)}" target="_blank" rel="noopener">${label} ↗</a>`}).join('')+'</div>'}
function flyerButton(e){return e.flyer?`<button class="flyer-btn" type="button" data-flyer="images/${esc(e.flyer)}" data-caption="${esc(e.display+' — '+e.event)}">View Flyer</button>`:''}
function timelineHtml(items){return '<div class="timeline">'+items.map(e=>`<div class="entry"><div class="date">${esc(e.display)}</div><div><div class="event">${esc(e.event)}</div>${e.venue||e.city?`<div class="meta">${esc([e.venue,e.city].filter(Boolean).join(' · '))}</div>`:''}${flyerButton(e)}</div></div>`).join('')+'</div>'}
function bindFlyers(){document.querySelectorAll('[data-flyer]').forEach(btn=>btn.onclick=()=>openFlyer(btn.dataset.flyer,btn.dataset.caption));}
function openFlyer(src,caption){let old=document.getElementById('flyer-modal');if(old)old.remove();let m=document.createElement('div');m.id='flyer-modal';m.className='flyer-modal';m.innerHTML=`<div class="flyer-backdrop"></div><div class="flyer-dialog" role="dialog" aria-modal="true"><button class="flyer-close" aria-label="Close">×</button><img src="${esc(src)}" alt="${esc(caption)}"><div class="flyer-caption">${esc(caption)}</div></div>`;document.body.appendChild(m);m.querySelector('.flyer-close').onclick=()=>m.remove();m.querySelector('.flyer-backdrop').onclick=()=>m.remove();document.addEventListener('keydown',function f(e){if(e.key==='Escape'){m.remove();document.removeEventListener('keydown',f)}});}
function home(){app.innerHTML=`<section class="hero"><div class="kicker">The Sam Gunnerson Archive</div><h1>SAMSBANDS</h1><p>${esc(D.subtitle)}. A living archive built from flyers, recordings, stories and show history.</p></section><section class="wrap"><h2 class="section-title">Everything, in order.</h2><div class="filter"><input id="q" placeholder="Search bands, shows, venues, cities…"></div><div id="master">${timelineHtml(D.timeline)}</div></section>`;document.getElementById('q').oninput=e=>{let q=e.target.value.toLowerCase();let x=D.timeline.filter(a=>JSON.stringify(a).toLowerCase().includes(q));document.getElementById('master').innerHTML=timelineHtml(x);bindFlyers()};bindFlyers()}
function bands(){app.innerHTML=`<section class="wrap"><div class="band-head"><div class="kicker">The archive</div><h1>THE BANDS</h1><p>Every band gets its own home: story, recordings, flyers and the timeline that belongs to it.</p></div><div class="cards">${D.bands.map(b=>`<a class="card" href="#/band/${b.slug}"><h3>${esc(b.name)}</h3><small>${b.timeline.length} timeline entries · ${b.images.length} images</small></a>`).join('')}</div></section>`}
function bandPage(slug){let b=band(slug);if(!b)return bands();app.innerHTML=`<section class="wrap"><a class="back" href="#/bands">← All bands</a><div class="band-head"><div class="kicker">Band archive</div><h1>${esc(b.name)}</h1>${b.intro.map(x=>`<p>${esc(x)}</p>`).join('')}<div class="stats"><div class="stat"><b>${b.timeline.length}</b><span>timeline entries</span></div><div class="stat"><b>${b.images.length}</b><span>flyers / images</span></div></div>${linksHtml(b)}</div>${b.images.length?`<h2 class="section-title">Flyers & images</h2><div class="gallery">${b.images.map(x=>`<img loading="lazy" src="images/${x}" alt="${esc(b.name)} flyer or archive image" onclick="openFlyer('images/${esc(x)}','${esc(b.name+' — archive image')}')">`).join('')}</div>`:''}<h2 class="section-title">Timeline</h2>${timelineHtml(b.timeline)}</section>`;bindFlyers()}
function route(){let p=location.hash.slice(1)||'/';if(p==='/')home();else if(p==='/bands')bands();else if(p.startsWith('/band/'))bandPage(p.split('/')[2]);else home()}window.addEventListener('hashchange',route);route();
