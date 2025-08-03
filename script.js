const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            revealOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .tool-item').forEach(el => {
    el.classList.add('reveal-element');
    revealOnScroll.observe(el);
});

// Smooth scrolling with offset for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navHeight = document.querySelector('.nav-container').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Parallax effect for hero section (only for main page)
window.addEventListener('scroll', () => {
    // Skip parallax effect for dark mode pages
    if (document.body.classList.contains('dark-mode')) {
        return;
    }
    
    const scroll = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scroll * 0.3}px)`;
    }
});

// Navigation background opacity (only for main page, not dark mode pages)
window.addEventListener('scroll', () => {
    // Skip navigation background changes for dark mode pages
    if (document.body.classList.contains('dark-mode')) {
        return;
    }
    
    const nav = document.querySelector('.nav-container');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        nav.style.background = 'rgba(239, 239, 239, 0.95)';
    } else {
        nav.style.background = 'rgba(239, 239, 239, 0.85)';
    }
});

document.querySelectorAll('.tool-bar').forEach(bar => {
    const level = bar.getAttribute('data-level');
    bar.style.width = `${level}%`;
});

// Smooth dark mode transition for project pages
document.addEventListener('DOMContentLoaded', () => {
    // Check if this is a project detail page (has dark-mode class)
    if (document.body.classList.contains('dark-mode')) {
        // Temporarily remove dark-mode class to start with light theme
        document.body.classList.remove('dark-mode');
        
        // Add dark-mode class after a small delay for smooth transition
        setTimeout(() => {
            document.body.classList.add('dark-mode');
        }, 50);
    }
});
