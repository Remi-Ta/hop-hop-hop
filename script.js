document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map-container').setView([48.8566, 2.3522], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Charger les réseaux depuis le fichier JSON
    fetch('networks.json')
        .then(response => response.json())
        .then(networks => {
            const networkList = document.getElementById('network-list');

            networks.forEach(network => {
                const listItem = document.createElement('li');
                listItem.textContent = network.name;
                listItem.addEventListener('click', () => displayLines(network));
                networkList.appendChild(listItem);

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
            });
        });

    function displayLines(network) {
        // Afficher les lignes du réseau sélectionné
        console.log('Afficher les lignes pour :', network.name);
    }

    // Gérer la recherche d'itinéraires
    document.getElementById('itinerary-search-btn').addEventListener('click', function() {
        const from = document.getElementById('itinerary-from').value;
        const to = document.getElementById('itinerary-to').value;
        console.log(`Rechercher un itinéraire de ${from} à ${to}`);
    });

    // Gérer la recherche de réseaux ou de lignes
    document.getElementById('network-search').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        // Filtrer les réseaux en fonction de la recherche
        console.log('Recherche :', query);
    });
});
