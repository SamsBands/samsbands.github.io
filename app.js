const D=window.SAMS_DATA;
const app=document.getElementById('app');
const esc=s=>String(s??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\\':'&#39;'}[m]));
function band(name){return D.bands.find(b=>b.slug===name)}

const BANDCAMP_TITLES={
  'split-my-pants-emr-and-my-friend-tim':'Split My Pants — EMR and My Friend Tim',
  'my-friend-tim-ogre-house-demo':'Ogre House Demo',
  'long-division-5-song-demo':'5 Song Demo',
  'long-division-live-at-the-hutch-skate-park':'LIVE! At the Hutch Skate Park',
  'young-country':'Young Country',
  'waking-up-the-neighborhood-tonight-cassette':'Waking Up the Neighborhood Tonight',
  'free-your-ass-and-your-mind-will-follow':'Free Your Ass and Your Mind Will Follow',
  'gnarly-davidson':'Gnarly Davidson',
  'jabberjaw-coffin-nail':'Jabberjaw / Coffin Nail',
  'slaw-unreleased':'Slaw — Unreleased'
};

// Main/hero photos supplied for the archive update. Weather Is Happening stays without one for now.
const HERO_IMAGES={
  'emr':'hero-emr.jpg',
  'my-friend-tim':'hero-my-friend-tim.png',
  'long-division':'hero-long-division.jpg',
  'monsoon-lazer':'hero-monsoon-lazer.jpg',
  'thunderfuck':'hero-thunderfuck.jpg',
  'jabberjosh':'hero-jabberjosh.jpg',
  'gnarly-davidson':'hero-gnarly-davidson.jpg',
  'slaw':'hero-slaw.jpg'
};

// Existing spreadsheet images, visually sorted into the three archive galleries.
// Images that are release art, logos, screenshots, or otherwise unclear are intentionally left out.
const MEDIA={
  'emr':{
    flyers:["archive-emr_002.jpg", "archive-emr_003.jpg", "archive-emr_004.jpg", "archive-emr_005.jpg", "archive-emr_006.jpg", "archive-emr_007.jpg", "archive-emr_008.jpg", "archive-emr_009.jpg", "archive-emr_010.jpg", "archive-emr_011.jpg", "archive-emr_012.jpg", "archive-emr_014.jpg", "archive-emr_015.jpg", "archive-emr_016.jpg", "archive-emr_017.jpg", "archive-emr_018.jpg", "archive-emr_019-02.jpg", "archive-emr_032.jpg", "archive-emr_033.jpg", "archive-emr_034.jpg", "archive-emr_035.jpg", "archive-emr_036.jpg", "archive-emr_037.jpg"], live:[], merch:[]
  },
  'my-friend-tim':{
    flyers:['my-friend-tim-1.png','my-friend-tim-3.png','my-friend-tim-6.png','my-friend-tim-7.png','my-friend-tim-8.png', "archive-emr_014.jpg", "archive-emr_015.jpg", "archive-emr_016.jpg", "archive-emr_017.jpg", "archive-emr_018.jpg", "archive-emr_019-02.jpg", "archive-emr_037.jpg"],
    live:['my-friend-tim-2.jpeg','my-friend-tim-4.png','my-friend-tim-5.png'], merch:[]
  },
  'long-division':{
    flyers:['long-division-3.png','long-division-6.png','long-division-7.png','long-division-8.png','long-division-9.png','long-division-10.png','long-division-12.png','long-division-13.png'],
    live:['long-division-4.png','long-division-5.png'],
    merch:['long-division-1.jpeg','long-division-2.jpeg']
  },
  'weather-is-happening':{flyers:[],live:[],merch:[]},
  'monsoon-lazer':{flyers:['monsoon-lazer-1.png'],live:[],merch:[]},
  'thunderfuck':{
    flyers:[],
    live:['thunderfuck-2.png','thunderfuck-3.png','thunderfuck-4.png','thunderfuck-6.png','thunderfuck-8.png'],
    merch:[]
  },
  'jabberjosh':{
    flyers:['jabberjosh-3.png','jabberjosh-4.png','jabberjosh-6.png','jabberjosh-7.png','jabberjosh-8.png','jabberjosh-9.png','jabberjosh-10.png','jabberjosh-11.png','jabberjosh-12.png','jabberjosh-14.png','jabberjosh-15.png','jabberjosh-16.png','jabberjosh-2016-09-11-dag-house.jpg'],
    live:['jabberjosh-17.png','jabberjosh-18.png'],
    merch:['jabberjosh-sticker.png']
  },
  'gnarly-davidson':{
    flyers:['gnarly-davidson-1.png','gnarly-davidson-3.png','gnarly-davidson-4.png','gnarly-davidson-6.png','gnarly-davidson-7.png','gnarly-davidson-8.png','gnarly-davidson-9.png','gnarly-davidson-12.png','gnarly-davidson-13.png','gnarly-davidson-14.png','jabberjosh-2016-09-11-dag-house.jpg'],
    live:['gnarly-live.png'],
    merch:['gnarly-davidson-10.png','gnarly-davidson-11.png','gnarly-merch-1.png','gnarly-merch-2.png','gnarly-merch-blue-tank.png','gnarly-merch-4.png','gnarly-merch-hat.png','gnarly-merch-bag.png','gnarly-merch-stickers.png','gnarly-merch-7.png']
  },
  'slaw':{
    flyers:['slaw-2.jpeg','slaw-3.jpeg','slaw-4.jpeg','slaw-5.jpeg','slaw-6.jpeg'], live:['slaw-live-1.jpg','slaw-live-2.jpg','slaw-live-3.jpg','slaw-live-4.jpg','slaw-live-5.jpg','slaw-live-6.jpg'], merch:[]
  }
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
function linksHtml(b){
  if(!b.links.length)return '<div class="notice">Bandcamp / video links can be added as they are discovered.</div>';
  return '<div class="links">'+b.links.map((u,i)=>{
    let label=/bandcamp/i.test(u)?bandcampLabel(u):/youtube|youtu\.be/i.test(u)?'YouTube':'Link '+(i+1);
    return `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
  }).join('')+'</div>';
}
function flyerButton(e){return e.flyer?`<button class="flyer-btn" type="button" data-flyer="images/${esc(e.flyer)}" data-caption="${esc(e.display+' — '+e.event)}">View Flyer</button>`:''}
function timelineHtml(items,bandSlug=''){return '<div class="timeline">'+items.map(e=>`<div class="entry"><div class="date band-${esc(e.slug||bandSlug)}">${esc(e.display)}</div><div><div class="event">${esc(e.event)}</div>${e.venue||e.city?`<div class="meta">${esc([e.venue,e.city].filter(Boolean).join(' · '))}</div>`:''}${flyerButton(e)}</div></div>`).join('')+'</div>'}
function bindFlyers(){document.querySelectorAll('[data-flyer]').forEach(btn=>btn.onclick=()=>openFlyer(btn.dataset.flyer,btn.dataset.caption));}
function thumbSrc(filename){return /^archive-emr_/.test(filename)?`images/thumbs/${esc(filename)}`:`images/${esc(filename)}`;}
function openFlyer(src,caption){
  let old=document.getElementById('flyer-modal');if(old)old.remove();
  let m=document.createElement('div');m.id='flyer-modal';m.className='flyer-modal';
  m.innerHTML=`<div class="flyer-backdrop"></div><div class="flyer-dialog" role="dialog" aria-modal="true"><button class="flyer-close" aria-label="Close">×</button><img src="${esc(src)}" alt="${esc(caption)}"><div class="flyer-caption">${esc(caption)}</div></div>`;
  document.body.appendChild(m);
  m.querySelector('.flyer-close').onclick=()=>m.remove();m.querySelector('.flyer-backdrop').onclick=()=>m.remove();
  document.addEventListener('keydown',function f(e){if(e.key==='Escape'){m.remove();document.removeEventListener('keydown',f)}});
}
window.openFlyer=openFlyer;

function gallerySection(title,items,b){
  if(!items||!items.length)return '';
  return `<section class="archive-section"><div class="section-heading"><h2 class="section-title">${esc(title)}</h2></div><div class="gallery">${items.map(x=>`<button class="gallery-item" type="button" data-flyer="images/${esc(x)}" data-caption="${esc(b.name+' — '+title.replace(/s$/,''))}"><img loading="lazy" decoding="async" src="${thumbSrc(x)}" alt="${esc(b.name+' '+title.toLowerCase())}"></button>`).join('')}</div></section>`;
}


function membersHtml(b){
  if(!b.members||!b.members.length)return '';
  return `<div class="members"><h2 class="mini-title">Band Members</h2>${b.members.map(m=>`<div class="member"><b>${esc(m[0])}</b><span>${esc(m[1])}</span></div>`).join('')}</div>`;
}
function setlistHtml(b){
  if(!b.setlist||!b.setlist.length)return '';
  return `<section class="archive-section"><h2 class="section-title">Set List</h2><ol class="setlist">${b.setlist.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></section>`;
}
function releasesHtml(b){
  if(!b.releases||!b.releases.length)return '';
  return `<section class="archive-section releases-section"><h2 class="section-title">Releases</h2><div class="releases">${b.releases.map(r=>`<article class="release"><button class="release-art" type="button" data-flyer="images/${esc(r.image)}" data-caption="${esc(b.name+' — '+r.title)}"><img loading="lazy" decoding="async" src="${thumbSrc(r.image)}" alt="${esc(r.title)} artwork"></button><div class="release-copy"><h3>${esc(r.title)}</h3>${r.date?`<p>${esc(r.dateLabel||'Released')} ${esc(r.date)}</p>`:''}${r.url?`<a class="release-link" href="${esc(r.url)}" target="_blank" rel="noopener">Listen on Bandcamp ↗</a>`:''}</div></article>`).join('')}</div></section>`;
}
function home(){
  app.innerHTML=`<section class="home-hero"><img src="images/hero-home.jpg" alt="Sam Gunnerson performing"><div class="home-hero-shade"></div><div class="home-hero-copy"><div class="kicker">The Sam Gunnerson Archive</div><h1>SAMSBANDS</h1><p>${esc(D.subtitle)}. A living archive built from flyers, recordings, stories and show history.</p></div></section><section class="wrap"><h2 class="section-title">Everything, in order.</h2><div class="filter"><input id="q" placeholder="Search bands, shows, venues, cities…"></div><div id="master">${timelineHtml(D.timeline)}</div></section>`;
  document.getElementById('q').oninput=e=>{let q=e.target.value.toLowerCase();let x=D.timeline.filter(a=>JSON.stringify(a).toLowerCase().includes(q));document.getElementById('master').innerHTML=timelineHtml(x);bindFlyers()};bindFlyers();
}
function bands(){
  app.innerHTML=`<section class="wrap"><div class="band-head"><div class="kicker">The archive</div><h1>THE BANDS</h1><p>20+ years of Hot Shit!</p></div><div class="cards">${D.bands.map(b=>{const hero=HERO_IMAGES[b.slug];return `<a class="card band-card band-${esc(b.slug)}" href="#/band/${b.slug}">${hero?`<img class="card-hero" src="images/${esc(hero)}" alt="${esc(b.name)}">`:''}<h3>${esc(b.name)}</h3></a>`}).join('')}</div></section>`;
}
function videosHtml(b){
  if(!b.videos||!b.videos.length)return '';
  return `<section class="archive-section"><h2 class="section-title">Videos</h2><div class="videos">${b.videos.map(v=>{const id=(v.url.match(/[?&]v=([^&]+)/)||[])[1];return `<article class="video-item"><div class="video-frame"><iframe src="https://www.youtube.com/embed/${esc(id)}" title="${esc(v.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>${b.slug==='jabberjosh'?'':`<h3>${esc(v.title)}</h3>`}${b.slug==='long-division'?'<p>Hutch Skate Park — July 7, 2007</p>':''}</article>`}).join('')}</div></section>`;
}
function bandPage(slug){
  let b=band(slug);if(!b)return bands();
  const hero=HERO_IMAGES[slug];
  const media=MEDIA[slug]||{flyers:[],live:[],merch:[]};
  app.innerHTML=`<section class="wrap band-page"><a class="back" href="#/bands">← All bands</a>${hero?`<div class="band-hero"><img src="images/${esc(hero)}" alt="${esc(b.name)} main photo"></div>`:''}<div class="band-head"><div class="kicker">Band archive</div><h1>${esc(b.name)}</h1>${b.intro.map(x=>`<p>${esc(x)}</p>`).join('')}${membersHtml(b)}${b.links&&b.links.length?linksHtml(b):''}</div>${releasesHtml(b)}${setlistHtml(b)}${slug==='thunderfuck'?'':`<section class="archive-section"><h2 class="section-title">Timeline</h2>${timelineHtml(b.timeline,slug)}</section>`}${gallerySection('Flyers',media.flyers,b)}${gallerySection('Live Photos',media.live,b)}${gallerySection('Merch',media.merch,b)}${videosHtml(b)}</section>`;
  bindFlyers();
}
function route(){let p=location.hash.slice(1)||'/';if(p==='/')home();else if(p==='/bands')bands();else if(p.startsWith('/band/'))bandPage(p.split('/')[2]);else home()}
window.addEventListener('hashchange',route);route();
