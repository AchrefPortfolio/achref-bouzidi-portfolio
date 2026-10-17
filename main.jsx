import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, ArrowDown, X, ChevronLeft, ChevronRight, Menu, Mail, Phone, Instagram, Linkedin } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';

const portrait = '/images/WhatsApp-Image-2026-10-15-at-10.jpg';
const signature = '/images/sgine-1-removebg-preview.png';
const digitalFiles = [
  ['barca-x-travis-scott','Barça x Travis Scott','barca x travis scott.jpg','Culture · Digital Artwork'],
  ['bmw-m4','BMW M4','bmw m4.jpg','Automotive · Digital Artwork'],
  ['burger-dynamite','Burger Dynamite','burger dynamite.jpg','Food Campaign · Digital'],
  ['bus-tracker','Bus Tracker','bus tracker.png','Digital Design · UI Concept'],
  ['canon','Canon','canon.jpg','Product · Advertising'],
  ['charles-leclerc','Charles Leclerc','charles leclerc.jpg','Sports · Digital Artwork'],
  ['chocotom','Chocotom','chocotom.jpg','Product · Advertising'],
  ['club-dete','Club D’été','club dete.png','Campaign · Digital Design'],
  ['coffee','COFEE','COFEE.jpg','Product · Digital Design'],
  ['dream-juice','Dream Juice','deam juice.jpg','Beverage · Campaign'],
  ['nutella','Nutella','nutella.jpg','Product · Advertising'],
  ['penguin','Penguin Affiche','penguin affiche.jpg','Poster · Digital Design'],
  ['planning','Planning','planning.png','Graphic Design · Layout'],
  ['portfolio-2','Social Media','portfolio-2.png','Digital Design · Campaign'],
  ['pringles','Pringles','pringles.jpg','Product · Advertising'],
  ['promo-affiche','Promo Affiche','promo affiche.jpg','Promotional Poster'],
  ['promo-eid','Promo Eid','promo eid.png','Seasonal Campaign'],
  ['puma','Puma Future','puma futur 1.jpg','Sports · Advertising'],
  ['queen','Queen','queen.jpg','Digital Artwork'],
  ['ramadhan-planning','Ramadhan Planning','ramadhan planning.png','Seasonal · Graphic Design'],
  ['retro','Branding','retro.jpg','Visual Identity · Digital'],
  ['soldier','Soldier','soldier.jpg','Digital Artwork'],
  ['tkwira','TKWIRA','TKWIRA-v2.png','Sports · Digital Design'],
  ['valentine','Valentine','valentine.png','Campaign · Digital Design'],
  ['flash-sale','Vente Flash','vente flash.png','Promotional Campaign']
].map(([id,title,file,category]) => ({ id,title,type:'digital',category,image:`/images/digital/${file}`,description:`${title} — a selected digital design from Achref Bouzidi’s portfolio.`}));
const printedFiles = [
  {id:'7enna',title:'7enna',category:'Invitation · Print Design',image:'/images/printed/7enna.png',gallery:[['/images/printed/7enna.png','Original Design'],['/images/printed/mockups/7enna mockup.png','Mockup']]},
  {id:'card',title:'Business Card',category:'Brand Identity · Print',image:'/images/printed/carte visite.png',gallery:[['/images/printed/carte visite.png','Business Card'],['/images/printed/carte visite 2 face 1.png','Front Face'],['/images/printed/carte visite 2 face 2.png','Back Face']]},
  {id:'wedding',title:'Wedding',category:'Invitation · Print Design',image:'/images/printed/wedding.gif',gallery:[['/images/printed/wedding.gif','Original Design'],['/images/printed/mockups/wedding mockup.PNG','Mockup']]},
  {id:'nou7',title:'Nou7',category:'Invitation · Print Design',image:'/images/printed/nou7.png',gallery:[['/images/printed/nou7.png','Original Design'],['/images/printed/mockups/nou7 mockup.png','Mockup']]}
].map(p=>({...p,type:'printed',description:`${p.title} — print design presented with the original artwork and its mockup.`}));
const projects = [...printedFiles, ...digitalFiles];

