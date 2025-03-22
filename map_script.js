document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map-container').setView([48.8566, 2.3522], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Gérer la recherche d'itinéraires
    document.getElementById('itinerary-search-btn').addEventListener('click', function() {
        const from = document.getElementById('itinerary-from').value;
        const to = document.getElementById('itinerary-to').value;

        // Exemple d'appel à l'API OpenTripPlanner
        const otpUrl = 'http://localhost:8080/otp/routers/default/plan';
        const params = new URLSearchParams({
            fromPlace: from,
            toPlace: to,
            mode: 'TRANSIT,WALK',
            date: new Date().toISOString(),
            time: '08:00:00'
        });

        fetch(`${otpUrl}?${params}`)
            .then(response => response.json())
            .then(data => {
                console.log('Itinéraire :', data);
                // Ici, vous pouvez ajouter la logique pour afficher l'itinéraire sur la carte
            })
            .catch(error => console.error('Erreur lors de la recherche d\'itinéraire:', error));
    });
});
