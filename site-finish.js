// Sept 11 updates layered onto the finished SAMSBANDS site.
(function(){
 const D=window.SAMS_DATA;if(!D)return;
 const by=s=>(D.bands||[]).find(b=>b.slug===s);

 // Horse Weapons fix retained.
 const hw=by('horse-weapons'), hs={date:'2011-10-28',display:'Oct 28, 2011',event:'BunterICT Halloween Bash',venue:'The Eagles Lodge',city:'Wichita, KS'};
 if(hw){hw.timeline=(hw.timeline||[]).filter(e=>!(e.date===hs.date&&/BunterICT Halloween Bash/i.test(e.event||'')));hw.timeline.push(hs);hw.timeline.sort((a,b)=>String(a.date).localeCompare(String(b.date)));}
 D.timeline=(D.timeline||[]).filter(e=>!(e.slug==='horse-weapons'&&e.date===hs.date&&/BunterICT Halloween Bash/i.test(e.event||'')));
 D.timeline.push({...hs,event:'Horse Weapons — BunterICT Halloween Bash',slug:'horse-weapons'});

 // JabberJosh.
 const jj=by('jabberjosh');
 if(jj){
   jj.intro=['Jabberjosh was Sam, and his brother Will, and they had some birthdays to announce.'];
   (jj.videos||[]).forEach(v=>v.title='');
   const fix=e=>{if(String(e.date||'').startsWith('2018-02')||/Feb/i.test(e.display||''))['event','venue','city','display'].forEach(k=>{if(typeof e[k]==='string')e[k]=e[k].replace(/Gunner Son/g,'Gunnerson')})};
   (jj.timeline||[]).forEach(fix);(D.timeline||[]).filter(e=>e.slug==='jabberjosh').forEach(fix);

   jj.releases=(jj.releases||[]).filter(r=>!/Live at Da Bro Haus/i.test(r.title||''));
   jj.releases.push({title:'Live at Da Bro Haus',date:'February 19, 2010',dateLabel:'Released',image:'../JJ2_Bandcamp_1500x1500.png',url:'https://samsbands.bandcamp.com/album/live-at-da-bro-haus'});
   const releaseOrder={'Sports Is My Favorite':new Date('2008-02-01'),'Waking Up the Neighborhood Tonight':new Date('2010-02-12'),'Live at Da Bro Haus':new Date('2010-02-19'),'On Deck – Split with Waxeater':new Date('2010-04-01'),'On Deck - Split with Waxeater':new Date('2010-04-01'),'Free Your Ass and Your Mind Will Follow':new Date('2011-09-21'),'Dos Hombres':new Date('2013-10-31'),'Retirement Show – LIVE! From the Love Garden':new Date('2014-07-18'),'Retirement Show - LIVE! From the Love Garden':new Date('2014-07-18')};
   jj.releases.sort((a,b)=>(releaseOrder[a.title]||new Date(a.date||0))-(releaseOrder[b.title]||new Date(b.date||0)));

   const tour=[
    ['2010-02-11','Feb 11, 2010','Lawrence, KS'],['2010-02-12','Feb 12, 2010','Wichita, KS'],['2010-02-13','Feb 13, 2010','Omaha, NE'],['2010-02-14','Feb 14, 2010','Iowa City, IA'],['2010-02-15','Feb 15, 2010','Minneapolis, MN'],['2010-02-16','Feb 16, 2010','Milwaukee, WI'],['2010-02-17','Feb 17, 2010','Chicago, IL'],['2010-02-18','Feb 18, 2010','Cleveland, OH'],['2010-02-20','Feb 20, 2010','New York, NY'],['2010-02-21','Feb 21, 2010','New York, NY'],['2010-02-23','Feb 23, 2010','Philadelphia, PA'],['2010-02-24','Feb 24, 2010','Athens, OH'],['2010-02-25','Feb 25, 2010','Cleveland, OH'],['2010-02-26','Feb 26, 2010','Bloomington, IN'],['2010-02-27','Feb 27, 2010','Indianapolis, IN'],['2010-02-28','Feb 28, 2010','Bloomington, IN'],['2010-03-01','Mar 1, 2010','Springfield, MO'],['2010-03-02','Mar 2, 2010','Columbia, MO'],['2010-03-04','Mar 4, 2010','Lawrence, KS']];
   for(const [date,display,city] of tour)if(!(jj.timeline||[]).some(e=>e.date===date)){const e={date,display,event:'East Coast Tour',venue:'',city};jj.timeline.push(e);D.timeline.push({...e,event:'JabberJosh — East Coast Tour',slug:'jabberjosh'});}
   jj.timeline.sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));

   // JabberJosh TWOR 2012 tour dates from the supplied flyer.
   const tour2012=[
    ['2012-02-16','Feb 16, 2012','Lawrence, KS'],['2012-02-17','Feb 17, 2012','Iowa City, IA'],['2012-02-18','Feb 18, 2012','Minneapolis, MN'],['2012-02-19','Feb 19, 2012','Duluth, MN'],['2012-02-20','Feb 20, 2012','Milwaukee, WI'],['2012-02-21','Feb 21, 2012','Chicago, IL'],['2012-02-22','Feb 22, 2012','Detroit, MI'],['2012-02-23','Feb 23, 2012','Cleveland, OH'],['2012-02-24','Feb 24, 2012','Cleveland, OH'],['2012-02-25','Feb 25, 2012','Philadelphia, PA'],['2012-02-26','Feb 26, 2012','New York, NY'],['2012-02-28','Feb 28, 2012','Columbus, OH'],['2012-02-29','Feb 29, 2012','Indianapolis, IN'],['2012-03-01','Mar 1, 2012','Bloomington, IN'],['2012-03-02','Mar 2, 2012','Nashville, TN'],['2012-03-03','Mar 3, 2012','Louisville, KY'],['2012-03-04','Mar 4, 2012','St. Louis, MO']];
   for(const [date,display,city] of tour2012)if(!(jj.timeline||[]).some(e=>e.date===date)){const e={date,display,event:'TWOR 2012 Tour',venue:'',city};jj.timeline.push(e);D.timeline.push({...e,event:'JabberJosh — TWOR 2012 Tour',slug:'jabberjosh'});}
   jj.timeline.sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));
 }

 // EMR members.
 const emr=by('emr');
 if(emr)emr.members=(emr.members||[]).filter(m=>!/^Dane(?:\s|$)/i.test(m[0]||'')).map(m=>/^Kyle(?:\s|$)/i.test(m[0]||'')?['Kyle Jackson',m[1]||'']:/^Zach(?:\s|$)/i.test(m[0]||'')?['Zach Lawson',m[1]||'']:m);

 // Final band text/member edits.
 const mft=by('my-friend-tim');
 if(mft){
   mft.members=(mft.members||[]).filter(m=>!/^Dane Amundson$/i.test(m[0]||''));
   const brianIndex=mft.members.findIndex(m=>/^Brian Scheel$/i.test(m[0]||''));
   const dane=['Dane Amundson','Guitar'];
   if(brianIndex>=0)mft.members.splice(brianIndex,0,dane);
   else {
     const mattIndex=mft.members.findIndex(m=>/^Matt Bisel$/i.test(m[0]||''));
     if(mattIndex>=0)mft.members.splice(mattIndex+1,0,dane);
     else mft.members.push(dane);
   }
 }
 const ml=by('monsoon-lazer');
 if(ml&&ml.intro)ml.intro=ml.intro.map(x=>String(x).replace(/2013(?!\.)/g,'2013.'));
 const sw=by('swanson');
 if(sw)sw.intro=['Swanson was JabberJosh + Approach and was active in Lawrence, KS from 2011 to 2012.'];
 const horse=by('horse-weapons');
 if(horse)horse.intro=['Horse Weapons was from Wichita and Lawrence, KS and was active from 2011 to 2012.'];

 // Previous visual fixes retained + slightly smaller mobile homepage SAMSBANDS.
 const gd=by('gnarly-davidson');if(gd)(gd.videos||[]).forEach(v=>v.title='');
 const st=document.createElement('style');st.textContent=`
 .band-thunderfuck{--band-accent:#B86A32!important}.date.band-thunderfuck{color:#B86A32!important}.band-card.band-thunderfuck h3{color:#B86A32}.band-card.band-thunderfuck:hover h3{color:#111}
 .band-jabberjosh .video-item h3,.band-gnarly-davidson .video-item h3{display:none}
 .guestbook-page{min-height:760px}.guestbook-page .section-title{margin-bottom:10px}.guestbook-copy{color:#ccc;line-height:1.6;margin:0 0 28px;max-width:760px}#echothread{min-height:560px}
 @media(max-width:650px){.home-hero-copy h1{font-size:13vw!important;letter-spacing:-2px!important;white-space:nowrap!important;max-width:100%!important}}`;document.head.appendChild(st);
 D.timeline.sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));

 // EchoThread guest book retained.
 function guest(){if(location.hash!=='#/guestbook')return;const a=document.getElementById('app');if(!a)return;a.innerHTML=`<section class="wrap guestbook-page"><h1 class="section-title">GUEST BOOK</h1><p class="guestbook-copy">Share a memory, story, or message about Sam.</p><div id="echothread" data-shortname="SamsBands" data-api-key="woHJqsd0eKsRwt5FzL3gPYF46JCHnSDFVqGa9qADDN4" data-page-url="https://samsbands.github.io/#/guestbook" data-identifier="samsbands-guestbook" data-page-title="SamsBands Guest Book" data-theme="dark" data-accent-color="#e8353a" data-font="sans"></div></section>`;if(window.EchoThread&&typeof window.EchoThread.bootstrap==='function'){window.EchoThread.bootstrap();return}if(!document.getElementById('echothread-widget-js')){const s=document.createElement('script');s.id='echothread-widget-js';s.src='https://cdn.echothread.io/widget.js';s.async=true;document.body.appendChild(s)}}
 setTimeout(()=>{window.addEventListener('hashchange',()=>setTimeout(guest,0));guest()},0);
})();