import React, { useState, useEffect } from "react";
import mee from "./assets/meee.jpg";

/* ------------------------------------------------------------------ */
/*  Hooks & helpers                                                    */
/* ------------------------------------------------------------------ */

const useInView = (options = {}) => {
  const [ref, setRef] = useState();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2, ...options }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, inView];
};

const useTypewriter = (text, speed = 80) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};

const AnimatedCounter = ({ end, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / 1500, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, inView]);

  return <span>{count}</span>;
};

/* ------------------------------------------------------------------ */
/*  UI atoms                                                           */
/* ------------------------------------------------------------------ */

const SectionLabel = ({ children, color = "bg-brutal-yellow" }) => (
  <span
    className={`inline-block ${color} border-3 border-black shadow-brutal-sm px-4 py-1 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest`}
  >
    {children}
  </span>
);

const SkillBar = ({ label, level, inView, delay = 0, color }) => (
  <div>
    <div className="flex justify-between font-mono text-sm font-bold uppercase mb-2">
      <span>{label}</span>
      <span>{level}%</span>
    </div>
    <div className="h-7 bg-white border-3 border-black">
      <div
        className={`h-full border-r-3 border-black ${color} transition-all duration-1000 ease-out`}
        style={{ width: inView ? `${level}%` : "0%", transitionDelay: `${delay}ms` }}
      />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Navbar                                                            */
/* ------------------------------------------------------------------ */

const NAV_LINKS = ["Home", "About", "Skills", "Work", "Contact"];

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNav(false);
  };

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="bg-brutal-cream border-b-4 border-black">
        <div className="max-w-6xl mx-auto h-20 px-4 flex justify-between items-center">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 group"
          >
            <span className="w-12 h-12 bg-brutal-yellow border-3 border-black shadow-brutal-sm flex items-center justify-center font-display text-xl group-hover:bg-brutal-cyan transition-colors">
              CE
            </span>
            <span className="font-display text-base sm:text-xl uppercase tracking-tight">
              Cheikh Ebeoumar
            </span>
          </button>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center gap-3">
            {NAV_LINKS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="brutal-tag bg-white shadow-brutal-sm hover:bg-brutal-cyan hover:-translate-y-[2px] transition-all"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setNav(!nav)}
            aria-label="Toggle menu"
            className="md:hidden w-11 h-11 bg-brutal-pink border-3 border-black shadow-brutal-sm flex items-center justify-center"
          >
            {!nav ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {nav && (
        <div className="md:hidden bg-brutal-yellow border-b-4 border-black">
          <nav className="flex flex-col p-4 gap-3">
            {NAV_LINKS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="brutal-press bg-white border-3 border-black shadow-brutal-sm py-4 font-display text-2xl uppercase text-left px-4"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Floating social rail (desktop) */}
      <div className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 flex-col z-40">
        {[
          { label: "IN", href: "https://www.linkedin.com/in/cheikhebeoumar", color: "bg-brutal-blue" },
          { label: "GH", href: "https://github.com/CheikhEbeoumar", color: "bg-black" },
          { label: "@", href: "mailto:cheikhbeoumar@yandex.ru", color: "bg-brutal-red" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className={`${s.color} text-white border-3 border-black border-l-0 w-12 h-12 flex items-center justify-center font-display text-sm hover:w-20 transition-all duration-200`}
          >
            {s.label}
          </a>
        ))}
      </div>
    </header>
  );
};

/* ------------------------------------------------------------------ */
/*  Home                                                              */
/* ------------------------------------------------------------------ */

const Marquee = ({ items }) => (
  <div className="bg-black border-y-4 border-black py-3 overflow-hidden">
    <div className="flex whitespace-nowrap animate-marquee">
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="mx-6 font-display uppercase text-brutal-yellow text-lg"
        >
          {item} <span className="text-brutal-pink">★</span>
        </span>
      ))}
    </div>
  </div>
);

