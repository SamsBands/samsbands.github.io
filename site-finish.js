// Sept 10 final site-content patch.
(function(){
  const D=window.SAMS_DATA;
  if(!D) return;
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
})();