function Header(){
  const [open,setOpen]=useState(false);
  return <header className="header"><a className="monogram" href="#home" aria-label="Achref Bouzidi home">AB<span>.</span></a><div className="header-line"/><nav className={open?'nav nav-open':'nav'}>{[['Home','#home'],['Work','#work'],['About','#about'],['Services','#services'],['Contact','#contact']].map(([t,h])=><a key={h} href={h} onClick={()=>setOpen(false)}>{t}</a>)}</nav><button className="mobile-menu" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button><a className="talk-link" href="#contact">LET’S TALK <ArrowUpRight size={13}/></a></header>
}
function Modal({project,close}){
  const gallery=project.gallery?.map(([src,label])=>({src,label}))||[{src:project.image,label:'Project artwork'}];
  const [i,setI]=useState(0);
  useEffect(()=>{const key=e=>{if(e.key==='Escape')close();if(e.key==='ArrowRight')setI(v=>(v+1)%gallery.length);if(e.key==='ArrowLeft')setI(v=>(v-1+gallery.length)%gallery.length)};window.addEventListener('keydown',key);document.body.style.overflow='hidden';return()=>{window.removeEventListener('keydown',key);document.body.style.overflow=''}},[close,gallery.length]);
  return <div className="backdrop" onMouseDown={e=>e.target===e.currentTarget&&close()}><section className="modal" role="dialog" aria-modal="true" aria-label={project.title}><button className="close" onClick={close} aria-label="Close gallery"><X/></button><div className="modal-image"><button className="arrow prev" onClick={()=>setI(v=>(v-1+gallery.length)%gallery.length)} aria-label="Previous image"><ChevronLeft/></button><img src={gallery[i].src} alt={`${project.title} — ${gallery[i].label}`} onError={e=>e.currentTarget.classList.add('image-error')}/><button className="arrow next" onClick={()=>setI(v=>(v+1)%gallery.length)} aria-label="Next image"><ChevronRight/></button><small>{String(i+1).padStart(2,'0')} / {String(gallery.length).padStart(2,'0')}</small></div><div className="modal-info"><p className="eyebrow">{project.type==='printed'?'PRINTED DESIGN':'DIGITAL DESIGN'}</p><h2>{project.title}</h2><p>{project.description}</p>{gallery.length>1&&<div className="thumbs">{gallery.map((g,j)=><button className={j===i?'thumb active':'thumb'} key={g.src} onClick={()=>setI(j)}><img src={g.src} alt=""/><span>{g.label}</span></button>)}</div>}<p className="gallery-hint">Use ← → keys to browse · Esc to close</p></div></section></div>
}
function Work(){
  const [filter,setFilter]=useState('all'),[selected,setSelected]=useState(null);
  const visible=useMemo(()=>projects.filter(p=>filter==='all'||p.type===filter),[filter]);
  return <section className="work section" id="work"><div className="section-head reveal"><div><p className="eyebrow">01 / SELECTED PROJECTS</p><h2>My <em>Work</em><span className="gold-dot">.</span></h2><p className="section-note">A selection of visual ideas, made tangible.</p></div><div className="filters" role="group" aria-label="Filter projects">{[['all','ALL',projects.length],['digital','DIGITAL',digitalFiles.length],['printed','PRINTED',printedFiles.length]].map(([v,l,n])=><button className={filter===v?'active':''} key={v} onClick={()=>setFilter(v)}>{l}<sup>{n}</sup></button>)}</div></div><div className="grid">{visible.map((p,index)=><button className="project" key={p.id} onClick={()=>setSelected(p)} style={{'--i':index}} aria-label={`Open ${p.title} project`}><div className="thumb-image"><img src={p.image} alt={p.title} loading="lazy" onError={e=>{e.currentTarget.style.display='none';e.currentTarget.parentElement.classList.add('broken')}}/><span className="missing">Image not found — check filename</span><span className="project-open"><ArrowUpRight size={17}/></span><span className="project-count">{String(index+1).padStart(2,'0')}</span></div><div className="caption"><div><h3>{p.title}</h3><p>{p.category}</p></div><small>{p.type==='printed'?'PRINT':'DIGITAL'}</small></div></button>)}</div>{selected&&<Modal project={selected} close={()=>setSelected(null)}/>}</section>
}
function ContactLink({href,icon,label,value,external=false}){const Icon=icon;return <a className="contact-link" href={href} {...(external?{target:'_blank',rel:'noreferrer'}:{})}><span className="contact-icon"><Icon size={16}/></span><span><small>{label}</small><strong>{value}</strong></span><ArrowUpRight className="contact-arrow" size={15}/></a>}
function App(){
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const lenis=new Lenis({duration:1.05,smoothWheel:true,wheelMultiplier:0.9,touchMultiplier:1.15});
    let rafId;const raf=t=>{lenis.raf(t);rafId=requestAnimationFrame(raf)};rafId=requestAnimationFrame(raf);
    lenis.on('scroll',ScrollTrigger.update);
    const update=()=>ScrollTrigger.refresh();
    const ctx=gsap.context(()=>{
      gsap.from('.hero .eyebrow',{y:16,opacity:0,duration:.65,delay:.1,ease:'power2.out'});
      gsap.from('.hero h1 .name-line',{y:70,opacity:0,duration:1,stagger:.13,delay:.12,ease:'power4.out'});
      gsap.from('.hero .sub, .hero .intro, .hero .actions',{y:20,opacity:0,duration:.7,stagger:.1,delay:.42,ease:'power2.out'});
      gsap.from('.portrait',{scale:1.04,opacity:0,duration:1.15,delay:.2,ease:'power2.out'});
      gsap.from('.hero-sig',{x:30,opacity:0,duration:.85,delay:.7,ease:'power2.out'});
      gsap.utils.toArray('.reveal, .about-copy, .about-portrait, .service-row, .contact-copy, .contact-link').forEach(el=>gsap.from(el,{y:24,opacity:0,duration:.72,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
      gsap.utils.toArray('.project').forEach(el=>gsap.from(el,{y:25,opacity:0,duration:.62,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
    });
    window.addEventListener('load',update);const timer=setTimeout(update,300);
    return()=>{clearTimeout(timer);window.removeEventListener('load',update);ctx.revert();lenis.destroy();cancelAnimationFrame(rafId);};
  },[]);
  return <><div className="dark"><Header/><section className="hero" id="home"><div className="hero-copy"><p className="eyebrow"><b/> GRAPHIC & DIGITAL DESIGNER <span className="hero-location-inline">/ TUNISIA</span></p><h1><span className="name-line">Achref</span><span className="name-line name-indent">Bouzidi<span className="gold-dot">.</span></span></h1><p className="sub">Turning ideas into<br/><em>visual experiences.</em></p><p className="intro">I design brand identities, print materials<br className="desktop"/> and digital experiences that connect<br className="desktop"/> people with ideas.</p><div className="actions"><a href="#work">EXPLORE MY WORK <ArrowRight size={15}/></a><a className="quiet" href="#contact">GET IN TOUCH</a></div><div className="scroll">SCROLL TO EXPLORE <span/><ArrowDown size={12}/></div></div><div className="portrait-wrap"><div className="halo"/><div className="portrait-frame"><img className="portrait" src={portrait} alt="Achref Bouzidi portrait"/></div><img className="sig hero-sig" src={signature} alt="Achref Bouzidi handwritten signature"/><div className="location">BASED IN TUNISIA<br/><b/> AVAILABLE WORLDWIDE</div></div><small className="hero-index">INDEPENDENT DESIGNER — 2026</small><div className="hero-grain"/></section></div><Work/><section className="about section" id="about"><div className="about-copy"><p className="eyebrow">02 / A LITTLE ABOUT ME</p><h2>Design with<br/><em>intention.</em></h2><p className="body-copy">I’m Achref Bouzidi, a graphic and digital designer based in Tunisia. I create visual identities, print designs and digital experiences that help ideas stand out and connect with people.</p><a className="dark-link" href="#contact">LET’S WORK TOGETHER <ArrowRight size={15}/></a></div><div className="about-portrait"><img src={portrait} alt="Achref Bouzidi"/><img className="sig" src={signature} alt="Signature"/></div><aside>IDEAS<br/>BECOME<br/><em>VISUALS.</em></aside></section><section className="services section" id="services"><div className="service-intro"><p className="eyebrow">03 / WHAT I DO</p><h2>Services<br/><em>I offer.</em></h2><p>Thoughtful design, from the first idea to the final detail.</p><img className="sig" src={signature} alt=""/></div><div className="service-list">{[['01','Brand Identity','Logos, visual systems, guidelines.'],['02','Print Design','Posters, flyers, business cards, invitations.'],['03','Digital Design','Social media, web graphics, digital campaigns.'],['04','Creative Direction','Concepts, art direction, visual storytelling.']].map(([n,t,d])=><div className="service-row" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><ArrowRight/></div>)}<a href="#contact">LET’S CREATE SOMETHING GREAT <ArrowRight size={15}/></a></div></section><section className="contact section" id="contact"><div className="contact-copy"><p className="eyebrow">04 / GET IN TOUCH</p><h2>Let’s make<br/><em>something.</em></h2><p className="body-copy">Have a project in mind or want to say hello? Reach out directly through any of the channels below.</p><img className="contact-signature" src={signature} alt="Achref Bouzidi signature"/></div><div className="contact-links"><ContactLink href="mailto:achrefbouzidi89@gmail.com" icon={Mail} label="EMAIL" value="achrefbouzidi89@gmail.com"/><ContactLink href="tel:+21650116513" icon={Phone} label="PHONE" value="+216 50116513"/><ContactLink href="https://www.instagram.com/graphist.lab/" icon={Instagram} label="INSTAGRAM" value="@graphist.lab" external/><ContactLink href="https://www.linkedin.com/in/achref-bouzidi-092610432/" icon={Linkedin} label="LINKEDIN" value="Connect with me" external/></div></section><footer className="footer"><a className="monogram" href="#home">AB<span>.</span></a><img className="footer-sig" src={signature} alt="Achref Bouzidi signature"/><p>Graphic & Digital Designer<br/><span>Tunis, Tunisia</span></p><div className="social"><small>FOLLOW ME</small><a href="https://www.instagram.com/graphist.lab/" target="_blank" rel="noreferrer">IG ↗</a><a href="https://www.linkedin.com/in/achref-bouzidi-092610432/" target="_blank" rel="noreferrer">IN ↗</a></div><small>© 2026 Achref Bouzidi</small></footer></>;
}
createRoot(document.getElementById('root')).render(<App/>);
