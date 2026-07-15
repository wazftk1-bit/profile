import { useState, useEffect } from 'react'
import './App.css'

const TRANSLATIONS = {
  ar: {
    nav: { home: 'الرئيسية', about: 'عني', skills: 'مهاراتي', projects: 'أعمالي', contact: 'تواصل' },
    hero: { greeting: 'مرحباً، أنا', cta1: 'شاهد أعمالي', cta2: 'تواصل معي' },
    about: { subtitle: 'من أنا', title: 'عني', cards: [
      { icon: '🎯', title: 'دقة', desc: 'أهتم بأدق التفاصيل في كل مشروع' },
      { icon: '⚡', title: 'سرعة', desc: 'تسليم المشاريع في الوقت المحدد' },
      { icon: '💡', title: 'إبداع', desc: 'حلول مبتكرة لمشاكلك' },
      { icon: '🤝', title: 'تواصل', desc: 'متواصل معك طوال فترة العمل' }
    ]},
    skills: { subtitle: 'ما أجيده', title: 'مهاراتي' },
    projects: { subtitle: 'أعمالي', title: 'مشاريعي', visit: 'زيارة الموقع →' },
    contact: { subtitle: 'لنتحدث', title: 'تواصل معي', email: 'البريد', phone: 'الهاتف', location: 'الموقع' },
    footer: 'جميع الحقوق محفوظة.'
  },
  en: {
    nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
    hero: { greeting: "Hello, I'm", cta1: 'View My Work', cta2: 'Contact Me' },
    about: { subtitle: 'Who I Am', title: 'About Me', cards: [
      { icon: '🎯', title: 'Precision', desc: 'I care about every detail in every project' },
      { icon: '⚡', title: 'Speed', desc: 'Delivering projects on time' },
      { icon: '💡', title: 'Creativity', desc: 'Innovative solutions for your problems' },
      { icon: '🤝', title: 'Communication', desc: 'Available throughout the project' }
    ]},
    skills: { subtitle: 'What I Do', title: 'My Skills' },
    projects: { subtitle: 'My Work', title: 'My Projects', visit: 'Visit Site →' },
    contact: { subtitle: "Let's Talk", title: 'Contact Me', email: 'Email', phone: 'Phone', location: 'Location' },
    footer: 'All rights reserved.'
  }
}

const MY_DATA = {
  name: "Muhamed Fuad",
  title: { ar: "مطور واجهات أمامية", en: "Front-End Developer" },
  email: "wazftk1@email.com",
  phone: "+201150397269",
  location: { ar: "مصر", en: "Egypt" },
  bio: {
    ar: "مطور واجهات أمامية متخصص في بناء تجارب مستخدم استثنائية. أجيد HTML, CSS, JavaScript, React.js و Firebase.",
    en: "Front-end developer specializing in building exceptional user experiences. Proficient in HTML, CSS, JavaScript, React.js and Firebase."
  },
  image: "/good.jpg",
  social: { github: "https://github.com/ahmed", linkedin: "https://linkedin.com/in/ahmed", twitter: "https://twitter.com/ahmed" }
}

const PROJECTS = [
  {
    id: 1,
    title: {
      ar: "NexaTech - وكالة رقمية",
      en: "NexaTech Digital Agency"
    },
    desc: {
      ar: "موقع وكالة رقمية حديث يعرض الخدمات والأعمال بتصميم احترافي وسريع.",
      en: "Modern digital agency website showcasing services and portfolio."
    },
    tech: ["React", "Vite", "CSS3"],
    link: "https://nexa-tech-digital-agency.vercel.app/",
    image: "/projects/nexatech.jpg"
  },

  {
    id: 2,
    title: {
      ar: "ChatWave Messenger",
      en: "ChatWave Messenger"
    },
    desc: {
      ar: "تطبيق محادثات فورية يدعم الرسائل في الوقت الحقيقي.",
      en: "Real-time messaging application with instant chat."
    },
    tech: ["React", "Firebase", "Realtime Database"],
    link: "https://chat-wave-real-time-messenger.vercel.app/",
    image: "/projects/chatwave.jpg"
  },

  {
    id: 3,
    title: {
      ar: "Clean Text Pro",
      en: "Clean Text Pro"
    },
    desc: {
      ar: "منصة SaaS لتنظيف النصوص العربية وإزالة التشكيل والرموز.",
      en: "SaaS platform for cleaning Arabic text and removing unwanted characters."
    },
    tech: ["JavaScript", "HTML5", "CSS3"],
    link: "https://clean-text-pro-saa-s-platform.vercel.app/",
    image: "/projects/cleantext.jpg"
  },

  {
    id: 4,
    title: {
      ar: "SkyCast Pro",
      en: "SkyCast Pro"
    },
    desc: {
      ar: "تطبيق طقس حديث يعرض الأحوال الجوية بتصميم احترافي.",
      en: "Modern weather application with a clean UI."
    },
    tech: ["JavaScript", "Weather API", "CSS3"],
    link: "https://sky-cast-pro-weather-app-five.vercel.app/",
    image: "/projects/skycast.jpg"
  },

  {
    id: 5,
    title: {
      ar: "WanderStay",
      en: "WanderStay Hotel Booking"
    },
    desc: {
      ar: "واجهة حديثة لحجز الفنادق مع تجربة مستخدم احترافية.",
      en: "Modern hotel booking interface with an elegant user experience."
    },
    tech: ["React", "Responsive Design", "CSS3"],
    link: "https://wander-stay-hotel-booking.vercel.app/",
    image: "/projects/wanderstay.jpg"
  }
]