const Home = () => {
  const typewriterText = useTypewriter("I build full-stack web apps.", 55);

  const scrollToWork = () =>
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen pt-20 bg-brutal-yellow bg-grid flex items-center overflow-hidden"
      >
        {/* decorative brutalist shapes */}
        <div className="hidden md:block absolute top-32 right-16 w-28 h-28 bg-brutal-pink border-4 border-black shadow-brutal-lg rotate-12 animate-float" />
        <div className="hidden md:block absolute bottom-28 right-40 w-20 h-20 bg-brutal-cyan border-4 border-black shadow-brutal rotate-45 animate-float" style={{ animationDelay: "1s" }} />
        <div className="hidden lg:block absolute bottom-40 right-10 w-16 h-16 rounded-full bg-brutal-lime border-4 border-black animate-spin-slow" />
        <div className="hidden lg:block absolute top-40 left-8 w-10 h-10 bg-black rotate-45" />

        <div className="max-w-6xl mx-auto px-4 w-full py-16">
          <div
            className="inline-block bg-white border-3 border-black shadow-brutal-sm px-4 py-2 font-mono font-bold text-xs sm:text-sm uppercase tracking-widest mb-6"
          >
            👋 Hi, my name is
          </div>

          <h1 className="font-display uppercase leading-[0.92] text-5xl sm:text-7xl lg:text-8xl text-black">
            <span className="block">Cheikh</span>
            <span className="inline-block bg-black text-brutal-yellow px-4 py-1 -rotate-1 mt-2">
              Ebeoumar
            </span>
          </h1>

          <h2 className="mt-6 font-mono text-lg sm:text-2xl font-bold min-h-[1.5em]">
            <span className="bg-white border-2 border-black px-2 py-1">
              {typewriterText}
            </span>
            <span className="animate-blink">|</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base sm:text-lg font-medium leading-relaxed">
            Full-Stack Developer with 2+ years of experience building modern web
            applications with Python, Django, React, and MongoDB. Currently
            pursuing a Master's in Software Engineering at ITMO University.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={scrollToWork}
              className="brutal-press bg-black text-white border-3 border-black shadow-brutal px-8 py-4 font-display uppercase text-sm tracking-wide flex items-center gap-3"
            >
              View My Work
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <a
              href="#contact"
              className="brutal-press bg-brutal-pink border-3 border-black shadow-brutal px-8 py-4 font-display uppercase text-sm tracking-wide"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "PYTHON",
          "DJANGO",
          "REACT",
          "NEXT.JS",
          "MONGODB",
          "DOCKER",
          "FULL-STACK",
        ]}
      />
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  About                                                             */
/* ------------------------------------------------------------------ */

