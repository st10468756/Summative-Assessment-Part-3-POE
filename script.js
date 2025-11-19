// ========================================
// HELPING HANDS COMMUNITY CENTRE
// JavaScript Implementation
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ========================================
// INITIALIZATION
// ========================================
function initializeWebsite() {
    // Interactive Elements
    initializeMobileMenu();
    initializeSmoothScroll();
    initializeAnimations();
    initializeCounterAnimation();
    
    // Form Functionality
    initializeContactForm();
    initializeVolunteerForm();
    
    // Dynamic Content & Search
    initializeSearch();
    initializeDynamicContent();
    
    // Additional Features
    initializeBackToTop();
    initializeImageLazyLoad();
}

// ========================================
// INTERACTIVE ELEMENTS
// ========================================

// Mobile Menu Toggle
function initializeMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-toggle')) {
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-toggle';
        menuBtn.innerHTML = '&#9776;';
        menuBtn.setAttribute('aria-label', 'Toggle mobile menu');
        
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.parentNode.insertBefore(menuBtn, logo.nextSibling);
        }
        
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');
            menuBtn.innerHTML = nav.classList.contains('active') ? '&times;' : '&#9776;';
        });
    }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Scroll Animations
function initializeAnimations() {
    const animateOnScroll = document.querySelectorAll('.service-item, .mission-card, .team-member, .value-item, .info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateOnScroll.forEach(element => {
        observer.observe(element);
    });
}

