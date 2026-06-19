// MAIN INTERACTIVE JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollObserver();
    initTelemetryStats();
});

/* 2. MOBILE MENU DRAWER TOGGLER */
function initMobileMenu() {
    const toggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav');
    
    if (!toggleBtn || !navMenu) return;
    
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
    
    // Close menu when clicking link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}

/* 4. SCROLL INTERSECTION OBSERVER FOR ACTIVE MENU LINKS */
function initScrollObserver() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

/* 5. LIVE SIMULATED SYSTEM STATS TELEMETRY */
function initTelemetryStats() {
    const fpsCounter = document.getElementById('fps-counter');
    if (!fpsCounter) return;
    
    setInterval(() => {
        // Random float around 59.85 - 60.15 to look active
        const val = (59.85 + Math.random() * 0.3).toFixed(2);
        fpsCounter.textContent = val;
    }, 800);
}