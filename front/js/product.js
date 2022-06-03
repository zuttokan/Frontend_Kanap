//Récupération de l'id du produit via l' URL
function getProductId() {
  const str = window.location.href;
  //La propriété href de l'interface Location est un stringifier qui renvoie une chaîne contenant l'intégralité de l'URL et permet de mettre à jour le href.
  const url = new URL(str);
  // création d'un nouvelle URL avec comme paramétre str
  return url.searchParams.get('id');
  //on retourne la variable params qui récupère l'url de la page avec l'id produit
}

// Récupération des produits de l'api (voir script.js)
async function getProduct(productId) {
  const product = await fetch(
    'http://localhost:3000/api/products/' + productId
  );
  return product.json();
}

//Déclaration de la fonction injectProduct
injectProduct();

async function injectProduct() {
  const productId = getProductId();
  // on récupére l'id produit dans la constente productId
  const product = await getProduct(productId);
  // on récupére le produit dans la constente product

  //  Implémentation de l'image produit
  let productImg = document.createElement('img');
  document.querySelector('.item__img').appendChild(productImg);
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;

  // Implémentation du Titre
  let productName = document.getElementById('title');
  productName.innerHTML = product.name;

  // Implémentation du prix
  let productPrice = document.getElementById('price');
  productPrice.innerHTML = product.price;

  //Implémentation de la description
  let productDescription = document.getElementById('description');
  productDescription.innerHTML = product.description;

  //Implémentation des couleurs
  let colors = document.querySelector('colors');
  for (let colors of product.colors) {
    //création d'une boucle afin de parcourir les couleurs du produit
    let productColors = document.createElement('option');
    document.querySelector('#colors').appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
}

const STORAGE_KEY = 'cmdProduct';
// déclaration de la constente STORAGE_KEY qui attribu à cmdProduct les produits commander dans l'api
const idProduct = getProductId();
// déclaration de la constente idProduct qui récupére l'id produit
const addToCardBtn = document.querySelector('#addToCart');
// déclaration de la constente addToCardBtn dans le DOM
const colorProduct = document.querySelector('#colors');
//déclaration de la constente colorProduct dans le DOM
const quantityProduct = document.querySelector('#quantity');
//déclaration de la constente quantityProduct dans le DOM

// Récupération du localStorage
function updateLocalStorage(product) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  // data récupére le localSotrage et Json.parse transforme la chaine de charatere en objet pour Javascript
  const foundIndex = data.findIndex((d) => d.key === product.key);
  //  la méthode findIndex() va parcourir "data" qui est un tableau
  // "d.key === product.key" c'est une condition cela veut dire data  === localStorage
  // product === nouveau produit
  // si dans le localStorage on a un produit avec le même name que le nouveau produit
  // alors on récupère la position dans le tableau
  // sinon foundIndex sera === -1 cela veut dire qu il n y a pas de produit avec ce id

  // si foundIndex === -1 c'est que le produit n'est pas dans localStorage
  if (foundIndex === -1) {
    data.push(product);
    // comme data est un tableau on pousse le nouveau produit
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } else {
    data[foundIndex] = product;
    // on set dans localStorage les infos mise à jour
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

// on ecoute le clique utilisateur
addToCardBtn.addEventListener('click', () => {
  const arrayProduct = []; // on crée un tableau pour récupérer le produit
  const colorValue = colorProduct.value; // on récupère la couleur selectionner
  const quantityValue = quantityProduct.value; // on récupère la quantité selectionner

  // on crée un objet ou sont stocké les informations produits commander
  const objectProduct = {
    id: idProduct,
    color: colorValue,
    quantity: quantityValue,
    key: idProduct + ':' + colorValue,
  };

  if (checkErrors(colorValue, quantityValue) == true) {
    return;
    // on verifie que les valeurs couleur et quantité soient remplis.
    // on retourne les informations si c'est true, sinon on rendre dans la function checkErrors.
  }

  if (localStorage.hasOwnProperty(STORAGE_KEY)) {
    updateLocalStorage(objectProduct);
    // si oui on va update le localStorage avec la fonction updateLocalStorage() qui va prendre en paramétre l objet et non le tableau
  } else {
    arrayProduct.push(objectProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arrayProduct));
    // si il n y a pas de localStorage avec le nom === "cmdProduct" on set un localStorage avec le tableau en le stringifiant
  }
});

// Vérification de l'implémentation de la couleur et de la quantité
function checkErrors(colorValue, quantityValue) {
  // la fonction checkErrors prend pour argument colorValue et quantityValue afin de vérifier la bonne insertion de commande
  let hasErrors = false;
  //création du flag hasErrors afin de définir l'entrée des erreurs
  if (colorValue === '' && !document.querySelector('.errorColor')) {
    let hasErrors = true;
    // si la valeur de la couleur est vide alors on modifie la balise errorColor, le flag est true
    colorProduct.insertAdjacentHTML(
      'afterend',
      '<div class="errorColor error" style="color:red;"><strong>Couleur manquante !</strong></div>'
      // aprés l'element on inserre l'information destinée à l'utilisateur
    );
  } else if (colorValue !== '' && document.querySelector('.errorColor')) {
    document.querySelector('.errorColor').remove();
    // sinon si la valeur de la couleur est ajouté on supprime la balise errorColor
  }
  if (quantityValue === '0' && !document.querySelector('.errorQuantity')) {
    let hasErrors = true;
    // si la valeur de la quantité est vide alors on modifie la balise errorColor, le flag est true
    quantityProduct.insertAdjacentHTML(
      'afterend',
      '<div class="errorQuantity error" style="color:red;"><strong>Quantité manquante !</strong></div>'
      // aprés l'element on inserre l'information destinée à l'utilisateur
    );
  } else if (
    quantityValue !== '0' &&
    document.querySelector('.errorQuantity')
  ) {
    document.querySelector('.errorQuantity').remove();
  }
  return hasErrors;
  // sinon si la valeur de couleur est ajouté on supprime la balise errorColor
  // on retourn hasErrors afin de vérifier
}
