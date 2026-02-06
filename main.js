// ==========================================
// Uniq Customz Landing Page
// Version: 1.0.0
// Build Date: 2026-02-04
// GTM Container: GTM-57C5CXMM
// GA4 Measurement ID: G-0JJRL7GNJT
// ==========================================

// ==========================================
// Navigation Menu Toggle
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        if (hamburger) {
            hamburger.setAttribute('aria-expanded', 'false');
        }
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

faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');

    if (question) {
        question.addEventListener('click', () => {
            // Track FAQ interaction
            const questionText = question.querySelector('span:first-child')?.textContent.trim() || `FAQ ${index + 1}`;
            const isOpening = !item.classList.contains('active');
            
            // Track before toggling
            if (typeof pushGTMEvent === 'function') {
                pushGTMEvent('faq_interaction', {
                    event_category: 'Engagement',
                    event_label: questionText,
                    faq_action: isOpening ? 'open' : 'close',
                    conversion_type: 'faq_view'
                });
            }
            
            // close every OTHER item
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const otherQuestion = other.querySelector('.faq-question');
                    if (otherQuestion) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            // toggle the one that was clicked
            const isActive = item.classList.toggle('active');
            question.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
    }
});

// ==========================================
// Contact Form Submission
// ==========================================
// Form submission handling is done below with GTM tracking

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
// Google Tag Manager & GA4 Event Tracking
// ==========================================

// Initialize dataLayer if it doesn't exist
window.dataLayer = window.dataLayer || [];

// Track conversion events to prevent duplicates
const conversionTracker = {
    callClicks: new Set(),
    whatsappClicks: new Set()
};

// Helper function to push events to dataLayer with validation
function pushGTMEvent(eventName, eventParams = {}) {
    // Validate event data
    const validatedParams = {
        ...eventParams,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        page_path: window.location.pathname
    };
    
    window.dataLayer.push({
        event: eventName,
        ...validatedParams
    });
    
    // Log for debugging (remove in production if needed)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('GTM Event:', eventName, validatedParams);
    }
}

// Track page view on load
document.addEventListener('DOMContentLoaded', () => {
    pushGTMEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
    
    // Initialize conversion tracking after DOM is ready
    initializeConversionTracking();
});

// ==========================================
// ACCURATE CONVERSION TRACKING
// ==========================================

