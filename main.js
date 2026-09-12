/* Mustapha Salamat Wuraola — Portfolio Core Script
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. THEME TOGGLE (DARK / LIGHT WITH PERSISTENCE) ── */
  const themeToggleBtn = document.getElementById('darkModeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function initTheme() {
    const savedTheme = localStorage.getItem('salamat_theme');
    // Default is dark; if user explicitly saved 'light', apply it
    if (savedTheme === 'light') {
      document.body.classList.add('light');
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    } else {
      document.body.classList.remove('light');
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    }
  }

  initTheme();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light');
      localStorage.setItem('salamat_theme', isLight ? 'light' : 'dark');

      if (themeIcon) {
        if (isLight) {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        } else {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        }
      }
    });
  }

  /* ── 2. NAVBAR SCROLL & ACTIVE LINK SPY ── */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach((s) => navObserver.observe(s));

  // Close mobile navigation menu on link click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('navMenu');
      if (collapse && window.bootstrap && window.bootstrap.Collapse) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  /* ── 3. TYPEWRITER EFFECT ── */
  const roles = [
    'HealthTech & FHIR Specialist.',
    'React & TypeScript Engineer.',
    'Node.js & Python Developer.',
    'Clinical Data Integrator.',
    'Full-Stack Problem Solver.'
  ];
  let ri = 0, ci = 0, deleting = false;
  const typer = document.getElementById('typer');

  function typeEffect() {
    if (!typer) return;
    const current = roles[ri];
    if (!deleting) {
      typer.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(typeEffect, 1800);
        return;
      }
    } else {
      typer.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
    }
    setTimeout(typeEffect, deleting ? 50 : 85);
  }

  typeEffect();

  /* ── 4. SCROLL REVEAL ANIMATION ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach((r) => revealObs.observe(r));

  /* ── 5. PROJECT CATEGORY FILTERING ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectItems.forEach((item) => {
        const category = item.dataset.category || '';
        if (filter === 'all' || category.includes(filter)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ── 6. ONE-CLICK EMAIL COPY WITH TOOLTIP ── */
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyTooltip = document.getElementById('copyTooltip');

  if (copyBtn && copyTooltip) {
    copyBtn.addEventListener('click', () => {
      const email = 'mustaphawuraola01@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        copyTooltip.classList.add('show');
        setTimeout(() => {
          copyTooltip.classList.remove('show');
        }, 2200);
      }).catch(() => {
        // Fallback
        const temp = document.createElement('input');
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        copyTooltip.classList.add('show');
        setTimeout(() => {
          copyTooltip.classList.remove('show');
        }, 2200);
      });
    });
  }

});

