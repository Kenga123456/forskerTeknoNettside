document.addEventListener('DOMContentLoaded', () => {
    // Mobil meny toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-nav');

    if (menuToggle && menuNav) {
        menuToggle.addEventListener('click', (e) => {
            // kun toggl .open på menyen — IKKE legge .open på selve knappen (unngå X)
            const isOpen = menuNav.classList.toggle('open');
            // visuell state via underline/active; oppdater aria
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Lukk meny ved klikk utenfor
        document.addEventListener('click', (e) => {
            if (!menuNav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuNav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Lukk meny når en lenke trykkes (mobil)
        menuNav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                menuNav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Aktiv-state for nav links (visuell respons)
    document.querySelectorAll('.menu-nav a').forEach(a => {
        a.addEventListener('click', function() {
            document.querySelectorAll('.menu-nav a').forEach(x => x.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Filter funksjonalitet
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                document.querySelectorAll('.project-card').forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Kort-klikk ikke nødvendig for navigasjon (kort er <a>), men behold evt. ekstra oppførsel her.
});