function initializeConversionTracking() {
    // ==========================================
    // CALL CLICK CONVERSION TRACKING
    // Groups ALL call buttons/links into one conversion event
    // ==========================================
    
    // Track phone button (.phone-btn)
    const phoneBtn = document.querySelector('.phone-btn');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function(e) {
            const clickId = `call_${Date.now()}_${Math.random()}`;
            
            // Prevent duplicate tracking
            if (!conversionTracker.callClicks.has(clickId)) {
                conversionTracker.callClicks.add(clickId);
                
                pushGTMEvent('call_click', {
                    event_category: 'Conversion',
                    event_label: 'Call Click',
                    conversion_type: 'call',
                    conversion_value: 1,
                    button_type: 'phone_icon',
                    button_location: 'header',
                    phone_number: '9840601420',
                    section_id: this.closest('section')?.id || 'header',
                    element_class: this.className
                });
            }
            
            // Allow default action to proceed
            setTimeout(() => {
                window.location.href = 'tel:+919840601420';
            }, 100);
        }, { once: false });
    }
    
    // Track ALL tel: links (phone number links)
    document.querySelectorAll('a[href^="tel:"], a[href^="TEL:"]').forEach((link, index) => {
        // Remove any existing listeners to prevent duplicates
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
            const clickId = `call_${this.href}_${Date.now()}`;
            const phoneNumber = this.getAttribute('href').replace(/^tel:/i, '').trim();
            const buttonText = this.textContent.trim() || this.innerText.trim() || 'Call Button';
            const section = this.closest('section');
            const sectionId = section?.id || 'unknown';
            const buttonClasses = this.className || '';
            
            // Prevent duplicate tracking
            if (!conversionTracker.callClicks.has(clickId)) {
                conversionTracker.callClicks.add(clickId);
                
                pushGTMEvent('call_click', {
                    event_category: 'Conversion',
                    event_label: 'Call Click',
                    conversion_type: 'call',
                    conversion_value: 1,
                    button_type: 'tel_link',
                    button_text: buttonText,
                    button_location: sectionId,
                    phone_number: phoneNumber,
                    section_id: sectionId,
                    element_class: buttonClasses,
                    button_index: index
                });
            }
        }, { once: false });
    });
    
    // Track buttons with tel: href (Contact Us buttons, etc.)
    document.querySelectorAll('a.btn-primary, a.cta-btn, a.btn[href*="tel:"]').forEach((btn, index) => {
        if (btn.href && (btn.href.toLowerCase().includes('tel:') || btn.getAttribute('href')?.toLowerCase().includes('tel:'))) {
            btn.addEventListener('click', function(e) {
                const clickId = `call_btn_${this.href}_${Date.now()}`;
                const phoneNumber = this.getAttribute('href').replace(/^tel:/i, '').trim();
                const buttonText = this.textContent.trim() || this.innerText.trim() || 'Contact Button';
                const section = this.closest('section');
                const sectionId = section?.id || 'unknown';
                const buttonClasses = this.className || '';
                
                // Prevent duplicate tracking
                if (!conversionTracker.callClicks.has(clickId)) {
                    conversionTracker.callClicks.add(clickId);
                    
                    pushGTMEvent('call_click', {
                        event_category: 'Conversion',
                        event_label: 'Call Click',
                        conversion_type: 'call',
                        conversion_value: 1,
                        button_type: 'contact_button',
                        button_text: buttonText,
                        button_location: sectionId,
                        phone_number: phoneNumber,
                        section_id: sectionId,
                        element_class: buttonClasses,
                        button_index: index
                    });
                }
            }, { once: false });
        }
    });
    
    // ==========================================
    // WHATSAPP CLICK CONVERSION TRACKING
    // Groups ALL WhatsApp buttons/links into one conversion event
    // ==========================================
    
    // Track WhatsApp links (wa.me, api.whatsapp.com, web.whatsapp.com)
    const whatsappSelectors = [
        'a[href*="wa.me"]',
        'a[href*="api.whatsapp.com"]',
        'a[href*="web.whatsapp.com"]',
        'a[href*="whatsapp.com"]',
        'a[data-whatsapp]',
        '.whatsapp-btn',
        '.whatsapp-link',
        '[class*="whatsapp"]'
    ];
    
    whatsappSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((link, index) => {
            if (link.href && (
                link.href.includes('wa.me') || 
                link.href.includes('api.whatsapp.com') || 
                link.href.includes('web.whatsapp.com') ||
                link.href.includes('whatsapp.com') ||
                link.getAttribute('data-whatsapp')
            )) {
                link.addEventListener('click', function(e) {
                    const clickId = `whatsapp_${this.href}_${Date.now()}`;
                    const whatsappUrl = this.href || this.getAttribute('href') || '';
                    const buttonText = this.textContent.trim() || this.innerText.trim() || 'WhatsApp Button';
                    const section = this.closest('section');
                    const sectionId = section?.id || 'unknown';
                    const buttonClasses = this.className || '';
                    
                    // Extract phone number from WhatsApp URL if possible
                    let phoneNumber = '';
                    const phoneMatch = whatsappUrl.match(/[\d]{10,}/);
                    if (phoneMatch) {
                        phoneNumber = phoneMatch[0];
                    }
                    
                    // Prevent duplicate tracking
                    if (!conversionTracker.whatsappClicks.has(clickId)) {
                        conversionTracker.whatsappClicks.add(clickId);
                        
                        pushGTMEvent('whatsapp_click', {
                            event_category: 'Conversion',
                            event_label: 'WhatsApp Click',
                            conversion_type: 'whatsapp',
                            conversion_value: 1,
                            button_type: 'whatsapp_link',
                            button_text: buttonText,
                            button_location: sectionId,
                            whatsapp_url: whatsappUrl,
                            phone_number: phoneNumber || 'unknown',
                            section_id: sectionId,
                            element_class: buttonClasses,
                            button_index: index
                        });
                    }
                }, { once: false });
            }
        });
    });
    
    // Also track dynamically added WhatsApp links (MutationObserver)
    const whatsappObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Check if it's a WhatsApp link
                    if (node.matches && (
                        node.matches('a[href*="wa.me"]') ||
                        node.matches('a[href*="api.whatsapp.com"]') ||
                        node.matches('a[href*="whatsapp.com"]')
                    )) {
                        const clickId = `whatsapp_${node.href}_${Date.now()}`;
                        node.addEventListener('click', function(e) {
                            if (!conversionTracker.whatsappClicks.has(clickId)) {
                                conversionTracker.whatsappClicks.add(clickId);
                                
                                pushGTMEvent('whatsapp_click', {
                                    event_category: 'Conversion',
                                    event_label: 'WhatsApp Click',
                                    conversion_type: 'whatsapp',
                                    conversion_value: 1,
                                    button_type: 'whatsapp_link_dynamic',
                                    whatsapp_url: this.href,
                                    section_id: this.closest('section')?.id || 'unknown'
                                });
                            }
                        });
                    }
                }
            });
        });
    });
    
    // Start observing
    whatsappObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Track Get Directions clicks
