// MAIN INTERACTIVE JAVASCRIPT

/* =========================================================
     title  — project name
     desc   — short description (1-2 sentences)
     thumb  — path to screenshot e.g. "projects/my-project.png"
              set to null if you don't have an image yet
     tags   — array of tech strings
     github — full GitHub URL, or null to hide the button
     demo   — full live URL, or null to hide the button
   ========================================================= */
const PROJECTS = [
    {
        title: "Expense Tracker",
        desc: "A personal finance tracker built with React. Track your income, expenses, and savings — all in one place.",
        thumb: "assets/expense.png",
        tags: ["React", "Vite", "Supabase", "Node/Express"],
        github: "https://github.com/Molldyapriansyah1/Expense",
        demo: "https://expense-demo-eight.vercel.app"
    },
    {
        title: "Inventaris",
        desc: "Laravel 12 inventory management system with Admin/Staff roles, lending workflows, and stock adjustment logic.",
        thumb: "assets/inventaris.png",
        tags: ["Laravel", "PHP", "MySQL"],
        github: "https://github.com/Molldyapriansyah1/Inventaris",
        demo: null
    },
    {
        title: "Portfolio ",
        desc: "A personal portfolio website developed using HTML and CSS, designed to present technical skills, and project work in a structured and accessible format. ",
        thumb: "assets/porto.png",
        tags: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/Molldyapriansyah1",
        demo: null
    },
    {
        title: "Unfullfilled Promises",
        desc: "A 2D narrative-driven game built around the weight of promises left unfinished. Unfulfilled Promise places the player inside a story where choices carry consequence and emotion drives progression.  ",
        thumb: "assets/game.png",
        tags: ["Photoshop", "Figma", "Unity"],
        github: null,
        demo: null
    },
    {
        title: "Buku Tamu",
        desc: "A web-based guest management system developed for school environments, designed to record and monitor visitor activity in a structured and organized manner.",
        thumb: "assets/bukutamu.png",
        tags: ["Photoshop", "Figma", ],
        github: null,
        demo: null
    },
    {
        title: "UI/UX assets",
        desc: "learn UI/UX game assets by clonning what the teacher give",
        thumb: "assets/ui.png",
        tags: ["Photoshop", "Figma", ],
        github: null,
        demo: null
    },
];


document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollObserver();
    initTelemetryStats();
    renderProjects();
});

/* 1. RENDER PROJECT CARDS */
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid || PROJECTS.length === 0) return;

    grid.innerHTML = PROJECTS.map(p => {
        const initials = p.title.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
        const thumbHtml = p.thumb
            ? `<img src="${p.thumb}" alt="${p.title}" loading="lazy">`
            : `<div class="project-thumb-placeholder">${initials}</div>`;

        const githubBtn = p.github
            ? `<a href="${p.github}" target="_blank" rel="noopener" class="project-link">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
               </a>`
            : '';

        const demoBtn = p.demo
            ? `<a href="${p.demo}" target="_blank" rel="noopener" class="project-link live">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
               </a>`
            : '';

        return `
        <div class="project-card glass-card">
            <div class="project-thumb">${thumbHtml}</div>
            <div class="project-body">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.desc}</p>
                <div class="project-tags">
                    ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                ${(githubBtn || demoBtn) ? `<div class="project-links">${githubBtn}${demoBtn}</div>` : ''}
            </div>
        </div>`;
    }).join('');
}

/* 2. MOBILE MENU DRAWER TOGGLER */
function initMobileMenu() {
    const toggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav');
    if (!toggleBtn || !navMenu) return;
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}

/* 3. SCROLL INTERSECTION OBSERVER FOR ACTIVE MENU LINKS */
function initScrollObserver() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
                });
            }
        });
    }, { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    sections.forEach(s => observer.observe(s));
}

/* 4. LIVE SIMULATED FPS TELEMETRY */
function initTelemetryStats() {
    const fpsCounter = document.getElementById('fps-counter');
    if (!fpsCounter) return;
    setInterval(() => {
        fpsCounter.textContent = (59.85 + Math.random() * 0.3).toFixed(2);
    }, 800);
}