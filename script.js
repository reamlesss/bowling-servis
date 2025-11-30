// Lightbox functionality
function openLightbox(imageSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightbox.style.display = 'block';
    lightboxImg.src = imageSrc;
    lightboxCaption.innerHTML = caption;
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close lightbox on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});

// Scroll-triggered animations using Intersection Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with any animation class
    const animatedElements = document.querySelectorAll(
        '[class*="animate-"]'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Animate section headers
    const sectionHeaders = document.querySelectorAll('section h2, section .lead');
    sectionHeaders.forEach((header, index) => {
        header.classList.add('animate-fade');
        header.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(header);
    });

    // Animate buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button, index) => {
        button.classList.add('animate-slide-up');
        button.style.transitionDelay = `${0.4 + index * 0.1}s`;
        observer.observe(button);
    });

    // Animate footer
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.classList.add('animate-fade');
        observer.observe(footer);
    }
});

// Parallax effect on scroll
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effect to navbar on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add floating animation to hero elements
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    });
    
    function animateHero() {
        if (heroTitle) {
            const currentTransform = heroTitle.style.transform || '';
            heroTitle.style.transform = `translate(${mouseX * 0.1}px, ${mouseY * 0.1}px)`;
        }
        requestAnimationFrame(animateHero);
    }
    
    animateHero();
}

// Preload images for smoother experience
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});
