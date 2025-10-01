// Main JavaScript for The Burden's Cast Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavigation();
    initScrollEffects();
    initCharacterCards();
    initParticleEffects();
    initSoundEffects();
    initAnimationTriggers();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(44, 24, 16, 0.98)';
        } else {
            navbar.style.background = 'rgba(44, 24, 16, 0.95)';
        }
    });
}

// Scroll-based animations and effects
function initScrollEffects() {
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        const heroImage = document.querySelector('.hero-main-image');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.character-card, .feature-card, .enemy-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Character card interactions
function initCharacterCards() {
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        const characterType = card.getAttribute('data-character');
        
        card.addEventListener('mouseenter', function() {
            // Add hover sound effect
            playHoverSound();
            
            // Add glow effect
            this.style.boxShadow = '0 15px 30px rgba(212, 175, 55, 0.4), 0 0 50px rgba(212, 175, 55, 0.2)';
            
            // Animate character image
            const img = this.querySelector('img');
            img.style.filter = 'brightness(1.2) contrast(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            const img = this.querySelector('img');
            img.style.filter = '';
        });
        
        card.addEventListener('click', function() {
            // Add click effect
            playClickSound();
            showCharacterModal(characterType);
        });
    });
}

// Particle effects system
function initParticleEffects() {
    createFloatingParticles();
    createMagicalOrbs();
}

function createFloatingParticles() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;

    // Create additional animated particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: #d4af37;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            opacity: ${Math.random() * 0.5 + 0.3};
            box-shadow: 0 0 10px #d4af37;
        `;
        particleContainer.appendChild(particle);
    }

    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

function createMagicalOrbs() {
    const sections = document.querySelectorAll('.features, .characters');
    
    sections.forEach(section => {
        for (let i = 0; i < 5; i++) {
            const orb = document.createElement('div');
            orb.className = 'magical-orb';
            orb.style.cssText = `
                position: absolute;
                width: ${Math.random() * 20 + 10}px;
                height: ${Math.random() * 20 + 10}px;
                background: radial-gradient(circle, rgba(212, 175, 55, 0.6), transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: orbFloat ${Math.random() * 8 + 8}s ease-in-out infinite;
                pointer-events: none;
                z-index: 1;
            `;
            section.style.position = 'relative';
            section.appendChild(orb);
        }
    });

    // Add orb animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes orbFloat {
            0%, 100% {
                transform: translateY(0px) scale(1);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-30px) scale(1.2);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(style);
}

// Sound effects (using Web Audio API)
function initSoundEffects() {
    // Create audio context for sound effects
    window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

function playHoverSound() {
    if (!window.audioContext) return;
    
    // Create a subtle hover sound
    const oscillator = window.audioContext.createOscillator();
    const gainNode = window.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(window.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, window.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, window.audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, window.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, window.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.1);
    
    oscillator.start(window.audioContext.currentTime);
    oscillator.stop(window.audioContext.currentTime + 0.1);
}

function playClickSound() {
    if (!window.audioContext) return;
    
    // Create a click sound
    const oscillator = window.audioContext.createOscillator();
    const gainNode = window.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(window.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(1000, window.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(500, window.audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, window.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, window.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.1);
    
    oscillator.start(window.audioContext.currentTime);
    oscillator.stop(window.audioContext.currentTime + 0.1);
}

// Animation triggers and effects
function initAnimationTriggers() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            playHoverSound();
        });
        
        button.addEventListener('click', function() {
            playClickSound();
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleEffect 0.6s linear;
                left: 50%;
                top: 50%;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Enemy hover effects
    const enemies = document.querySelectorAll('.enemy-item');
    enemies.forEach(enemy => {
        enemy.addEventListener('mouseenter', function() {
            playHoverSound();
            this.style.filter = 'drop-shadow(0 8px 25px #8b2635) sepia(0.5) hue-rotate(320deg) brightness(1.2)';
        });
        
        enemy.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });
}

// Character modal functionality
function showCharacterModal(characterType) {
    const characterInfo = {
        warrior: {
            name: 'Warrior',
            description: 'A brave fighter specialized in melee combat. His strength and endurance are legendary.',
            stats: ['⚔️ Attack: 1', '🛡️ Defense: 2', '👟 Movement: 1', '🎯 Range: 2']
        },
        mage: {
            name: 'Mage',
            description: 'Master of the arcane arts, capable of manipulating elemental forces to destroy enemies.',
            stats: ['⚔️ Attack: 2', '🛡️ Defense: 0', '👟 Movement: 1', '🎯 Range: 2']
        },
        archer: {
            name: 'Archer',
            description: 'Expert in ranged combat, his precision with the bow is unmatched.',
            stats: ['⚔️ Attack: 1', '🛡️ Defense: 1', '👟 Movement: 1', '🎯 Range: 3']
        },
        rogue: {
            name: 'Rogue',
            description: 'Master of shadows, expert in stealth and surprise attacks.',
            stats: ['⚔️ Attack: 1', '🛡️ Defense: 1', '👟 Movement: 2', '🎯 Range: 2']
        }
    };

    const info = characterInfo[characterType];
    if (!info) return;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'character-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(145deg, #4a2c17, #2c1810);
        border: 2px solid #d4af37;
        border-radius: 15px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    modalContent.innerHTML = `
        <h2 style="font-family: 'Cinzel', serif; color: #d4af37; margin-bottom: 1rem;">${info.name}</h2>
        <img src="assets/img/${characterType}_256.png" alt="${info.name}" style="width: 150px; height: 150px; margin-bottom: 1rem; border-radius: 10px;">
        <p style="color: #f4e4bc; margin-bottom: 1.5rem; line-height: 1.6;">${info.description}</p>
        <h3 style="font-family: 'Cinzel', serif; color: #d4af37; margin-bottom: 1rem;">Stats:</h3>
        <ul style="list-style: none; padding: 0; color: #f4e4bc;">
            ${info.stats.map(stat => `<li style="margin-bottom: 0.5rem;">${stat}</li>`).join('')}
        </ul>
        <button class="close-modal" style="
            background: #d4af37;
            color: #2c1810;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-family: 'Cinzel', serif;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1.5rem;
            transition: all 0.3s ease;
        ">Close</button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Animate modal in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close with Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here if needed
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'assets/img/warrior_256.png',
        'assets/img/mage_256.png',
        'assets/img/archer_256.png',
        'assets/img/rogue_256.png',
        'assets/img/demon_256.png',
        'assets/img/skeleton_256.png',
        'assets/img/orc_256.png',
        'assets/img/spider_256.png'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize image preloading
preloadImages();
