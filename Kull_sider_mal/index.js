document.addEventListener('DOMContentLoaded', () => {

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
    //her skriver dere inn teksten til turen og legger inn bildene dere har fra turen
    const tripData = {
        tur1: {
            title: "Tur til varden",
            description: "20. August gikk vi vår første klasse tur. Vi gikk opp til Varden som er 300 meter over havet. På vei opp gikk vi oppover en grøft med masse fossiler av blant annet trær og blader. Vi tok en lunsjpause i en bunkers på var på veien opp som var litt trangt, men veldig koselig. Det var en veldig fin utsikt fra toppen og vi opplevde til og med noen snøflak når vi nådde toppen. ",
            images: ["./bilder/turer/varden_tur/klassebilde_på_varden.png", "./bilder/turer/varden_tur/grøft_til_varden.jpg", "./bilder/turer/varden_tur/utsikt_fra_varden.jpg", "./bilder/turer/varden_tur/reinsdyr_til_varden.jpg"]
        },
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
});