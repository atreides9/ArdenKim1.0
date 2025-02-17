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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = `translateY(${scroll * 0.3}px)`;
});

// Navigation background opacity
window.addEventListener('scroll', () => {
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
