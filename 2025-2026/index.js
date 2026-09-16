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
    const tripData = {
        tur1: {
            title: "Tur til varden",
            description: "20. August gikk vi vår første klasse tur. Vi gikk opp til Varden som er 300 meter over havet. På vei opp gikk vi oppover en grøft med masse fossiler av blant annet trær og blader. Vi tok en lunsjpause i en bunkers på var på veien opp som var litt trangt, men veldig koselig. Det var en veldig fin utsikt fra toppen og vi opplevde til og med noen snøflak når vi nådde toppen. ",
            images: ["./bilder/turer/varden_tur/klassebilde_på_varden.png", "./bilder/turer/varden_tur/grøft_til_varden.jpg", "./bilder/turer/varden_tur/utsikt_fra_varden.jpg", "./bilder/turer/varden_tur/reinsdyr_til_varden.jpg"]
        },
        tur2: {
            title: "Kirkehytta",
            description: "24. – 26. september dro hele klassen på en overnattingstur til Kirkehytta. Vi kjørte inn til hytta som tok ca. et kvarter. 24. september gikk vi tur bort til gruve 5. 25. september gikk vi en litt lengre dagstur … . Det var en litt liten hytte, så det var ikke nok senger til alle, men noen sov på sofa eller på liggeunderlag på gulvet.  ",
            images: ["./bilder/turer/kirkehytta_hyttetur/gruve_5_kirkehytta.jpg","./bilder/turer/kirkehytta_hyttetur/kirkehytta_bålkos.jpg"]
        },
        tur3: {
            title: "Andersenhytta",
            description: "4. – 6. november hadde vi overnatting på Andersenhytta. Vi gikk fra skolen inn til hytta etter middag 3. november.  ",
            images:  ["./bilder/turer/andersenhytta_hyttetur/veldig_fin_selfie_av_Erik.jpg", "./bilder/turer/andersenhytta_hyttetur/Andersenhytta.png"],
        },
        tur4: {
            title: "Gruve 3",
            description: "Dato fikk vi en omvisning av gruve 3 av en geolog. Først fikk vi en presentasjon om geologi og kullindustrien før vi fikk en omvisning inne i gruven. Der såg vi på forkastninger av kullalgene og andre geologiske ting. ",
            images:  ["./bilder/turer/Gruve_3/selfie_gruve_3.jpg", "./bilder/turer/Gruve_3/gruve_3_presentasjon.jpg", "./bilder/turer/Gruve_3/inne_i_gruve_3.jpg"],
        },
        tur5: {
            title: "Dronetur",
            description: "Dato dro teknoklassen inn i Bolterdalen med dronene våre. Vi fyrte bål og koste oss mens vi prøvde dronene. Dagen før tok de fleste i teknoklassen droneeksamen og det var derfor fint å få testet de ut. ",
            images:  ["./bilder/turer/dronetur_tur/Sejer_dronetur.jpg"],
        },
        tur6: {
            title: "Første skutertur",
            description: "11. Mars dro klassen på sin første skutertur. Vi kjørte innover i dalen frem til jernsenga og stoppet flere steder på veien for å se på kule ting. Vi tiók videre lunsj med utsikt over tempelfjorden og tempelet ",
            images:  ["./bilder/turer/første_skutertur/"],
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
});