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
    tag: 'Commercial Web',
    title: 'Al-Huda Prints Nigeria Ltd',
    img: 'logo.png',
    summary: 'A commercial frontend enterprise website built with HTML5, CSS3, and Bootstrap. Features include a dynamic product gallery, real-time quote request calculation, and customer contact routing.',
    tech: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
    live: 'https://al-huda-prints.vercel.app/',
    code: 'https://github.com/salamatwuraola/Al-Huda-Prints'
  },
  {
    tag: 'Personal Portfolio',
    title: 'Mustapha, Salamat Wuraola Portfolio',
    img: 'Capture.PNG',
    summary: 'A responsive developer portfolio presenting certifications, educational background, and technical case studies with clean semantic architecture.',
    tech: ['HTML5', 'JavaScript', 'CSS3', 'Bootstrap'],
    live: 'https://salamatmw.vercel.app/',
    code: 'https://github.com/salamatwuraola/salamat'
  },
  {
    tag: 'School Management & Fintech',
    title: 'Haruna Rasheed Centre Portal',
    img: 'Har.jpeg',
    summary: 'Full-stack academic management and student records portal. Features role-based access control (superadmin, admin, student), result sheet generator, and KoraPay payment gateway integration.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'CSS3', 'HTML5', 'KoraPay'],
    live: 'https://mhr.freedev.app/',
    code: ''
  },
  {
    tag: 'AI & REST APIs',
    title: 'Tech Pulse: AI News Digest',
    img: 'tech.png',
    summary: 'Full-stack news aggregation platform integrating News API with Google Gemini AI for instant article synthesis and automated news summaries in seconds.',
    tech: ['React.js', 'Node.js', 'TypeScript', 'TailwindCSS', 'Express.js', 'Gemini API', 'Vercel'],
    live: 'https://tech-pulse-news-one.vercel.app/',
    code: 'https://github.com/salamatwuraola/Tech-Pulse'
  },
  {
    tag: 'HealthTech & EMR',
    title: 'Care Sync EMR & Appointment System',
    img: 'care.png',
    summary: 'Full-stack Electronic Medical Record and outpatient appointment scheduling system engineered to minimize clinic waiting times and streamline patient record management across hospital departments.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'HTML5', 'CSS3'],
    live: 'https://caresync.free.je/login.php',
    code: 'https://github.com/salamatwuraola/CareSync'
  },
  {
    tag: 'Web Application',
    title: 'Hurry & Thyme Recipe Platform',
    img: 'Hurry&Thyme.png',
    summary: 'A fast, responsive recipe and culinary discovery web application featuring instant keyword search, nutrition breakdown, and dynamic dietary filtering.',
    tech: ['React.js', 'TailwindCSS', 'JavaScript', 'Node.js'],
    live: 'https://hurry-and-thyme.onrender.com/',
    code: 'https://github.com/salamatwuraola/hurry-and-thyme'
  },
  {
    tag: 'HealthTech & Interoperability',
    title: 'FHIR Patient Chart Viewer',
    img: 'fhir.png',
    summary: 'A production-ready HL7 FHIR R4 interoperability project demonstrating real-time clinical data rendering with a Node/Express proxy, defensive normalization, and a responsive React dashboard for clinical observations.',
    tech: ['React.js', 'HL7 FHIR R4', 'TailwindCSS', 'JavaScript', 'Node.js', 'Express'],
    live: 'https://fhir-p71r.onrender.com/',
    code: 'https://github.com/salamatwuraola/FHIR'
  }
];

function openModal(i) {
  const p = projects[i];
  if (!p) return;

  const modalImg = document.getElementById('modalImg');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalSummary = document.getElementById('modalSummary');
  const modalTech = document.getElementById('modalTech');
  const modalLinks = document.getElementById('modalLinks');

  if (modalImg) modalImg.src = p.img;
  if (modalTag) modalTag.textContent = p.tag;
  if (modalTitle) modalTitle.textContent = p.title;
  if (modalSummary) modalSummary.textContent = p.summary;

  if (modalTech) {
    modalTech.innerHTML = p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join('');
  }

  let linksHTML = '';
  if (p.live) {
    linksHTML += `
      <a href="${p.live}" target="_blank" rel="noopener" class="btn-primary-custom" style="font-size:.85rem;padding:10px 20px;">
        <i class="fas fa-arrow-up-right-from-square"></i> Live Demo
      </a>
    `;
  }
  if (p.code) {
    linksHTML += `
      <a href="${p.code}" target="_blank" rel="noopener" class="btn-outline-custom" style="font-size:.85rem;padding:10px 20px;">
        <i class="fab fa-github"></i> Source Code
      </a>
    `;
  }

  if (modalLinks) modalLinks.innerHTML = linksHTML;

  const modalBackdrop = document.getElementById('projectModal');
  if (modalBackdrop) {
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
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