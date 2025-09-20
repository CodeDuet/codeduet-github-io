// Smooth scrolling for navigation links and typing animation
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links with href starting with #
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Terminal typing animation
    const typingElement = document.getElementById('typing-command');
    if (typingElement) {
        const commands = [
            'npm install -g @codeduet-cli/codeduet-cli',
            'codeduet init my-project',
            'codeduet generate component',
            'git clone https://github.com/CodeDuet/codeduet-ai-studio'
        ];
        
        let commandIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeCommand() {
            const currentCommand = commands[commandIndex];
            
            if (!isDeleting && charIndex < currentCommand.length) {
                typingElement.textContent = currentCommand.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeCommand, 100);
            } else if (isDeleting && charIndex > 0) {
                typingElement.textContent = currentCommand.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeCommand, 50);
            } else if (!isDeleting && charIndex === currentCommand.length) {
                isDeleting = true;
                setTimeout(typeCommand, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                commandIndex = (commandIndex + 1) % commands.length;
                setTimeout(typeCommand, 500);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeCommand, 1000);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('.quickstart-section, .capabilities-section').forEach(section => {
        observer.observe(section);
    });

    // Parallax effect for gradient orb
    const gradientOrb = document.querySelector('.gradient-orb');
    if (gradientOrb) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            gradientOrb.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px) scale(${1 + (x + y) * 0.05})`;
        });
    }

    // Button click handlers
    const tryBtn = document.querySelector('.try-btn');
    const ctaBtn = document.querySelector('.cta-btn');
    const docBtn = document.querySelector('.doc-btn');

    if (tryBtn) {
        tryBtn.addEventListener('click', () => {
            // Replace with actual CodeDuet app URL
            window.open('https://github.com/CodeDuet/codeduet-ai-studio', '_blank');
        });
    }

    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            // Replace with actual API documentation URL
            window.open('https://github.com/CodeDuet/codeduet-cli', '_blank');
        });
    }

    if (docBtn) {
        docBtn.addEventListener('click', () => {
            // Replace with actual documentation URL
            window.open('https://github.com/CodeDuet/codeduet-cli', '_blank');
        });
    }

    // Header background opacity on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const opacity = Math.min(0.9, scrolled / 100);
            
            header.style.background = `rgba(0, 0, 0, ${0.8 + opacity * 0.2})`;
        });
    }

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
});