function getProductId() {
  const str = window.location.href;
  const url = new URL(str);
  return url.searchParams.get('id');
}

// // Récupération d'un article
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
  //console.table(product);

  // Insertion de l'image
  let productImg = document.createElement('img');
  document.querySelector('.item__img').appendChild(productImg);
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;

  // Insertion du Titre
  let productName = document.getElementById('title');
  productName.innerHTML = product.name;

  // Insertion du prix
  let productPrice = document.getElementById('price');
  productPrice.innerHTML = product.price;

  //Insertion de la description
  let productDescription = document.getElementById('description');
  productDescription.innerHTML = product.description;

  //Insertion des couleurs
  let colors = document.querySelector('colors');
  for (let colors of product.colors) {
    let productColors = document.createElement('option');
    document.querySelector('#colors').appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
}

const STORAGE_KEY = 'cmdProduct';
const idProduct = getProductId();
const addToCardBtn = document.querySelector('#addToCart');
const colorProduct = document.querySelector('#colors');
const quantityProduct = document.querySelector('#quantity');

// on récupére le localStorage
function updateLocalStorage(product) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const foundIndex = data.findIndex((d) => d.id === product.id);

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

  const objectProduct = {
    id: idProduct,
    color: colorValue,
    quantity: quantityValue,
  };

  if (checkErrors(colorValue, quantityValue) == true) {
    return;
  }

  if (localStorage.hasOwnProperty(STORAGE_KEY)) {
    updateLocalStorage(objectProduct);
  } else {
    arrayProduct.push(objectProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arrayProduct));
  }
});

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
}
