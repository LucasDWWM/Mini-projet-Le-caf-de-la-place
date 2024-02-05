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
    this.quantite = +quantite;
    this.prixAchatHT = +prixAchatHT;
    this.prixVenteHT = +prixVenteHT;
    this.type = type;
    this.degreAlcool = degreAlcool !== null ? +degreAlcool : null;
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

  if (nom && nom.trim() !== "" && type) {
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
  } else {
    alert("Veuillez choisir un type valide pour le produit.");
  }
}

// ...

// Fonction pour afficher la liste des produits
function afficherListeProduits() {
  let listeProduitsDiv = document.getElementById("listeProduits");
  listeProduitsDiv.innerHTML = "";

  listeProduits.forEach((produit) => {
    let produitDiv = document.createElement("div");
    produitDiv.classList.add("produit");

    // Nom du produit
    let nomProduit = document.createElement("div");
    nomProduit.textContent = produit.nom;
    produitDiv.appendChild(nomProduit);

    // Quantité
    let quantiteDiv = document.createElement("div");
    quantiteDiv.innerHTML = `Quantité: <span id="${produit.nom}-quantite">${produit.quantite}</span>`;
    produitDiv.appendChild(quantiteDiv);

    // Prix d'achat HT
    let prixAchatDiv = document.createElement("div");
    prixAchatDiv.textContent = `Prix d'achat HT: ${produit.prixAchatHT}`;
    produitDiv.appendChild(prixAchatDiv);

    // Prix de vente HT
    let prixVenteDiv = document.createElement("div");
    prixVenteDiv.textContent = `Prix de vente HT: ${produit.prixVenteHT}`;
    produitDiv.appendChild(prixVenteDiv);

    // Calculs
    let calculsDiv = document.createElement("div");
    calculsDiv.classList.add("calculs");

    let prixVenteTTCLabel = document.createElement("span");
    prixVenteTTCLabel.classList.add("calcul-label");
    prixVenteTTCLabel.textContent = "Prix de vente TTC (unitaire): ";

    let prixVenteTTCValue = document.createElement("span");
    prixVenteTTCValue.classList.add("calcul-value");
    prixVenteTTCValue.textContent = produit.prixVenteTTC.toFixed(2);

    let br = document.createElement("br");

    let totalTVALabel = document.createElement("span");
    totalTVALabel.classList.add("calcul-label");
    totalTVALabel.textContent = `Total avec TVA (pour ${produit.quantite} unité(s)): `;

    let totalTVAValue = document.createElement("span");
    totalTVAValue.classList.add("calcul-value");
    totalTVAValue.textContent = produit
      .calculerTotalAvecTVA(produit.quantite)
      .toFixed(2);

    calculsDiv.appendChild(prixVenteTTCLabel);
    calculsDiv.appendChild(prixVenteTTCValue);
    calculsDiv.appendChild(br);
    calculsDiv.appendChild(totalTVALabel);
    calculsDiv.appendChild(totalTVAValue);

    produitDiv.appendChild(calculsDiv);

    // Type du produit
    let typeProduit = document.createElement("div");
    typeProduit.textContent = `Type: ${produit.type}`;
    produitDiv.appendChild(typeProduit);

    // Degré d'alcool
    let degreAlcoolDiv = document.createElement("div");
    degreAlcoolDiv.textContent = `Degré d'alcool: ${produit.degreAlcool !== null ? produit.degreAlcool : "N/A"
      }`;
    produitDiv.appendChild(degreAlcoolDiv);

    // Marge HT
    let margeHTDiv = document.createElement("div");
    margeHTDiv.textContent = `Marge HT: ${produit.margeHT}`;
    produitDiv.appendChild(margeHTDiv);

    // Boutons
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    let decrementButton = document.createElement("button");
    decrementButton.textContent = "Décrémenter Stock";
    decrementButton.onclick = () => modifierQuantite(produit.nom, -1);

    let incrementButton = document.createElement("button");
    incrementButton.textContent = "Incrémenter Stock";
    incrementButton.onclick = () => modifierQuantite(produit.nom, 1);

    let modifierButton = document.createElement("button");
    modifierButton.textContent = "Modifier Produit";
    modifierButton.onclick = () => modifierProduit(produit.nom);

    let supprimerButton = document.createElement("button");
    supprimerButton.textContent = "Supprimer Produit";
    supprimerButton.onclick = () => supprimerProduit(produit.nom);

    buttonContainer.appendChild(decrementButton);
    buttonContainer.appendChild(incrementButton);
    buttonContainer.appendChild(modifierButton);
    buttonContainer.appendChild(supprimerButton);

    produitDiv.appendChild(buttonContainer);

    // Ligne horizontale
    let hr = document.createElement("hr");
    produitDiv.appendChild(hr);

    // Ajout du produitDiv à la listeProduitsDiv
    listeProduitsDiv.appendChild(produitDiv);
  });
}



