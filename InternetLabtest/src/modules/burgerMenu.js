export function initBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navList = document.querySelector('.nav__list');
    const navOverlay = document.querySelector('.nav__overlay');
    const body = document.body;

    if (!burgerMenu || !navList) return;

    function closeMenu() {
        burgerMenu.classList.remove('active');
        navList.classList.remove('active');
        if (navOverlay) {
            navOverlay.classList.remove('active');
        }
        body.style.overflow = '';
    }

    burgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        if (navOverlay) {
            navOverlay.classList.toggle('active');
        }
        
        if (navList.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    const navLinks = document.querySelectorAll('.nav__list-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav') && navList.classList.contains('active')) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            closeMenu();
        }
    });
}