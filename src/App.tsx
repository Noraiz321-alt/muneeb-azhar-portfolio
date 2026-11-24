import { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Github, Linkedin, Menu, X, Zap } from 'lucide-react'
import { config } from './lib/config'
import { projects } from './data/projects'
import { skills } from './data/skills'
import { experience } from './data/experience'
import { services } from './data/services'
import type { Project } from './types'

const RobotScene = lazy(() => import('./components/3d/RobotScene'))
const nav = ['ABOUT','SKILLS','PROJECTS','EXPERIENCE','SERVICES','GITHUB','CONTACT']
const reveal = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: .6 } } }
const placeholder = (value?: string) => !value || value.startsWith('ADD_')

function App() {
  const [active, setActive] = useState('HOME')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const [skill, setSkill] = useState<string | null>(null)
  const [formState, setFormState] = useState('')
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id.toUpperCase())
    }), { rootMargin: '-35% 0px -55% 0px' })
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => { setMobileOpen(false); document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' }) }
  const external = (href: string, label: string) => placeholder(href) ? <span className="link-placeholder" title={`${label} link not configured`}>Link not configured</span> : <a href={href} target="_blank" rel="noreferrer" aria-label={label}>{label}<ArrowUpRight size={14}/></a>

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (placeholder(config.email)) { setFormState('Contact email is not configured yet. Please use GitHub or update src/lib/config.ts.'); return }
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Portfolio inquiry — ${String(form.get('project'))}`)
    const body = encodeURIComponent(`From: ${form.get('name')} (${form.get('email')})\n\n${form.get('message')}`)
    window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`
    setFormState('Your email app should open with the message ready to send.')
  }

  return <>
    <div className="ambient" aria-hidden="true"/><header className="topbar">
      <button className="brand" onClick={() => scrollTo('home')} aria-label="Muneeb Azhar home"><span className="brand-mark">M<span>.</span></span><span>MA<span className="brand-slash"> / </span>ENGINEERING</span></button>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(item=><button key={item} className={active===item?'nav-active':''} onClick={()=>scrollTo(item)}>{item}</button>)}</nav>
      <button className="nav-contact" onClick={()=>scrollTo('contact')}>LET'S TALK <ArrowUpRight size={15}/></button>
      <button className="mobile-toggle" onClick={()=>setMobileOpen(!mobileOpen)} aria-label={mobileOpen?'Close menu':'Open menu'}>{mobileOpen?<X/>:<Menu/>}</button>
    </header>
    <AnimatePresence>{mobileOpen&&<motion.nav className="mobile-menu" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} aria-label="Mobile navigation">{['HOME',...nav].map(item=><button key={item} onClick={()=>scrollTo(item)}>{item}<ArrowUpRight size={15}/></button>)}</motion.nav>}</AnimatePresence>

    <main>
      <section id="home" className="hero section-shell">
        <div className="hero-copy">
          <motion.div initial={reduceMotion?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} className="eyebrow"><span className="status-dot"/> AVAILABLE FOR SELECT PROJECTS <span className="eyebrow-line"/></motion.div>
          <motion.p className="hero-name" initial={reduceMotion?false:{opacity:0}} animate={{opacity:1}} transition={{delay:.1}}>MUNEEB AZHAR <span>— SOFTWARE ENGINEER</span></motion.p>
          <motion.h1 initial={reduceMotion?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.15}}>Engineering <span className="gradient-text">mobile-first</span><br/>digital products<span className="cyan">.</span></motion.h1>
          <motion.p className="hero-lede" initial={reduceMotion?false:{opacity:0}} animate={{opacity:1}} transition={{delay:.28}}>Senior React Native &amp; Full Stack Developer. I build scalable mobile and web applications with React Native, React, TypeScript, Laravel, Node.js, Firebase and modern AI technologies.</motion.p>
          <motion.div className="hero-actions" initial={reduceMotion?false:{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.4}}><button className="button button-primary" onClick={()=>scrollTo('projects')}>EXPLORE MY WORK <ArrowRight size={16}/></button><button className="button button-quiet" onClick={()=>scrollTo('contact')}>START A CONVERSATION <ArrowUpRight size={16}/></button></motion.div>
          <div className="hero-social">{external(config.github,'GitHub')}{external(config.linkedin,'LinkedIn')}{external(config.upwork,'Upwork')}</div>
          <div className="hero-metrics"><div><strong>05<span>+</span></strong><small>YEARS BUILDING</small></div><i/><div><strong>08<span>+</span></strong><small>APPS &amp; PROJECTS</small></div><i/><div><strong>iOS<span> / </span>Android</strong><small>SHIPPED PLATFORMS</small></div></div>
        </div>
        <div className="hero-visual"><div className="visual-grid"/><div className="scene-frame"><Suspense fallback={<div className="scene-loading">INITIALIZING ENGINEERING CORE…</div>}><RobotScene/></Suspense><span className="hud-label hud-top"><span className="status-dot"/> SYSTEM ONLINE</span><span className="hud-label hud-side">CORE / 001<br/>ENGINEERING MODE</span><span className="hud-label hud-bottom">REACT NATIVE <b>·</b> FULL STACK <b>·</b> AI SYSTEM</span></div><div className="visual-caption"><span>FIG. 01</span> SOFTWARE, ENGINEERED WITH INTENT <span className="caption-line"/></div></div>
        <button className="scroll-hint" onClick={()=>scrollTo('about')}><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/></button>
      </section>

      <section id="about" className="section-shell content-section"><div className="section-heading"><p className="eyebrow">01 / THE ENGINEER</p><h2>Built for the <span className="gradient-text">real world.</span></h2></div><div className="about-grid"><p className="about-lead">I turn complex product ideas into dependable, intuitive software—across the pocket, the browser, and the backend.</p><div className="about-copy"><p>With 5+ years of professional development experience, I specialize in React Native mobile applications and modern full-stack development. My work spans product architecture, API development, cloud integrations, and shipping to the Apple App Store and Google Play.</p><p>From Firebase-backed experiences to Laravel and Node.js services, I focus on building practical systems that are maintainable, performant, and ready for real users. I also work with AI integrations and automation to make products and workflows smarter.</p><div className="education"><span>EDUCATION</span><strong>Master's in Computer Science</strong><small>Superior University Lahore</small></div></div></div><div className="stat-row">{[['05+','YEARS EXPERIENCE'],['08+','APPLICATIONS / PROJECTS'],['RN','MOBILE SPECIALIZATION'],['iOS + ANDROID','PUBLISHED PLATFORMS']].map(([n,l])=><div className="stat" key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></section>

      <section id="skills" className="section-shell content-section"><div className="section-heading"><p className="eyebrow">02 / TOOLKIT</p><h2>Systems I <span className="gradient-text">build with.</span></h2><p className="section-intro">A connected toolkit, selected to solve product problems—not to fill a checklist.</p></div><div className="skill-layout"><div className="skill-categories">{[...new Set(skills.map(s=>s[0]))].map(category=><span key={category}>{category}</span>)}</div><div className="skill-matrix">{skills.map(([category,name,description],i)=><button key={name} onMouseEnter={()=>setSkill(name)} onFocus={()=>setSkill(name)} onClick={()=>setSkill(name)} className={`skill-node ${skill===name?'selected':''}`} style={{'--node':i} as React.CSSProperties}><span className="node-dot"/><span>{name}</span><small>{category}</small>{skill===name&&<span className="skill-tip">{description}</span>}</button>)}</div></div></section>

      <section id="projects" className="section-shell content-section"><div className="section-heading heading-inline"><div><p className="eyebrow">03 / SELECTED WORK</p><h2>Products with <span className="gradient-text">purpose.</span></h2></div><span className="section-count">01 — 05 / 05</span></div><div className="project-grid">{projects.map((project,index)=><motion.button key={project.name} className="project-card" onClick={()=>setSelected(project)} whileHover={reduceMotion?undefined:{y:-6}} initial={reduceMotion?false:'hidden'} whileInView="show" viewport={{once:true,amount:.15}} variants={reveal} style={{'--accent':project.accent} as React.CSSProperties}><div className="project-top"><span>{String(index+1).padStart(2,'0')} / {project.category}</span><ArrowUpRight size={17}/></div><div className="project-art" aria-hidden="true"><div className="art-orbit orbit-a"/><div className="art-orbit orbit-b"/><div className="art-core"><Code2 size={26}/></div><span className="art-corner">{project.technologies[0]}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="tag-row">{project.technologies.map(tech=><span key={tech}>{tech}</span>)}</div><div className="project-more">VIEW CASE STUDY <ArrowRight size={14}/></div></motion.button>)}</div></section>

      <section id="experience" className="section-shell content-section"><div className="section-heading"><p className="eyebrow">04 / EXPERIENCE</p><h2>Where I’ve <span className="gradient-text">contributed.</span></h2><p className="section-intro">Professional experience across product teams. Exact dates and role details can be added when confirmed.</p></div><div className="timeline">{experience.map((job,i)=><div className="timeline-item" key={job.company}><div className="timeline-marker">0{i+1}</div><div className="timeline-body"><div className="timeline-heading"><div><h3>{job.company}</h3><span>{job.role}</span></div><time>{job.duration}</time></div><p>{job.responsibilities[0]}. Focused on building and supporting real-world software products.</p><div className="tag-row">{job.technologies.map(t=><span key={t}>{t}</span>)}</div></div></div>)}</div></section>

      <section id="services" className="section-shell content-section"><div className="section-heading"><p className="eyebrow">05 / CAPABILITIES</p><h2>From first screen to <span className="gradient-text">production.</span></h2></div><div className="service-grid">{services.map(([title,Icon,description],i)=><motion.article className="service-card" key={title} whileHover={reduceMotion?undefined:{y:-4}}><span className="service-index">{String(i+1).padStart(2,'0')}</span><Icon size={21}/><h3>{title}</h3><p>{description}</p><span className="service-arrow"><ArrowUpRight size={15}/></span></motion.article>)}</div></section>

      <section id="github" className="section-shell github-section"><div className="github-icon"><Github size={27}/></div><div><p className="eyebrow">06 / CODE &amp; COLLABORATION</p><h2>Open source, <span className="gradient-text">open mind.</span></h2><p>Explore my public code and project work on GitHub. Repository activity and statistics are intentionally not fabricated.</p></div><a className="button button-outline" href={config.github} target="_blank" rel="noreferrer">VISIT GITHUB <ArrowUpRight size={16}/></a></section>

      <section id="contact" className="section-shell content-section contact-section"><div className="contact-copy"><p className="eyebrow">07 / CONTACT</p><h2>Let's build<br/><span className="gradient-text">something great.</span></h2><p>Have an app, product, or engineering challenge in mind? Share a little about it and let's explore the next step.</p><div className="contact-links">{external(config.email,'Email')}{external(config.linkedin,'LinkedIn')}{external(config.github,'GitHub')}{external(config.upwork,'Upwork')}</div></div><form className="contact-form" onSubmit={sendMessage}><div className="form-grid"><label>Name<input name="name" autoComplete="name" required placeholder="Your name"/></label><label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@example.com"/></label></div><label>Project type<select name="project" defaultValue=""><option value="" disabled>Select a project type</option><option>Mobile application</option><option>Full stack product</option><option>Backend / API</option><option>AI integration</option><option>Other</option></select></label><label>Message<textarea name="message" required rows={4} placeholder="A little about what you’re building…"/></label><button className="button button-primary" type="submit">PREPARE MESSAGE <ArrowRight size={16}/></button>{formState&&<p className="form-note" role="status">{formState}</p>}</form></section>
    </main>
    <footer className="footer section-shell"><div><button className="brand" onClick={()=>scrollTo('home')}><span className="brand-mark">M<span>.</span></span><span>MUNEEB AZHAR</span></button><p>Senior React Native &amp; Full Stack Developer</p><small>React Native · React · TypeScript · Laravel · Node.js · Firebase · AI</small></div><div className="footer-right"><div className="hero-social">{external(config.github,'GitHub')}{external(config.linkedin,'LinkedIn')}{external(config.upwork,'Upwork')}{external(config.email,'Email')}</div><span>© {new Date().getFullYear()} Muneeb Azhar. Built with intent.</span></div></footer>

    <AnimatePresence>{selected&&<motion.div className="modal-backdrop" role="presentation" onClick={()=>setSelected(null)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.article className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title" onClick={e=>e.stopPropagation()} initial={reduceMotion?false:{opacity:0,y:25,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:15}}><button className="modal-close" onClick={()=>setSelected(null)} aria-label="Close case study"><X/></button><p className="eyebrow">ENGINEERING CASE FILE / {selected.category}</p><h2 id="case-title">{selected.name}</h2><p className="case-summary">{selected.description}</p><div className="case-columns"><div><h3>OVERVIEW</h3><p>{selected.solution}</p><h3>PROBLEM</h3><p>{selected.problem}</p><h3>SOLUTION</h3><p>{selected.solution}</p><h3>TECHNICAL CHALLENGES</h3><p>{selected.challenge}</p></div><div><h3>KEY FEATURES</h3><ul>{selected.features.map(feature=><li key={feature}><Check size={14}/>{feature}</li>)}</ul><h3>TECHNOLOGY</h3><div className="tag-row">{selected.technologies.map(t=><span key={t}>{t}</span>)}</div><h3>MY ROLE</h3><p>{selected.role}</p><h3>RESULT</h3><p>{selected.result}</p></div></div><div className="case-links">{Object.entries({GitHub:selected.links.github,Demo:selected.links.demo,'App Store':selected.links.appStore,'Google Play':selected.links.playStore}).map(([label,url])=><div key={label}>{external(url,label)}</div>)}</div></motion.article></motion.div>}</AnimatePresence>
  </>
}

export default App