function modifierQuantite(nomProduit, increment) {
  let produit = listeProduits.find((p) => p.nom === nomProduit);

  if (produit) {
    let nouvelleQuantite = produit.quantite + increment;

    if (nouvelleQuantite >= 0) {
      produit.quantite = nouvelleQuantite;
      document.getElementById(`${nomProduit}-quantite`).textContent =
        produit.quantite;
      afficherListeProduits();
    } else {
      alert("Le stock ne peut pas être négatif.");
    }
  }
}

// Fonction pour supprimer un produit
function supprimerProduit(nomProduit) {
  listeProduits = listeProduits.filter((p) => p.nom !== nomProduit);
  afficherListeProduits();
}

// Fonction pour modifier les caractéristiques d'un produit
function modifierProduit(nomProduit) {
  let produit = listeProduits.find((p) => p.nom === nomProduit);

  if (produit) {
    // Afficher un formulaire de modification avec les champs préremplis
    let form = document.createElement("form");
    form.innerHTML = `
      <label for="modProductName">Nom du Produit:</label>
      <input type="text" id="modProductName" value="${produit.nom}" required />

      <label for="modProductQuantity">Quantité:</label>
      <input type="number" id="modProductQuantity" value="${produit.quantite
      }" required />

      <label for="modProductPrixAchat">Prix d'achat HT:</label>
      <input type="number" id="modProductPrixAchat" value="${produit.prixAchatHT
      }" required />

      <label for="modProductPrixVente">Prix de vente HT:</label>
      <input type="number" id="modProductPrixVente" value="${produit.prixVenteHT
      }" required />

      <label for="modProductType">Type:</label>
      <select id="modProductType">
        <option value="Boisson alcoolisée" ${produit.type === "Boisson alcoolisée" ? "selected" : ""
      }>Boisson alcoolisée</option>
        <option value="Boisson non alcoolisée" ${produit.type === "Boisson non alcoolisée" ? "selected" : ""
      }>Boisson non alcoolisée</option>
        <option value="Autre" ${produit.type === "Autre" ? "selected" : ""
      }>Autre</option>
      </select>

      <label for="modProductDegreAlcool">Degré d'alcool:</label>
      <input type="number" id="modProductDegreAlcool" value="${produit.degreAlcool || ""
      }" />

      <button onclick="validerModification('${nomProduit}')">Valider Modification</button>
    `;

    document.getElementById("listeProduits").appendChild(form);
  }
}

// Fonction pour valider la modification
function validerModification(nomProduit) {
  let produit = listeProduits.find((p) => p.nom === nomProduit);

  if (produit) {
    // Mettre à jour les propriétés du produit avec les nouvelles valeurs
    produit.nom = document.getElementById("modProductName").value;
    produit.quantite = +document.getElementById("modProductQuantity").value;
    produit.prixAchatHT = +document.getElementById("modProductPrixAchat").value;
    produit.prixVenteHT = +document.getElementById("modProductPrixVente").value;
    produit.type = document.getElementById("modProductType").value;
    produit.degreAlcool =
      +document.getElementById("modProductDegreAlcool").value || null;

    // Supprimer le formulaire de modification
    let form = document.querySelector("form");
    if (form) {
      form.remove();
    }

    // Afficher la liste mise à jour
    afficherListeProduits();
  }
}

// Fonction pour sauvegarder la liste des produits dans le Local Storage
function sauvegarderListeProduits() {
  localStorage.setItem("listeProduits", JSON.stringify(listeProduits));
}

// Fonction pour récupérer la liste des produits depuis le Local Storage lors du chargement de la page
function chargerListeProduits() {
  const produitsEnregistres = localStorage.getItem("listeProduits");

  if (produitsEnregistres) {
    listeProduits = JSON.parse(produitsEnregistres);
    afficherListeProduits();
  }
}

// Fonction pour définir la couleur en fonction du niveau de stock
function definirCouleurStock(quantite) {
  if (quantite <= 5) {
    return 'red'; // Rouge pour un stock faible
  } else if (quantite <= 20) {
    return 'orange'; // Orange pour un stock moyen
  } else {
    return 'green'; // Vert pour un stock suffisant
  }
}

// Mise à jour de la fonction afficherListeProduits pour inclure la couleur du stock
function afficherListeProduits() {
  let listeProduitsDiv = document.getElementById('listeProduits');
  listeProduitsDiv.innerHTML = '';

  listeProduits.forEach((produit) => {
    let produitDiv = document.createElement('div');
    produitDiv.classList.add('produit');

    // Utilisation de la fonction pour définir la couleur du stock
    const couleurStock = definirCouleurStock(produit.quantite);

    produitDiv.innerHTML = `
        <div style="color: ${couleurStock};">${produit.nom}</div>
        Quantité: ${produit.quantite}
        Prix d'achat HT: ${produit.prixAchatHT}`;

    listeProduitsDiv.appendChild(produitDiv);
  });
}

// Appel de la fonction pour charger la liste des produits au chargement de la page
window.onload = function () {
  chargerListeProduits();
  afficherListeProduits();
};

// Appel de la fonction pour sauvegarder la liste des produits à chaque modification
window.onbeforeunload = function () {
  sauvegarderListeProduits();
};

// Appel initial pour afficher la liste des produits au chargement de la page
window.onload = afficherListeProduits;
