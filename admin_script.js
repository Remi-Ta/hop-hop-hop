document.addEventListener('DOMContentLoaded', function() {
    const networkForm = document.getElementById('network-form');
    const networkList = document.getElementById('network-list');

    // Charger les réseaux existants depuis le fichier JSON
    fetch('networks.json')
        .then(response => response.json())
        .then(networks => {
            networks.forEach(network => {
                const listItem = document.createElement('li');
                listItem.textContent = `${network.name} - GTFS: ${network.gtfsUrl}, Temps Réel: ${network.realTimeUrl}`;
                networkList.appendChild(listItem);
            });
        });

    networkForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const networkName = document.getElementById('network-name').value;
        const gtfsUrl = document.getElementById('gtfs-url').value;
        const realTimeUrl = document.getElementById('realtime-url').value;

        const newNetwork = {
            id: Date.now(), // Utiliser un timestamp comme ID unique
            name: networkName,
            gtfsUrl: gtfsUrl,
            realTimeUrl: realTimeUrl
        };

        // Ajouter le nouveau réseau au fichier JSON
        fetch('networks.json')
            .then(response => response.json())
            .then(networks => {
                networks.push(newNetwork);
                return fetch('networks.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(networks, null, 2)
                });
            })
            .then(() => {
                // Mettre à jour l'affichage
                const listItem = document.createElement('li');
                listItem.textContent = `${newNetwork.name} - GTFS: ${newNetwork.gtfsUrl}, Temps Réel: ${newNetwork.realTimeUrl}`;
                networkList.appendChild(listItem);

                // Réinitialiser le formulaire
                networkForm.reset();
            });
    });
});
