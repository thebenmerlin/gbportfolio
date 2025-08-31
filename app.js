class PortfolioApp {
    constructor() {
        this.currentPage = 'home';
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.initAnimations();
        this.initInternshipFilters();
        this.initScrollAnimations();
        this.showPage('home');
    }

    bindEvents() {
        // Navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const page = e.target.getAttribute('data-page');
                this.showPage(page);
                this.closeMenu();
            });
        });

        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Project cards interaction
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                this.handleProjectClick(card);
            });
        });

        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Scroll handler for animations and effects
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    showPage(pageId) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.add('hidden');
        });

        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            this.currentPage = pageId;
            
            // Update navigation
            this.updateNavigation(pageId);
            
            // Update theme with smooth transition
            this.updateTheme(pageId);
            
            // Trigger page-specific animations
            this.triggerPageAnimations(pageId);
            
            // Update URL without causing page reload
            this.updateURL(pageId);
            
            // Track page view
            this.trackPageView(pageId);
        }
    }

    updateNavigation(activePageId) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === activePageId) {
                item.classList.add('active');
            }
        });
    }

    updateTheme(pageId) {
        const nav = document.querySelector('.nav');
        const targetPage = document.getElementById(pageId);
        
        if (!nav || !targetPage) return;

        const theme = targetPage.getAttribute('data-theme');
        
        // Remove all theme classes
        nav.classList.remove('bloomberg-style', 'nyt-style', 'hybrid-style');
        
        // Add appropriate theme class with fade transition
        setTimeout(() => {
            if (theme === 'nyt') {
                nav.classList.add('nyt-style');
            } else if (theme === 'hybrid') {
                nav.classList.add('hybrid-style');
            } else {
                nav.classList.add('bloomberg-style');
            }
        }, 150);
    }

    updateURL(pageId) {
        const newURL = pageId === 'home' ? '/' : `#${pageId}`;
        history.pushState({ page: pageId }, '', newURL);
    }

    toggleMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (!navMenu || !navToggle) return;
        
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            navMenu.classList.add('active');
            navToggle.classList.add('active');
        } else {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    closeMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (!navMenu || !navToggle) return;
        
        this.isMenuOpen = false;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }

    initAnimations() {
        // Professional hero title animation
        this.initHeroAnimation();
        
        // Ticker animation for subtitle
        this.initTickerAnimation();
        
        // Stats counter animation
        this.initStatsAnimation();
        
        // Skill tags hover effects
        this.initSkillTagEffects();
    }

    initHeroAnimation() {
        const heroTitle = document.getElementById('hero-title');
        if (!heroTitle) return;

        // Clean, professional fade-in animation
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }

    initTickerAnimation() {
        const tickerText = document.querySelector('.ticker-text');
        if (!tickerText) return;

        const messages = [
            'Finance × Law × Technology',
            'Investment Banking × Legal Research',
            'Algorithm Development × Policy Analysis',
            'Quantitative Finance × Securities Lending',
            'Bloomberg Terminal × Legal Technology'
        ];
        
        let currentIndex = 0;
        
        const cycleTicker = () => {
            tickerText.style.opacity = '0.5';
            tickerText.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % messages.length;
                tickerText.textContent = messages[currentIndex];
                tickerText.style.opacity = '1';
                tickerText.style.transform = 'translateY(0)';
            }, 300);
        };
        
        // Cycle through messages every 4 seconds
        setInterval(cycleTicker, 4000);
    }

    initStatsAnimation() {
        const statValues = document.querySelectorAll('.stat-value');
        
        const animateValue = (element, start, end, duration) => {
            const startTimestamp = performance.now();
            const isFloat = end.toString().includes('.');
            
            const step = (timestamp) => {
                const elapsed = timestamp - startTimestamp;
                const progress = Math.min(elapsed / duration, 1);
                
                let current;
                if (isFloat) {
                    current = (progress * (end - start) + start).toFixed(1);
                } else {
                    current = Math.floor(progress * (end - start) + start);
                }
                
                element.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    element.textContent = end;
                }
            };
            
            requestAnimationFrame(step);
        };
        
        // Animate stats when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = parseFloat(element.dataset.value || element.textContent);
                    animateValue(element, 0, finalValue, 2000);
                    observer.unobserve(element);
                }
            });
        });
        
        statValues.forEach(stat => {
            stat.dataset.value = stat.textContent;
            stat.textContent = '0';
            observer.observe(stat);
        });
    }

    initSkillTagEffects() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    triggerPageAnimations(pageId) {
        const page = document.getElementById(pageId);
        if (!page) return;

        // Professional staggered animation for cards and elements
        const animatableElements = page.querySelectorAll(
            '.stat-card, .project-card, .internship-card, .publication-item, .education-card, .certification-card, .achievement-item'
        );
        
        animatableElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100 + 200);
        });
    }

    initInternshipFilters() {
        const searchInput = document.getElementById('internship-search');
        const companyFilter = document.getElementById('company-filter');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterInternships(e.target.value, companyFilter?.value || '');
            });
        }
        
        if (companyFilter) {
            companyFilter.addEventListener('change', (e) => {
                this.filterInternships(searchInput?.value || '', e.target.value);
            });
        }
    }

    filterInternships(searchTerm, companyFilter) {
        const internshipCards = document.querySelectorAll('.internship-card');
        
        internshipCards.forEach(card => {
            const company = card.getAttribute('data-company') || '';
            const role = card.getAttribute('data-role') || '';
            const text = card.textContent.toLowerCase();
            
            const matchesSearch = searchTerm === '' || text.includes(searchTerm.toLowerCase());
            const matchesCompany = companyFilter === '' || company === companyFilter;
            
            if (matchesSearch && matchesCompany) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Track filter usage
        this.trackEvent('Internships', 'Filter', `Search: ${searchTerm}, Company: ${companyFilter}`);
    }

    handleProjectClick(card) {
        const projectName = card.querySelector('h3').textContent;
        
        // Professional notification instead of modal
        this.showNotification(
            `${projectName}`,
            'Project details would typically link to GitHub repository or live demo.',
            'info'
        );
        
        // Track project interaction
        this.trackEvent('Projects', 'Click', projectName);
    }

    showNotification(title, message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        notification.innerHTML = `
            <div class="notification__content">
                <h4 class="notification__title">${title}</h4>
                <p class="notification__message">${message}</p>
                <button class="notification__close">&times;</button>
            </div>
        `;
        
        // Add styles
        const styles = `
            .notification {
                position: fixed;
                top: 80px;
                right: 20px;
                max-width: 400px;
                background: var(--bloomberg-bg-secondary);
                border: 1px solid var(--bloomberg-accent-teal);
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 1500;
                animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .notification__content {
                padding: var(--space-lg);
                position: relative;
            }
            .notification__title {
                color: var(--bloomberg-accent-teal);
                font-size: 1.1rem;
                margin-bottom: var(--space-sm);
                font-weight: 600;
            }
            .notification__message {
                color: var(--bloomberg-text-secondary);
                font-size: 0.9rem;
                line-height: 1.5;
                margin: 0;
            }
            .notification__close {
                position: absolute;
                top: var(--space-sm);
                right: var(--space-sm);
                background: none;
                border: none;
                color: var(--bloomberg-text-secondary);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .notification__close:hover {
                color: var(--bloomberg-accent-teal);
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        
        // Add styles to document if not already present
        if (!document.querySelector('#notification-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'notification-styles';
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        }
        
        document.body.appendChild(notification);
        
        // Close functionality
        const closeBtn = notification.querySelector('.notification__close');
        const closeNotification = () => {
            notification.style.animation = 'slideOutRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeNotification);
        
        // Auto close after 5 seconds
        setTimeout(closeNotification, 5000);
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add slight delay for staggered effect
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 100}ms`;
                }
            });
        }, observerOptions);
        
        // Observe all elements that should animate on scroll
        const animateOnScroll = document.querySelectorAll(
            '.stat-card, .project-card, .skill-category, .internship-card, .publication-item, .certification-card, .achievement-item'
        );
        
        animateOnScroll.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        
        // Subtle parallax effect for hero section (professional, not distracting)
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && scrolled < window.innerHeight) {
            const rate = scrolled * -0.2;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        // Navigation background opacity based on scroll
        const nav = document.querySelector('.nav');
        if (nav) {
            const opacity = Math.min(scrolled / 100, 0.95);
            nav.style.backgroundColor = nav.classList.contains('nyt-style') 
                ? `rgba(255, 255, 255, ${opacity})`
                : `rgba(26, 27, 35, ${opacity})`;
        }
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMenu();
        }
        
        // Recalculate animations if needed
        this.recalculateLayout();
    }

    recalculateLayout() {
        // Professional layout recalculation for responsive design
        const cards = document.querySelectorAll('.stat-card, .project-card, .internship-card');
        cards.forEach(card => {
            card.style.transition = 'none';
            card.offsetHeight; // Force reflow
            card.style.transition = '';
        });
    }

    // Advanced search functionality
    performAdvancedSearch(query) {
        const searchableContent = {
            home: ['skills', 'projects', 'about', 'finance', 'law', 'technology', 'bloomberg', 'quantitative'],
            academics: ['education', 'grades', 'cgpa', 'fergusson', 'jspm', 'certificates'],
            research: ['publications', 'books', 'papers', 'engineering', 'legal', 'ai', 'securities'],
            internships: ['experience', 'consulting', 'banking', 'finance', 'arc', 'marquee'],
            links: ['resume', 'certificates', 'contact', 'github', 'linkedin']
        };
        
        const results = [];
        
        Object.keys(searchableContent).forEach(page => {
            const content = searchableContent[page];
            const matches = content.filter(item => 
                item.toLowerCase().includes(query.toLowerCase())
            );
            
            if (matches.length > 0) {
                results.push({ page, matches, relevance: matches.length });
            }
        });
        
        // Sort by relevance
        return results.sort((a, b) => b.relevance - a.relevance);
    }

    // Professional data export functionality
    exportData(format = 'json') {
        const portfolioData = {
            personal: {
                name: 'Gajanan Barve',
                title: 'Computer Science & Business Systems Student',
                email: 'gajananbarve@icloud.com',
                phone: '+91 80873 53587',
                location: 'Pune, MH, India',
                linkedin: 'linkedin.com/in/gajananbarve'
            },
            education: {
                current_cgpa: '9.4',
                institution: 'JSPM\'s Rajarshi Shahu College of Engineering',
                degree: 'B.Tech in Computer Science and Business Systems'
            },
            statistics: {
                books_published: 4,
                research_papers: 6,
                internships: 4,
                certifications: 5
            },
            skills: {
                programming: ['Python', 'Java', 'C++', 'R'],
                tools: ['Bloomberg Terminal', 'LSEG', 'Koyfin', 'Excel', 'Git'],
                domains: ['Quantitative Finance', 'Investment Banking', 'Legal Research', 'Policy Analysis']
            },
            generated_on: new Date().toISOString()
        };
        
        if (format === 'json') {
            const dataStr = JSON.stringify(portfolioData, null, 2);
            this.downloadFile('gajanan_barve_portfolio_data.json', dataStr, 'application/json');
        }
        
        this.trackEvent('Portfolio', 'Export', format);
    }

    downloadFile(filename, content, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Professional keyboard navigation
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Alt + number keys for quick navigation
            if (e.altKey && !e.ctrlKey && !e.shiftKey) {
                const pages = ['home', 'academics', 'research', 'internships', 'links'];
                const keyNumber = parseInt(e.key);
                
                if (keyNumber >= 1 && keyNumber <= 5) {
                    e.preventDefault();
                    this.showPage(pages[keyNumber - 1]);
                    this.trackEvent('Navigation', 'Keyboard', `Alt+${keyNumber}`);
                }
            }
            
            // Escape key to close mobile menu
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }

    // Analytics and tracking (placeholder for real analytics)
    trackPageView(page) {
        console.log(`Page view: ${page}`);
        // This would integrate with Google Analytics, Mixpanel, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: page,
                page_location: window.location.href
            });
        }
    }

    trackEvent(category, action, label) {
        console.log(`Event: ${category} - ${action} - ${label}`);
        // This would integrate with analytics services
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
    }

    // Professional print styling
    enablePrintMode() {
        const printStyles = `
            @media print {
                .nav, .nav-toggle { display: none !important; }
                .page { 
                    display: block !important; 
                    min-height: auto !important;
                    page-break-inside: avoid;
                }
                .page.hidden { display: none !important; }
                .project-card, .internship-card, .publication-item {
                    page-break-inside: avoid;
                    break-inside: avoid;
                }
                .hero-section { page-break-after: always; }
                body { background: white !important; color: black !important; }
                * { box-shadow: none !important; }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = printStyles;
        document.head.appendChild(styleElement);
    }

    // Professional theme customization
    setCustomTheme(primaryColor, secondaryColor) {
        document.documentElement.style.setProperty('--bloomberg-accent-teal', primaryColor);
        document.documentElement.style.setProperty('--bloomberg-accent-orange', secondaryColor);
        
        // Save to localStorage for persistence
        localStorage.setItem('portfolio-theme', JSON.stringify({
            primary: primaryColor,
            secondary: secondaryColor
        }));
    }

    loadSavedTheme() {
        try {
            const savedTheme = localStorage.getItem('portfolio-theme');
            if (savedTheme) {
                const theme = JSON.parse(savedTheme);
                this.setCustomTheme(theme.primary, theme.secondary);
            }
        } catch (e) {
            console.log('No saved theme found or invalid theme data');
        }
    }

    // Performance monitoring
    initPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.trackEvent('Performance', 'Page Load Time', Math.round(loadTime));
        });

        // Monitor navigation performance
        const navigationStart = performance.now();
        window.addEventListener('beforeunload', () => {
            const sessionDuration = performance.now() - navigationStart;
            this.trackEvent('Performance', 'Session Duration', Math.round(sessionDuration / 1000));
        });
    }

    // Initialize all advanced features
    initAdvancedFeatures() {
        this.initKeyboardNavigation();
        this.enablePrintMode();
        this.loadSavedTheme();
        this.initPerformanceMonitoring();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        const page = e.state?.page || 'home';
        app.showPage(page);
    });
    
    // Handle initial URL
    const initialPage = window.location.hash.substring(1) || 'home';
    app.showPage(initialPage);
    
    // Initialize advanced features
    app.initAdvancedFeatures();
    
    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Professional console signature
    console.log(`
%c🎯 Gajanan Barve Portfolio
%c════════════════════════════════════════
%cBuilt with vanilla HTML, CSS, and JavaScript
%cDesign: Professional Bloomberg Terminal + NYT aesthetic
%cFeatures: Responsive design, smooth animations, advanced filtering
%c
%cFeel free to explore the code!
%cContact: gajananbarve@icloud.com
%c════════════════════════════════════════
    `, 
    'color: #4a9eff; font-size: 16px; font-weight: bold;',
    'color: #666; font-size: 12px;',
    'color: #333; font-size: 12px;',
    'color: #333; font-size: 12px;',
    'color: #333; font-size: 12px;',
    'color: #666; font-size: 12px;',
    'color: #333; font-size: 12px;',
    'color: #4a9eff; font-size: 12px;',
    'color: #666; font-size: 12px;'
    );
    
    // Make app globally available for debugging
    window.portfolioApp = app;
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}