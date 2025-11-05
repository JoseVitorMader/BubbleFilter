// Accessible JavaScript - Bolhas de Filtro Website
// Focado em acessibilidade, UX limpo e funcionalidade essencial

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavigation();
    initAccessibility();
    initAnimations();
    initKeyboardSupport();
    initFormValidation();
    
    // Announce page load to screen readers
    announcePageLoad();
});

// Navigation with accessibility features
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Mark current page
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
        
        // Add accessible labels
        if (!link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', `Navegar para ${link.textContent.trim()}`);
        }
    });

    // Mobile menu accessibility (if exists)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'nav-menu');
        navMenu.setAttribute('id', 'nav-menu');
        
        // Toggle menu function
        function toggleMenu() {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            hamburger.setAttribute('aria-label', isExpanded ? 'Abrir menu de navegação' : 'Fechar menu de navegação');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
            
            // Focus management
            if (!isExpanded) {
                // Menu opening - focus first link
                const firstLink = navMenu.querySelector('a');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            } else {
                // Menu closing - return focus to hamburger
                hamburger.focus();
            }
        }
        
        // Click event
        hamburger.addEventListener('click', toggleMenu);
        
        // Keyboard support for hamburger
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
        
        // Close menu when clicking on a link
        navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                toggleMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Accessibility features
function initAccessibility() {
    // Add skip links if not present
    addSkipLinks();
    
    // Improve heading structure
    improveHeadingStructure();
    
    // Add ARIA labels where needed
    addAriaLabels();
    
    // Handle focus management
    manageFocus();
    
    // Add role attributes
    addRoleAttributes();
    
    // Announce dynamic content changes
    setupLiveRegions();
}

function addSkipLinks() {
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Pular para o conteúdo principal';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // Ensure main content has ID
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main-content';
    }
}

function improveHeadingStructure() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let currentLevel = 0;
    
    headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        
        // Warn about skipped heading levels (for development)
        if (level > currentLevel + 1) {
            console.warn(`Heading level skipped: found h${level} after h${currentLevel}`);
        }
        
        currentLevel = level;
    });
}

function addAriaLabels() {
    // Cards
    const cards = document.querySelectorAll('.card, .stat-card');
    cards.forEach(card => {
        if (!card.getAttribute('role')) {
            card.setAttribute('role', 'article');
        }
    });
    
    // Buttons without labels
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    buttons.forEach(button => {
        if (!button.textContent.trim()) {
            button.setAttribute('aria-label', 'Botão');
        }
    });
    
    // Links without descriptive text
    const links = document.querySelectorAll('a[href]:not([aria-label]):not([aria-labelledby])');
    links.forEach(link => {
        if (link.textContent.trim().length < 3) {
            link.setAttribute('aria-label', `Link para ${link.href}`);
        }
    });
}

function manageFocus() {
    // Focus trap for modals (if any)
    const modals = document.querySelectorAll('[role="dialog"], .modal');
    modals.forEach(modal => {
        trapFocus(modal);
    });
    
    // Focus visible on keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-focus');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-focus');
    });
}

function addRoleAttributes() {
    // Navigation
    const nav = document.querySelector('nav');
    if (nav && !nav.getAttribute('role')) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Navegação principal');
    }
    
    // Main content
    const main = document.querySelector('main');
    if (main && !main.getAttribute('role')) {
        main.setAttribute('role', 'main');
    }
    
    // Footer
    const footer = document.querySelector('footer');
    if (footer && !footer.getAttribute('role')) {
        footer.setAttribute('role', 'contentinfo');
    }
}

function setupLiveRegions() {
    // Create live region for announcements
    if (!document.getElementById('announcements')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'announcements';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
    }
}

// Keyboard support
function initKeyboardSupport() {
    // Custom interactive elements
    const interactiveElements = document.querySelectorAll('.option, .card[data-clickable]');
    
    interactiveElements.forEach(element => {
        // Make focusable
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Add keyboard support
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Arrow key navigation for option lists
    const optionGroups = document.querySelectorAll('.options');
    optionGroups.forEach(group => {
        addArrowKeyNavigation(group);
    });
}

function addArrowKeyNavigation(container) {
    const options = container.querySelectorAll('.option');
    
    options.forEach((option, index) => {
        option.addEventListener('keydown', function(e) {
            let targetIndex;
            
            switch (e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    targetIndex = (index + 1) % options.length;
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    targetIndex = (index - 1 + options.length) % options.length;
                    break;
                case 'Home':
                    e.preventDefault();
                    targetIndex = 0;
                    break;
                case 'End':
                    e.preventDefault();
                    targetIndex = options.length - 1;
                    break;
                default:
                    return;
            }
            
            options[targetIndex].focus();
        });
    });
}

// Form validation with accessibility
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const isValid = validateForm(form);
            if (!isValid) {
                e.preventDefault();
                focusFirstError(form);
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearErrors(input));
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    const type = field.type;
    
    clearErrors(field);
    
    if (isRequired && !value) {
        showError(field, 'Este campo é obrigatório');
        return false;
    }
    
    if (value && type === 'email' && !isValidEmail(value)) {
        showError(field, 'Por favor, insira um email válido');
        return false;
    }
    
    return true;
}

function showError(field, message) {
    field.setAttribute('aria-invalid', 'true');
    
    let errorElement = document.getElementById(field.id + '-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = field.id + '-error';
        errorElement.className = 'error-message';
        errorElement.setAttribute('role', 'alert');
        field.parentNode.appendChild(errorElement);
        field.setAttribute('aria-describedby', errorElement.id);
    }
    
    errorElement.textContent = message;
}

function clearErrors(field) {
    field.removeAttribute('aria-invalid');
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
        errorElement.remove();
        field.removeAttribute('aria-describedby');
    }
}

function focusFirstError(form) {
    const firstError = form.querySelector('[aria-invalid="true"]');
    if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Smooth animations with respect to user preferences
function initAnimations() {
    // Only animate if user allows motion
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        setupIntersectionObserver();
        setupCounterAnimations();
    }
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Announce content appearance to screen readers
                if (entry.target.hasAttribute('data-announce')) {
                    announce(entry.target.getAttribute('data-announce'));
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));
}

function setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const finalValue = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = finalValue / (duration / 16);
    let currentValue = 0;

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(currentValue).toLocaleString();
    }, 16);
}

// Utility functions
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

function announce(message) {
    const announcer = document.getElementById('announcements');
    if (announcer) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    }
}

function announcePageLoad() {
    const pageTitle = document.title;
    const heading = document.querySelector('h1');
    const message = heading ? 
        `Página carregada: ${pageTitle}. ${heading.textContent}` : 
        `Página carregada: ${pageTitle}`;
    
    setTimeout(() => announce(message), 500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    announce('Ocorreu um erro na página. Por favor, recarregue se necessário.');
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        if (loadTime > 3000) {
            console.warn('Página demorou mais de 3 segundos para carregar');
        }
    });
}