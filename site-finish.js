// Sept 10 final site-content + Guest Book patch.
(function(){
  const D=window.SAMS_DATA;
  if(!D) return;

  // Horse Weapons — Oct 28, 2011 BunterICT Halloween Bash.
  const hw=(D.bands||[]).find(b=>b.slug==='horse-weapons');
  const show={date:'2011-10-28',display:'Oct 28, 2011',event:'BunterICT Halloween Bash',venue:'The Eagles Lodge',city:'Wichita, KS'};
  if(hw){
    hw.timeline=(hw.timeline||[]).filter(e=>!(e.date==='2011-10-28'&&/BunterICT Halloween Bash/i.test(e.event||'')));
    hw.timeline.push(show);
    hw.timeline.sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));
  }
  D.timeline=(D.timeline||[]).filter(e=>!(e.slug==='horse-weapons'&&e.date==='2011-10-28'&&/BunterICT Halloween Bash/i.test(e.event||'')));
  D.timeline.push({...show,event:'Horse Weapons — BunterICT Halloween Bash',slug:'horse-weapons'});
  D.timeline.sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));

  // Final small edits.
  const jj=(D.bands||[]).find(b=>b.slug==='jabberjosh');
  if(jj){
    jj.intro=['Jabberjosh was Sam, and his brother Will, and they had some birthdays to announce.'];
    (jj.videos||[]).forEach(v=>{ v.title=''; });
  }

  const gd=(D.bands||[]).find(b=>b.slug==='gnarly-davidson');
  if(gd){
    (gd.videos||[]).forEach(v=>{ v.title=''; });
  }

  const style=document.createElement('style');
  style.textContent=`
    .band-thunderfuck{--band-accent:#B86A32!important}
    .date.band-thunderfuck{color:#B86A32!important}
    .band-card.band-thunderfuck h3{color:#B86A32}
    .band-card.band-thunderfuck:hover h3{color:#111}
    .band-jabberjosh .video-item h3,
    .band-gnarly-davidson .video-item h3{display:none}
    .guestbook-page{min-height:760px}
    .guestbook-page .section-title{margin-bottom:10px}
    .guestbook-copy{color:#ccc;line-height:1.6;margin:0 0 28px;max-width:760px}
    #echothread{min-height:560px}
  `;
  document.head.appendChild(style);

  function renderGuestbook(){
    if(location.hash !== '#/guestbook') return;
    const app=document.getElementById('app');
    if(!app) return;

    app.innerHTML=`
      <section class="wrap guestbook-page">
        <h1 class="section-title">GUEST BOOK</h1>
        <p class="guestbook-copy">Share a memory, story, or message about Sam.</p>
        <div
          id="echothread"
          data-shortname="SamsBands"
          data-api-key="woHJqsd0eKsRwt5FzL3gPYF46JCHnSDFVqGa9qADDN4"
          data-page-url="https://samsbands.github.io/#/guestbook"
          data-identifier="samsbands-guestbook"
          data-page-title="SamsBands Guest Book"
          data-theme="dark"
          data-accent-color="#e8353a"
          data-font="sans"
        ></div>
      </section>`;

    if(window.EchoThread && typeof window.EchoThread.bootstrap === 'function'){
      window.EchoThread.bootstrap();
      return;
    }

    if(!document.getElementById('echothread-widget-js')){
      const s=document.createElement('script');
      s.id='echothread-widget-js';
      s.src='https://cdn.echothread.io/widget.js';
      s.async=true;
      document.body.appendChild(s);
    }
  }

  // Register after app.js's own router so this page wins on hash navigation.
  setTimeout(()=>{
    window.addEventListener('hashchange', ()=>setTimeout(renderGuestbook,0));
    renderGuestbook();
  },0);
})();
