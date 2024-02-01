class Produit {
    constructor(nom, quantite, prixAchatHT, prixVenteHT, type, degreAlcool = null) {
        this.nom = nom;
        this.quantite = quantite;
        this.prixAchatHT = prixAchatHT;
        this.prixVenteHT = prixVenteHT;
        this.type = type;
        this.degreAlcool = degreAlcool;
        this.calculerMargeHT();
        this.calculerPrixVenteTTC();
    }
}