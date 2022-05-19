const data = JSON.parse(localStorage.getItem('cmdProduct'));
console.log(data);

async function getProducts() {
  const products = await fetch('http://localhost:3000/api/products');
  return products.json();
}

function getProductFromCatalog() {
  return products.find((f) => f.id === productId);
}

// Gestion du panier vide
if (!data) {
  const cartEmpty = document.querySelector('h1');
  const cartSection = document.querySelector('.cart');

  cartEmpty.innerHTML = "Vous n'avez pas encore fait votre choix ";
  cartSection.style.display = 'none';
} else {
  // Création de la fiche produit dans le panier
}

// //  "article" dans la section
let productArticle = document.createElement('article');
document.querySelector('#cart__items').appendChild(productArticle);
productArticle.name = 'cart__item';
productArticle.setAttribute('data-id', data[products].productId);

// Insertion de l'élément "div" pour l'image
let productDivImg = document.createElement('div');
productArticle.appendChild(productDivImg);
productDivImg.name = 'cart__item__img';

// Insertion de l'image
let productImg = document.createElement('img');
productDivImg.appendChild(productImg);
productImg.src = data[products].imgProduct;
productImg.alt = data[products].altImgProduct;

// Insertion de l'élément "div"
let productItemContent = document.createElement('div');
productArticle.appendChild(productItemContent);
productItemContent.className = 'cart__item__content';

// Insertion du titre h2
let productTitle = document.createElement('h2');
productItemContentTitlePrice.appendChild(productTitle);
productTitle.innerHTML = data[products].nameProduct;
