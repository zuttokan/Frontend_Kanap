// Retrieving the product id from the URL
function getProductId() {
  // Location interface href returns a string containing the entire URL and updates the href.
  const str = window.location.href;
  const url = new URL(str);
  // we return the params variable that retrieves the url of the page with the product id
  return url.searchParams.get('id');
}

// Recovery of API products (see script.js)
async function getProduct(productId) {
  const product = await fetch(
    'http://localhost:3000/api/products/' + productId
  );
  return product.json();
}

injectProduct();

async function injectProduct() {
  const productId = getProductId();
  const product = await getProduct(productId);

  //  Product Image Implement
  const productImg = document.createElement('img');
  document.querySelector('.item__img').appendChild(productImg);
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;

  // Name Implement
  const productName = document.getElementById('title');
  productName.innerHTML = product.name;

  // Price Implement
  const productPrice = document.getElementById('price');
  productPrice.innerHTML = product.price;

  // Decription Implement
  const productDescription = document.getElementById('description');
  productDescription.innerHTML = product.description;

  // Color Implement
  const colors = document.querySelector('colors');
  for (let colors of product.colors) {
    const productColors = document.createElement('option');
    document.querySelector('#colors').appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
}

// STORAGE_KEY will be the key to the localStorage used to store the products in the cart
const STORAGE_KEY = 'cmdProduct';
const idProduct = getProductId();
const addToCardBtn = document.querySelector('#addToCart');
const colorProduct = document.querySelector('#colors');
const quantityProduct = document.querySelector('#quantity');

/**
 * @name updateLocalStorage
 * @description uptade on the localStorage
 * @param product representation of the product added to the localStorage
 * @return void
 */

function updateLocalStorage(product) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const foundIndex = data.findIndex((d) => d.key === product.key);
  if (foundIndex === -1) {
    data.push(product);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } else {
    data[foundIndex] = product;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

// on ecoute le clique utilisateur
addToCardBtn.addEventListener('click', () => {
  const arrayProduct = []; 
  const colorValue = colorProduct.value; 
  const quantityValue = quantityProduct.value; 

  // an object is created or the order information is stored
  const objectProduct = {
    id: idProduct,
    color: colorValue,
    quantity: quantityValue,
    key: idProduct + ':' + colorValue,
  };

  //we return the information if true, otherwise we go to the checkErrors function.
  if (checkErrors(colorValue, quantityValue) == true) {
    return;
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

// Verification the implément for the color and the quantity
function checkErrors(colorValue, quantityValue) {
  let hasErrors = false;
  if (colorValue === '' && !document.querySelector('.errorColor')) {
    let hasErrors = true;
    colorProduct.insertAdjacentHTML(
      'afterend',
      '<div class="errorColor error" style="color:red;"><strong>Couleur manquante !</strong></div>'
    );
  } else if (colorValue !== '' && document.querySelector('.errorColor')) {
    document.querySelector('.errorColor').remove();
  }
  if (quantityValue === '0' && !document.querySelector('.errorQuantity')) {
    let hasErrors = true;
    quantityProduct.insertAdjacentHTML(
      'afterend',
      '<div class="errorQuantity error" style="color:red;"><strong>Quantité manquante !</strong></div>'
    );
  } else if (
    quantityValue !== '0' &&
    document.querySelector('.errorQuantity')
  ) {
    document.querySelector('.errorQuantity').remove();
  }
  return hasErrors;

