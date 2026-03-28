document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');

    // Navbar scroll effect
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
        backToTop.classList.toggle('visible', window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });

    // Active nav link on scroll
    const observerNav = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active',
                        link.getAttribute('href') === '#' + entry.target.id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sections.forEach(section => observerNav.observe(section));

    // Scroll fade-in animation
    const observerFade = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerFade.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => observerFade.observe(el));

    // Back to top
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Contact form
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            btn.textContent = '提交成功！';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = '提交留言';
                btn.disabled = false;
                form.reset();
            }, 2000);
        });
    }
});
