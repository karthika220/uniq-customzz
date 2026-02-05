// ==========================================
// Navigation Menu Toggle
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==========================================
// Smooth Scrolling for Navigation Links
// ==========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Active Navigation Link on Scroll
// ==========================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// Header Background on Scroll
// ==========================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(13, 27, 42, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(13, 27, 42, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// ==========================================
// Reviews Slider
// ==========================================
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');
const reviewsContainer = document.getElementById('reviewsContainer');
let currentSlide = 0;

const reviews = document.querySelectorAll('.review-card');
const totalReviews = reviews.length;

// Calculate how many cards are visible at once
function getVisibleCards() {
    if (!reviewsContainer || reviews.length === 0) return 1;
    const viewport = reviewsContainer.parentElement;
    if (!viewport) return 1;
    const containerWidth = viewport.offsetWidth;
    const firstCard = reviews[0];
    if (!firstCard) return 1;
    const cardWidth = firstCard.offsetWidth;
    const visible = Math.floor(containerWidth / cardWidth);
    return Math.max(1, Math.min(visible, totalReviews));
}

// Update slider position
function updateSlider() {
    if (reviews.length === 0 || !reviewsContainer) return;
    const viewport = reviewsContainer.parentElement;
    if (!viewport) return;
    
    const visibleCards = getVisibleCards();
    const maxSlide = Math.max(0, totalReviews - visibleCards);
    
    // Ensure we don't show gap at the end
    let slidePosition = currentSlide;
    if (slidePosition > maxSlide) {
        slidePosition = maxSlide;
        currentSlide = slidePosition;
    }
    
    // Calculate translateX using actual card width including gap
    const firstCard = reviews[0];
    if (!firstCard) return;
    
    const cardRect = firstCard.getBoundingClientRect();
    const cardWidth = cardRect.width;
    
    // Get computed gap from CSS (20px desktop, 15px mobile)
    const gap = window.innerWidth <= 768 ? 15 : 20;
    
    // Calculate translateX: card width + gap for each slide
    const translateX = slidePosition * (cardWidth + gap);
    
    // Ensure we don't go beyond the maximum position
    const maxTranslateX = maxSlide * (cardWidth + gap);
    const finalTranslateX = Math.min(translateX, maxTranslateX);
    
    reviewsContainer.style.transform = `translateX(-${finalTranslateX}px)`;
}

// Next button - loop to start when reaching end
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxSlide = Math.max(0, totalReviews - visibleCards);
        
        if (currentSlide < maxSlide) {
            currentSlide++;
        } else {
            // Loop back to start
            currentSlide = 0;
        }
        updateSlider();
    });
}

// Previous button - loop to end when at start
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxSlide = Math.max(0, totalReviews - visibleCards);
        
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            // Loop to last valid position
            currentSlide = maxSlide;
        }
        updateSlider();
    });
}


// Handle window resize - slider update is handled in the main resize handler below

// Initialize slider position
if (reviewsContainer) {
    updateSlider();
}

// ==========================================
// Touch/Swipe Support for Mobile
// ==========================================
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;

if (reviewsContainer) {
    // Touch start
    reviewsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
        reviewsContainer.style.transition = 'none';
    }, { passive: true });

    // Touch move
    reviewsContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        touchEndX = e.touches[0].clientX;
        const diff = touchStartX - touchEndX;
        const firstCard = reviews[0];
        if (!firstCard) return;
        
        const cardRect = firstCard.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const gap = window.innerWidth <= 768 ? 15 : 20;
        const currentTranslate = currentSlide * (cardWidth + gap);
        const newTranslate = currentTranslate + diff;
        
        // Prevent dragging beyond limits
        const visibleCards = getVisibleCards();
        const maxSlide = Math.max(0, totalReviews - visibleCards);
        const maxTranslate = maxSlide * (cardWidth + gap);
        
        if (newTranslate >= 0 && newTranslate <= maxTranslate) {
            reviewsContainer.style.transform = `translateX(-${newTranslate}px)`;
        }
    }, { passive: true });

    // Touch end
    reviewsContainer.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        reviewsContainer.style.transition = 'transform 0.5s ease';
        
        const diff = touchStartX - touchEndX;
        const swipeThreshold = 50; // Minimum swipe distance
        
        if (Math.abs(diff) > swipeThreshold) {
            const visibleCards = getVisibleCards();
            const maxSlide = Math.max(0, totalReviews - visibleCards);
            
            if (diff > 0) {
                // Swipe left - next
                if (currentSlide < maxSlide) {
                    currentSlide++;
                } else {
                    currentSlide = 0;
                }
            } else {
                // Swipe right - previous
                if (currentSlide > 0) {
                    currentSlide--;
                } else {
                    currentSlide = maxSlide;
                }
            }
        }
        
        updateSlider();
    }, { passive: true });
}

// ==========================================
// FAQ Accordion
// ==========================================
// Only job: toggle the ".active" class.
// The icon (+ → −) is handled 100 % by CSS
// so we never touch .textContent here.
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // close every OTHER item
        faqItems.forEach(other => {
            if (other !== item) {
                other.classList.remove('active');
            }
        });

        // toggle the one that was clicked
        item.classList.toggle('active');
    });
});

// ==========================================
// Contact Form Submission
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        alert('Thank you for your message! We will get back to you soon.');
        
        contactForm.reset();
        console.log('Form Data:', data);
    });
}

// ==========================================
// Scroll Animation
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .feature-card, .review-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ==========================================
// CTA Button Actions
// ==========================================
document.querySelectorAll('.btn-primary, .cta-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.toLowerCase().includes('appointment') || 
            btn.textContent.toLowerCase().includes('book')) {
            e.preventDefault();
            
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerOffset = 80;
                const elementPosition = contactSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// Phone Button Action
// ==========================================
const phoneBtn = document.querySelector('.phone-btn');
if (phoneBtn) {
    phoneBtn.addEventListener('click', () => {
        window.location.href = 'tel:+919840601420';
    });
}

// ==========================================
// Stats Counter Animation
// ==========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ==========================================
// Lazy Loading Images
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// Prevent Form Submit on Enter (except textarea)
// ==========================================
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
});

// ==========================================
// Initialize on Page Load
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Uniq Customz Website Loaded Successfully!');
    
    const currentPath = window.location.hash || '#home';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
    
    // Initialize slider position
    if (reviewsContainer) {
        updateSlider();
    }
});

// ==========================================
// Handle Window Resize
// ==========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
        // Ensure slider position is valid after resize
        const visibleCards = getVisibleCards();
        const maxSlide = Math.max(0, totalReviews - visibleCards);
        if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        }
        updateSlider();
    }, 250);
});

// ==========================================
// Service Cards Hover Effect
// ==========================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 40px rgba(0, 200, 255, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// ==========================================
// Scroll to Top Button
// ==========================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #00c8ff;
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
