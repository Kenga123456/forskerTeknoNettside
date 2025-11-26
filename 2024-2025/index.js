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
                    const category2 = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter || category2 === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Trip modal data
    const tripData = {
        tur1: {
            title: "Hearts In The Ice",
            description: 'Klassen ble invitert til å bli med <a href="https://www.heartsintheice.com/">"Hearts In The Ice"</a> på en båttokt rundt sørsiden av Svalbard. Formålet med tokten var å samle klimaaktivister fra hele verden og sammen se på konsekvensene av klimaendringene. Disse er da enda tydeligere på Svalbard. Hver kveld hadde vi diskusjonspaneler med eksperter, og på dagene så vi på både hvalfangsthistorie og isbreer. Vi fikk til slutt også besøke hytta “Bamsebu” som Hilde Fålun Strøm og Sunniva Sorby, stifterne av HITI, overvintret på i 9 måneder.',
            images: ["../bilder/HITI_3.jpg", "../bilder/HITI_4.jpg", "../bilder/HITI_5.jpg", "../bilder/HITI_6.jpg"]
        },
        tur2: {
            title: "Besøk på KSAT",
            description: "Vi fikk komme på besøk til <a href=”https://www.ksat.no/”>KSAT</a> sin stasjon på Platåfjellet, kalt Svalsat. Der fikk vi en gjennomgang av hvordan de driver sin virksomhet, hvordan satellitter i seg selv har fungert opp gjennom tidene og hvordan de fungerer nå. Til slutt fikk vi lov til å komme inn i en av de ikoniske satellittene og se den fungere.",
            images: ["images/tur2.jpg", "images/tur2-2.jpg", "images/tur2-3.jpg"]
        },
        tur3: {
            title: "Fisketur",
            description: "En fantastisk naturvandring hvor vi observerte flora og fauna, tok notater og lærte mer om det arktiske økosystemet.",
            images: ["images/tur3.jpg", "images/tur3-2.jpg", "images/tur3-3.jpg"]
        }
    };

    // Trip modal funksjonalitet
    const tripCards = document.querySelectorAll('.trip-card');
    const modal = document.getElementById('tripModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalImages = document.getElementById('modalImages');

    function openTripModal(tripId) {
        const data = tripData[tripId];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalDescription.innerHTML = data.description;
        modalImages.innerHTML = data.images
            .map(img => `<img src="${img}" alt="${data.title}" />`)
            .join('');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeTripModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    tripCards.forEach(card => {
        card.addEventListener('click', function() {
            const tripId = this.getAttribute('data-trip');
            openTripModal(tripId);
        });
    });

    modalClose.addEventListener('click', closeTripModal);
    modalOverlay.addEventListener('click', closeTripModal);

    // Lukk modal med ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeTripModal();
        }
    });

    // Kort-klikk ikke nødvendig for navigasjon (kort er <a>), men behold evt. ekstra oppførsel her.
});