document.addEventListener('DOMContentLoaded', function() {
    const networkForm = document.getElementById('network-form');
    const networkList = document.getElementById('network-list');
    const gtfsForm = document.getElementById('gtfs-form');
    const realtimeForm = document.getElementById('realtime-form');

    // Charger les réseaux existants depuis le fichier JSON
    fetch('https://raw.githubusercontent.com/Remi-Ta/hop-hop-hop/main/networks.json')
        .then(response => response.json())
        .then(networks => {
            networks.forEach(network => {
                const listItem = document.createElement('li');
                listItem.textContent = `${network.name} - GTFS: ${network.gtfsUrl}, Temps Réel: ${network.realTimeUrl}`;

                // Ajouter des boutons de modification et de suppression
                const editButton = document.createElement('button');
                editButton.textContent = 'Modifier';
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';

                listItem.appendChild(editButton);
                listItem.appendChild(deleteButton);
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
        fetch('https://raw.githubusercontent.com/Remi-Ta/hop-hop-hop/main/networks.json')
            .then(response => response.json())
            .then(networks => {
                networks.push(newNetwork);
                return fetch('https://api.github.com/repos/Remi-Ta/hop-hop-hop/contents/networks.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': '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'
                    },
                    body: JSON.stringify({
                        message: 'Update networks.json',
                        content: btoa(JSON.stringify(networks, null, 2))
                    })
                });
            })
            .then(() => {
                // Mettre à jour l'affichage
                const listItem = document.createElement('li');
                listItem.textContent = `${newNetwork.name} - GTFS: ${newNetwork.gtfsUrl}, Temps Réel: ${newNetwork.realTimeUrl}`;

                // Ajouter des boutons de modification et de suppression
                const editButton = document.createElement('button');
                editButton.textContent = 'Modifier';
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';

                listItem.appendChild(editButton);
                listItem.appendChild(deleteButton);
                networkList.appendChild(listItem);

                // Réinitialiser le formulaire
                networkForm.reset();
            });
    });

    gtfsForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const fileInput = document.getElementById('gtfs-file');
        const file = fileInput.files[0];

        if (file) {
            // Simuler le traitement du fichier GTFS
            console.log('Fichier GTFS téléchargé :', file.name);
            // Ici, vous pouvez ajouter la logique pour traiter le fichier GTFS
        }
    });

    realtimeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const realtimeUrl = document.getElementById('realtime-url').value;
        console.log('API en Temps Réel liée :', realtimeUrl);
        // Ici, vous pouvez ajouter la logique pour enregistrer l'URL de l'API
    });
});
