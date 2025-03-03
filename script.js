// Initialize Lucide icons
lucide.createIcons();

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)';
    }
});

// Reveal animations on scroll
function animateOnScroll() {
    // Timeline items, project cards, education cards, and skill items
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .education-card, .skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('education-card')) {
                    entry.target.classList.add('visible');
                } else {
                    // For timeline items, project cards and skill items, they already have animation
                    // Just need to set the delay based on their index
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.setProperty('--i', index % 8); // Reset counter every 8 items
                    entry.target.style.animationPlayState = 'running';
                }
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(item => {
        if (!item.classList.contains('education-card')) {
            item.style.animationPlayState = 'paused'; // Pause animation until visible
        }
        observer.observe(item);
    });
}

// Add subtle particle effect to hero section
function createParticles() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.zIndex = '0';
    
    hero.appendChild(particlesContainer);
    
    // Adjust number of particles based on screen size
    const particleCount = window.innerWidth < 768 ? 25 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Random size between 2px and 5px
        const size = Math.random() * 3 + 2;
        
        // Style the particle
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = 'rgba(56, 189, 248, 0.2)';
        particle.style.borderRadius = '50%';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.5)';
        
        // Set animation properties
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.opacity = Math.random() * 0.5;
        
        // Add to container
        particlesContainer.appendChild(particle);
    }
    
    // Add keyframes for floating animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-20px) translateX(10px);
            }
            50% {
                transform: translateY(-40px) translateX(0);
            }
            75% {
                transform: translateY(-20px) translateX(-10px);
            }
            100% {
                transform: translateY(0) translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Add typing animation to hero section
function addTypingAnimation() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.classList.add('typing-effect');
    
    let charIndex = 0;
    const typingInterval = setInterval(() => {
        if (charIndex < originalText.length) {
            subtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typingInterval);
            setTimeout(() => {
                subtitle.classList.remove('typing-effect');
            }, 1000);
        }
    }, 50);
}

// Handle resume download
function setupResumeDownload() {
    const resumeLinks = document.querySelectorAll('a[href="resume.pdf"]');
    
    resumeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If you have a real resume.pdf file, this will work automatically
            // This is just a fallback message in case the file doesn't exist
            console.log('Resume download initiated');
        });
    });
}

// Check if device is mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Adjust layout for mobile devices
function adjustForMobile() {
    if (isMobile()) {
        // Simplify animations on mobile
        document.querySelectorAll('.timeline-item, .project-card, .skill-item').forEach(item => {
            item.style.animationPlayState = 'running';
        });
        
        // Make education cards visible immediately on mobile
        document.querySelectorAll('.education-card').forEach(card => {
            card.classList.add('visible');
        });
        
        // Enhance footer social links on mobile
        const footerSocialLinks = document.querySelector('footer .social-links');
        if (footerSocialLinks) {
            footerSocialLinks.classList.add('mobile-social-links');
        }
    }
}

// Handle window resize
function handleResize() {
    adjustForMobile();
}

// Initialize everything on load
window.addEventListener('load', () => {
    createParticles();
    setTimeout(addTypingAnimation, 1000);
    animateOnScroll();
    setupResumeDownload();
    adjustForMobile();
    
    // Listen for window resize events
    window.addEventListener('resize', handleResize);
});