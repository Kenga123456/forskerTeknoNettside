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
                    const category2 = card.getAttribute('data-category2');
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
            title: "Tur til varden",
            description: "20. August gikk vi vår første klasse tur. Vi gikk opp til Varden som er 300 meter over havet. På vei opp gikk vi oppover en grøft med masse fossiler av blant annet trær og blader. Vi tok en lunsjpause i en bunkers på var på veien opp som var litt trangt, men veldig koselig. Det var en veldig fin utsikt fra toppen og vi opplevde til og med noen snøflak når vi nådde toppen. ",
            images:[]
        },
        tur2: {
            title: "Kirkehytta",
            description: "24. – 26. september dro hele klassen på en overnattingstur til Kirkehytta. Vi kjørte inn til hytta som tok ca. et kvarter. 24. september gikk vi tur bort til gruve 5. 25. september gikk vi en litt lengre dagstur … . Det var en litt liten hytte, så det var ikke nok senger til alle, men noen sov på sofa eller på liggeunderlag på gulvet.  ",
            images: ["../bilder/kirkehytta_hyttetur/gruve_5_kirkehytta.jpg"]
        },
        tur3: {
            title: "Andersenhytta",
            description: "4. – 6. november hadde vi overnatting på Andersenhytta. Vi gikk fra skolen inn til hytta etter middag 3. november.  ",
            images:  ["../bilder/Andersenhytta_hyttetur/veldig_fin_selfie_av_Erik.jpg", "../bilder/Andersenhytta_hyttetur/Magnus_nudes.jpg"]["images/tur3.jpg", "images/tur3-2.jpg", "images/tur3-3.jpg"]
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
        modalDescription.textContent = data.description;
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
});