/* ── 7. PROJECT MODAL DATA & CONTROLLER ── */
const projects = [
  {
    // index 0
    tag: 'Commercial Web',
    title: 'Al-Huda Prints Nigeria Ltd',
    img: 'logo.png',
    role: 'Sole Frontend Developer',
    duration: '2 Weeks',
    problem: 'Al-Huda Prints had no digital presence and relied entirely on walk-in customers and word-of-mouth referrals, severely limiting their market reach and ability to capture customer inquiries online.',
    solution: 'Built a professional, fully responsive commercial website with a dynamic print product catalogue, a real-time service price estimator, and a streamlined quote request channel that routes enquiries directly to the business owner.',
    features: [
      'Responsive multi-page product gallery showcasing print categories',
      'Interactive service price calculator for instant quote estimates',
      'Direct quote request form with email routing integration',
      'Mobile-first responsive layout optimized for all screen sizes',
      'SEO-structured semantic HTML for local search discoverability'
    ],
    impact: [
      { value: '100%', label: 'Digital Presence Established' },
      { value: '↓70%', label: 'Quote Turnaround Time' },
      { value: 'Mobile', label: 'First Responsive Design' }
    ],
    challenges: 'Designing a non-technical content catalogue that business owners could understand and communicate to customers clearly, while keeping the UI professional and conversion-focused without a backend CMS.',
    tech: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
    live: 'https://al-huda-prints.vercel.app/',
    code: 'https://github.com/salamatwuraola/Al-Huda-Prints'
  },
  {
    // index 1
    tag: 'Personal Portfolio',
    title: 'Mustapha Salamat Wuraola — Portfolio',
    img: 'Capture.PNG',
    role: 'Designer & Full-Stack Developer',
    duration: '3 Weeks',
    problem: 'As a developer entering a competitive market at the intersection of healthcare and software, a generic portfolio template could not communicate the unique blend of HealthTech expertise and engineering depth required to stand out.',
    solution: 'Designed and built a fully custom, production-grade portfolio from scratch with animated hero sections, scroll-reveal interactions, a dark/light theme system, project case study modals, and full SEO optimization.',
    features: [
      'Custom dark/light theme with localStorage persistence',
      'Typewriter role animation with smooth cursor effect',
      'Scroll-reveal IntersectionObserver animations',
      'Rich project case study modals with structured data',
      'One-click email copy, floating action dock, and CV download'
    ],
    impact: [
      { value: '7+', label: 'Projects Showcased' },
      { value: '100', label: 'Lighthouse Performance' },
      { value: 'SEO', label: 'Fully Optimized' }
    ],
    challenges: 'Balancing visual richness with performance — achieving smooth animations, gradient effects, and interactive elements without sacrificing Lighthouse scores or accessibility standards.',
    tech: ['HTML5', 'JavaScript', 'CSS3', 'Bootstrap'],
    live: 'https://salamatmw.vercel.app/',
    code: 'https://github.com/salamatwuraola/salamat'
  },
  {
    // index 2
    tag: 'School Management & Fintech',
    title: 'Haruna Rasheed Centre Portal',
    img: 'Har.jpeg',
    role: 'Full-Stack Developer',
    duration: '6 Weeks',
    problem: 'A private academic centre managed student records, fee payments, and result generation entirely through spreadsheets and manual bookkeeping — an error-prone, time-consuming process that scaled poorly as enrolment grew.',
    solution: 'Built a comprehensive multi-role academic management portal with automated grade computation, printable result sheet generation, and KoraPay payment gateway integration, replacing all manual processes with a centralised digital system.',
    features: [
      'Multi-role authentication: Superadmin, Admin, and Student dashboards',
      'Automated grade generation and printable result sheets',
      'KoraPay payment gateway integration for online fee settlement',
      'Student registration, record management, and profile system',
      'Secure PHP session management with role-based access control'
    ],
    impact: [
      { value: '100%', label: 'Records Digitized' },
      { value: '↓90%', label: 'Manual Admin Work' },
      { value: '3', label: 'Role Tiers Managed' }
    ],
    challenges: 'Implementing fine-grained, multi-tier role-based access control in PHP without a modern framework, ensuring each user type saw only their permitted data while maintaining a shared database schema.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'CSS3', 'HTML5', 'KoraPay'],
    live: 'https://mhr.freedev.app/',
    code: ''
  },
  {
    // index 3
    tag: 'AI & REST APIs',
    title: 'Tech Pulse: AI News Digest',
    img: 'tech.png',
    role: 'Full-Stack Developer',
    duration: '3 Weeks',
    problem: 'Developers and tech professionals waste significant time scanning multiple news sources and reading full articles to extract the core insights. There was no single platform offering AI-synthesized, categorised tech news in real time.',
    solution: 'Built a full-stack news aggregation platform that pulls live articles from the News API and passes them to Google Gemini AI for intelligent article synthesis, delivering concise, readable summaries categorised by topic.',
    features: [
      'Real-time news aggregation from News API across 10+ categories',
      'Google Gemini AI-powered article synthesis and summarization',
      'TypeScript end-to-end type safety on frontend and backend',
      'Category-based news filtering with instant UI updates',
      'Vercel edge deployment for sub-second global response times'
    ],
    impact: [
      { value: '<3s', label: 'AI Summary Delivery' },
      { value: '↓70%', label: 'Reading Time Saved' },
      { value: '10+', label: 'News Categories' }
    ],
    challenges: 'Managing concurrent News API and Gemini API rate limits gracefully, and engineering prompt structures that produce coherent, neutral summaries regardless of the article\'s political or technical complexity.',
    tech: ['React.js', 'Node.js', 'TypeScript', 'TailwindCSS', 'Express.js', 'Gemini API', 'Vercel'],
    live: 'https://tech-pulse-news-one.vercel.app/',
    code: 'https://github.com/salamatwuraola/Tech-Pulse'
  },
  {
    // index 4
    tag: 'HealthTech & EMR',
    title: 'Care Sync EMR & Appointment System',
    img: 'care.png',
    role: 'Full-Stack Developer',
    duration: '8 Weeks',
    problem: 'Outpatient clinics relied on paper-based workflows for patient registration, appointment scheduling, and record management — leading to long wait times, scheduling conflicts, lost records, and poor departmental coordination.',
    solution: 'Built a full-stack Electronic Medical Record system with structured appointment scheduling, patient lifecycle management, multi-department routing, and dedicated doctor and admin dashboards — eliminating all paper-based processes.',
    features: [
      'Patient registration, history tracking, and record management',
      'Appointment scheduling with real-time conflict detection',
      'Multi-department patient routing and handoff system',
      'Dedicated doctor, admin, and receptionist dashboards',
      'Secure session-based authentication with PHP'
    ],
    impact: [
      { value: '↓60%', label: 'Patient Wait Time' },
      { value: '0', label: 'Paper Records Lost' },
      { value: 'Multi', label: 'Department Ready' }
    ],
    challenges: 'Designing a flexible database schema capable of handling varying clinical data structures across different departments while maintaining strict relational integrity and avoiding data duplication.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'HTML5', 'CSS3'],
    live: 'https://caresync.free.je/login.php',
    code: 'https://github.com/salamatwuraola/CareSync'
  },
  {
    // index 5
    tag: 'Web Application',
    title: 'Hurry & Thyme Recipe Platform',
    img: 'Hurry&Thyme.png',
    role: 'Frontend Developer',
    duration: '2 Weeks',
    problem: 'Home cooks and food enthusiasts had no fast, distraction-free way to search recipes by ingredient or dietary need — existing platforms were buried in ads, slow to load, and lacking useful nutritional breakdowns.',
    solution: 'Built a fast, clean React-powered recipe discovery app with instant keyword and ingredient search, full nutritional breakdown panels per recipe, and dynamic dietary filters (vegan, keto, gluten-free), all served via a Node.js proxy.',
    features: [
      'Instant keyword and ingredient-based recipe search',
      'Full nutritional breakdown displayed per recipe card',
      'Dynamic dietary filters: vegan, keto, gluten-free, and more',
      'Responsive card-based recipe grid with smooth transitions',
      'Node.js proxy layer for API security and query caching'
    ],
    impact: [
      { value: '<1s', label: 'Search Result Speed' },
      { value: '100%', label: 'Nutrition Data Coverage' },
      { value: 'Zero', label: 'Ads or Distractions' }
    ],
    challenges: 'Optimizing API call frequency to stay within third-party rate limits while maintaining a snappy user experience — solved with debounced search input and a lightweight server-side query cache.',
    tech: ['React.js', 'TailwindCSS', 'JavaScript', 'Node.js'],
    live: 'https://hurry-and-thyme.onrender.com/',
    code: 'https://github.com/salamatwuraola/hurry-and-thyme'
  },
  {
    // index 6
    tag: 'HealthTech & Interoperability',
    title: 'FHIR Patient Chart Viewer',
    img: 'fhir.png',
    role: 'Full-Stack HealthTech Engineer',
    duration: '4 Weeks',
    problem: 'Healthcare developers and clinical teams lack accessible, well-structured tooling to visualize raw HL7 FHIR R4 patient data from live servers — most FHIR responses are deeply nested JSON that is difficult to render cleanly for clinical use.',
    solution: 'Built a Node/Express FHIR proxy with defensive normalization that fetches, validates, and sanitizes FHIR R4 resources before rendering them in a clean React clinical dashboard — handling malformed data gracefully throughout.',
    features: [
      'Live HL7 FHIR R4 patient data fetching from real FHIR servers',
      'Node/Express proxy with defensive normalization middleware',
      'React clinical dashboard rendering observations and vitals',
      'Graceful handling of missing, null, or malformed FHIR fields',
      'HIPAA-conscious architecture with no PHI stored server-side'
    ],
    impact: [
      { value: '100%', label: 'Graceful FHIR Edge Case Handling' },
      { value: 'R4', label: 'FHIR Standard Compliant' },
      { value: 'HIPAA', label: 'Conscious Architecture' }
    ],
    challenges: 'FHIR R4 data in the real world is highly inconsistent — resources frequently have missing extensions, null codings, and unexpected nesting. Engineering the defensive normalization layer to handle every edge case without crashing the React UI was the core technical challenge.',
    tech: ['React.js', 'HL7 FHIR R4', 'TailwindCSS', 'JavaScript', 'Node.js', 'Express'],
    live: 'https://fhir-p71r.onrender.com/',
    code: 'https://github.com/salamatwuraola/FHIR'
  }
];

