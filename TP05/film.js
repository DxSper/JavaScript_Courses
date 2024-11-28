let seriesList = []; // Liste pour stocker les séries récupérées
let favoriteSeries = []; // Liste pour stocker les séries favorites


// Fonction pour sauvegarder les séries favorites dans le stockage local
const saveToLocalStorage = () => {
    localStorage.setItem('series', JSON.stringify(favoriteSeries));
}


// Fonction asynchrone pour récupérer les détails d'une série à partir de l'API OMDB
const fetchSerieDetails = async (imdbId) => {
    let apiKey = "375d88a0"; // Clé API pour accéder à l'API OMDB
    let apiUrl = "http://www.omdbapi.com/?apikey=" + apiKey + "&i=" + imdbId;
    const response = await fetch(apiUrl); // Envoi de la requête à l'API
    const serieDetails = await response.json(); // Conversion de la réponse en JSON
    return serieDetails; // Retourne les détails de la série
}


// Fonction pour afficher les séries dans le tableau
const displaySeries = () => {
    const tbody = document.getElementById("myTbody"); // Récupère le corps du tableau
    tbody.innerHTML = ""; // Vide le contenu du tableau
    for (let serie of seriesList) { // Parcourt chaque série dans la liste
        const template = document.getElementById("templateTr"); // Récupère le modèle de ligne
        const clone = template.content.cloneNode(true); // Clone le modèle
        const td = clone.querySelectorAll("td"); // Récupère toutes les cellules de la ligne clonée
        td[0].innerHTML = serie.Title; // Remplit la première cellule avec le titre de la série
        td[1].innerHTML = serie.Year; // Remplit la deuxième cellule avec l'année de la série
        clone.querySelector("img").src = serie.Poster; // Définit l'image de la série
        clone.querySelector("img").alt = serie.Title; // Définit le texte alternatif de l'image
        clone.querySelector("button").onclick = async (evt) => { // Ajoute un événement au bouton
            const tr = evt.target.closest("tr"); // Récupère la ligne correspondante
            const index = tr.rowIndex - 1; // Récupère l'index de la série
            let serieDetails = await fetchSerieDetails(seriesList[index].imdbID); // Récupère les détails de la série
            
            favoriteSeries.push(serieDetails); // Ajoute la série aux favoris
            displayFavorites(); // Met à jour l'affichage des séries favorites
            seriesList.splice(index, 1); // Supprime la série de la liste d'origine
            displaySeries(); // Met à jour l'affichage des séries
            saveToLocalStorage(); // Sauvegarde les séries favorites dans le stockage local
        };
        tbody.append(clone); // Ajoute la ligne clonée au tableau
    }
};


// Fonction pour afficher les séries favorites dans le tableau
const displayFavorites = () => {
    const tbody2 = document.getElementById("myTbody2"); // Récupère le corps du tableau des favoris
    tbody2.innerHTML = ""; // Vide le contenu du tableau des favoris

    for (let favorite of favoriteSeries) { // Parcourt chaque série favorite
        const template = document.getElementById("templateTr2"); // Récupère le modèle de ligne pour les favoris
        const clone = template.content.cloneNode(true); // Clone le modèle
        const td = clone.querySelectorAll("td"); // Récupère toutes les cellules de la ligne clonée
        
        td[0].innerHTML = favorite.Title; // Remplit la première cellule avec le titre de la série favorite
        td[1].innerHTML = favorite.Year; // Remplit la deuxième cellule avec l'année de la série favorite
        td[2].innerHTML = favorite.imdbRating; // Remplit la troisième cellule avec la note IMDB de la série favorite
        clone.querySelector("img").src = favorite.Poster; // Définit l'image de la série favorite
        clone.querySelector("img").alt = favorite.Title; // Définit le texte alternatif de l'image
        clone.querySelector("button").onclick = (evt) => { // Ajoute un événement au bouton
            const tr = evt.target.closest("tr"); // Récupère la ligne correspondante
            const index = tr.rowIndex - 1; // Récupère l'index de la série favorite
            favoriteSeries.splice(index, 1); // Supprime la série favorite de la liste
            displayFavorites(); // Met à jour l'affichage des séries favorites
            saveToLocalStorage(); // Sauvegarde les séries favorites dans le stockage local
        };
        tbody2.append(clone); // Ajoute la ligne clonée au tableau des favoris
    }
};


// Événement pour le bouton de recherche
document.getElementById("btnSearch").onclick = async () => {
    let filmTitle = document.getElementById("film").value; // Récupère le titre du film saisi par l'utilisateur
    document.getElementById("film").value = ""; // Vide le champ de saisie
    let apiKey = "efdc2275"; // Clé API pour accéder à l'API OMDB
    let apiUrl = "http://www.omdbapi.com/?apikey=" + apiKey + "&s=" + filmTitle + "&type=series"; // URL de l'API pour rechercher des séries
    const response = await fetch(apiUrl); // Envoi de la requête à l'API
    const data = await response.json(); // Conversion de la réponse en JSON

    seriesList = data.Search; // Met à jour la liste des séries avec les résultats de la recherche
    displaySeries(); // Affiche les séries récupérées
};


// Récupération des séries favorites depuis le stockage local au chargement de la page
const storedData = localStorage.getItem('series'); // Récupère les données du stockage local
if (storedData) {
    favoriteSeries = JSON.parse(storedData); // Parse les données JSON et les stocke dans la liste des favoris
    displayFavorites(); // Affiche les séries favorites
}



