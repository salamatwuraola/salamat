
    /*  NAVBAR SCROLL  */
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll',()=>{
      nav.classList.toggle('scrolled', window.scrollY>60);
    });

    /* ── ACTIVE NAV LINK ON SCROLL ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          navLinks.forEach(l=>l.classList.remove('active'));
          const active = document.querySelector(`.navbar-nav .nav-link[href="#${e.target.id}"]`);
          if(active) active.classList.add('active');
        }
      });
    },{threshold:.35});
    sections.forEach(s=>observer.observe(s));

    /* close mobile menu on link click */
    navLinks.forEach(l=>{
      l.addEventListener('click',()=>{
        const collapse = document.getElementById('navMenu');
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if(bsCollapse) bsCollapse.hide();
      });
    });

    /* ── TYPER ── */
    const roles = ['FullStack Developer.','React Engineer.','Node.js Expert.','UI/UX Enthusiast.','Problem Solver.'];
    let ri=0, ci=0, deleting=false;
    const typer = document.getElementById('typer');
    function type(){
      const current = roles[ri];
      if(!deleting){
        typer.textContent = current.slice(0,ci+1); ci++;
        if(ci===current.length){ deleting=true; setTimeout(type,1600); return; }
      } else {
        typer.textContent = current.slice(0,ci-1); ci--;
        if(ci===0){ deleting=false; ri=(ri+1)%roles.length; }
      }
      setTimeout(type, deleting?60:90);
    }
    type();

    /* ── REVEAL ON SCROLL ── */
    const reveals = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(entries=>{
      entries.forEach((e,i)=>{
        if(e.isIntersecting){
          e.target.style.transitionDelay = (i%4)*0.1+'s';
          e.target.classList.add('in-view');
          revealObs.unobserve(e.target);
        }
      });
    },{threshold:.12});
    reveals.forEach(r=>revealObs.observe(r));

    /* ── SKILL BARS ── */
    const barFills = document.querySelectorAll('.skill-bar-fill');
    const barObs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.style.width = e.target.dataset.width+'%';
          barObs.unobserve(e.target);
        }
      });
    },{threshold:.3});
    barFills.forEach(b=>barObs.observe(b));

   /* ── PROJECT MODAL DATA ── */
const projects = [
  {
    tag:'Business Website',
    title:'Al-Huda Prints Nigeria Ltd',
    img:'logo.png',
    summary:'Al-Huda is a frontend business website built with HTML, CSS, and Bootstrap. It features a product gallery, contact details, and admin dashboard.',
    tech:['HTML','CSS','Bootstrap','JavaScript'],

    live:'https://al-huda-prints.vercel.app/',
    code:'https://github.com/salamatwuraola/Al-Huda-Prints'
  },

  {
    tag:'Portfolio-Landing Page',
    title:'Mustapha, Salamat Wuraola',
    img:'Capture.PNG',
    summary:'It is a portfolio which serve as an online CV for Salamat',
    tech:['HTML','JavaScript','CSS','Bootstrap'],

    live:'https://salamatmw.vercel.app/',
    code:'https://github.com/salamatwuraola/salamat'
  },

  {
    tag:'Students Portal',
    title:'Haruna Rasheed Centre of Arabic and Islamic Studies',
    img:'Har.jpeg',
    summary:'Full-Stack School Management Platform. Directory: /console/login(superadmin), /mange/login(admin) create admin account in superadmin (superadmin@mhr.com 5uper101@@!)',
    tech:[ 'PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'CSS', 'HTML', 'KoraPay'],

    live:'https://mhr.freedev.app/',
    code:''
  },

  {  
    tag: 'News Website',
    title: 'Tech Pulse',
    img: 'tech.png',
    summary: 'Full-Stack News Platform, with News API and Gemini API for news sumarizer',
    tech: ['React.js', 'Node.js', 'Typescript', 'TailwindCSS', 'Express.js', 'Vercel'],

    live: 'https://tech-pulse-news-one.vercel.app/',
    code: 'https://github.com/salamatwuraola/Tech-Pulse'
  },

  {
    tag:'Electronic Medical Record & Appointment Settings',
    title:'Care Sync',
    img:'care.png',
    summary:'Full-Stack EMR and Appointment Setting System; for small clins and big hospitals to mange their records and also book appointment for ouypatients to reduce wait time. (admin@caresync.local Admin@123)',
    tech:[ 'PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'CSS', 'HTML'],

    live:'https://caresync.free.je/login.php',
    code:'https://github.com/salamatwuraola/CareSync'
  },

  {
    tag:'Recipe Website',
    title:'Hurry & Thyme',
    img:'Hurry&Thyme.png',
    summary:'Recipe website for quick and easy recipes.',
    tech:['React.js','TailwindCSS','JavaScript','Node.js'],

    live:'https://hurry-and-thyme.onrender.com/',
    code:'https://github.com/salamatwuraola/hurry-and-thyme'
  },

  {
    tag:'FHIR Patient Chart Viewer',
    title:'FHIR Patient Chart Viewer',
    img:'fhir.png',
    summary:'A production-ready HL7 FHIR R4 interoperability portfolio project demonstrating real-time clinical data rendering with a Node/Express proxy, defensive normalization, and a React dashboard',
    tech:['React.js','TailwindCSS','JavaScript','Node.js'],

    live:'https://fhir-p71r.onrender.com/',
    code:'https://github.com/salamatwuraola/FHIR'
  }

];


function openModal(i){
  const p = projects[i];

  document.getElementById('modalImg').src = p.img;
  document.getElementById('modalTag').textContent = p.tag;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalSummary').textContent = p.summary;

  document.getElementById('modalTech').innerHTML =
    p.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');

  /* dynamic buttons */
  let linksHTML = '';

  if(p.live){
    linksHTML += `
      <a href="${p.live}" target="_blank"
        class="btn-primary-custom"
        style="font-size:.85rem;padding:10px 22px;text-decoration:none;">
        <i class="fas fa-external-link-alt me-2"></i> Live Demo
      </a>
    `;
  }

  if(p.code){
    linksHTML += `
      <a href="${p.code}" target="_blank"
        class="btn-outline-custom"
        style="font-size:.85rem;padding:9px 22px;text-decoration:none;">
        <i class="fab fa-github me-2"></i> Source Code
      </a>
    `;
  }

  document.getElementById('modalLinks').innerHTML = linksHTML;

  document.getElementById('projectModal').classList.add('open');
  document.body.style.overflow='hidden';
}


function closeModal(){
  document.getElementById('projectModal').classList.remove('open');
  document.body.style.overflow='';
}

function closeModalOnBackdrop(e){
  if(e.target === document.getElementById('projectModal')) closeModal();
}

document.addEventListener('keydown', e=>{
  if(e.key === 'Escape') closeModal();
});