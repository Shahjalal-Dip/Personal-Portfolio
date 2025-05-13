console.log("Script running...")

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.sidebar .close-btn');
const icon = document.getElementById('icon');
const main = document.querySelector('.main');
const body = document.body;

// Check if we're on mobile
const isMobile = window.innerWidth <= 768;

// Initial sidebar state
if (isMobile) {
    sidebar.classList.remove('active');
    hamburger.style.display = 'block';
} else {
    sidebar.classList.add('active');
    hamburger.style.display = 'none';
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    icon.src = './assets/images/sun.png';
}

// Toggle Sidebar
hamburger.addEventListener('click', () => {
    sidebar.classList.add('active');
    hamburger.style.display = 'none';
});

// Close Sidebar
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    hamburger.style.display = 'block';
});

// Handle window resize
window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        sidebar.classList.remove('active');
        hamburger.style.display = 'block';
    } else {
        sidebar.classList.add('active');
        hamburger.style.display = 'none';
    }
});

// Dark Mode Toggle
icon.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        icon.src = './assets/images/sun.png';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.src = './assets/images/moon.png';
        localStorage.setItem('theme', 'light');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing Animation
const text = "Software Engineer & Full Stack Web Developer";
const typingElement = document.querySelector('.about');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    typingElement.textContent = '';
    typeWriter();
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Set the progress width after a small delay to ensure animation works
            setTimeout(() => {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const progress = progressBar.style.getPropertyValue('--progress');
                    progressBar.style.width = progress;
                }
            }, 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill items
document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${progress}%`;
});