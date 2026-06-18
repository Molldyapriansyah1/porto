// MAIN INTERACTIVE JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initMobileMenu();
    initScrollObserver();
    initTelemetryStats();
    initEmailClipboard();
});

/* 1. BACKGROUND CANVAS PARTICLES GRID */
function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    const particles = [];
    const maxParticles = 40;
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(6, 182, 212, 0.15)'; // Accent color opacity
            ctx.fill();
        }
    }
    
    // Instantiate particles
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw connections
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.04)'; // Indigo link lines
        ctx.lineWidth = 1;
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
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

/* 6. COPY EMAIL ACTION */
function initEmailClipboard() {
    const copyBtn = document.querySelector('.btn-secondary');
    if (!copyBtn) return;
    
    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const email = 'molldyapriansyah23@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            const spanText = copyBtn.querySelector('span');
            const originalText = spanText.textContent;
            
            spanText.textContent = 'COPIED!';
            copyBtn.style.borderColor = '#10b981';
            copyBtn.style.color = '#10b981';
            
            setTimeout(() => {
                spanText.textContent = originalText;
                copyBtn.style.borderColor = '';
                copyBtn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Could not copy email address: ', err);
        });
    });
}
