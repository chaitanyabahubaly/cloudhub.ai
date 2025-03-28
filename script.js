document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Header scroll effect
    const header = document.querySelector('.header');
    const scrollThreshold = 50;
    
    function updateHeaderOnScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll(); // Initial check
    
    // Mobile menu
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    
    menuButton.addEventListener('click', function() {
        menuButton.classList.toggle('active');
        mobileMenu.classList.toggle('show');
        document.body.classList.toggle('menu-open');
    });
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuButton.classList.remove('active');
            mobileMenu.classList.remove('show');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Services animation
    const servicesSection = document.querySelector('.services');
    const serviceCards = document.querySelectorAll('.service-card');
    
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                serviceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('show');
                    }, index * 100);
                });
                servicesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    servicesObserver.observe(servicesSection);
    
    // Portfolio filter
    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    function filterPortfolio(category) {
        portfolioItems.forEach(item => {
            const itemCategory = item.dataset.category;
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('show');
                }, 100);
            } else {
                item.classList.remove('show');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const category = this.dataset.filter;
            filterPortfolio(category);
        });
    });
    
    // Initialize portfolio (show all items)
    portfolioItems.forEach(item => {
        item.classList.add('show');
    });
    
    // Testimonials slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Deactivate all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide and activate corresponding dot
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
    
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % testimonialSlides.length;
        showSlide(nextIndex);
    }
    
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Initialize testimonial slider with dot controls
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetSlideInterval();
        });
    });
    
    // Start automatic sliding
    startSlideInterval();
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastClose = document.querySelector('.toast-close');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Display loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Simulate form submission (in a real application, you would send this to a server)
        setTimeout(() => {
            console.log({
                to: "cloudhubai@gmail.com",
                subject: `New inquiry from ${name} about ${service}`,
                body: message,
                replyTo: email
            });
            
            // Reset form
            contactForm.reset();
            
            // Remove loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            
            // Show success message
            showToast();
        }, 1500);
    });
    
    function showToast() {
        toast.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideToast();
        }, 5000);
    }
    
    function hideToast() {
        toast.classList.remove('show');
    }
    
    toastClose.addEventListener('click', hideToast);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const animatedSections = document.querySelectorAll('section');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedSections.forEach(section => {
        animationObserver.observe(section);
    });
});

function sendEmail() {
    // Collecting the details dynamically
    let subject = encodeURIComponent("Subject Here");
    let body = encodeURIComponent("Hello,\n\nThis is the email body.\n\nRegards");

    // Constructing mailto link
    let mailtoLink = `mailto:cloudhubai@gmail.com?subject=${subject}&body=${body}`;

    // Redirecting to the email client
    window.location.href = mailtoLink;
}