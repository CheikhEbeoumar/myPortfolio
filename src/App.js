import React, { useState, useEffect } from "react";
import mee from "./assets/mee.jpg";
// Intersection Observer Hook for animations
const useInView = (options = {}) => {
  const [ref, setRef] = useState();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.2, ...options });

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, inView];
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, inView]);

  return <span>{count}</span>;
};

// Animated Progress Bar Component
const AnimatedProgressBar = ({ percentage, inView, delay = 0 }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const timer = setTimeout(() => {
      setWidth(percentage);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, percentage, delay]);

  return (
    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
      <div
        className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }) => (
  <div 
    className="animate-float" 
    style={{ 
      animationDelay: `${delay}ms`,
      animationDuration: '6s'
    }}
  >
    {children}
  </div>
);

// Typing Animation Hook
const useTypewriter = (text, speed = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};
const Logo = () => (
  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
    CE
  </div>
);

// Mock images for demonstration
const PersonImage = () => (
  <div  className="  bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-full flex items-center justify-center text-white text-6xl font-bold">
{/* add mee.jpg  */}
< img src={mee} alt="Person" className="  bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-full flex items-center justify-center text-white text-6xl font-bold"/>
  </div>
);

const ProjectImage = ({ title }) => (
  <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center text-white font-semibold">
    {title}
  </div>
);

