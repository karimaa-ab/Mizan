const API_URL = "https://xaus.com/api/v1/spot";
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