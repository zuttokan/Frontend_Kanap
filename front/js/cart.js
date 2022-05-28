// TODO: implement fetch from API and JSON conversion
//return; // Return Array
async function getProductsFromCatalog() {
  const product = await fetch('http://localhost:3000/api/products/');
  return product.json();
}

// TODO: implement localstorage getter and JSON conversion
//return; // return Array
function getCartContent() {
  const data = JSON.parse(localStorage.getItem('cmdProduct'));
  return data;
}
//filtrer un tableau pour trouver une correspondance avec l'id du produit
function findItemFromCatalog(catalog, id) {
  return catalog.find((item) => item._id === id);
}

/* data : array of consolidated objects */
// TODO: implement DOM rendering
function render(consolidatedData) {
  document.querySelector('#cart__items').innerHTML = '';
  for (let i = 0; i < consolidatedData.length; i++) {
    let productArticle = document.createElement('article');
    document.querySelector('#cart__items').appendChild(productArticle);
    productArticle.className = 'cart__item';
    productArticle.id = consolidatedData[i].key;

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

      // filtrer l'élément cliqué par le bouton supprimer
      let deleteKey = consolidatedData[i].key;
      localStorage.setItem(
        'cmdProduct',
        JSON.stringify(getCartContent().filter((el) => el.key !== deleteKey))
      );
      processCart();
    });
    document.getElementById('totalQuantity').innerHTML =
      getTotalQty(consolidatedData);
    document.getElementById('totalPrice').innerHTML =
      getTotalPrice(consolidatedData);

    //Modification de la quantité des articles
    let productModify = document.querySelectorAll('.itemQuantity');
    for (let i = 0; i < productModify.length; i++) {
      productModify[i].addEventListener('change', (e) => {
        e.preventDefault;
        let modifyKey = consolidatedData[i].key;
        const foo = getCartContent();
        console.log(foo[i]);
        foo[i].quantity = e.target.value;
        console.log(foo[i]);
        //console.log(e.target.value);

        localStorage.setItem('cmdProduct', JSON.stringify(foo));
        processCart();
      });
    }
  }
}

async function processCart() {
  const catalogProducts = await getProductsFromCatalog();
  const cartContent = getCartContent();

  const consolidatedCart = cartContent.map((cartItem) => {
    const product = findItemFromCatalog(catalogProducts, cartItem.id);
    //console.log(product);

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
    }; // Implement consolidated object
  });
  console.log(consolidatedCart);

  render(consolidatedCart);
}

// Code entrypoint
processCart();

function getTotalPrice(consolidatedData) {
  return consolidatedData.reduce((total, c) => total + c.totalAmount, 0);
}

function getTotalQty(consolidatedData) {
  return consolidatedData.reduce((total, c) => total + parseInt(c.qty, 10), 0);
}

//mise en place du formulaire avec regex
function getForm() {
  let form = document.querySelector('.cart__order__form');

  // Ajout des Regex
  let formRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    '^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+'
  );
  let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
  );

  // Ecoute de la modification du prénom
  form.firstName.addEventListener('change', function () {
    validFirstName(this);
  });

  // Ecoute de la modification du prénom
  form.lastName.addEventListener('change', function () {
    validLastName(this);
  });

  // Ecoute de la modification du prénom
  form.address.addEventListener('change', function () {
    validAddress(this);
  });

  // Ecoute de la modification du prénom
  form.city.addEventListener('change', function () {
    validCity(this);
  });

  // Ecoute de la modification du prénom
  form.email.addEventListener('change', function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (formRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = '';
    } else {
      firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (formRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = '';
    } else {
      lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = '';
    } else {
      addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (formRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = '';
    } else {
      cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = '';
    } else {
      emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
    }
  };
}
getForm();
// GET FORM FONCTIONNEL

//POST FORM EN COURS DE CONSTRUCTION
function postForm() {
  const order = document.getElementById('order');
  order.addEventListener('click', (event) => {
    event.preventDefault();

    //récupèration des données du formulaire dans un objet
    const contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value,
    };

    //  les valeurs du formulaire  dans un objet
    const sendFormData = {
      contact,
    };

    //envoie du formulaire au serveur
    const options = {
      method: 'POST',
      body: JSON.stringify(sendFormData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  });
}
postForm();