// Navbar Component
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setNav(false);
  };

  return (
    <div className="fixed w-full h-20 flex justify-between items-center px-6 bg-slate-900/95 backdrop-blur-sm text-white z-50 border-b border-slate-800">
      <div className="flex items-center space-x-3">
        <Logo />
        <span className="font-bold text-xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Cheikh Ebeoumar
        </span>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8">
        {['Home', 'About', 'Skills', 'Work', 'Contact'].map((item) => (
          <li key={item}>
            <button
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-emerald-400 transition-colors duration-300 font-medium"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <div onClick={handleClick} className="md:hidden z-10">
        {!nav ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>

      {/* Mobile Menu */}
      <ul className={`${!nav ? "hidden" : "absolute top-0 left-0 w-full h-screen bg-slate-900 flex flex-col justify-center items-center space-y-8"}`}>
        {['Home', 'About', 'Skills', 'Work', 'Contact'].map((item) => (
          <li key={item}>
            <button
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-3xl hover:text-emerald-400 transition-colors duration-300"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      {/* Social Icons */}
      <div className="hidden lg:flex fixed flex-col top-1/2 left-0 transform -translate-y-1/2 z-40">
        <div className="flex flex-col space-y-2   mt-80 py-4">
          <a
            href="https://www.linkedin.com/in/cheikhebeoumar"
            className="w-40 h-14 flex justify-between items-center ml-[-120px] hover:ml-[-10px] transition-all duration-300 bg-blue-600 text-white px-4 rounded-r-lg group"
          >
            <span className="group-hover:text-white">LinkedIn</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://github.com/CheikhEbeoumar"
            className="w-40 h-14 flex justify-between items-center ml-[-120px] hover:ml-[-10px] transition-all duration-300 bg-gray-800 text-white px-4 rounded-r-lg group"
          >
            <span className="group-hover:text-white">GitHub</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="mailto:cheikhbeoumar@yandex.ru"
            className="w-40 h-14 flex justify-between items-center ml-[-120px] hover:ml-[-10px] transition-all duration-300 bg-red-600 text-white px-4 rounded-r-lg group"
          >
            <span className="group-hover:text-white">Email</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a
            href="#"
            className="w-40 h-14 flex justify-between items-center ml-[-120px] hover:ml-[-10px] transition-all duration-300 bg-emerald-600 text-white px-4 rounded-r-lg group"
          >
            <span className="group-hover:text-white">Resume</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

// Home Component
const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const typewriterText = useTypewriter("I'm a Full-Stack Developer", 150);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="home" className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <FloatingElement delay={0}>
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-xl animate-pulse"></div>
        </FloatingElement>
        <FloatingElement delay={2000}>
          <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
        </FloatingElement>
        <FloatingElement delay={4000}>
          <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-emerald-600/10 rounded-full blur-xl animate-pulse"></div>
        </FloatingElement>
      </div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col justify-center h-full relative z-10">
        <div className="space-y-6">
          <p className={`text-emerald-400 text-lg font-medium transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Hi, my name is
          </p>
          <h1 className={`text-5xl lg:text-7xl font-bold text-white transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            Cheikh Ebeoumar
          </h1>
          <h2 className={`text-4xl lg:text-6xl font-bold text-slate-400 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <span className="inline-block min-h-[1.2em]">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </span>
          </h2>
          <p className={`text-slate-300 text-lg max-w-3xl leading-relaxed transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Full-Stack Developer with 2+ years of experience building modern web applications using Python, Django, React, and MongoDB. 
            Currently pursuing Master's in Software Engineering at ITMO University. Passionate about creating scalable solutions and 
            delivering exceptional digital experiences.
          </p>
          <div className={`pt-4 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <button
              onClick={scrollToWork}
              className="group bg-transparent border-2 border-emerald-400 text-emerald-400 px-8 py-4 rounded-lg hover:bg-emerald-400 hover:text-slate-900 hover:scale-105 hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-300 flex items-center space-x-2 font-medium animate-bounce-gentle"
            >
              <span>View My Work</span>
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// About Component
const About = () => {
  const [aboutRef, aboutInView] = useInView();

  return (
    <div id="about" className="w-full min-h-screen bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6" ref={aboutRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`text-4xl lg:text-5xl font-bold text-slate-900 mb-8 transition-all duration-1000 ${aboutInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              About <span className="text-emerald-600">Me</span>
            </h2>
            <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
              <p className={`transition-all duration-1000 delay-300 ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                I am a passionate Full-Stack Developer with 2+ years of experience in building modern web applications. 
                Currently pursuing my Master's degree in Software Engineering at ITMO University in Saint Petersburg, Russia.
              </p>
              <p className={`transition-all duration-1000 delay-500 ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                I specialize in creating scalable solutions using cutting-edge technologies like Python, Django, React, and MongoDB. 
                My experience includes developing management systems that improved data processing efficiency by 30% and building 
                responsive applications serving 100+ daily users.
              </p>
              <p className={`transition-all duration-1000 delay-700 ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                I'm passionate about solving complex problems, researching new technologies, and designing software applications 
                that improve people's lives. I thrive in collaborative environments and enjoy the challenge of turning ideas into reality.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '900ms'}}>
                <h3 className="font-bold text-emerald-600 text-2xl">
                  <AnimatedCounter end={2} inView={aboutInView} />+
                </h3>
                <p className="text-slate-600">Years Experience</p>
              </div>
              <div className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '1100ms'}}>
                <h3 className="font-bold text-emerald-600 text-2xl">
                  <AnimatedCounter end={10} inView={aboutInView} />+
                </h3>
                <p className="text-slate-600">Projects Completed</p>
              </div>
            </div>
          </div>
          <div className={`flex justify-center lg:justify-end transition-all duration-1000 ${aboutInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <FloatingElement>
              <div className="relative">
                <PersonImage />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-cyan-400/20 rounded-full animate-pulse"></div>
              </div>
            </FloatingElement>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skills Component
const Skills = () => {
  const [skillsRef, skillsInView] = useInView();

  const skills = [
    { name: "Python", category: "Backend", level: 90 },
    { name: "Django", category: "Backend", level: 85 },
    { name: "React", category: "Frontend", level: 90 },
    { name: "Next.js", category: "Frontend", level: 85 },
    { name: "JavaScript", category: "Frontend", level: 88 },
    { name: "Node.js", category: "Backend", level: 80 },
    { name: "MongoDB", category: "Database", level: 85 },
    { name: "Docker", category: "DevOps", level: 75 },
  ];

  const languages = [
    { name: "Arabic", level: "Native" },
    { name: "French", level: "Professional (C1)" },
    { name: "English", level: "Professional (C1)" },
    { name: "Russian", level: "Intermediate (B2)" },
  ];

  return (
    <div id="skills" className="w-full min-h-screen bg-slate-900 py-20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <FloatingElement delay={1000}>
          <div className="absolute top-10 right-20 w-64 h-64 border border-emerald-400/20 rounded-full animate-spin-slow"></div>
        </FloatingElement>
        <FloatingElement delay={3000}>
          <div className="absolute bottom-20 left-20 w-48 h-48 border border-cyan-400/20 rounded-full animate-spin-slow-reverse"></div>
        </FloatingElement>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={skillsRef}>
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-1000 ${skillsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Technical <span className="text-emerald-400">Skills</span>
          </h2>
          <p className={`text-slate-300 text-lg transition-all duration-1000 delay-300 ${skillsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Technologies and tools I work with
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div className={`bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-emerald-400/50 transition-all duration-500 ${skillsInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h3 className="text-2xl font-bold text-white mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2 group">
                  <div className="flex justify-between">
                    <span className="text-white font-medium group-hover:text-emerald-400 transition-colors duration-300">{skill.name}</span>
                    <span className="text-emerald-400 text-sm">{skill.category}</span>
                  </div>
                  <AnimatedProgressBar 
                    percentage={skill.level} 
                    inView={skillsInView} 
                    delay={index * 200}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Languages & Education */}
          <div className={`bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-emerald-400/50 transition-all duration-500 ${skillsInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <h3 className="text-2xl font-bold text-white mb-6">Languages</h3>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center p-4 bg-slate-700 rounded-lg hover:bg-slate-600 hover:scale-102 transition-all duration-300 ${skillsInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <span className="text-white font-medium">{lang.name}</span>
                  <span className="text-emerald-400 font-medium">{lang.level}</span>
                </div>
              ))}
            </div>
            
            {/* Education */}
            <div className="mt-8 pt-8 border-t border-slate-700">
              <h4 className="text-xl font-bold text-white mb-4">Education</h4>
              <div className="space-y-4">
                <div className={`p-4 bg-slate-700 rounded-lg hover:bg-slate-600 hover:scale-102 transition-all duration-300 ${skillsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '1000ms'}}>
                  <h5 className="text-emerald-400 font-semibold">Master of Science</h5>
                  <p className="text-white">Software Engineering - ITMO University</p>
                  <p className="text-slate-300 text-sm">2024-Present</p>
                </div>
                <div className={`p-4 bg-slate-700 rounded-lg hover:bg-slate-600 hover:scale-102 transition-all duration-300 ${skillsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '1200ms'}}>
                  <h5 className="text-emerald-400 font-semibold">Bachelor of IT Development</h5>
                  <p className="text-white">University of Nouakchott (ISCAE)</p>
                  <p className="text-slate-300 text-sm">2020-2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Work Component
const Work = () => {
  const projects = [
    {
      title: "General Social Registry System",
      description: "Developed a comprehensive management system that improved data processing efficiency by 30%. Built with Python, Django, and MongoDB.",
      tech: ["Python", "Next.js", "React", "MongoDB", "REST API"],
      demo: "#",
      github: "#",
      company: "BTIKAR TECH"
    },
    {
      title: "Clinic Management System",
      description: "Built a web application that automated patient workflows, reducing manual processing time by 20%. Features responsive design for 100+ daily users.",
      tech: ["Python", "Django", "JavaScript", "Bootstrap"],
      demo: "#",
      github: "#",
      company: "SMART MS"
    },
    {
      title: "Todo List Application",
      description: "A modern React-based todo application with real-time updates and responsive design.",
      tech: ["React", "JavaScript", "CSS"],
      demo: "https://incomparable-stroopwafel-46884a.netlify.app/",
      github: "#"
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing projects and skills with modern design and smooth animations.",
      tech: ["React", "Tailwind CSS", "JavaScript"],
      demo: "https://resplendent-tanuki-3de660.netlify.app/",
      github: "#"
    }
  ];

  return (
    <div id="work" className="w-full min-h-screen bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Featured <span className="text-emerald-600">Work</span>
          </h2>
          <p className="text-slate-700 text-lg">Some of my recent projects and achievements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <ProjectImage title={project.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex space-x-4">
                    <a
                      href={project.demo}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-300"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-300"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {project.company && (
                  <span className="text-emerald-600 text-sm font-medium">{project.company}</span>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-3 mt-1">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Contact Component
const Contact = () => {
  const [contactRef, contactInView] = useInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('https://formspree.io/f/mvgqvvlj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  return (
    <div id="contact" className="w-full min-h-screen bg-slate-900 py-20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <FloatingElement delay={1000}>
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-400/5 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={3000}>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/5 rounded-full blur-xl"></div>
        </FloatingElement>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={contactRef}>
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-1000 ${contactInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Get In <span className="text-emerald-400">Touch</span>
          </h2>
          <p className={`text-slate-300 text-lg transition-all duration-1000 delay-300 ${contactInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Let's discuss your next project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`space-y-8 transition-all duration-1000 ${contactInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 group">
                  <div className="bg-emerald-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Location</h4>
                    <p className="text-slate-300">Saint Petersburg, Russia</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="bg-emerald-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Email</h4>
                    <p className="text-slate-300">cheikhbeoumar@yandex.ru</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="bg-emerald-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Phone</h4>
                    <p className="text-slate-300">+79522865042</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/cheikhebeoumar" className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://github.com/CheikhEbeoumar" className="bg-gray-800 p-3 rounded-lg hover:bg-gray-900 hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-emerald-400/50 transition-all duration-500 ${contactInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="bg-emerald-600/20 border border-emerald-400 text-emerald-300 px-4 py-3 rounded-lg animate-pulse">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-600/20 border border-red-400 text-red-300 px-4 py-3 rounded-lg animate-pulse">
                  ❌ Failed to send message. Please try again or email me directly.
                </div>
              )}

              <div className="group">
                <label htmlFor="name" className="block text-white font-medium mb-2 group-focus-within:text-emerald-400 transition-colors duration-300">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all duration-300"
                  placeholder="Your Name"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="group">
                <label htmlFor="email" className="block text-white font-medium mb-2 group-focus-within:text-emerald-400 transition-colors duration-300">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="group">
                <label htmlFor="message" className="block text-white font-medium mb-2 group-focus-within:text-emerald-400 transition-colors duration-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 resize-none transition-all duration-300"
                  placeholder="Tell me about your project or just say hello..."
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 hover:scale-105 hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Work />
      <Contact />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1e293b;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </div>
  );
}

export default App;