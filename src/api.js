const API_URL = "https://xaus.com/api/v1/spot";
// Récupère les prix actuels de l'or et de l'argent.
export async function getCurrentPrices(currency){
    try{
       const url =`${API_URL}?currency=${currency}&unit=gram`;
       const response = await fetch(url);
       if(!response.ok){
          throw new Error("Erreur serveur")
        }
        const data = await response.json();
        data.silver={
            price:(data.silver_usd_oz * data.fx_rate)/31.1034768,
            currency:currency,
            unit:"gram"
        };
        return data;
    }catch(error){
        throw error;
}
}
// URL de l'API pour récupérer l'historique des prix de l'or.
const HISTORY_URL = "https://xaus.com/api/v1/history";
// Récupère l'historique des prix de l'or.
export async function getGoldHistory(){
    try{
        const response = await fetch(HISTORY_URL);
        if(!response.ok){
            throw new Error("Erreur lors du chargement de l'historique")
        }
        const data = await response.json();
        return data ;
    }catch(error){
        throw error;
    }
}
// Récupère l'historique des prix de silver
export async function getSilverHistory() {
    const url = "https://xaus.com/api/v1/chart?symbol=silver&range=1mo&interval=1d";

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Erreur lors du chargement de l'historique de l'argent");
    }

    const data = await response.json();

    return data;
}
