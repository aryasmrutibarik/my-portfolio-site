 // Parallax effect
 window.addEventListener('scroll', function() {
    const parallax = document.querySelector('#hero');
    let scrollPosition = window.pageYOffset;
    parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// Fade-in effect
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    this.reset();
});