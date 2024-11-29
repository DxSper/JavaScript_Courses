const url ='https://robotic-weft-375522-default-rtdb.europe-west1.firebasedatabase.app/'
const noeud = 'personnes'
const url2 = `${url}${noeud}.json`
// charger les personnes depuis firebase
document.getElementById("btnAjouter2").onclick = async () => {
    // ajt une personne 
    const personne = {prenom:'Nicolas',nom:'CAGE'}
    const response = await axios.post(url2, personne);
    console.log(response.data);
    const id = response.data.name;
    console.log(id)
};

document.getElementById("btnLecture").onclick = async () => {
    const response = await axios.get(url2);
    const data = response.data;
    // Exemple :
    // const objet = {titre:'THEMATRIX', annee:'1999'};
    // for (let atribut in objet){
    //     console.log(atribut); // Titre et annee
    //     console.log(objet[atribut]); // Un objet est aussi un tableau

    // }
    for (let id in data){
        console.log(id);
        console.log(data[id]);
    };
};

document.getElementById('btnPatch').onclick = async () => {
    const id = '-OCrVN6NFBoaJa73Nzy3'
    const url3 = `${url}${noeud}/${id}.json`
    const objet = {age:24};
    const r = await axios.patch(url3,objet);
    console.log(r.data);
};