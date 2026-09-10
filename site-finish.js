// Sept 10 final site-content patch.
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

  // JabberJosh subtext punctuation.
  const jj=(D.bands||[]).find(b=>b.slug==='jabberjosh');
  if(jj){
    jj.intro=['Jabberjosh was Sam, and his brother Will, and they had some birthdays to announce.'];
    (jj.videos||[]).forEach(v=>{ v.title=''; });
  }

  // Remove Gnarly Davidson video labels.
  const gd=(D.bands||[]).find(b=>b.slug==='gnarly-davidson');
  if(gd){
    (gd.videos||[]).forEach(v=>{ v.title=''; });
  }

  // Thunderfuck muted/burnt orange + hide empty video headings.
  const style=document.createElement('style');
  style.textContent=`
    .band-thunderfuck{--band-accent:#B86A32!important}
    .date.band-thunderfuck{color:#B86A32!important}
    .band-card.band-thunderfuck h3{color:#B86A32}
    .band-card.band-thunderfuck:hover h3{color:#111}
    .band-jabberjosh .video-item h3,
    .band-gnarly-davidson .video-item h3{display:none}
  `;
  document.head.appendChild(style);
})();
