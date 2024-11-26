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

// Effacer les images lorsque je clique sur les deux identiques
// Fonction pour gérer le clic sur une image
let clickedImg = []
let idClickedImg = []
const handleImageClick = (id, imgElement) => {

    const id_img = parseInt(id, 10)




    console.log(id)
    console.log(id_img)
    console.log(imgElement)
    console.log(clickedImg)
    console.log(idClickedImg)
    // Si ce n'est pas le cas alors, l'ajouter dans le tableau des images cliqué
    clickedImg.push(imgElement);
    idClickedImg.push(id_img);
    

    // Vérifier si il y a 2 éléments dans le tableau :
    if (clickedImg.length === 2) {
        // Vérifier si l'image est identique via l'alt
        if (clickedImg[0].alt === clickedImg[1].alt) {
            // Vérifier que l'id n'est pas identique
            if (idClickedImg[0] !== idClickedImg[1]) {
                // Si c'est le cas alors effacer les deux images
                clickedImg[0].parentElement.remove();
                clickedImg[1].parentElement.remove();
                // Vider les tableaux
                clickedImg = []
                idClickedImg = []
            } else {
                // Vider les tableaux 
                clickedImg = []
                idClickedImg = []
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