const About = () => {
  const [aboutRef, aboutInView] = useInView();

  const stats = [
    { value: 2, suffix: "+", label: "Years Experience", color: "bg-brutal-yellow" },
    { value: 10, suffix: "+", label: "Projects Completed", color: "bg-brutal-cyan" },
  ];

  return (
    <section id="about" className="w-full bg-brutal-cream bg-dots py-24">
      <div className="max-w-6xl mx-auto px-4" ref={aboutRef}>
        <SectionLabel>About Me</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mt-10 items-center">
          <div>
            <h2 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl leading-none mb-8">
              Turning ideas into{" "}
              <span className="bg-brutal-lime border-3 border-black px-2 inline-block -rotate-1">
                reality
              </span>
            </h2>

            <div className="space-y-5 text-base sm:text-lg font-medium leading-relaxed">
              <p
                className={`brutal-card p-5 transition-all duration-700 ${
                  aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <span className="font-display">01.</span> I'm a passionate
                Full-Stack Developer pursuing a Master's in Software Engineering
                at ITMO University in Saint Petersburg.
              </p>
              <p
                className={`brutal-card p-5 transition-all duration-700 delay-150 ${
                  aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <span className="font-display">02.</span> I specialize in scalable
                solutions with Python, Django, React &amp; MongoDB — improving data
                processing efficiency by 30% and serving 100+ daily users.
              </p>
              <p
                className={`brutal-card p-5 transition-all duration-700 delay-300 ${
                  aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <span className="font-display">03.</span> I love solving complex
                problems, researching new technologies, and designing software that
                improves people's lives.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-5">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`${stat.color} border-3 border-black shadow-brutal p-5 brutal-press transition-all duration-700`}
                  style={{ transitionDelay: `${450 + i * 150}ms` }}
                >
                  <div className="font-display text-4xl">
                    {aboutInView ? <AnimatedCounter end={stat.value} inView={aboutInView} /> : 0}
                    {stat.suffix}
                  </div>
                  <p className="font-mono text-xs font-bold uppercase mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`flex justify-center lg:justify-end transition-all duration-700 ${
              aboutInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-brutal-pink border-3 border-black translate-x-4 translate-y-4" />
              <img
                src={mee}
                alt="Cheikh Ebeoumar"
                className="relative w-72 sm:w-80 lg:w-96 border-3 border-black object-cover"
              />
              <div className="absolute -top-5 -left-5 bg-brutal-yellow border-3 border-black shadow-brutal-sm px-4 py-2 font-display uppercase text-sm rotate-[-6deg]">
                Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Skills                                                            */
/* ------------------------------------------------------------------ */

const Skills = () => {
  const [skillsRef, skillsInView] = useInView();

  const skills = [
    { name: "Python", level: 90, color: "bg-brutal-yellow" },
    { name: "Django", level: 85, color: "bg-brutal-cyan" },
    { name: "React", level: 90, color: "bg-brutal-pink" },
    { name: "Next.js", level: 85, color: "bg-brutal-lime" },
    { name: "JavaScript", level: 88, color: "bg-brutal-orange" },
    { name: "Node.js", level: 80, color: "bg-brutal-purple" },
    { name: "MongoDB", level: 85, color: "bg-brutal-cyan" },
    { name: "Docker", level: 75, color: "bg-brutal-yellow" },
  ];

  const languages = [
    { name: "Arabic", level: "Native", color: "bg-brutal-yellow" },
    { name: "French", level: "Professional (C1)", color: "bg-brutal-cyan" },
    { name: "English", level: "Professional (C1)", color: "bg-brutal-pink" },
    { name: "Russian", level: "Intermediate (B2)", color: "bg-brutal-lime" },
  ];

  const education = [
    {
      degree: "Master of Science",
      school: "Software Engineering — ITMO University",
      period: "2024 — Present",
      color: "bg-brutal-cyan",
    },
    {
      degree: "Bachelor of IT Development",
      school: "University of Nouakchott (ISCAE)",
      period: "2020 — 2023",
      color: "bg-brutal-pink",
    },
  ];

  return (
    <section id="skills" className="w-full bg-black py-24">
      <div className="max-w-6xl mx-auto px-4" ref={skillsRef}>
        <div className="text-center mb-14">
          <SectionLabel color="bg-brutal-cyan">Skills</SectionLabel>
          <h2 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl text-white mt-6">
            Technical <span className="text-brutal-yellow">Arsenal</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <div
            className={`bg-brutal-cream border-3 border-black shadow-brutal-lg p-6 sm:p-8 transition-all duration-700 ${
              skillsInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="font-display uppercase text-2xl mb-8 border-b-4 border-black pb-3">
              Tech Stack
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  label={skill.name}
                  level={skill.level}
                  color={skill.color}
                  inView={skillsInView}
                  delay={index * 120}
                />
              ))}
            </div>
          </div>

          {/* Languages & Education */}
          <div className="space-y-8">
            <div
              className={`bg-white border-3 border-black shadow-brutal-lg p-6 sm:p-8 transition-all duration-700 ${
                skillsInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <h3 className="font-display uppercase text-2xl mb-6 border-b-4 border-black pb-3">
                Languages
              </h3>
              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <div
                    key={lang.name}
                    className={`flex justify-between items-center ${lang.color} border-3 border-black px-4 py-3 font-bold uppercase transition-all duration-500 ${
                      skillsInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <span>{lang.name}</span>
                    <span className="font-mono text-xs">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`bg-white border-3 border-black shadow-brutal-lg p-6 sm:p-8 transition-all duration-700 ${
                skillsInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <h3 className="font-display uppercase text-2xl mb-6 border-b-4 border-black pb-3">
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={edu.degree}
                    className={`${edu.color} border-3 border-black p-4 transition-all duration-500 ${
                      skillsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${600 + index * 150}ms` }}
                  >
                    <h4 className="font-display uppercase text-lg">{edu.degree}</h4>
                    <p className="font-medium text-sm">{edu.school}</p>
                    <p className="font-mono text-xs mt-1">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Work                                                              */
/* ------------------------------------------------------------------ */

const Work = () => {
  const [workRef, workInView] = useInView();

  const projects = [
    {
      title: "General Social Registry System",
      description:
        "A comprehensive management system that improved data processing efficiency by 30%. Built with Python, Django & MongoDB.",
      tech: ["Python", "Next.js", "React", "MongoDB", "REST API"],
      demo: "#",
      github: "#",
      company: "BTIKAR TECH",
      color: "bg-brutal-blue",
    },
    {
      title: "Clinic Management System",
      description:
        "Automated patient workflows, reducing manual processing time by 20%. Responsive design serving 100+ daily users.",
      tech: ["Python", "Django", "JavaScript", "Bootstrap"],
      demo: "#",
      github: "#",
      company: "SMART MS",
      color: "bg-brutal-lime",
    },
    {
      title: "Todo List Application",
      description:
        "A modern React-based todo application with real-time updates and a fully responsive design.",
      tech: ["React", "JavaScript", "CSS"],
      demo: "https://incomparable-stroopwafel-46884a.netlify.app/",
      github: "#",
      color: "bg-brutal-orange",
    },
    {
      title: "Portfolio Website",
      description:
        "Personal portfolio showcasing projects and skills with a bold neo-brutalist design and smooth animations.",
      tech: ["React", "Tailwind CSS", "JavaScript"],
      demo: "https://resplendent-tanuki-3de660.netlify.app/",
      github: "#",
      color: "bg-brutal-pink",
    },
  ];

  return (
    <section id="work" className="w-full bg-brutal-cream bg-grid py-24" ref={workRef}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <SectionLabel color="bg-brutal-pink">Portfolio</SectionLabel>
          <h2 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl mt-6">
            Featured <span className="bg-black text-brutal-yellow px-3 inline-block -rotate-1">Work</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`group bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:-translate-x-[3px] hover:-translate-y-[3px] transition-all duration-200 flex flex-col ${
                workInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Header banner */}
              <div
                className={`${project.color} border-b-4 border-black p-5 flex items-center justify-between`}
              >
                <span className="font-display uppercase text-lg">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {project.company && (
                  <span className="brutal-tag bg-white">{project.company}</span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display uppercase text-xl mb-3">
                  {project.title}
                </h3>
                <p className="font-medium leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="border-2 border-black px-2 py-1 text-xs font-mono font-bold uppercase bg-brutal-cream"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.demo}
                    className="brutal-press flex-1 bg-black text-white border-3 border-black shadow-brutal-sm py-3 text-center font-display uppercase text-sm"
                  >
                    Live Demo →
                  </a>
                  <a
                    href={project.github}
                    className="brutal-press bg-brutal-yellow border-3 border-black shadow-brutal-sm px-5 py-3 font-display uppercase text-sm"
                  >
                    Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Contact                                                           */
/* ------------------------------------------------------------------ */

const Contact = () => {
  const [contactRef, contactInView] = useInView();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch("https://formspree.io/f/mvgqvvlj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(""), 5000);
    }
  };

  const info = [
    { label: "Location", value: "Saint Petersburg, Russia", color: "bg-brutal-yellow" },
    { label: "Email", value: "cheikhbeoumar@yandex.ru", color: "bg-brutal-cyan" },
    { label: "Phone", value: "+7 952 286 5042", color: "bg-brutal-pink" },
  ];

  const inputClass =
    "w-full p-4 bg-white border-3 border-black focus:outline-none focus:bg-brutal-cream transition-colors font-medium placeholder:text-black/40";

  return (
    <section id="contact" className="w-full bg-black py-24">
      <div className="max-w-6xl mx-auto px-4" ref={contactRef}>
        <div className="text-center mb-14">
          <SectionLabel color="bg-brutal-lime">Contact</SectionLabel>
          <h2 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl text-white mt-6">
            Let's <span className="text-brutal-yellow">Talk</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info */}
          <div
            className={`space-y-5 transition-all duration-700 ${
              contactInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {info.map((item) => (
              <div
                key={item.label}
                className={`${item.color} border-3 border-black shadow-brutal p-5`}
              >
                <p className="font-mono text-xs font-bold uppercase opacity-70">
                  {item.label}
                </p>
                <p className="font-display uppercase text-lg mt-1 break-all">
                  {item.value}
                </p>
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/cheikhebeoumar"
                target="_blank"
                rel="noreferrer"
                className="brutal-press flex-1 bg-brutal-blue text-white border-3 border-black shadow-brutal py-4 text-center font-display uppercase"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/CheikhEbeoumar"
                target="_blank"
                rel="noreferrer"
                className="brutal-press flex-1 bg-white border-3 border-black shadow-brutal py-4 text-center font-display uppercase"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`bg-brutal-cream border-3 border-black shadow-brutal-lg p-6 sm:p-8 space-y-5 transition-all duration-700 ${
              contactInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {submitStatus === "success" && (
              <div className="bg-brutal-lime border-3 border-black px-4 py-3 font-bold uppercase">
                ✅ Message sent! I'll get back to you soon.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="bg-brutal-red text-white border-3 border-black px-4 py-3 font-bold uppercase">
                ❌ Failed to send. Try again or email me directly.
              </div>
            )}

            <div>
              <label htmlFor="name" className="block font-mono text-xs font-bold uppercase mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Your Name"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-mono text-xs font-bold uppercase mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-mono text-xs font-bold uppercase mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={`${inputClass} resize-none`}
                placeholder="Tell me about your project..."
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="brutal-press w-full bg-brutal-yellow border-3 border-black shadow-brutal py-4 font-display uppercase text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Footer                                                            */
/* ------------------------------------------------------------------ */

const Footer = () => (
  <footer className="bg-brutal-yellow border-t-4 border-black">
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="font-display uppercase text-lg">Cheikh Ebeoumar</p>
      <p className="font-mono text-xs font-bold uppercase">
        © {new Date().getFullYear()} — Built with React &amp; Tailwind
      </p>
    </div>
  </footer>
);

/* ------------------------------------------------------------------ */
/*  App                                                               */
/* ------------------------------------------------------------------ */

function App() {
  return (
    <div className="font-sans bg-brutal-cream text-black">
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Work />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
