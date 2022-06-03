// Récupération des produits de l'api (voir script.js)
async function getProductsFromCatalog() {
  const product = await fetch('http://localhost:3000/api/products/');
  return product.json();
}

// implémentation du localstorage
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

// implémentation dans le DOM
function render(consolidatedData) {
  document.querySelector('#cart__items').innerHTML = '';
  for (let i = 0; i < consolidatedData.length; i++) {
    // la boucle permet à consolidatedData de faire le tour des articles un insérrant les produits dans le DOM
    let productArticle = document.createElement('article');
    document.querySelector('#cart__items').appendChild(productArticle);
    productArticle.className = 'cart__item';
    productArticle.id = consolidatedData[i].key;
    // association de l'id et la clé produit (key) afin qu'il soit unique

    // Insertion de l'élément "div" pour l'image produit
    let productDivImg = document.createElement('div');
    productArticle.appendChild(productDivImg);
    productDivImg.className = 'cart__item__img';

    // Insertion de l'image
    let productImg = document.createElement('img');
    productDivImg.appendChild(productImg);
    productImg.src = consolidatedData[i].image;

    let productItemContent = document.createElement('div');
    productArticle.appendChild(productItemContent);
    productItemContent.className = 'cart__item__content';

    // Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement('div');
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = 'cart__item__content__titlePrice';

    // Insertion du titre h2
    let productTitle = document.createElement('h2');
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = consolidatedData[i].name;

    // Insertion de la couleur
    let productColor = document.createElement('p');
    productTitle.appendChild(productColor);
    productColor.innerHTML = consolidatedData[i].color;

    // Insertion du prix
    let productPrice = document.createElement('p');
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = consolidatedData[i].price + '€';

    // Insertion de l'élément "div"
    let productItemContentSettings = document.createElement('div');
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = 'cart__item__content__settings';

    // Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement('div');
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className =
      'cart__item__content__settings__quantity';

    // Insertion de "Qty : "
    let productQty = document.createElement('p');
    productItemContentSettingsQuantity.appendChild(productQty);
    productQty.innerHTML = 'Quantité : ';

    // Insertion de la quantité
    let productQuantity = document.createElement('input');
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = consolidatedData[i].qty;
    productQuantity.className = 'itemQuantity';
    productQuantity.setAttribute('type', 'number');
    productQuantity.setAttribute('min', '1');
    //setAttribute ajoute un nouvel attribut ou change la valeur d'un attribut, il le met à jour
    productQuantity.setAttribute('max', '100');
    productQuantity.setAttribute('name', 'itemQuantity');

    // Insertion de l'élément "div"
    let productItemContentSettingsDelete = document.createElement('div');
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className =
      'cart__item__content__settings__delete';

    // Insertion de "p" supprimer
    let productDelete = document.createElement('p');
    productItemContentSettingsDelete.appendChild(productDelete);
    productDelete.className = 'deleteItem';
    productDelete.innerHTML = 'Supprimer';
    productDelete.addEventListener('click', (e) => {
      e.preventDefault;
      // addEventListener à chaque click on appel un evement

      // filtrer l'élément cliqué par le bouton supprimer
      let deleteKey = consolidatedData[i].key;
      // deleteKey récupére la clé du produit et permet sa suppréssion
      localStorage.setItem(
        'cmdProduct',
        JSON.stringify(getCartContent().filter((el) => el.key !== deleteKey))
      );
      // on mets à jour le localStorage en retournant un nouveau tableau
      processCart();
      //on appel processCart qui réactualise la page
    });

    document.getElementById('totalQuantity').innerHTML =
      getTotalQty(consolidatedData);
    // on inserre la quantité total
    document.getElementById('totalPrice').innerHTML =
      getTotalPrice(consolidatedData);
    // on inserre le prix

    //Modification de la quantité des articles
    let productModify = document.querySelectorAll('.itemQuantity');
    for (let i = 0; i < productModify.length; i++) {
      productModify[i].addEventListener('change', (e) => {
        e.preventDefault;
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
}

async function processCart() {
  const catalogProducts = await getProductsFromCatalog();
  // catalogProducts récupére les produits dans le back-end
  const cartContent = getCartContent();
  // cartContent récupére les produits dans le localStorage
  const consolidatedCart = cartContent.map((cartItem) => {
    // consolidatedCart va faire une boucle et transmettre un nouveau tableau avec le résultat qui sera cartItem
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
  //  sendFormData parcourt les éléments

  console.log(sendFormData);

  //envoie du formulaire au serveur
  const options = {
    method: 'POST',
    body: JSON.stringify(sendFormData),
    headers: {
      'Content-Type': 'application/json',
    },
    // on convertit une valeur JavaScript en chaîne JSON

    // implémentation du retour de la commande dans le DOM
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
