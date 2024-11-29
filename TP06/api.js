const url ='https://robotic-weft-375522-default-rtdb.europe-west1.firebasedatabase.app/'
const noeud = 'personnes'
const url2 = `${url}${noeud}.json`

document.getElementById('btnAjouter').onclick = async () => {
    // recuperer l'input de Nom
    const nom = document.getElementById('nom').value 
    // recuper l'input de prenom 
    const prenom = document.getElementById('prenom').value
    // Si les valeurs sont vide ne rien faire :
    if (nom == '' || prenom == '') {
        return
    }
    // Si nonmettre le nom en majuscule:
    const nomMaj = nom.toUpperCase();
    // envoyer les données a firebase via axios
    // par défault la personne n'est pas invité
    const personne = {prenom: prenom,nom: nomMaj, invite: false}
    const response = await axios.post(url2, personne);
    // si les data de la response ne sont pas null 
    if (response.data != null) {
        // alors afficher les données dans le tableau
        // console.log(response.data)
        // Nous créons bien une personne avec l'objet prenom
        // Appeler la fonction get
        //getPersonnes();
        // Au lieu d'appeler la fonction getPersonnes qui va charger deux fois le meme élement si il etais deja present 
        // Nous allons charger directement le nouveau élément indivudellement 
        data = response.data;
        //console.log(data)
        id_newpersn = data.name;
        //console.log(id_newpersn)
        // je veux trouver l'id dans l'objet rep
        const url3 = `${url}${noeud}/${id_newpersn}.json`
        const r2 = await axios.get(url3)
        // dans r2.data nous avons le prenom et le nom
        // console.log(r2.data)
        // maintenant nous devons prendre son prenom et son nom séparement 
        const prenom = r2.data.prenom;
        const nom = r2.data.nom;
        // Nous l'ajoutons individuellement dans le HTML ce qui évite de recharger les données existantes qui crée des doublons
        const newRow = document.createElement('tr');
        newRow.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
        newRow.innerHTML = `
            <td>${prenom}</td>
            <td>${nom}</td>
            <td>
                <button class="btn btn-danger" onclick="removeFB('${id_newpersn}', this)">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="btn btn-warning" onclick="stateSwitch('${id_newpersn}', this)">
                    <i class="fa fa-check"></i>
                </button>
            </td>   
        `;
        const tbody = document.getElementById('myTbody');
        tbody.appendChild(newRow);
    }
}

const removeFB = async (id, button) => {
    const url3 = `${url}${noeud}/${id}.json`
    const r = await axios.delete(url3)
    // console.log(r)
    // Supprimer de l'affichage HTML
    const row = button.parentNode.parentNode;
    row.remove();
};

const stateSwitch = async (id, button) => {
    const url3 = `${url}${noeud}/${id}.json`
    // Patch pour dire que la personne est autorisé 
    // a faire : verifier si la personn est deja autorisé si oui mettre l'invite sur false
    // changer les couleurs en fonction de l'etat d'invitation .
    const r_switch = await axios.get(url3);
    const state = r_switch.data.invite
    const row = button.parentNode.parentNode
    console.log(state);
    if (state === true) {
        // Si la personne est deja autorisé mettre l'invite sur false
        const objet = {invite: false};
        const r_false = await axios.patch(url3,objet);
        console.log(r_false.data);
        // changer la couleur de la ligne ou est afficher le prenom nom
        row.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'
    } else {
        // Si la personne n'est pas autorisé mettre l'invite sur true
        const objet = {invite: true}
        const r_true = await axios.patch(url3,objet)
        console.log(r_true.data)
        // changer la couleur de la ligne ou est afficher le prenom nom
        row.style.backgroundColor = 'rgba(0, 128, 0, 0.3)'
    }
}


const getPersonnes = async () => {
    const url2 = `${url}${noeud}.json`
    const response = await axios.get(url2);
    const data = response.data;
    // Exemple :
    // const objet = {titre:'THEMATRIX', annee:'1999'};
    // for (let atribut in objet){
    //     console.log(atribut); // Titre et annee
    //     console.log(objet[atribut]); // Un objet est aussi un tableau

    // }
    for (let id in data){
        //console.log(id);
        //console.log(data[id]);
        const newRow = document.createElement('tr');
        const personne = data[id];
        const idpersonne = id
        newRow.innerHTML = `
            <td>${personne.prenom}</td>
            <td>${personne.nom}</td>
            <td>
                <button class="btn btn-danger" onclick="removeFB('${idpersonne}', this)">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="btn btn-warning" onclick="stateSwitch('${idpersonne}', this)">
                    <i class="fa fa-check"></i>
                </button>
            </td>
        `;
        const tbody = document.getElementById('myTbody');
        tbody.appendChild(newRow);
        // Vérifier son statut d'invitation :
        if (personne.invite === false) {
            // est n'est pas invité donc en rouge
            newRow.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'
        } else {
            // elle est true donc je met en vert
            newRow.style.backgroundColor = 'rgba(0, 128, 0, 0.3)'
        }
    };
}
getPersonnes();


// <button id="btnAjouter2">Ajouter</button>
// <button id="btnLecture">Lecture</button>
// <button id="btnPatch">Patch</button>