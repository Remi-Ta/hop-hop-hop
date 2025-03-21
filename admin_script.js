document.addEventListener('DOMContentLoaded', function() {
    const networkForm = document.getElementById('network-form');
    const networkList = document.getElementById('network-list');

    networkForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const networkName = document.getElementById('network-name').value;
        const gtfsUrl = document.getElementById('gtfs-url').value;

        // Ajouter le réseau à la liste
        const listItem = document.createElement('li');
        listItem.textContent = `${networkName} - ${gtfsUrl}`;
        networkList.appendChild(listItem);

        // Réinitialiser le formulaire
        networkForm.reset();
    });
});
