  document.getElementById('yr').textContent = new Date().getFullYear();

  /* mobile menu */
  var mb=document.getElementById('menuBtn'),nl=document.getElementById('navlinks');
  mb.addEventListener('click',function(){nl.classList.toggle('open')});
  nl.addEventListener('click',function(e){if(e.target.tagName==='A')nl.classList.remove('open')});

  /* reveal on scroll */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});

  /* ---------- LOGO MARQUEE ---------- */
  var logos=[
    {img:'a',alt:'Haufe Akademie'},
    {img:'b',alt:'Boehringer Ingelheim'},
    {img:'c',alt:'Volvo'},
    {img:'d',alt:'snoopstar'},
    {txt:'FMCG · OTC'},{txt:'Automotive'},{txt:'Cybersecurity'},{txt:'Telko'},{txt:'Maschinenbau'},{txt:'Versicherungen'},{txt:'Weiterbildung'},{txt:'B2B'}
  ];
  (function(){
    var t=document.getElementById('mtrack');
    function build(){
      logos.forEach(function(l){
        var d=document.createElement('div');d.className='item';
        if(l.img){var im=document.createElement('img');im.src=l.img;im.alt=l.alt;d.appendChild(im);}
        else{var s=document.createElement('span');s.textContent=l.txt;d.appendChild(s);}
        var dt=document.createElement('span');dt.className='dot';dt.textContent='◆';d.appendChild(dt);
        t.appendChild(d);
      });
    }
    build();build();
  })();

  /* ---------- CHAOS -> CLARITY SLIDER ---------- */
  (function(){
    var words=['zu viele Maßnahmen','unklare Prioritäten','Silos','Bauchgefühl','Budget?','Wer entscheidet?','Kampagne ≠ Strategie','widersprüchliche Ziele','kein roter Faden','Agentur vs. intern','Reporting-Chaos','Aktionismus','Positionierung?','Tool-Wildwuchs'];
    var field=document.getElementById('chaosField');
    var place=[[8,18,-9],[34,10,6],[60,16,-5],[12,42,4],[40,38,-7],[66,46,8],[20,66,-4],[48,70,5],[72,74,-8],[6,82,7],[36,86,-3],[58,30,4],[80,22,-6],[26,54,8]];
    words.forEach(function(w,i){
      var p=place[i%place.length];
      var c=document.createElement('div');c.className='chip';c.textContent=w;
      c.style.left=p[0]+'%';c.style.top=p[1]+'%';c.style.transform='rotate('+p[2]+'deg)';
      field.appendChild(c);
    });
    var box=document.getElementById('compare'),clar=document.getElementById('clarityLayer'),h=document.getElementById('handle');
    function setPos(px){
      var r=box.getBoundingClientRect();
      var pct=Math.max(6,Math.min(94,(px-r.left)/r.width*100));
      clar.style.clipPath='inset(0 0 0 '+pct+'%)';
      h.style.left=pct+'%';
    }
    var dragging=false;
    box.addEventListener('pointerdown',function(e){dragging=true;setPos(e.clientX);box.setPointerCapture(e.pointerId)});
    box.addEventListener('pointermove',function(e){if(dragging)setPos(e.clientX)});
    box.addEventListener('pointerup',function(){dragging=false});
    box.addEventListener('pointercancel',function(){dragging=false});
    var demo=true, dir=1, pos=50;
    box.addEventListener('pointerdown',function(){demo=false});
    var iv=setInterval(function(){
      if(!demo){clearInterval(iv);return;}
      pos+=dir*0.6; if(pos>72||pos<34)dir*=-1;
      clar.style.clipPath='inset(0 0 0 '+pos+'%)'; h.style.left=pos+'%';
    },40);
  })();

  /* ---------- LEISTUNGEN ACCORDION ---------- */
  (function(){
    var items=document.querySelectorAll('#acc .acc-item');
    function setBody(it,open){var b=it.querySelector('.acc-body');b.style.maxHeight=open?(b.scrollHeight+'px'):'0px';}
    items.forEach(function(it){
      setBody(it,it.classList.contains('open'));
      it.querySelector('.acc-head').addEventListener('click',function(){
        var isOpen=it.classList.contains('open');
        items.forEach(function(o){o.classList.remove('open');setBody(o,false);});
        if(!isOpen){it.classList.add('open');setBody(it,true);}
      });
    });
    window.addEventListener('resize',function(){
      var op=document.querySelector('#acc .acc-item.open');if(op)setBody(op,true);
    });
  })();

  /* ---------- STATS COUNTER ---------- */
  (function(){
    var done=false,grid=document.getElementById('stats');
    var so=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting&&!done){done=true;
          grid.querySelectorAll('.big').forEach(function(el){
            var tgt=+el.dataset.target,suf=el.dataset.suffix||'',t0=null,dur=1400;
            function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1);
              var val=Math.round((1-Math.pow(1-p,3))*tgt);
              el.textContent=val+suf;if(p<1)requestAnimationFrame(step);}
            requestAnimationFrame(step);
          });
        }
      });
    },{threshold:.4});
    so.observe(grid);
  })();

  /* ---------- TESTIMONIAL CAROUSEL ---------- */
  (function(){
    var track=document.getElementById('tcarTrack'),slides=track.children.length,i=0;
    var dots=document.getElementById('tDots');
    for(var k=0;k<slides;k++){(function(k){var b=document.createElement('button');if(k===0)b.className='active';b.addEventListener('click',function(){go(k)});dots.appendChild(b)})(k)}
    function go(n){i=(n+slides)%slides;track.style.transform='translateX(-'+(i*100)+'%)';
      dots.querySelectorAll('button').forEach(function(d,x){d.classList.toggle('active',x===i)});}
    document.getElementById('tNext').addEventListener('click',function(){go(i+1);rs()});
    document.getElementById('tPrev').addEventListener('click',function(){go(i-1);rs()});
    var auto=setInterval(function(){go(i+1)},6000);
    function rs(){clearInterval(auto);auto=setInterval(function(){go(i+1)},6000)}
    var car=document.querySelector('.tcar');
    car.addEventListener('mouseenter',function(){clearInterval(auto)});
    car.addEventListener('mouseleave',function(){rs()});
  })();

  /* ---------- PRESS WÜHLTISCH ---------- */
  (function(){
    var articles=[
      {yr:'2021',outlet:'Handelsblatt',desc:'x',url:'u'},
      {yr:'2022',outlet:'HORIZONT',desc:'x',url:'u'},
      {yr:'2018',outlet:'HORIZONT',desc:'x',url:'u'},
      {yr:'2022',outlet:'Springer-Vieweg · Buch',desc:'x',url:'u'},
      {yr:'2021',outlet:'BDZV-Jahresreport',desc:'x',url:'u'}
    ];
    var table=document.getElementById('table'),z=1;
    var els=[];
    articles.forEach(function(a){
      var c=document.createElement('div');c.className='clip';
      c.innerHTML='<div class="yr">'+a.yr+'</div><div class="outlet">'+a.outlet+'</div><div class="desc">'+a.desc+'</div><a class="more" href="'+a.url+'" target="_blank" rel="noopener">Artikel lesen →</a>';
      table.appendChild(c);els.push(c);
      makeDraggable(c);
    });

    function rnd(a,b){return a+Math.random()*(b-a)}
    function scatter(){
      var w=table.clientWidth,h=table.clientHeight;
      els.forEach(function(c){
        var cw=c.offsetWidth,ch=c.offsetHeight;
        var x=rnd(8,Math.max(10,w-cw-8)), y=rnd(8,Math.max(10,h-ch-8));
        c.style.left=x+'px';c.style.top=y+'px';
        c.style.transform='rotate('+rnd(-11,11)+'deg)';
        c.style.zIndex=++z;
      });
    }
    function tidy(){
      var w=table.clientWidth;
      var cw=els[0].offsetWidth;
      var cols=Math.max(1,Math.floor((w-24)/(cw+18)));
      els.forEach(function(c,i){
        var col=i%cols,row=Math.floor(i/cols);
        var totalW=cols*cw+(cols-1)*18;
        var startX=(w-totalW)/2;
        c.style.left=(startX+col*(cw+18))+'px';
        c.style.top=(24+row*((c.offsetHeight)+18))+'px';
        c.style.transform='rotate(0deg)';
        c.style.zIndex=i+1;
      });
    }
    function makeDraggable(c){
      var ox,oy,sx,sy,moved;
      c.addEventListener('pointerdown',function(e){
        if(e.target.classList.contains('more'))return;
        c.classList.add('drag');c.style.zIndex=++z;moved=false;
        var r=c.getBoundingClientRect(),pr=table.getBoundingClientRect();
        ox=e.clientX-r.left;oy=e.clientY-r.top;sx=e.clientX;sy=e.clientY;
        c.setPointerCapture(e.pointerId);
        c.style.transform='rotate(0deg)';
        function mv(ev){
          if(Math.abs(ev.clientX-sx)>3||Math.abs(ev.clientY-sy)>3)moved=true;
          var pr=table.getBoundingClientRect();
          var x=ev.clientX-pr.left-ox, y=ev.clientY-pr.top-oy;
          x=Math.max(-20,Math.min(pr.width-c.offsetWidth+20,x));
          y=Math.max(-10,Math.min(pr.height-c.offsetHeight+10,y));
          c.style.left=x+'px';c.style.top=y+'px';
        }
        function up(ev){c.classList.remove('drag');c.releasePointerCapture(e.pointerId);
          document.removeEventListener('pointermove',mv);document.removeEventListener('pointerup',up);}
        document.addEventListener('pointermove',mv);document.addEventListener('pointerup',up);
      });
    }
    document.getElementById('shuffleBtn').addEventListener('click',scatter);
    document.getElementById('tidyBtn').addEventListener('click',tidy);
    var pio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){scatter();pio.disconnect();}})},{threshold:.2});
    pio.observe(table);
    window.addEventListener('resize',function(){scatter()});
  })();
