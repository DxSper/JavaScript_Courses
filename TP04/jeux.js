// jeux.js :

// Tableau 1 
const tab1 = [];
for (let i = 0; i < 12; i++) {tab1.push(i); };
console.log(tab1);

// Tableau 2 Concaténation
tab2 = tab1.concat(tab1);
console.log(tab2);

// Mélanger le tableau 2 avec l'algorythme de fisher yates
for (let i = tab2.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [tab2[i], tab2[j]] = [tab2[j], tab2[i]]; }
console.log(tab2);

// Afficher les images correspondant au nombre dans le tableau
// Récupération du chemin des images dans un tableau
const images = Array.from({ length: 12 }, (_, index) => `img/${index}.webp`);
console.log(images);
// Container contenant les div 
container = document.getElementById('Container');
// Template de la div contenant l'image
template = document.getElementById('TemplateImg');
// Ajout de le l'image dans cette template et l'affiche pour chaque index du tab2
let id_img = 0
tab2.forEach(index => {
    const cloneTemplate = template.content.cloneNode(true); // Clone du template
    const imgElement = cloneTemplate.querySelector('img'); // Séléction de l'élément img dans le clone 
    imgElement.src = images[index]; // Ajout de la src
    imgElement.alt = `${index}`; // Ajout d'un text alt qui affiche le numéro d'img 
    // Ajout d'un id unique a l'image :
    id_img += 1
    imgElement.id = `${id_img}`
    // Ajout d'un gestionnaire de clique sur l'image :
    imgElement.addEventListener('click', () => handleImageClick(imgElement.id, imgElement));
    // Ajout de la template dans le container
    container.appendChild(cloneTemplate); 
});


// Initialisation du timer
let timerStarted = false; 
let startTime = 0; 
let intervalId = null; 
// Nombre total d'images au départ
let totalImages = tab2.length;
// Fonction pour démarrer le compteur
function startTimer() {
    if (!timerStarted) {
        timerStarted = true;
        startTime = performance.now();

        intervalId = setInterval(() => {
            const currentTime = performance.now();
            const elapsedTime = (currentTime - startTime) / 1000; // Temps écoulé en secondes
            if (totalImages === 0) {
                clearInterval(intervalId);
                alert(`Temps écoulé : ${elapsedTime.toFixed(3)} secondes`)
                timerStarted = false;
                return
            }
        }, 10);
    }
}

// Effacer les images lorsque je clique sur les deux identiques
// Fonction pour gérer le clic sur une image
let clickedImg = []
let idClickedImg = []
let ImgparentElement = []
const handleImageClick = (id, imgElement) => {
    // Inialiser le timer au premier clique
    if (!timerStarted) startTimer();
    // Récupération de l'id de l'image cliquée
    const id_img = parseInt(id, 10)
    // l'ajouter dans le tableau des images cliqué
    clickedImg.push(imgElement);
    idClickedImg.push(id_img);
    
    // Afficher un contour en vert sur l'image cliqué
    Imgparent = imgElement.parentElement;
    Imgparent.classList.add('green')
    ImgparentElement.push(Imgparent)
    // Vérifier si il y a 2 éléments dans le tableau :
    if (clickedImg.length === 2) {
        // Si deux images sont cliquées, enlever les contours verts des deux parents
        ImgparentElement.forEach(parent => parent.classList.remove('green'));
        // Vérifier si l'image est identique via l'alt
        if (clickedImg[0].alt === clickedImg[1].alt) {
            // Vérifier que l'id n'est pas identique
            if (idClickedImg[0] !== idClickedImg[1]) {
                // Si c'est le cas alors effacer les deux images sur le rendu
                clickedImg[0].remove();
                clickedImg[1].remove();
                // Informer le timer du nombre d'images restantes
                totalImages -= 2;
                // Vider les tableaux
                clickedImg = []
                idClickedImg = []
                ImgparentElement = []
            } else {
                // Vider les tableaux 
                clickedImg = []
                idClickedImg = []
                ImgparentElement = []
            }
        } else {
            // Les images sont différentes, le tableau clickedImg est reset 
            clickedImg = [];
            idClickedImg = [];
        }
    } else {
        // Si il y a moins de 2 éléments dans le tableau attendre un autre clique
        return
    }
}

