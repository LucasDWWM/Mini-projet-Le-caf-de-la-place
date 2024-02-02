// Déclaration d'une classe Produit
class Produit {
    constructor(
        nom,
        quantite,
        prixAchatHT,
        prixVenteHT,
        type,
        degreAlcool = null
    ) {
        this.nom = nom;
        this.quantite = +quantite; // Utilisation de l'opérateur '+' pour convertir en nombre
        this.prixAchatHT = +prixAchatHT;
        this.prixVenteHT = +prixVenteHT;
        this.type = type;
        this.degreAlcool = degreAlcool !== null ? +degreAlcool : null; // Conversion en nombre si degreAlcool n'est pas null
        this.calculerMargeHT();
        this.calculerPrixVenteTTC();
    }

    calculerMargeHT() {
        this.margeHT = this.prixVenteHT - this.prixAchatHT;
    }

  calculerPrixVenteTTC() {
    const tauxTVA = 0.2;
    this.prixVenteTTC = this.prixVenteHT * (1 + tauxTVA);
  }

  calculerTotalAvecTVA(quantite) {
    return this.prixVenteTTC * quantite;
  }
}

// Liste de produits
let listeProduits = [];

// Fonction pour ajouter un produit
function ajouterProduit() {
    let nom = document.getElementById("productName").value;
    let quantite = document.getElementById("productQuantity").value;
    let prixAchatHT = document.getElementById("productPrixAchat").value;
    let prixVenteHT = document.getElementById("productPrixVente").value;
    let type = document.getElementById("productType").value;
    let degreAlcool = document.getElementById("productDegreAlcool").value || null;

    let nouveauProduit = new Produit(
        nom,
        quantite,
        prixAchatHT,
        prixVenteHT,
        type,
        degreAlcool
    );
    listeProduits.push(nouveauProduit);

    afficherListeProduits();
}

// Fonction pour afficher la liste des produits
function afficherListeProduits() {
    let listeProduitsDiv = document.getElementById("listeProduits");
    listeProduitsDiv.innerHTML = "";

  listeProduits.forEach((produit) => {
    let produitDiv = document.createElement("div");
    produitDiv.classList.add("produit");

    produitDiv.innerHTML = `
          ${produit.nom}
          Quantité: ${produit.quantite}
          Prix d'achat HT: ${produit.prixAchatHT}
          Prix de vente HT: ${produit.prixVenteHT}
          <div class="calculs">
            <span class="calcul-label">Prix de vente TTC (unitaire): </span>
            <span class="calcul-value">${produit.prixVenteTTC.toFixed(2)}</span>
            <br>
            <span class="calcul-label">Total avec TVA (pour ${
              produit.quantite
            } unité(s)): </span>
            <span class="calcul-value">${produit
              .calculerTotalAvecTVA(produit.quantite)
              .toFixed(2)}</span>
          </div>
          Type: ${produit.type}
          Degré d'alcool: ${
            produit.degreAlcool !== null ? produit.degreAlcool : "N/A"
          }
          Marge HT: ${produit.margeHT}
          <div class="button-container">
            <button onclick="modifierQuantite('${
              produit.nom
            }', -1)">Décrémenter Stock</button>
            <button onclick="modifierQuantite('${
              produit.nom
            }', 1)">Incrémenter Stock</button>
          </div>
          <hr>`;

        listeProduitsDiv.appendChild(produitDiv);
    });
}

// Fonction pour modifier la quantité d'un produit
function modifierQuantite(nomProduit, increment) {
    let produit = listeProduits.find((p) => p.nom === nomProduit);

    if (produit) {
        if (produit.quantite + increment >= 0) {
            produit.quantite += increment;
            afficherListeProduits();
        } else {
            alert("Le stock ne peut pas être négatif.");
        }
    }
}

// Appel initial pour afficher la liste des produits au chargement de la page
window.onload = afficherListeProduits;
