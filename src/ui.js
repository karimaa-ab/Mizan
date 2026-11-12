// Affiche les prix de l'or et de l'argent dans les cartes.
export function afficherPrix(data){
    const prixOr = document.getElementById("prix-or");
    const prixArgent = document.getElementById("prix-argent");
    prixOr.textContent= `${data.xau.price.toFixed(2)} ${data.xau.currency}`;
    prixArgent.textContent= `${data.silver.price.toFixed(2)} ${data.silver.currency}`;
    const lastUpdate = document.getElementById("last-update");
    lastUpdate.textContent = `Dernière mise à jour : ${data.updated_at.split("T")[0]}`;
}
// Affiche le message de chargement pendant la récupération des données.
export function afficherChargement(){
    const loading = document.getElementById("loading");
    loading.classList.remove("hidden");
}
// Masque le message de chargement.
export function masquerChargement(){
    const loading = document.getElementById("loading");
    loading.classList.add("hidden");
}
// Affiche le message d'erreur.
export function afficherErreur(){
    const erreur= document.getElementById("erreur-api");
    erreur.classList.remove("hidden");
}
// Masque le message d'erreur.
export function masquerErreur() {
    const erreur = document.getElementById("erreur-api");
    erreur.classList.add("hidden");
}