const SKILLS = ["HTML5", "CSS3", "JavaScript", "React.js", "Firebase", "Git", "Responsive Design", "UI/UX"]

function Navbar({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <nav className={'navbar ' + (scrolled ? 'navbar-scrolled' : '')}>
      <div className="nav-logo">{MY_DATA.name.split(' ')[0]}<span className="nav-dot">.</span></div>
      <div className="nav-links">
        {[{ label: t.nav.home, id: 'hero' }, { label: t.nav.about, id: 'about' }, { label: t.nav.skills, id: 'skills' }, { label: t.nav.projects, id: 'projects' }, { label: t.nav.contact, id: 'contact' }].map(item => (
          <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link">{item.label}</button>
        ))}
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="lang-btn">{lang === 'ar' ? 'EN' : 'عربي'}</button>
      </div>
    </nav>
  )
}

function Hero({ lang, t }) {
  return (
    <section id="hero" className="hero">
      <div className="hero-line-v"></div>
      <div className="hero-line-h"></div>
      <div className="hero-content">
        <div className={'hero-text ' + (lang === 'ar' ? 'rtl' : 'ltr')}>
          <p className="hero-greeting">{t.hero.greeting}</p>
          <h1 className="hero-name">{MY_DATA.name}</h1>
          <h2 className="hero-title">{MY_DATA.title[lang]}</h2>
          <p className="hero-bio">{MY_DATA.bio[lang]}</p>
          <div className="hero-buttons">
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary">{t.hero.cta1}</button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-outline">{t.hero.cta2}</button>
          </div>
        </div>
        <div className="hero-image-wrapper"><img src={MY_DATA.image} alt={MY_DATA.name} className="hero-image" /></div>
      </div>
    </section>
  )
}

function About({ t }) {
  return (
    <section id="about" className="about">
      <div className="container">
        <p className="section-subtitle">{t.about.subtitle}</p>
        <h2 className="section-title light">{t.about.title}</h2>
        <div className="about-grid">
          {t.about.cards.map((item, i) => (
            <div key={i} className="about-card">
              <div className="about-card-icon">{item.icon}</div>
              <h3 className="about-card-title">{item.title}</h3>
              <p className="about-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills({ t }) {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <p className="section-subtitle">{t.skills.subtitle}</p>
        <h2 className="section-title dark">{t.skills.title}</h2>
        <div className="skills-grid">
          {SKILLS.map((skill, i) => <div key={i} className="skill-tag">{skill}</div>)}
        </div>
      </div>
    </section>
  )
}

function Projects({ lang, t }) {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <p className="section-subtitle">{t.projects.subtitle}</p>
        <h2 className="section-title light">{t.projects.title}</h2>
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title[lang]} className="project-image" />
                <div className="project-overlay"><a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">{t.projects.visit}</a></div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title[lang]}</h3>
                <p className="project-desc">{project.desc[lang]}</p>
                <div className="project-tech">{project.tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ lang, t }) {
  return (
    <section id="contact" className="contact">
      <div className="contact-line"></div>

      <div className="container">
        <p className="section-subtitle">{t.contact.subtitle}</p>

        <h2 className="section-title dark">
          {t.contact.title}
        </h2>

        <div className="contact-grid">
          {[
            { icon: "📧", label: t.contact.email, value: MY_DATA.email },
            { icon: "📱", label: t.contact.phone, value: MY_DATA.phone },
            { icon: "📍", label: t.contact.location, value: MY_DATA.location[lang] },
          ].map((item, i) => (
            <div key={i} className="contact-card">
              <div className="contact-icon">{item.icon}</div>
              <p className="contact-label">{item.label}</p>
              <p className="contact-value">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="footer">
      <p>© 2026 {MY_DATA.name}. {t.footer}</p>
      <p className="footer-built">Built with React.js ❤️</p>
    </footer>
  )
}

function App() {
  const [lang, setLang] = useState('ar')
  const t = TRANSLATIONS[lang]
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])
  return (
    <div className={'app ' + lang}>
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero lang={lang} t={t} />
      <About t={t} />
      <Skills t={t} />
      <Projects lang={lang} t={t} />
      <Contact lang={lang} t={t} />
      <Footer t={t} />
    </div>
  )
}

export default App