document.querySelectorAll('a[href*="maps.app.goo.gl"], a[href*="google.com/maps"]').forEach(link => {
    link.addEventListener('click', function(e) {
        pushGTMEvent('get_directions_click', {
            event_category: 'Conversion',
            event_label: 'Get Directions',
            conversion_type: 'directions_click',
            link_location: this.closest('section')?.id || 'hero'
        });
    });
});

// Track Service Card Clicks
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.addEventListener('click', function() {
        const serviceTitle = this.querySelector('.service-title')?.textContent.trim() || `Service ${index + 1}`;
        
        pushGTMEvent('service_card_click', {
            event_category: 'Engagement',
            event_label: serviceTitle,
            conversion_type: 'service_interest'
        });
    });
});

// Track Review Interactions
document.querySelectorAll('.review-card').forEach((card, index) => {
    card.addEventListener('click', function() {
        const reviewerName = this.querySelector('.reviewer-details h4')?.textContent.trim() || 'Unknown';
        
        pushGTMEvent('review_interaction', {
            event_category: 'Engagement',
            event_label: reviewerName,
            conversion_type: 'review_view'
        });
    });
});

// FAQ tracking is handled within the FAQ accordion function above
// No separate tracking needed here to avoid duplicate listeners

// Track Form Submissions (if contact form exists)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Track form submission
        if (typeof pushGTMEvent === 'function') {
            pushGTMEvent('form_submit', {
                event_category: 'Conversion',
                event_label: 'Contact Form',
                conversion_type: 'form_submission',
                form_id: 'contactForm'
            });
        }
        
        // Handle form submission
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        alert('Thank you for your message! We will get back to you soon.');
        
        contactForm.reset();
        console.log('Form Data:', data);
    });
}

// Track Scroll Depth (25%, 50%, 75%, 100%)
let scrollDepthTracked = {
    25: false,
    50: false,
    75: false,
    100: false
};

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
    
    [25, 50, 75, 100].forEach(depth => {
        if (scrollPercentage >= depth && !scrollDepthTracked[depth]) {
            scrollDepthTracked[depth] = true;
            pushGTMEvent('scroll_depth', {
                event_category: 'Engagement',
                event_label: `${depth}% Scroll Depth`,
                scroll_depth: depth
            });
        }
    });
});

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
