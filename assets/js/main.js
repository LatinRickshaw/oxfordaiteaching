/**
 * AI Evening Classes Oxford - Main JavaScript
 * Handles mobile menu, smooth scrolling, and interactive elements
 */

(function() {
    'use strict';

    // ========================================
    // Mobile Menu Toggle
    // ========================================

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Close menu when pressing Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // Smooth Scrolling for Anchor Links
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignore empty anchors and # only
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    }
                    document.body.style.overflow = '';
                }

                // Scroll to element with offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });

    // ========================================
    // Highlight Active Navigation on Scroll
    // ========================================

    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

        if (sections.length === 0 || navLinks.length === 0) return;

        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // ========================================
    // Form Validation Enhancements
    // ========================================

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Add novalidate to use custom validation
        form.setAttribute('novalidate', true);

        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            // Clear previous error states
            form.querySelectorAll('.error-message').forEach(error => error.remove());
            form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(field => {
                field.classList.remove('error');
            });

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');

                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.style.color = 'var(--color-error)';
                    errorMsg.style.fontSize = '0.875rem';
                    errorMsg.style.marginTop = '0.25rem';
                    errorMsg.style.display = 'block';
                    errorMsg.textContent = 'This field is required';

                    field.parentNode.appendChild(errorMsg);
                }

                // Email validation
                if (field.type === 'email' && field.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');

                        const errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = 'var(--color-error)';
                        errorMsg.style.fontSize = '0.875rem';
                        errorMsg.style.marginTop = '0.25rem';
                        errorMsg.style.display = 'block';
                        errorMsg.textContent = 'Please enter a valid email address';

                        field.parentNode.appendChild(errorMsg);
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();

                // Focus on first error field
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        // Real-time validation feedback
        const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error') && this.value.trim()) {
                    this.classList.remove('error');
                    const errorMsg = this.parentNode.querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();
                }
            });
        });
    });

    // ========================================
    // Add Fade-in Animation on Scroll
    // ========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply to course cards and features
    document.querySelectorAll('.course-card, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeInObserver.observe(el);
    });

    // ========================================
    // Sticky Header Shadow on Scroll
    // ========================================

    const header = document.querySelector('.site-header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }
        });
    }

    // ========================================
    // Prevent Empty Hash Links
    // ========================================

    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // ========================================
    // Add Current Year to Footer
    // ========================================

    const currentYearElements = document.querySelectorAll('[data-current-year]');
    if (currentYearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        currentYearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }

    // ========================================
    // Newsletter Form Success Message
    // ========================================

    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Let Formspree handle the actual submission
            // But provide user feedback
            const button = form.querySelector('button[type="submit"]');
            if (button) {
                const originalText = button.textContent;
                button.textContent = 'Subscribing...';
                button.disabled = true;

                // Re-enable after a delay (Formspree will redirect or show message)
                setTimeout(function() {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 3000);
            }
        });
    });

    // ========================================
    // Dismissible Preview Event Banner
    // ========================================

    window.dismissBanner = function() {
        const banner = document.getElementById('previewBanner');
        if (banner) {
            banner.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => banner.remove(), 300);
            localStorage.setItem('previewBannerDismissed', 'true');
        }
    };

    // Check if banner was previously dismissed
    const previewBanner = document.getElementById('previewBanner');
    if (previewBanner && localStorage.getItem('previewBannerDismissed') === 'true') {
        previewBanner.remove();
    }

    // Add slideUp animation if not already defined in CSS
    if (previewBanner && !document.querySelector('style[data-preview-animations]')) {
        const style = document.createElement('style');
        style.setAttribute('data-preview-animations', 'true');
        style.textContent = `
            @keyframes slideUp {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(-100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ========================================
    // Print Debug Info (Development Only)
    // ========================================

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('AI Evening Classes Oxford - Site loaded');
        console.log('Mobile menu:', mobileMenuToggle ? 'Found' : 'Not found');
        console.log('Forms found:', forms.length);
        console.log('Preview banner:', previewBanner ? 'Found' : 'Not found');
    }

})();