function openModal(i) {
  const p = projects[i];
  if (!p) return;

  // Core fields
  const modalImg        = document.getElementById('modalImg');
  const modalTag        = document.getElementById('modalTag');
  const modalTitle      = document.getElementById('modalTitle');
  const modalMeta       = document.getElementById('modalMeta');
  const modalProblem    = document.getElementById('modalProblem');
  const modalSolution   = document.getElementById('modalSolution');
  const modalFeatures   = document.getElementById('modalFeatures');
  const modalImpact     = document.getElementById('modalImpact');
  const modalChallenges = document.getElementById('modalChallenges');
  const modalTech       = document.getElementById('modalTech');
  const modalLinks      = document.getElementById('modalLinks');

  if (modalImg)   modalImg.src = p.img;
  if (modalImg)   modalImg.alt = p.title;
  if (modalTag)   modalTag.textContent = p.tag;
  if (modalTitle) modalTitle.textContent = p.title;

  // Meta badges
  if (modalMeta) {
    modalMeta.innerHTML = `
      <span class="modal-meta-badge"><i data-lucide="user" style="width:13px;height:13px;"></i>${p.role}</span>
      <span class="modal-meta-badge"><i data-lucide="clock" style="width:13px;height:13px;"></i>${p.duration}</span>
    `;
  }

  // Case study text sections
  if (modalProblem)    modalProblem.textContent    = p.problem;
  if (modalSolution)   modalSolution.textContent   = p.solution;
  if (modalChallenges) modalChallenges.textContent = p.challenges;

  // Key features list
  if (modalFeatures) {
    modalFeatures.innerHTML = p.features
      .map(f => `<li><span class="feat-check"><i data-lucide="check" style="width:10px;height:10px;"></i></span>${f}</li>`)
      .join('');
  }

  // Impact metrics grid
  if (modalImpact) {
    modalImpact.innerHTML = p.impact
      .map(m => `
        <div class="case-impact-item">
          <div class="case-impact-value">${m.value}</div>
          <div class="case-impact-label">${m.label}</div>
        </div>`)
      .join('');
  }

  // Tech pills
  if (modalTech) {
    modalTech.innerHTML = p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
  }

  // Action links
  let linksHTML = '';
  if (p.live) {
    linksHTML += `
      <a href="${p.live}" target="_blank" rel="noopener" class="btn-primary-custom" style="font-size:.85rem;padding:10px 20px;">
        <i class="fas fa-arrow-up-right-from-square"></i> Live Demo
      </a>`;
  }
  if (p.code) {
    linksHTML += `
      <a href="${p.code}" target="_blank" rel="noopener" class="btn-outline-custom" style="font-size:.85rem;padding:10px 20px;">
        <i class="fab fa-github"></i> Source Code
      </a>`;
  }
  if (modalLinks) modalLinks.innerHTML = linksHTML;

  // Open modal
  const modalBackdrop = document.getElementById('projectModal');
  if (modalBackdrop) {
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Render dynamically injected Lucide icons
    if (window.lucide) lucide.createIcons();
  }
}

function closeModal() {
  const modalBackdrop = document.getElementById('projectModal');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeModalOnBackdrop(e) {
  if (e.target === document.getElementById('projectModal')) {
    closeModal();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});