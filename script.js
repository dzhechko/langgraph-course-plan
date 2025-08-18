document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => {
        animationObserver.observe(el);
    });

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`header nav a[href="#${id}"]`);

                if (activeLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const allAccordionItems = document.querySelectorAll('.accordion-item');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.closest('.accordion-item');
            if (!currentItem) return;

            const wasOpen = currentItem.classList.contains('is-open');

            allAccordionItems.forEach(item => {
                item.classList.remove('is-open');
                const btn = item.querySelector('.accordion-header');
                if (btn) {
                    btn.setAttribute('aria-expanded', 'false');
                }
            });

            if (!wasOpen) {
                currentItem.classList.add('is-open');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
