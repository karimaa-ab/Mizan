function calculerVariation(prixActuel,historique,tauxChange){
    if(!historique || historique.points.length < 2){
        return null;
    }
    const ancienPrix = historique.points[historique.points.length - 2].c;
    const ancienPrixMAD =(ancienPrix * tauxChange) / 31.1034768;
    const difference = prixActuel - ancienPrixMAD;
    const pourcentage = (difference / ancienPrixMAD) * 100;
    return{
        difference,
        pourcentage
    };
}
// Affiche les prix de l'or et de l'argent dans les cartes.
export function afficherPrix(data,history,silverHistory){
    const container = document.getElementById("cards-container");
    container.textContent = "";
    const metaux = Object.entries(data).filter(([cle, valeur]) => {
        return valeur && typeof valeur === "object" && typeof valeur.price === "number";
    });
    metaux.forEach(([nom, metal]) => {
        const carte = document.createElement("div");
        carte.className = "bg-white border border-gray-200 rounded-xl p-6 shadow-sm";
        const titre = document.createElement("h3");
        titre.className = "text-xl font-bold text-gray-800";
        if(nom === "xau"){
            titre.textContent = "Or";
        }else if (nom === "silver"){
            titre.textContent="Argent";
        }
        const prix = document.createElement("p");
        prix.className = "text-3xl font-bold text-[#35158C] mt-4";
        prix.textContent = `${metal.price.toFixed(2)} ${metal.currency}`;
        const variation = document.createElement("p");
        variation.className = "text-gray-500 text-sm mt-2";
        let variationText = "Variation indisponible";
        let historique = null;
        if(nom ==="xau"){
            historique = history;
        }else if ( nom=== "silver"){
            historique= silverHistory;
        }
        const resultat = calculerVariation( metal.price, historique,data.fx_rate) ;
        
        if(resultat !== null){
            const fleche = resultat.difference > 0 ? "↑" :  resultat.difference < 0 ? "↓" : "→" ;
            const couleur = resultat.difference > 0 ? "text-green-600": resultat.difference < 0 ? "text-red-600" : "text-gray-500";
            const signe = resultat.difference > 0 ? "+":"";
            variationText = `${fleche} Variation : ${signe}${resultat.difference.toFixed(2)} ${metal.currency} (${signe}${resultat.pourcentage.toFixed(2)} %)`;
            variation.className = `text-sm mt-2 ${couleur}`;
        }
        variation.textContent = variationText;
        carte.append(titre, prix, variation);
        container.appendChild(carte);
    });
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


