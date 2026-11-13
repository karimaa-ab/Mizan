import { getCurrentPrices, getGoldHistory, getSilverHistory } from "./api.js";
import { recupererDevise, sauvegarderDevise } from "./storage.js";
import { afficherPrix,
        afficherChargement,
        masquerChargement,
        afficherErreur,
        masquerErreur
    } from "./ui.js";

const deviseSelect = document.getElementById("devise-select");
deviseSelect.value = recupererDevise();

async function init(){
    afficherChargement();
    masquerErreur();
    try{
        const data= await getCurrentPrices(deviseSelect.value);
        let history = null;
        try{
            history = await getGoldHistory();
        }catch(error){
            console.error("Erreur historique:",error);
        }
        let silverHistory = null ;
        try{
            silverHistory= await getSilverHistory();
        }catch(error){
            console.error("Erreur historique Silver:", error);
        }
        afficherPrix(data,history,silverHistory);
        masquerChargement();
    }catch(error){
        masquerChargement();
        afficherErreur();
        console.error(error);
    }
}
init();
const retryBtn = document.getElementById("retry-btn");

retryBtn.addEventListener("click", init);
function changerDevise(){
    sauvegarderDevise(deviseSelect.value);
    init();
}
deviseSelect.addEventListener("change", changerDevise);

