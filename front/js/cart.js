// Récupération des produits de l'api (voir script.js)
async function getProductsFromCatalog() {
  const product = await fetch('http://localhost:3000/api/products/');
  return product.json();
}

// Retourne le localstorage
function getCartContent() {
  const data = JSON.parse(localStorage.getItem('cmdProduct'));
  // avec "data" on récupére le localStorage qui a pour argument cmdProduct
  return data;
}
//filtrer un tableau pour trouver une correspondance avec l'id du produit
function findItemFromCatalog(catalog, id) {
  return catalog.find((item) => item._id === id);
  //.find renvoie la valeur du premier élément trouvé dans le tableau
}

function renderArticle(key) {
  const productArticle = document.createElement('article');
  document.querySelector('#cart__items').appendChild(productArticle);
  productArticle.className = 'cart__item';
  productArticle.id = key;
  return productArticle;
}

function renderImage(productArticle) {
  const productDivImg = document.createElement('div');
  productArticle.appendChild(productDivImg);
  productDivImg.className = 'cart__item__img';
  return productDivImg;
}

function renderImg(productDivImg, image) {
  const productImg = document.createElement('img');
  productDivImg.appendChild(productImg);
  productImg.src = image;
  return productImg;
}

function renderItemContent(productImg) {
  const productItemContent = document.createElement('div');
  productImg.appendChild(productItemContent);
  productItemContent.className = 'cart__item__content';
  return productItemContent;
}

function renderItemContentTitlePrice(productItemContent) {
  const productItemContentTitlePrice = document.createElement('div');
  productItemContent.appendChild(productItemContentTitlePrice);
  productItemContentTitlePrice.className = 'cart__item__content__titlePrice';
  return productItemContentTitlePrice;
}

// Insertion du titre h2
function renderTitle(productItemContentTitlePrice, name) {
  const productTitle = document.createElement('h2');
  productItemContentTitlePrice.appendChild(productTitle);
  productTitle.innerHTML = name;
  return productTitle;
}

// Insertion de la couleur
function renderColor(productTitle, color) {
  const productColor = document.createElement('p');
  productTitle.appendChild(productColor);
  productColor.innerHTML = color;
  return productColor;
}
// Insertion du prix
function renderPrice(productColor, price, productItemContentTitlePrice) {
  const productPrice = document.createElement('p');
  productItemContentTitlePrice.appendChild(productPrice);
  productPrice.innerHTML = price + '€';
  return productPrice;
}

// Insertion de l'élément "div"
function renderItemContentSettings(productPrice) {
  const productItemContentSettings = document.createElement('div');
  productItemContent.appendChild(productItemContentSettings);
  productItemContentSettings.className = 'cart__item__content__settings';
  return productItemContentSettings;
}

// Insertion de l'élément "div"
function renderItemContentSettingsQuantity(productItemContentSettings) {
  const productItemContentSettingsQuantity = document.createElement('div');
  productItemContentSettings.appendChild(productItemContentSettingsQuantity);
  productItemContentSettingsQuantity.className =
    'cart__item__content__settings__quantity';
  return productItemContentSettingsQuantity;
}

// Insertion de "Qty : "
function renderQty(productItemContentSettingsQuantity) {
  const productQty = document.createElement('p');
  productItemContentSettingsQuantity.appendChild(productQty);
  productQty.innerHTML = 'Quantité : ';
  return productQty;
}

// Insertion de la quantité
function renderproductQuantity(productQty, qty) {
  const productQuantity = document.createElement('input');
  productItemContentSettingsQuantity.appendChild(productQuantity);
  productQuantity.value = qty;
  productQuantity.className = 'itemQuantity';
  productQuantity.setAttribute('type', 'number');
  productQuantity.setAttribute('min', '1');
  productQuantity.setAttribute('max', '100');
  productQuantity.setAttribute('name', 'itemQuantity');
  return productQuantity;
}

// Insertion de l'élément "div"
function renderItemContentSettingsDelete(productQuantity) {
  const productItemContentSettingsDelete = document.createElement('div');
  productItemContentSettings.appendChild(productItemContentSettingsDelete);
  productItemContentSettingsDelete.className =
    'cart__item__content__settings__delete';
}

// Insertion de "p" supprimer
function renderDelete(productItemContentSettingsDelete, key) {
  const productDelete = document.createElement('p');
  productItemContentSettingsDelete.appendChild(productDelete);
  productDelete.className = 'deleteItem';
  productDelete.innerHTML = 'Supprimer';
  productDelete.addEventListener('click', (e) => {
    // addEventListener à chaque click on appel un evement
    e.preventDefault();
    // preventDefault() sert à stopper le comportement du bouton

    // filtrer l'élément cliqué par le bouton supprimer
    const deleteKey = key;
    // deleteKey récupére la clé du produit et permet sa suppréssion
    localStorage.setItem(
      'cmdProduct',
      JSON.stringify(getCartContent().filter((el) => el.key !== deleteKey))
    );
    // on mets à jour le localStorage en retournant un nouveau tableau
    processCart();
    //on appel processCart qui réactualise la page
  });
}

//Modification de la quantité des articles
function renderModify(productDelete) {
  const productModify = document.querySelectorAll('.itemQuantity');
  for (let i = 0; i < productModify.length; i++) {
    productModify[i].addEventListener('change', (e) => {
      e.preventDefault();
      const productModifyAfter = getCartContent();
      // productModifyAfter reprend les éléments du localStorage
      productModifyAfter[i].quantity = e.target.value;
      // on envoi la quantité modifié
      localStorage.setItem('cmdProduct', JSON.stringify(productModifyAfter));
      processCart();
      // on mets à jour le localStorage en retournant un nouveau tableau
    });
  }
}