// Counter Animation for Stats
function initializeCounterAnimation() {
    const stats = document.querySelectorAll('.stat h3');
    
    const animateCounter = (element) => {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '&uarr;';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Lazy Load Images
function initializeImageLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// DYNAMIC CONTENT & SEARCH FEATURE
// ========================================

function initializeDynamicContent() {
    // Dynamic News/Updates Section
    const newsData = [
        {
            title: "Community Food Drive Success",
            date: "2025-11-15",
            content: "Our recent food drive collected over 2,000 kg of non-perishable items!",
            category: "events"
        },
        {
            title: "New Volunteer Training Program",
            date: "2025-11-10",
            content: "Join our comprehensive training program starting next month.",
            category: "volunteer"
        },
        {
            title: "Winter Clothing Distribution",
            date: "2025-11-05",
            content: "Preparing for winter with warm clothing for 500+ families.",
            category: "services"
        }
    ];
    
    // Add dynamic news section to home page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        addDynamicNews(newsData);
    }
}

function addDynamicNews(newsData) {
    const impactSection = document.querySelector('.impact');
    if (!impactSection) return;
    
    const newsSection = document.createElement('section');
    newsSection.className = 'dynamic-news';
    newsSection.innerHTML = `
        <div class="container">
            <h2>Latest Updates</h2>
            <div id="newsContainer" class="news-grid"></div>
        </div>
    `;
    
    impactSection.insertAdjacentElement('afterend', newsSection);
    
    const newsContainer = document.getElementById('newsContainer');
    newsData.forEach((item, index) => {
        setTimeout(() => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            newsCard.innerHTML = `
                <span class="news-category">${item.category}</span>
                <h3>${item.title}</h3>
                <p class="news-date">${formatDate(item.date)}</p>
                <p>${item.content}</p>
            `;
            newsCard.style.cssText = `
                background: white;
                padding: 1.5rem;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                margin-bottom: 1rem;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.5s ease;
            `;
            
            newsContainer.appendChild(newsCard);
            
            setTimeout(() => {
                newsCard.style.opacity = '1';
                newsCard.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Search Functionality
function initializeSearch() {
    // Create search bar
    const header = document.querySelector('header .container');
    if (!header) return;
    
    const searchDiv = document.createElement('div');
    searchDiv.className = 'search-container';
    searchDiv.innerHTML = `
        <input type="search" id="siteSearch" placeholder="Search our site..." aria-label="Search">
        <button id="searchBtn" aria-label="Search button">🔍</button>
        <div id="searchResults" class="search-results"></div>
    `;
    searchDiv.style.cssText = `
        position: relative;
        margin-left: auto;
    `;
    
    header.appendChild(searchDiv);
    
    const searchInput = document.getElementById('siteSearch');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    
    // Search content database
    const searchableContent = [
        { title: "Food Parcels", page: "services.html", content: "nutritious food packages families" },
        { title: "Clothing Donations", page: "services.html", content: "quality clothing warm dignified" },
        { title: "Temporary Shelter", page: "services.html", content: "safe accommodation homeless" },
        { title: "Education Programs", page: "services.html", content: "skills development training" },
        { title: "Volunteer", page: "enquiry.html", content: "join team make difference" },
        { title: "About Us", page: "about.html", content: "mission vision history team" },
        { title: "Contact", page: "contact.html", content: "get in touch office phone email" }
    ];
    
    const performSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const results = searchableContent.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
        );
        
        displaySearchResults(results, query);
    };
    
    searchInput.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchDiv.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    
    searchResults.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        max-width: 400px;
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
        margin-top: 5px;
    `;
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div style="padding: 1rem; text-align: center; color: #666;">
                No results found for "${query}"
            </div>
        `;
    } else {
        searchResults.innerHTML = results.map(result => `
            <a href="${result.page}" style="
                display: block;
                padding: 1rem;
                border-bottom: 1px solid #eee;
                text-decoration: none;
                color: #333;
                transition: background 0.3s;
            " onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background='white'">
                <strong style="color: var(--primary-color);">${result.title}</strong>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #666;">
                    ${highlightQuery(result.content.substring(0, 100), query)}...
                </p>
            </a>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

function highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: #FFA000; padding: 2px;">$1</mark>');
}

// ========================================
// FORM FUNCTIONALITY
// ========================================

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateContactForm()) {
            // Process form
            processContactForm(this);
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            removeError(this);
        });
    });
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    let isValid = true;
    
    // Name validation
    const name = form.querySelector('#name');
    if (!name.value.trim()) {
        showError(name, 'Please enter your full name');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Email validation
    const email = form.querySelector('#email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Please enter your email address');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation (optional but if provided, must be valid)
    const phone = form.querySelector('#phone');
    if (phone && phone.value.trim()) {
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    // Subject validation
    const subject = form.querySelector('#subject');
    if (!subject.value) {
        showError(subject, 'Please select a subject');
        isValid = false;
    }
    
    // Message validation
    const message = form.querySelector('#message');
    if (!message.value.trim()) {
        showError(message, 'Please enter a message');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function processContactForm(form) {
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone') ? form.querySelector('#phone').value : '',
        subject: form.querySelector('#subject').value,
        message: form.querySelector('#message').value,
        newsletter: form.querySelector('input[name="newsletter"]')?.checked || false,
        timestamp: new Date().toISOString()
    };
    
    // Simulate email sending (in production, this would be an API call)
    setTimeout(() => {
        console.log('Contact Form Data:', formData);
        
        // Show success message
        showSuccessMessage(form, 'Thank you for contacting us! We will respond within 24 hours.');
        
        // Reset form
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // In production, send email via backend API
        sendEmail(formData);
    }, 1500);
}

// Volunteer Form
function initializeVolunteerForm() {
    const volunteerForm = document.getElementById('volunteerForm');
    if (!volunteerForm) return;
    
    volunteerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateVolunteerForm()) {
            // Process form
            processVolunteerForm(this);
        }
    });
    
    // Real-time validation
    const inputs = volunteerForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            removeError(this);
        });
    });
}

function validateVolunteerForm() {
    const form = document.getElementById('volunteerForm');
    let isValid = true;
    
    // First Name
    const firstName = form.querySelector('#firstName');
    if (!firstName.value.trim()) {
        showError(firstName, 'Please enter your first name');
        isValid = false;
    }
    
    // Last Name
    const lastName = form.querySelector('#lastName');
    if (!lastName.value.trim()) {
        showError(lastName, 'Please enter your last name');
        isValid = false;
    }
    
    // Email
    const email = form.querySelector('#email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Please enter your email address');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone
    const phone = form.querySelector('#phone');
    if (!phone.value.trim()) {
        showError(phone, 'Please enter your phone number');
        isValid = false;
    }
    
    // Availability checkboxes
    const availability = form.querySelectorAll('input[name="availability"]:checked');
    if (availability.length === 0) {
        showError(form.querySelector('input[name="availability"]').parentElement.parentElement, 
                 'Please select at least one availability option');
        isValid = false;
    }
    
    // Hours per week
    const hours = form.querySelector('#hours');
    if (!hours.value) {
        showError(hours, 'Please select your available hours');
        isValid = false;
    }
    
    // Interests checkboxes
    const interests = form.querySelectorAll('input[name="interests"]:checked');
    if (interests.length === 0) {
        showError(form.querySelector('input[name="interests"]').parentElement.parentElement, 
                 'Please select at least one area of interest');
        isValid = false;
    }
    
    // Emergency Contact
    const emergencyName = form.querySelector('#emergencyName');
    if (!emergencyName.value.trim()) {
        showError(emergencyName, 'Please enter emergency contact name');
        isValid = false;
    }
    
    const emergencyPhone = form.querySelector('#emergencyPhone');
    if (!emergencyPhone.value.trim()) {
        showError(emergencyPhone, 'Please enter emergency contact phone');
        isValid = false;
    }
    
    const emergencyRelation = form.querySelector('#emergencyRelation');
    if (!emergencyRelation.value.trim()) {
        showError(emergencyRelation, 'Please enter relationship');
        isValid = false;
    }
    
    // Agreement checkboxes
    const agreement = form.querySelector('input[name="agreement"]');
    if (!agreement.checked) {
        showError(agreement.parentElement, 'Please agree to the terms');
        isValid = false;
    }
    
    const backgroundCheck = form.querySelector('input[name="backgroundCheck"]');
    if (!backgroundCheck.checked) {
        showError(backgroundCheck.parentElement, 'Please agree to background check');
        isValid = false;
    }
    
    const orientation = form.querySelector('input[name="orientation"]');
    if (!orientation.checked) {
        showError(orientation.parentElement, 'Please agree to attend orientation');
        isValid = false;
    }
    
    return isValid;
}

function processVolunteerForm(form) {
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        firstName: form.querySelector('#firstName').value,
        lastName: form.querySelector('#lastName').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
        address: form.querySelector('#address').value,
        availability: Array.from(form.querySelectorAll('input[name="availability"]:checked')).map(cb => cb.value),
        hours: form.querySelector('#hours').value,
        interests: Array.from(form.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value),
        skills: form.querySelector('#skills').value,
        emergencyContact: {
            name: form.querySelector('#emergencyName').value,
            phone: form.querySelector('#emergencyPhone').value,
            relation: form.querySelector('#emergencyRelation').value
        },
        timestamp: new Date().toISOString()
    };
    
    // Simulate processing
    setTimeout(() => {
        console.log('Volunteer Form Data:', formData);
        
        // Show success message
        showSuccessMessage(form, 'Thank you for volunteering! We will contact you within 3-5 business days to schedule your orientation.');
        
        // Reset form
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Send email
        sendEmail(formData);
    }, 1500);
}

// ========================================
// VALIDATION HELPER FUNCTIONS
// ========================================

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    
    // Remove existing errors
    removeError(field);
    
    // Required field check
    if (field.hasAttribute('required') && !value) {
        showError(field, `${formatFieldName(fieldName)} is required`);
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(value)) {
            showError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function showError(field, message) {
    removeError(field);
    
    field.style.borderColor = '#D32F2F';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #D32F2F;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    field.parentElement.appendChild(errorDiv);
    
    // Add shake animation
    field.style.animation = 'shake 0.3s';
    setTimeout(() => {
        field.style.animation = '';
    }, 300);
}

function removeError(field) {
    field.style.borderColor = '';
    const errorMsg = field.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        background: #4CAF50;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        margin-bottom: 1rem;
        text-align: center;
        animation: slideDown 0.5s ease;
    `;
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => successDiv.remove(), 500);
    }, 5000);
}

function formatFieldName(name) {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

// ========================================
// EMAIL FUNCTIONALITY
// ========================================

function sendEmail(formData) {
    // In production, this would connect to a backend API
    // For now, we'll simulate the email sending and log the data
    
    console.log('=== EMAIL BEING SENT ===');
    console.log('To: info@helpinghands.org.za');
    console.log('Subject: New Form Submission');
    console.log('Data:', JSON.stringify(formData, null, 2));
    console.log('========================');
    
    // Example API call structure (commented out):
    /*
    fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Email sent successfully:', data);
    })
    .catch(error => {
        console.error('Error sending email:', error);
    });
    */
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    .search-container input {
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 5px 0 0 5px;
        width: 250px;
    }
    
    .search-container button {
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-left: none;
        border-radius: 0 5px 5px 0;
        background: var(--primary-color);
        color: white;
        cursor: pointer;
    }
    
    .news-grid {
        display: grid;
        gap: 1rem;
    }
    
    .news-category {
        display: inline-block;
        background: var(--secondary-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
    }
    
    .news-date {
        color: #666;
        font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
        .search-container {
            margin: 1rem 0;
            width: 100%;
        }
        
        .search-container input {
            width: calc(100% - 50px);
        }
    }
`;
document.head.appendChild(style);

// Console log for debugging
console.log('Helping Hands JavaScript Loaded Successfully');
console.log('Features: Interactive Elements, Dynamic Content, Search, Form Validation, Email Processing');