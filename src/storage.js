// Enregistre la devise choisie.
export function sauvegarderDevise(devise){
    localStorage.setItem("devise", devise);
}
export function recupererDevise () {
    return localStorage.getItem("devise")|| "MAD";
    
}