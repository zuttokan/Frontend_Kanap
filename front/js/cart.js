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
  return consolidatedData.reduce((total, c) => total + c.qty, 0);
}
