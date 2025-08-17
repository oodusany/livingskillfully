// Custom Cursor
// Mailer lite 
 (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
    .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', '1738459');

const cursor = {
    dot: document.querySelector('[data-cursor-dot]'),
    outline: document.querySelector('[data-cursor-outline]'),
    
    init() {
        // Only initialize on devices that support hover
        if (window.matchMedia('(hover: hover)').matches) {
            this.setupEventListeners();
        }
    },
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            this.dot.style.left = `${posX}px`;
            this.dot.style.top = `${posY}px`;
            
            this.outline.style.left = `${posX}px`;
            this.outline.style.top = `${posY}px`;
        });
        
        // Cursor interactions
        const hoverElements = document.querySelectorAll('a, button, .blog-card, .aspect-card, .pricing-card, .reset-kit-link');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.outline.style.borderColor = '#C3A059';
            });
            
            element.addEventListener('mouseleave', () => {
                this.outline.style.transform = 'translate(-50%, -50%) scale(1)';
                this.outline.style.borderColor = 'rgba(195, 160, 89, 0.3)';
            });
        });
    }
};

// Navigation
const navigation = {
    toggle: document.getElementById('nav-toggle'),
    menu: document.getElementById('nav-menu'),
    links: document.querySelectorAll('.nav-link'),
    
    init() {
        this.setupToggle();
        this.setupSmoothScroll();
        this.setupActiveStates();
    },
    
    setupToggle() {
        this.toggle.addEventListener('click', () => {
            this.toggle.classList.toggle('active');
            this.menu.classList.toggle('active');
            document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.toggle.contains(e.target) && !this.menu.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Close menu when scrolling on mobile
        window.addEventListener('scroll', () => {
            if (this.menu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    },
    
    setupSmoothScroll() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        const offsetTop = target.offsetTop - 100;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        this.closeMenu();
                    }
                }
            });
        });
    },
    
    setupActiveStates() {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveLink(id);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -50% 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    },
    
    updateActiveLink(activeId) {
        this.links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    },
    
    closeMenu() {
        this.toggle.classList.remove('active');
        this.menu.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Form Handling
const forms = {
    init() {
        this.setupBookingForm();
        this.setupContactForm();
    },
    
    setupBookingForm() {
        const form = document.querySelector('.booking-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmission(form);
            });
        }
    },
    
    setupContactForm() {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmission(form);
            });
        }
    },
    
    handleBookingSubmission(form) {
        const formData = new FormData(form);
        
        // Submit to Formspree
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                this.showSuccessMessage('Thank you! I\'ll be in touch soon to schedule your free connection session.');
                form.reset();
            } else {
                this.showErrorMessage('Something went wrong. Please try again or email me directly.');
            }
        })
        .catch(error => {
            this.showErrorMessage('Something went wrong. Please try again or email me directly.');
        });
    },
    
    handleContactSubmission(form) {
        const formData = new FormData(form);
        
        // Submit to Formspree
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                this.showSuccessMessage('Thank you for sharing! Your words are recieved with care. I\'ll be in touch soon.');
                form.reset();
            } else {
                this.showErrorMessage('Something went wrong. Please try again or email me directly.');
            }
        })
        .catch(error => {
            this.showErrorMessage('Something went wrong. Please try again or email me directly.');
        });
    },
    
    validateBookingForm(data) {
        if (!data.name || !data.email || !data.phone || !data.preferredTime) {
            this.showErrorMessage('Please fill in all required fields.');
            return false;
        }
        
        if (!this.isValidEmail(data.email)) {
            this.showErrorMessage('Please enter a valid email address.');
            return false;
        }
        
        return true;
    },
    
    validateContactForm(data) {
        if (!data.name || !data.email || !data.message) {
            this.showErrorMessage('Please fill in all required fields.');
            return false;
        }
        
        if (!this.isValidEmail(data.email)) {
            this.showErrorMessage('Please enter a valid email address.');
            return false;
        }
        
        return true;
    },
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    },
    
    showErrorMessage(message) {
        this.showNotification(message, 'error');
    },
    
    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <p>${message}</p>
                <button class="notification__close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? '#C3A059' : '#B28B84'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
        `;
        
        const content = notification.querySelector('.notification__content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;
        
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
        
        // Manual close
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.removeNotification(notification);
        });
    },
    
    removeNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
};

// Scroll Animations
const scrollAnimations = {
    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
    },
    
    setupIntersectionObserver() {
        const animatedElements = document.querySelectorAll(`
            .aspect-card,
            .pricing-card,
            .blog-card,
            .approach-point,
            .credential-item
        `);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach((element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    },
    
    setupParallaxEffects() {
        const floatingShapes = document.querySelectorAll('.floating-shape');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            floatingShapes.forEach((shape, index) => {
                const speed = 0.3 + (index * 0.1);
                shape.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }
};

// Header Scroll Effect
const headerEffects = {
    header: document.querySelector('.header'),
    
    init() {
        this.setupScrollEffect();
    },
    
    setupScrollEffect() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Change header appearance on scroll
            if (scrollTop > 100) {
                this.header.style.background = 'rgba(254, 254, 254, 0.98)';
                this.header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                this.header.style.background = 'rgba(254, 254, 254, 0.95)';
                this.header.style.boxShadow = 'none';
            }
            
            // Hide header on scroll down, show on scroll up
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
};

// Blog functionality
const blog = {
    init() {
        this.setupBlogInteractions();
    },
    
    setupBlogInteractions() {
        const blogCards = document.querySelectorAll('.blog-card');
        
        blogCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.blog-link')) {
                    const link = card.querySelector('.blog-link');
                    if (link) {
                        // Navigate to the article page
                        window.location.href = link.getAttribute('href');
                    }
                }
            });
        });
        
        // Handle placeholder card
        const placeholderCard = document.querySelector('.blog-placeholder-card');
        if (placeholderCard) {
            placeholderCard.addEventListener('click', () => {
                forms.showSuccessMessage('More articles coming soon! Stay tuned.');
            });
        }
    }
};

// Smooth reveal for text elements
const textAnimations = {
    init() {
        this.setupTextReveal();
    },
    
    setupTextReveal() {
        const textElements = document.querySelectorAll(`
            .section-title,
            .section-subtitle,
            .lead-text
        `);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });
        
        textElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(element);
        });
    }
};

// About Me Expand functionality
const aboutExpand = {
    init() {
        this.setupExpandButton();
    },
    
    setupExpandButton() {
        const expandBtn = document.getElementById('about-expand-btn');
        const expandedContent = document.getElementById('expanded-content');
        
        if (expandBtn && expandedContent) {
            expandBtn.addEventListener('click', () => {
                if (expandedContent.style.display === 'none') {
                    expandedContent.style.display = 'block';
                    expandedContent.classList.add('show');
                    expandBtn.textContent = 'See Less';
                    expandBtn.style.marginBottom = '0';
                } else {
                    expandedContent.style.display = 'none';
                    expandedContent.classList.remove('show');
                    expandBtn.textContent = 'See More';
                    expandBtn.style.marginBottom = '1.5rem';
                }
            });
        }
    }
};

// Journey Toggle functionality
const journeyToggle = {
    init() {
        this.setupJourneyToggle();
    },
    
    setupJourneyToggle() {
        const toggleBtn = document.getElementById('journey-toggle');
        const journeyContent = document.getElementById('journey-content');
        
        if (toggleBtn && journeyContent) {
            toggleBtn.addEventListener('click', () => {
                if (journeyContent.style.display === 'none') {
                    journeyContent.style.display = 'block';
                    toggleBtn.classList.add('expanded');
                } else {
                    journeyContent.style.display = 'none';
                    toggleBtn.classList.remove('expanded');
                }
            });
        }
    }
};

// Workflow Expand functionality
const workflowExpand = {
    init() {
        this.setupWorkflowExpand();
    },
    
    setupWorkflowExpand() {
        const toggleBtn = document.getElementById('workflow-expand-toggle');
        const workflowContent = document.getElementById('coaching-workflow');
        
        if (toggleBtn && workflowContent) {
            toggleBtn.addEventListener('click', () => {
                if (workflowContent.style.display === 'none') {
                    workflowContent.style.display = 'block';
                    workflowContent.classList.add('show');
                    toggleBtn.classList.add('expanded');
                    toggleBtn.querySelector('.toggle-text').textContent = 'Hide Process';
                } else {
                    workflowContent.style.display = 'none';
                    workflowContent.classList.remove('show');
                    toggleBtn.classList.remove('expanded');
                    toggleBtn.querySelector('.toggle-text').textContent = 'See Our 5-Step Process';
                }
            });
        }
    }
};

// Booking Form Toggle functionality
const bookingFormToggle = {
    init() {
        this.setupBookingFormToggle();
    },
    
    setupBookingFormToggle() {
        const toggleBtn = document.getElementById('booking-form-toggle');
        const formContainer = document.getElementById('booking-form-container');
        
        if (toggleBtn && formContainer) {
            toggleBtn.addEventListener('click', () => {
                if (formContainer.style.display === 'none') {
                    formContainer.style.display = 'block';
                    toggleBtn.classList.add('expanded');
                    toggleBtn.querySelector('.toggle-text').textContent = 'Hide Application Form';
                } else {
                    formContainer.style.display = 'none';
                    toggleBtn.classList.remove('expanded');
                    toggleBtn.querySelector('.toggle-text').textContent = 'Apply for Your Free Connection Session';
                }
            });
        }
    }
};

// Reflection Question Handler
const reflectionQuestions = {
    init() {
        this.setupReflectionQuestions();
    },
    
    setupReflectionQuestions() {
        const questionSelect = document.getElementById('reflection-question');
        const helperSection = document.getElementById('reflection-helper');
        const helperText = document.getElementById('helper-text');
        
        const helperTexts = {
            'tender_transition': '(No pressure to untangle it here—naming it is enough.)',
            'longing': '(Peace? Purpose? Rest? Aliveness? You name it.)',
            'self_return': '(Meditation, dance, long walks, journaling, memes... all welcome.)',
            'open_share': '(This space is yours.)'
        };
        
        if (questionSelect && helperSection && helperText) {
            questionSelect.addEventListener('change', () => {
                const selectedValue = questionSelect.value;
                
                if (selectedValue && helperTexts[selectedValue]) {
                    helperText.textContent = helperTexts[selectedValue];
                    helperSection.style.display = 'block';
                } else {
                    helperSection.style.display = 'none';
                }
            });
        }
    }
};

// Coaching Page Accordions
const coachingAccordions = {
    init() {
        this.setupAccordions();
    },
    
    setupAccordions() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const targetId = header.getAttribute('data-accordion');
                const content = document.getElementById(targetId);
                const icon = header.querySelector('.accordion-icon');
                const accordionItem = header.closest('.accordion-item');
                
                // Toggle the current accordion
                const isOpen = accordionItem.classList.contains('active');
                
                if (isOpen) {
                    // Close the accordion
                    accordionItem.classList.remove('active');
                    content.style.maxHeight = '0';
                    icon.textContent = '+';
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    // Open the accordion
                    accordionItem.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.textContent = '−';
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    cursor.init();
    navigation.init();
    forms.init();
    scrollAnimations.init();
    headerEffects.init();
    blog.init();
    textAnimations.init();
    aboutExpand.init();
    journeyToggle.init();
    workflowExpand.init();
    bookingFormToggle.init();
    reflectionQuestions.init();
    testimonialCarousel.init();
    coachingAccordions.init();
    modalHandler.init();
});

// Testimonial Card Deck
const testimonialCarousel = {
    track: document.querySelector('.carousel-track'),
    cards: document.querySelectorAll('.testimonial-card'),
    dots: document.querySelectorAll('.dot'),
    prevBtn: document.querySelector('.prev-btn'),
    nextBtn: document.querySelector('.next-btn'),
    currentIndex: 0,
    isTransitioning: false,
    
    init() {
        if (!this.track) return;
        
        this.setupEventListeners();
        this.setupTouchEvents();
        this.setupAutoplay();
        this.updateCardPositions();
    },
    
    setupEventListeners() {
        // Navigation buttons
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Pagination dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Card click navigation
        this.cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (index !== this.currentIndex) {
                    this.goToSlide(index);
                }
            });
        });
    },
    
    setupTouchEvents() {
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.track.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    },
    
    setupAutoplay() {
        setInterval(() => {
            if (!this.isTransitioning) {
                this.nextSlide();
            }
        }, 5000);
    },
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        
        this.isTransitioning = true;
        this.currentIndex = index;
        
        this.updateCardPositions();
        this.updateDots();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    },
    
    updateCardPositions() {
        this.cards.forEach((card, index) => {
            // Remove all position classes
            card.classList.remove('active', 'prev', 'next', 'hidden');
            
            if (index === this.currentIndex) {
                card.classList.add('active');
            } else if (index === this.getPrevIndex()) {
                card.classList.add('prev');
            } else if (index === this.getNextIndex()) {
                card.classList.add('next');
            } else {
                card.classList.add('hidden');
            }
        });
    },
    
    getPrevIndex() {
        return (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    },
    
    getNextIndex() {
        return (this.currentIndex + 1) % this.cards.length;
    },
    
    nextSlide() {
        const nextIndex = this.getNextIndex();
        this.goToSlide(nextIndex);
    },
    
    prevSlide() {
        const prevIndex = this.getPrevIndex();
        this.goToSlide(prevIndex);
    },
    
    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
};

// Modal Handler for Reset Kit
const modalHandler = {
    modal: null,
    overlay: null,
    
    init() {
        this.modal = document.getElementById('reset-modal');
        this.overlay = this.modal;
        this.setupModalEvents();
        this.setupFormSubmission();
    },
    
    setupModalEvents() {
        // Main CTA button
        const openBtn = document.getElementById('open-reset-modal');
        const closeBtn = document.getElementById('close-reset-modal');
        
        if (openBtn) {
            openBtn.addEventListener('click', () => this.openModal());
        }
        
        // All Reset Kit links throughout the site
        const resetKitLinks = document.querySelectorAll('.reset-kit-link');
        resetKitLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        // Close on overlay click
        if (this.overlay) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.closeModal();
                }
            });
        }
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    },
    
    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    },
    
    async downloadPDF(filename) {
        try {
            // Fetch the PDF file as a blob
            const response = await fetch(filename);
            if (!response.ok) throw new Error('PDF not found');
            
            const blob = await response.blob();
            
            // Create object URL for the blob
            const url = window.URL.createObjectURL(blob);
            
            // Create temporary anchor element for download
            const link = document.createElement('a');
            link.href = url;
            link.download = filename.split('/').pop(); // Get just the filename
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up the object URL
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            // Fallback: open PDF in new tab if download fails
            window.open(filename, '_blank');
        }
    },
    
    setupFormSubmission() {
        const form = document.querySelector('.modal-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitForm(form);
            });
        }
    },
    
    async submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Trigger PDF download
                await this.downloadPDF('Masturbation brochure.pdf');
                this.showSuccessNotification();
                form.reset();
                // Close modal after successful submission
                setTimeout(() => this.closeModal(), 1500);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            this.showErrorNotification();
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    },
    
    showSuccessNotification() {
        this.createNotification(
            'Thank you! Your Reset Kit is downloading now, and you\'ll also receive an email shortly.',
            'success'
        );
    },
    
    showErrorNotification() {
        this.createNotification(
            'Something went wrong. Please try again or contact us directly.',
            'error'
        );
    },
    
    createNotification(message, type) {
        // Remove any existing notifications
        const existing = document.querySelector('.form-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto-remove after 6 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 6000);
    }
};

// Handle resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 968) {
        navigation.closeMenu();
    }
});