document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map-container').setView([48.8566, 2.3522], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Charger les réseaux depuis le fichier JSON
    fetch('networks.json')
        .then(response => response.json())
        .then(networks => {
            networks.forEach(network => {
                // Charger et traiter le fichier GTFS
                fetch(network.gtfsUrl)
                    .then(response => response.text())
                    .then(data => {
                        // Ici, vous devez parser le fichier GTFS (zip) et extraire les arrêts et lignes
                        // Pour l'instant, nous allons simuler l'ajout d'un arrêt
                        L.marker([48.8566, 2.3522]).addTo(map)
                            .bindPopup(`Arrêt de ${network.name}`)
                            .openPopup();
                    });
            });
        });
});
