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

function findItemFromCatalog(catalog, id) {
  return catalog.find((item) => item._id === id);
}

/* data : array of consolidated objects */
// TODO: implement DOM rendering
function render(consolidatedData) {
  for (let i = 0; i < consolidatedData.length; i++) {
    let productArticle = document.createElement('article');
    document.querySelector('#cart__items').appendChild(productArticle);
    productArticle.className = 'cart__item';
    productArticle.setAttribute('data-id', consolidatedData[i].id);

    // Insertion de l'élément "div" pour l'image produit
    let productDivImg = document.createElement('div');
    productArticle.appendChild(productDivImg);
    productDivImg.className = 'cart__item__img';

    // Insertion de l'image
    let productImg = document.createElement('img');
    productDivImg.appendChild(productImg);
    productImg.src = consolidatedData[i].img;

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
    productPrice.innerHTML = consolidatedData[i].price;

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
  }
}

async function processCart() {
  const catalogProducts = await getProductsFromCatalog();
  const cartContent = getCartContent();

  const consolidatedCart = cartContent.map((cartItem) => {
    const product = findItemFromCatalog(catalogProducts, cartItem.id);
    console.log(product);

    return {
      id: cartItem.id,
      qty: cartItem.quantity,
      color: cartItem.color,

      image: product.image,
      name: product.name,
      description: product.description,
      Price: product.Price,
      totalAmount: product.unitPrice * cartItem.count,
    }; // Implement consolidated object
  });
  console.log(consolidatedCart);

  render(consolidatedCart);
}

// Code entrypoint
processCart();

// let basket = document.querySelector('#cart__items');
// basket.innerHTML = consolidatedData.map(
//   (product) =>
//     `<article class="cart__item" data-id="${product._id}" data-couleur="${product[i].couleur}" data-quantité="${product.quantité}">
// <div class="cart__item__img">
//   <img src="${product.image}" alt="${product.alt}">
// </div>
// <div class="cart__item__content">
//   <div class="cart__item__content__titlePrice">
//     <h2>${product.name}</h2>
//     <span>couleur : ${product.couleur}</span>
//     <p data-prix="${product.prix}">${product.prix} €</p>
//   </div>
//   <div class="cart__item__content__settings">
//     <div class="cart__item__content__settings__quantity">
//       <p>Qté : </p>
//       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantité}">
//     </div>
//     <div class="cart__item__content__settings__delete">
//       <p class="deleteItem" data-id="${product._id}" data-couleur="${product.couleur}">Supprimer</p>
//     </div>
//   </div>
// </div>
// </article>`
// );

//*************************************** */
// var template =
// '<div>' +
// consolidatedData[i]._id +
// '</div>' +
// '<div>' +
// consolidatedData[i].name +
// '</div>' +
// '<div>' +
// consolidatedData[i].price +
// '</div>';

// document.body.insertAdjacentHTML('afterbegin', template);
