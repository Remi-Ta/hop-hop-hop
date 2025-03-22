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
                // Simuler le parsing des fichiers GTFS
                const stops = [
                    { name: 'Arrêt 1', lat: 48.8566, lon: 2.3522 },
                    { name: 'Arrêt 2', lat: 48.86, lon: 2.35 }
                ];

                stops.forEach(stop => {
                    L.marker([stop.lat, stop.lon]).addTo(map)
                        .bindPopup(`Arrêt : ${stop.name}`)
                        .openPopup();
                });

                // Ajouter les informations en temps réel
                if (network.realTimeUrl) {
                    fetchRealTimeData(network.realTimeUrl);
                }
            });
        });

    function fetchRealTimeData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Simuler l'affichage des prochains passages
                console.log('Prochains passages :', data.nextDepartures || 'N/A');
            });
    }
});
