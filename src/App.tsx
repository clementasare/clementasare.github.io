import { useState, useEffect, useRef, type ReactNode } from 'react';

/* ─────────────────────────────────────────────
   Navigation
   ───────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-sm border-b border-stone-200/80 shadow-sm shadow-stone-200/30'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            className="font-serif text-lg font-semibold text-stone-900 hover:text-sage-600 transition-colors"
          >
            C. Asare
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-stone-500 hover:text-sage-600 transition-colors tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -mr-2 text-stone-600 hover:text-stone-900 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M5 5L17 17M17 5L5 17" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 6h16M3 11h16M3 16h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-cream/98 backdrop-blur-sm border-b border-stone-200/80 px-6 pb-5 pt-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2.5 text-sm font-medium text-stone-600 hover:text-sage-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   Reusable Section Wrapper with fade-in
   ───────────────────────────────────────────── */

function Section({
  id,
  number,
  label,
  children,
  className = '',
}: {
  id: string;
  number: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`fade-in py-16 md:py-24 ${className}`}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-sage-500 mb-4">
          {number} — {label}
        </p>
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Hero
   ───────────────────────────────────────────── */

function Portrait() {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-sage-50 to-sage-100 border border-sage-200 flex items-center justify-center flex-shrink-0"
        aria-label="Portrait of Clement Asare"
      >
        <span className="font-serif text-3xl md:text-4xl text-sage-500 font-semibold select-none">
          CA
        </span>
      </div>
    );
  }

  return (
    <img
      src="portrait.jpg"
      alt="Portrait of Clement Asare"
      className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover object-top border border-sage-200 flex-shrink-0"
      onError={() => setImgError(true)}
    />
  );
}


