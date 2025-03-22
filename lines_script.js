document.addEventListener('DOMContentLoaded', function() {
    // Charger les réseaux depuis le fichier JSON
    fetch('https://raw.githubusercontent.com/Remi-Ta/hop-hop-hop/main/networks.json')
        .then(response => response.json())
        .then(networks => {
            const networkList = document.getElementById('network-list');

            networks.forEach(network => {
                const listItem = document.createElement('li');
                listItem.textContent = network.name;
                listItem.addEventListener('click', () => displayLines(network));
                networkList.appendChild(listItem);
            });
        });

    function displayLines(network) {
        // Afficher les lignes du réseau sélectionné
        console.log('Afficher les lignes pour :', network.name);
        // Ici, vous pouvez ajouter la logique pour afficher les lignes
    }

    // Gérer la recherche de réseaux ou de lignes
    document.getElementById('network-search').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        // Filtrer les réseaux en fonction de la recherche
        console.log('Recherche :', query);
        // Ici, vous pouvez ajouter la logique pour filtrer les réseaux ou les lignes
    });
});
