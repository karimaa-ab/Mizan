import { getCurrentPrices } from "./api.js";
import { afficherPrix,
        afficherChargement,
        masquerChargement,
        afficherErreur,
        masquerErreur
    } from "./ui.js";

async function init(){
    afficherChargement();
    masquerErreur();
    try{
        const data= await getCurrentPrices("MAD");
        afficherPrix(data);
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

