import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
import {FieldPortfolio} from '@/components/FieldPortfolio';
import {projects,timeline} from '@/lib/data';

export default function Home(){return <>
  <noscript><style>{'.reading-view{display:block!important}.field-shell{display:none!important}.field-header button{display:none!important}body{overflow:auto!important}'}</style></noscript>
  <FieldPortfolio>
    <main className="reading-content" id="project-list">
      <div className="reading-heading"><p>SOFTWARE & RESEARCH</p><h1>Ethan Moon</h1><p>University of Michigan computer science engineering student.<br/>Lead Full-Stack Engineer at Ody. Undergraduate researcher at U-M iRaL.</p></div>
      <section aria-label="Projects">{projects.map((p,i)=><article className="reading-project" key={p.id}><div><span>{String(i+1).padStart(2,'0')} / {p.year}</span><h2>{p.name}</h2><small>{p.category}</small></div><div><h3>{p.summary}</h3><p>{p.detail}</p><p className="panel-note">{p.note}</p><div className="project-links">{p.liveUrl&&<a href={p.liveUrl} target="_blank" rel="noreferrer">{p.linkLabel}<ArrowUpRight size={15}/></a>}{p.codeUrl&&<a href={p.codeUrl} target="_blank" rel="noreferrer">Source code<ArrowUpRight size={15}/></a>}</div></div></article>)}</section>
      <section className="reading-about" id="about"><Image src="/ethan-portrait.jpg" alt="Portrait of Ethan Moon" width={480} height={640} sizes="(max-width:700px) 80vw, 300px"/><div><p className="panel-kicker">10 / ABOUT ME</p><h2>About me</h2><p>I’m studying computer science and math at Michigan. I work on backend systems, applied AI, and simulation, with projects in robotics, bioprinting, audio analysis, and consumer software.</p>{timeline.map(t=><article key={t.title}><small>{t.year}</small><h3>{t.title}</h3><p>{t.body}</p></article>)}</div></section>
      <footer className="reading-footer"><a href="mailto:ethmoon@umich.edu">ethmoon@umich.edu</a><a href="https://github.com/emoon0108" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/ethan-moon0108/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="/Ethan_Moon_Resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a></footer>
    </main>
  </FieldPortfolio>
</>;}
