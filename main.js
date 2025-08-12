/* ========================================
   FILE: js/main.js
   Main JavaScript for Smart Campus Portal
   ======================================== */

// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// ========================================
// SLIDER FUNCTIONALITY
// ========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.announcement-slide');
const dots = document.querySelectorAll('.slider-dot');

function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[n]) {
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        currentSlide = n;
    }
}

// Auto-advance slider every 5 seconds
function initSlider() {
    if (slides.length > 0) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
}

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 20);
        } else {
            counter.innerText = target + (counter.parentElement.querySelector('.stat-label').innerText.includes('Rate') ? '%' : '');
        }
    });
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
function initIntersectionObserver() {
    const statsSection = document.querySelector('.stats');
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(statsSection);
    }
}

// ========================================
// SMOOTH SCROLLING
// ========================================
function initSmoothScrolling() {
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
}

// ========================================
// MOBILE MENU CLOSE ON LINK CLICK
// ========================================
function initMobileMenuClose() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
}

// ========================================
// HEADER SCROLL EFFECT
// ========================================
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(102, 126, 234, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                header.style.backdropFilter = 'none';
            }
        });
    }
}

// ========================================
// INITIALIZE ALL FUNCTIONS ON DOM LOAD
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSlider();
    initIntersectionObserver();
    initSmoothScrolling();
    initMobileMenuClose();
    initHeaderScrollEffect();
    
    console.log('Smart Campus Portal - JavaScript loaded successfully!');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Add loading state to buttons
function addLoadingState(button, text = 'Loading...') {
    const originalText = button.textContent;
    button.textContent = text;
    button.disabled = true;
    
    return function removeLoadingState() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Show notifications (you can expand this for future use)
function showNotification(message, type = 'info') {
    // This can be expanded later for toast notifications
    console.log(`${type.toUpperCase()}: ${message}`);
}

// Form validation helper (for future forms)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Local storage helpers (for future use)
function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function getLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Error reading from localStorage:', e);
        return null;
    }
}