function Hero() {
  return (
    <section id="home" className="pt-28 pb-12 md:pt-36 md:pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start gap-7 md:gap-10">
          <Portrait />

          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.7rem] font-bold text-stone-900 leading-tight tracking-tight">
              Clement Asare
            </h1>

            <p className="mt-2.5 text-base md:text-lg text-stone-500 font-medium">
              Mechanical Engineer · Graduate Applicant in Robotics &amp; Mechatronics
            </p>

            <p className="mt-4 text-stone-600 leading-relaxed max-w-xl text-[15px]">
              Mechanical engineer with industrial experience in mining equipment maintenance and with fundamental and practical knowledge in computer vision, agentic AI, embedded systems and robotics programming. Preparing for graduate study in mechatronics or robotics.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="Clement_Asare_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-lg hover:bg-sage-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2 focus:ring-offset-cream"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7.5 1.5v9M4 8l3.5 3.5L11 8M2.5 13h10" />
                </svg>
                Download CV
              </a>

              <a
                href="https://linkedin.com/in/c-asare"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-sage-700 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors border border-sage-200/60"
              >
                LinkedIn
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                </svg>
              </a>

              <a
                href="mailto:clementasare999@gmail.com"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-stone-600 bg-stone-100/60 rounded-lg hover:bg-stone-200/60 transition-colors border border-stone-200/60"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="12" height="9" rx="1.5" />
                  <path d="M1 4.5L7 8.5L13 4.5" />
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ─────────────────────────────────────────────
   01 — About
   ───────────────────────────────────────────── */

function About() {
  return (
    <Section id="about" number="01" label="About">
      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 leading-snug mb-6">
        From mechanical systems to intelligent machines.
      </h2>
      <div className="space-y-4 text-stone-600 text-[15px] leading-relaxed">
        <p>
          I studied Mechanical Engineering at the{' '}
          <strong className="text-stone-800 font-medium">University of Mines and Technology (UMaT)</strong>{' '}
          in Ghana, graduating with honours in 2023. The programme covered a broad range of engineering topics such as machine design, instrumentation and control, applied electricity, mechanics of machines and computer programming. introduced me to computer programming
        </p>
        <p>
          In my final-year thesis, I designed and analysed a micro-hydro power system that would use residential rainwater storage to generate off-grid electricity. 
          The work involved fluid mechanics calculations, turbine selection and sizing, mechanical component design and electrical energy analysis.
        </p>
        <p>
          After graduating, I joined{' '}
          <strong className="text-stone-800 font-medium">Metso Ghana Ltd</strong> as a national service personnel where I assisted in the maintenance of mining equipment including crushers pumps and industrial filters. I now work with Metso as an Applications Engineer suppporting mining operations across West Africa. 
		  My role involes selecting and sizing slurry pumps, troubleshooting slurry pumps, installing condition monitoring systems and writing technical reports. 
		  This experience has given me a grounded understanding of how large mechanical systems operate, how they may fail and get maintained in demanding environments.
        </p>
        <p>
          When I am home, I spend most of my spare time developing skills in programming, robotics, electronics and AI. I gain these skills through projects and  
		  taking online certificate courses. I have built a computer vision system for motion tacking and detection using OpenCV.  
		  This direction I have taken is intentional, I want to work at the intersection of mechanical engineering, control systems, and machine intelligence.
        </p>
        <p>
          I am now seeking a Master's degree in Mechatronics or Robotics to bring these experiences together and develop the expertise to contribute to research and engineering work in automation, robotics and intelligent system design.
        </p>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   02 — Research Interests
   ───────────────────────────────────────────── */

function Research() {
  const interests = [
    {
      title: 'Autonomous Systems & Mobile Robotics',
      icon: (
        <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-8 h-8 text-sage-500">
          <rect x="8" y="14" width="20" height="12" rx="2" />
          <circle cx="13" cy="30" r="3" />
          <circle cx="23" cy="30" r="3" />
          <path d="M15 14V10a3 3 0 0 1 6 0v4" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
      description:
        'My mechanical engineering background gives me an understanding of the limitations of a mobile robot system such as actuation, load paths and energy requirements. I am interested in how planning and perception algorithms interact with these hardware realities, particularly in agricultural and industrial settings where terrain and conditions are unpredictable.',
    },
    {
      title: 'Computer Vision & Sensory Perception',
      icon: (
        <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-8 h-8 text-sage-500">
          <circle cx="18" cy="18" r="7" />
          <circle cx="18" cy="18" r="3" />
          <path d="M2 18c4-8 10-12 16-12s12 4 16 12c-4 8-10 12-16 12S6 26 2 18z" />
        </svg>
      ),
      description:
        'Using cameras and sensors to help machines understand their surroundings. My project on real-time motion detection using OpenCV was a starting point. I want to go deeper into object recognition, depth estimation, and how robotic systems can sense and iteract with their environment. I am drawn to problems where vision enables a mechanical system to respond to its environment like inspecting equipment, tracking objects or guiding a manipulator.',
    },
    {
      title: 'Control Systems & Industrial Automation',
      icon: (
        <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-8 h-8 text-sage-500">
          <rect x="6" y="6" width="24" height="24" rx="3" />
          <rect x="12" y="12" width="12" height="12" rx="1" />
          <path d="M18 6V2M18 34v-4M6 18H2M34 18h-4M9 9L6 6M27 9l3-3M9 27l-3 3M27 27l3 3" />
        </svg>
      ),
      description:
        'Designing control architectures that run on hardware and respond in real time. My experience with Arduino programming as well as sensor integration and industrial equipment maintenance at Metso has shown me how control systems work in in practice, from vibration monitoring on slurry pumps to valve regulation in mineral processing plants. I want to develop skills in designing and implementing more advanced control systems for industrial automation.',
    },
    {
      title: 'Human-Robot Collaboration',
      icon: (
        <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-8 h-8 text-sage-500">
          <circle cx="12" cy="10" r="4" />
          <path d="M4 26c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          <rect x="22" y="12" width="8" height="10" rx="1.5" />
          <path d="M26 22v4M22 15h-3M30 15h3" />
        </svg>
      ),
      description:
        'Systems where robots work alongside people rather than replacing them. My interest here connects to practical applications in healthcare, agriculture and industrial settings where full autonomy is not practical or desirable and where machines must adapt to human actions and variable conditions. Working in an industrial environment like mining has made me appreciate how important and efficient it will be for humans and robots to collaborate to solve complex problems.',
    },
  ];

  return (
    <Section id="research" number="02" label="Research Interests">
      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 leading-snug mb-3">
        Areas I want to explore through graduate study.
      </h2>
      <p className="text-stone-500 text-[15px] mb-10">
        These are directions I am actively working toward but not areas where I claim expertise. Each connects to my existing experience in mechanical engineering, industrial fieldwork or programming projects.
      </p>

      <div className="space-y-10">
        {interests.map((item) => (
          <div key={item.title} className="flex gap-5">
            <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-stone-800 mb-2">
                {item.title}
              </h3>
              <p className="text-stone-600 text-[15px] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   03 — Selected Projects
   ───────────────────────────────────────────── */

function Projects() {
  return (
    <Section id="projects" number="03" label="Selected Projects">
      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 leading-snug mb-10">
        Engineering and programming work.
      </h2>

      <div className="space-y-14">
        {/* Project 1: Thesis */}
        <article className="border-l-2 border-sage-200 pl-6">
          <p className="text-xs font-medium tracking-wide uppercase text-sage-500 mb-1">
            Undergraduate Thesis · 2023
          </p>
          <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">
            Design and Energy Analysis of a Micro-Hydro Power System Using Residential Rainwater Storage
          </h3>
          <div className="space-y-3 text-stone-600 text-[15px] leading-relaxed">
            <p>
              <strong className="text-stone-700 font-medium">Problem:</strong>{' '}
              I explored the feasibility of generating off-grid electricity from harvested rainwater in areas with limited power infrastructure which is a common concern in many parts of West Africa.
            </p>
            <p>
              <strong className="text-stone-700 font-medium">Approach:</strong>{' '}
              I designed a micro-hydro system using a 15.4 m elevation head from a rooftop storage tank. I evaluated impulse and reaction turbine types against the available head and flow conditions and selected a Pelton wheel for its high efficiency. The work involved flow rate calculations, penstock sizing, mechanical component specification and electrical energy output analysis.
            </p>
            <p>
              <strong className="text-stone-700 font-medium">Result:</strong>{' '}
              The system achieved a calculated power output of 16.33 kW, demonstrating the technical feasibility of the concept at a residential scale.
            </p>
            <p>
              <strong className="text-stone-700 font-medium">What I learned:</strong>{' '}
              This project required me to combine knowledge from fluid mechanics, thermodynamics, machine design and electrical engineering into a single feasible design. 
			  I developed a lot of research skills when I undertook this project.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Fluid Mechanics', 'Turbine Design', 'Mechanical Sizing', 'Energy Analysis'].map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-sage-50 text-sage-700 border border-sage-100 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </article>

        
{/* Project 2: Computer Vision */}
<article className="border-l-2 border-sage-200 pl-6">
  <p className="text-xs font-medium tracking-wide uppercase text-sage-500 mb-1">
    Personal Project
  </p>
  <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">
    CLEMVIS — Real-Time Visual Motion Detection and Tracking System
  </h3>
  <div className="space-y-3 text-stone-600 text-[15px] leading-relaxed">
    <p>
      <strong className="text-stone-700 font-medium">Problem:</strong>{' '}
      Real-time motion detection systems often produce false detections due to environmental changes and transient motion, making reliable object detection and tracking challenging.
    </p>
    <p>
      <strong className="text-stone-700 font-medium">Approach:</strong>{' '}
      I Developed a real-time computer vision system using Python and OpenCV, integrating adaptive background subtraction, object tracking, motion filtering and direction estimation to detect meaningful movement. The project runs in real time on a standard webcam feed.
    </p>
    <p>
      <strong className="text-stone-700 font-medium">Significance:</strong>{' '}
      This was my first practical experience with computer vision and image processing. I gained practical experience in visual sensing, motion tracking and real-time processing, strengthening my interest in computer vision for robotics and autonomous systems.
    </p>
  </div>

  {/* GitHub Repository */}
  <div className="mt-4 mb-4">
    <a
      href="https://github.com/clementasare/clemvis"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-medium text-sage-700 hover:text-sage-900 transition-colors"
    >
      View Source Code on GitHub <span aria-hidden="true">↗</span>
    </a>
  </div>

  <div className="flex flex-wrap gap-2">
    {['Python', 'OpenCV', 'NumPy', 'Computer Vision', 'Motion Tracking', 'Real-Time Processing'].map((tag) => (
      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-sage-50 text-sage-700 border border-sage-100 font-medium">
        {tag}
      </span>
    ))}
  </div>
</article>

{/* Project 3: Embedded Systems and Control Engineering */}
<article className="border-l-2 border-sage-200 pl-6">
  <p className="text-xs font-medium tracking-wide uppercase text-sage-500 mb-1">
    Personal Project
  </p>
  <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">
    Closed-Loop DC Motor Speed Control — Embedded PID Control and Disturbance Rejection
  </h3>
  <div className="space-y-3 text-stone-600 text-[15px] leading-relaxed">
    <p>
      <strong className="text-stone-700 font-medium">Problem:</strong>{' '}
      Maintaining consistent DC motor speed is challenging because changes in mechanical load cause speed fluctuations, reducing the accuracy and reliability of motor-driven systems. A feedback control system is therefore needed to regulate speed and compensate for external disturbances.
    </p>
    <p>
      <strong className="text-stone-700 font-medium">Approach:</strong>{' '}
      I designed and implemented a closed-loop DC motor speed control system using an ATmega328P microcontroller, quadrature encoder feedback and a PID controller. I integrated PWM-based motor actuation through an L298N H-bridge, implementing interrupt-driven encoder measurement, anti-windup and derivative-on-measurement techniques. I Used Python for serial data acquisition, performance analysis and visualization of step responses and load disturbance rejection.
    </p>
    <p>
      <strong className="text-stone-700 font-medium">Significance:</strong>{' '}
      I developed practical experience in feedback control, embedded programming, electromechanical systems, and experimental system performance evaluation. I Investigated transient response characteristics, including rise time, overshoot, settling time and disturbance recovery. This project strengthened my understanding of control engineering and its application to motor-driven mechanisms, providing a foundation for further study in robotics, automation and intelligent mechatronic systems.
    </p>
  </div>

  {/* GitHub Repository */}
  <div className="mt-4 mb-4">
    <a
      href="https://github.com/clementasare/dc-motor-pid-control"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-medium text-sage-700 hover:text-sage-900 transition-colors"
    >
      View Source Code on GitHub <span aria-hidden="true">↗</span>
    </a>
  </div>

  <div className="flex flex-wrap gap-2">
    {['C/C++', 'Arduino', 'ATmega328P', 'PID Control', 'Embedded Systems', 'DC Motor Control', 'Encoder Feedback', 'PWM', 'Python', 'NumPy', 'Matplotlib', 'System Dynamics', 'Disturbance Rejection'].map((tag) => (
      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-sage-50 text-sage-700 border border-sage-100 font-medium">
        {tag}
      </span>
    ))}
  </div>
</article>


        {/* Project 4: Conversational AI */}
        <article className="border-l-2 border-sage-200 pl-6">
          <p className="text-xs font-medium tracking-wide uppercase text-sage-500 mb-1">
            Personal Project
          </p>
          <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">
            Conversational AI Personal Assistant
          </h3>
          <div className="space-y-3 text-stone-600 text-[15px] leading-relaxed">
            <p>
              I built a chatbot that answers queries about a person based on the information the person has made available in doucuments. The system parses PDF documents using pypdf, then uses Google's Gemini 2.5 Flash model to generate contextually relevant responses to user questions.
            </p>
            <p>
              The project involved document parsing, prompt engineering and integrating a large language model API into a functional application.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Python', 'Google Gemini API', 'pypdf', 'LLM Integration'].map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-sage-50 text-sage-700 border border-sage-100 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </article>

      </div>

      <p className="mt-12 text-sm text-stone-400 italic">
        Other GitHub repositories and project reports will be linked here as they are made available. If you would like to discuss any of these projects in more detail, please feel free to get in touch.
      </p>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   04 — Professional Experience
   ───────────────────────────────────────────── */

function Experience() {
  const positions = [
    {
      role: 'Applications Engineer (Trainee)',
      org: 'Metso Ghana Ltd',
      period: 'Dec 2024 – Present',
      items: [
        'Select and size Metso slurry pumps for mining operations across West Africa, matching pump specifications to process requirements.',
        'Troubleshoot, inspect, and service slurry pumps, cyclones, and control valves to minimise plant operational downtime.',
        'Install Metso Pump Condition Monitoring systems to track equipment health through vibration analysis.',
        'Prepare technical reports following field inspections and maintenance activities.',
      ],
    },
    {
      role: 'National Service Personnel',
      org: 'Metso Ghana Ltd',
      period: 'Nov 2023 – Oct 2024',
      items: [
        'Assisted in maintenance and servicing of MKIII 54-75 gyratory crusher, RTGT filter, and slurry pumps.',
        'Operated a FARO Laser Focus Scanner to scan crusher liners for engineering wear analysis.',
        'Conducted risk assessments prior to maintenance activities to ensure workplace safety compliance.',
      ],
    },
    {
      role: 'Student Intern',
      org: 'Tarkwa Municipal Hospital, Tarkwa, Ghana',
      period: 'Apr 2022 – Jun 2022',
      items: [
        'Troubleshot and repaired biomedical devices including blood pressure monitors, oxygen concentrators, and autoclaves.',
      ],
    },
  ];

  return (
    <Section id="experience" number="04" label="Professional Experience">
      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 leading-snug mb-3">
        Industrial and field engineering.
      </h2>
      <p className="text-stone-500 text-[15px] mb-10">
        My professional experience has been centred on maintaining and supporting heavy industrial equipment in the mining sector, with earlier exposure to biomedical equipment servicing.
      </p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-sage-200 hidden md:block" />

        <div className="space-y-10">
          {positions.map((pos, i) => (
            <div key={i} className="md:pl-8 relative">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-sage-400 bg-cream hidden md:block" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-800">
                    {pos.role}
                  </h3>
                  <p className="text-stone-500 text-sm">{pos.org}</p>
                </div>
                <p className="text-xs font-medium tracking-wide text-sage-500 uppercase whitespace-nowrap sm:mt-1">
                  {pos.period}
                </p>
              </div>
              <ul className="space-y-1.5 mt-2">
                {pos.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-stone-600 text-[15px] leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-sage-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   05 — Education
   ───────────────────────────────────────────── */

function Education() {
  return (
    <Section id="education" number="05" label="Education">
      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 leading-snug mb-10">
        Academic foundation.
      </h2>

      {/* Degree */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
          <div>
            <h3 className="font-serif text-lg font-semibold text-stone-800">
              BSc (Hons) Mechanical Engineering
            </h3>
            <p className="text-stone-500 text-sm">
              University of Mines and Technology (UMaT), Tarkwa, Ghana
            </p>
          </div>
          <p className="text-xs font-medium tracking-wide text-sage-500 uppercase whitespace-nowrap sm:mt-1">
            Graduated 2023
          </p>
        </div>
        <p className="text-stone-500 text-sm mb-3">
          <span className="font-medium text-stone-600">Relevant coursework:</span>{' '}
          Machine Design · Instrumentation and Control · Computer Programming · Mechanics of Machines · Applied Electricity
        </p>
      </div>

      {/* Thesis highlight */}
      <div className="bg-white border border-stone-200/80 rounded-xl p-6">
        <p className="text-xs font-medium tracking-wide uppercase text-sage-500 mb-2">
          Final-Year Thesis
        </p>
        <h4 className="font-serif text-base font-semibold text-stone-800 mb-3 leading-snug">
          Design and Energy Analysis of a Micro-Hydro Power System Using Residential Rainwater Storage
        </h4>
      </div>

      {/* Certificates */}
      <div className="mt-10">
        <h3 className="font-serif text-lg font-semibold text-stone-800 mb-4">
          Continuing Education &amp; Certificates
        </h3>
        <ul className="space-y-2.5">
          {[
            { name: 'Agentic AI: Build AI Agents with LangGraph, CrewAI & MCP', provider: 'Udemy', year: 'In Progress', },
            { name: 'Artificial Intelligence Fundamentals', provider: 'IBM SkillsBuild', year: '2025', },
            { name: 'Robotics and AI', provider: 'Great Learning', year: '2025' },
            { name: 'Fundamentals of Robotics & Industrial Automation', provider: 'Coursera', year: '2024', },
            { name: 'Complete Arduino Course for Beginners', provider: 'Udemy', year: '2024', },
          ].map((cert, i) => (
            <li key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-0">
              <span className="text-stone-700 text-[15px] font-medium sm:flex-1">
                {cert.name}
              </span>
              <span className="text-stone-400 text-sm">
                {cert.provider} · {cert.year}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   06 — Community & Leadership
   ───────────────────────────────────────────── */

function Community() {
  return (
    <Section id="community" number="06" label="Community & Leadership">
      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 leading-snug mb-8">
        Beyond academics and professional life.
      </h2>

      <div className="space-y-6">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
            <h3 className="font-medium text-stone-800 text-[15px]">
              Project Member — Enactus Ghana (UMaT Chapter)
            </h3>
            <span className="text-xs font-medium tracking-wide text-sage-500 uppercase">
              2022 – 2023
            </span>
          </div>
          <p className="text-stone-600 text-[15px] leading-relaxed">
            I worked with other students to design community development projects, including a water purification system for a mining town. The project aimed to make locally available water safe for consumption, addressing a real public health concern in Aboso mining community in Tarkwa-Ghana.
          </p>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
            <h3 className="font-medium text-stone-800 text-[15px]">
              Electoral Commissioner — Faculty of Engineering Students Association, UMaT
            </h3>
            <span className="text-xs font-medium tracking-wide text-sage-500 uppercase">
              2022
            </span>
          </div>
          <p className="text-stone-600 text-[15px] leading-relaxed">
            I orrganised and coordinated the voting process for the election of the Faculty of Engineering Students Association leadership. This role required planning logistics, ensuring procedural fairness and communicating with the student body.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   07 — Technical Skills
   ───────────────────────────────────────────── */

function Skills() {
  const skillGroups = [
    {
      category: 'Programming & Software Development',
      items: ['Python', 'C++', 'MATLAB', 'JavaScript', 'PHP', 'C#'],
    },
    {
      category: 'Robotics & Computer Vision',
      items: ['ROS 2', 'OpenCV', 'Arduino', 'Sensor Integration', 'Embedded Systems', 'Machine Learning'],
    },
    {
      category: 'AI & Data Tools',
      items: ['NumPy', 'Pandas', 'Matplotlib', 'LangGraph', 'Google Gemini API'],
    },
    {
      category: 'Mechanical Engineering & Design',
      items: ['SolidWorks', 'AutoCAD', 'Machine Design', 'Fluid Mechanics', 'Industrial Equipment Maintenance'],
    },
    {
      category: 'Databases',
      items: ['MySQL', 'SQLite', 'MongoDB'],
    },
  ];

  return (
    <Section id="skills" number="07" label="Technical Skills">
      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 leading-snug mb-10">
        Tools and technologies.
      </h2>

      <div className="space-y-8">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wide mb-3">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="text-[13px] px-3 py-1.5 rounded-lg bg-white text-stone-600 border border-stone-200/80 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-stone-400">
        Proficiency varies across these tools. My strongest programming experience is in Python. I am developing competence in embedded systems(Arduino), robotics & computer vision and agentic AI develpement through online courses and personal projects.
      </p>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   08 — Contact
   ───────────────────────────────────────────── */

function Contact() {
  return (
    <Section id="contact" number="08" label="Contact">
      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 leading-snug mb-4">
        Get in touch.
      </h2>
      <p className="text-stone-600 text-[15px] leading-relaxed mb-8 max-w-xl">
        I am open to conversations about graduate programmes, research opportunities, and collaborations in robotics, mechatronics and related fields. Feel free to reach out by email or connect on LinkedIn.
      </p>

      <div className="space-y-4">
        <a
          href="mailto:clementasare999@gmail.com"
          className="flex items-center gap-3 text-stone-700 hover:text-sage-600 transition-colors group"
        >
          <div className="w-10 h-10 rounded-lg bg-sage-50 border border-sage-100 flex items-center justify-center group-hover:bg-sage-100 transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-sage-600">
              <rect x="1.5" y="3.5" width="15" height="11" rx="2" />
              <path d="M1.5 5.5L9 10.5L16.5 5.5" />
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-medium">clementasare999@gmail.com</p>
            <p className="text-xs text-stone-400">Email</p>
          </div>
        </a>

        <a
          href="https://linkedin.com/in/c-asare"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-stone-700 hover:text-sage-600 transition-colors group"
        >
          <div className="w-10 h-10 rounded-lg bg-sage-50 border border-sage-100 flex items-center justify-center group-hover:bg-sage-100 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-sage-600">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-medium">linkedin.com/in/c-asare</p>
            <p className="text-xs text-stone-400">LinkedIn</p>
          </div>
        </a>

        <div className="flex items-center gap-3 text-stone-700">
          <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200/80 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500">
              <path d="M8 1C4.7 1 2 3.5 2 6.5c0 4.5 6 8.5 6 8.5s6-4 6-8.5C14 3.5 11.3 1 8 1z" />
              <circle cx="8" cy="6.5" r="2" />
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-medium">Kumasi, Ghana</p>
            <p className="text-xs text-stone-400">Location</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   Footer
   ───────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-stone-200/60 py-10 mt-8">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-400">
            © {new Date().getFullYear()} Clement Asare
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:clementasare999@gmail.com"
              className="text-sm text-stone-400 hover:text-sage-600 transition-colors"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/c-asare"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-400 hover:text-sage-600 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="Clement_Asare_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-400 hover:text-sage-600 transition-colors"
            >
              CV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   App
   ───────────────────────────────────────────── */

export default function App() {
  return (
    <div className="bg-cream min-h-screen font-sans antialiased">
      {/* Subtle accent bar at the very top */}
      <div className="h-[3px] bg-gradient-to-r from-sage-400 via-sage-500 to-sage-400" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <div className="border-t border-stone-200/60">
          <About />
        </div>
        <div className="border-t border-stone-200/60">
          <Research />
        </div>
        <div className="border-t border-stone-200/60">
          <Projects />
        </div>
        <div className="border-t border-stone-200/60">
          <Experience />
        </div>
        <div className="border-t border-stone-200/60">
          <Education />
        </div>
        <div className="border-t border-stone-200/60">
          <Community />
        </div>
        <div className="border-t border-stone-200/60">
          <Skills />
        </div>
        <div className="border-t border-stone-200/60">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