// implémentation dans le DOM
function render(consolidatedData) {
  document.querySelector('#cart__items').innerHTML = '';
  for (let i = 0; i < consolidatedData.length; i++) {
    const productArticle = renderArticle(consolidatedData[i].key);
    const productDivImg = renderImage(productArticle);
    const productImg = renderImg(productDivImg, consolidatedData[i].image);
    const productItemContent = renderItemContent(productImg);
    const productItemContentTitlePrice =
      renderItemContentTitlePrice(productItemContent);
    const productTitle = renderTitle(
      productItemContentTitlePrice,
      consolidatedData[i].name
    );
    const productColor = renderColor(productTitle, consolidatedData[i].color);
    const productPrice = renderPrice(productColor, consolidatedData[i].price);
    const productItemContentSettings = renderItemContentSettings(productPrice);
    const productItemContentSettingsQuantity =
      renderItemContentSettingsQuantity(productItemContentSettings);
    const productQty = renderQty(productItemContentSettingsQuantity);
    const productQuantity = renderproductQuantity(consolidatedData[i].qty);
    const productItemContentSettingsDelete =
      renderItemContentSettingsDelete(productQuantity);
    const productDelete = renderDelete(productItemContentSettingsDelete);
    const productModify = renderModify(productDelete);

    document.getElementById('totalQuantity').innerHTML =
      getTotalQty(consolidatedData);
    document.getElementById('totalPrice').innerHTML =
      getTotalPrice(consolidatedData);
  }
}

async function processCart() {
  const catalogProducts = await getProductsFromCatalog();
  // catalogProducts récupére les produits dans le back-end
  const cartContent = getCartContent();
  // cartContent récupére les produits dans le localStorage
  const consolidatedCart = cartContent.map((cartItem) => {
    // On boucle sur cartContent pour retourner un tableau d'objet
    const product = findItemFromCatalog(catalogProducts, cartItem.id);
    // product récupére un produit précisement...

    return {
      id: cartItem.id,
      qty: cartItem.quantity,
      color: cartItem.color,

      key: cartItem.key,
      image: product.imageUrl,
      name: product.name,
      description: product.description,
      price: product.price,
      totalAmount: product.price * cartItem.quantity,
    }; // on retourne les charactérisiques d'un produit
  });
  console.log(consolidatedCart);

  render(consolidatedCart);
  // on appel render afin de modifier le DOM
}

processCart();

function getTotalPrice(consolidatedData) {
  return consolidatedData.reduce((total, c) => total + c.totalAmount, 0);
  //on applique une fonction (reduce) qui est un « accumulateur » et qui traite chaque valeur d'une liste afin de la réduire à une seule valeur.
}

function getTotalQty(consolidatedData) {
  // second donne la parametre la base numérique
  return consolidatedData.reduce((total, c) => total + parseInt(c.qty, 10), 0);
  //on applique la meme fonction (reduce) en ajoutant une autre fonction (parseInt) qui analyse une chaîne de caractère renvoie nombre un entier
}

//mise en place du formulaire avec regex
function validateForm() {
  let form = document.querySelector('.cart__order__form');

  // Création de RegExp pour le formulaire
  let formRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    '^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+'
  );
  let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
  );
  // RegExp permet de vérifier le contenu d'une chaîne de caractères.

  // validation du formulaire ou validateField
  const validation = [
    validTextField(form.firstName, formRegExp),
    validTextField(form.lastName, formRegExp),
    validTextField(form.city, formRegExp),
    validTextField(form.address, addressRegExp),
    validTextField(form.email, emailRegExp),
    // on associe les regexp avec le formulaire pour vérification
  ];

  return validation.filter((r) => r == false).length == 0;
}

// fonction de validation du formulaire
function validTextField(input, regExp) {
  let errorMsg = input.nextElementSibling;

  if (regExp.test(input.value)) {
    errorMsg.innerHTML = '';
    // si le texte est valide on n'inscrit rien
    return true;
  } else {
    errorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    return false;
    // si le texte n'est pas valide on un message d'erreur s'affiche sur la page
  }
}

//
function postForm() {
  const order = document.getElementById('order');

  // récupération des articles
  const productCmd = localStorage.hasOwnProperty('cmdProduct')
    ? // hasOwnProperty retourne un booléen indiquant si l'objet possède la propriété spécifiée
      JSON.parse(localStorage.getItem('cmdProduct'))
    : [];
  // on utilise une condition ternaire pour vérifier si le localstorage contient des éléments, si oui on les récupére
  console.log(productCmd);

  if (productCmd.length == 0) {
    console.error('Empty cart');
    return;
    // si il n'y a rien cela retourne une erreur
  }

  //récupèration des données du formulaire dans un objet
  const contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
  };

  //  récupération de tous les éléments du formulaire et des produits achetés
  const sendFormData = {
    contact,
    products: productCmd.map((product) => product.id),
  };

  console.log(sendFormData);

  //envoie du formulaire au serveur
  const options = {
    method: 'POST',
    body: JSON.stringify(sendFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch('http://localhost:3000/api/products/order', options)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('orderId', data.orderId);
      document.location.href = 'confirmation.html?id=' + data.orderId;
    });
}

// vérifie si le form est valide, si il est valide le traitement s'arrete
order.addEventListener('click', (e) => {
  e.preventDefault();

  const isvalid = validateForm();
  if (!isvalid) {
    return;
  }

  postForm();
});
