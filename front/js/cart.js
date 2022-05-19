const data = JSON.parse(localStorage.getItem('cmdProduct'));
console.log(data);

function getProductFromCatalog(productId) {
  return products.find((f) => f.id === productId);
}

function processCart() {
  const stockProducts = getProducts();
  const cart = data;
  const processedCart = cart.map((cartItem) => {
    const product = getProductFromCatalog(cartItem.id);

    return {
      id: cartItem.id,
      count: cartItem.count,
      name: product.name,
      description: product.description,
      unitPrice: product.unitPrice,
      totalAmount: product.unitPrice * cartItem.count,
      image: product.image,
    };
  });
  processCart();
}

function render(processedCartItems) {
  processedCartItems.forEach((item, index) => {
    const img = document.createElement('img');
    img.setAttribute('src', item.image);

  if (!data) {
    const cartEmpty = document.querySelector('h1');
    const cartSection = document.querySelector('.cart');

    cartEmpty.innerHTML = "Vous n'avez pas encore fait votre choix ";
    cartSection.style.display = 'none';



    // Gestion du panier vide
  } else {
    // Création de la fiche produit dans le panier
    // //  "article" dans la section
    let productArticle = document.createElement('article');
    document.querySelector('#cart__items').appendChild(productArticle);
    productArticle.name = 'cart__item';

    // Insertion de l'élément "div" pour l'image
    let productDivImg = document.createElement('div');
    productArticle.appendChild(productDivImg);
    productDivImg.name = 'cart__item__img';

    // Insertion de l'image
    let productImg = document.createElement('img');
    productDivImg.appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altImgProduct;

    // Insertion de l'élément "div"
    let productItemContent = document.createElement('div');
    productArticle.appendChild(productItemContent);
    productItemContent.className = 'cart__item__content';

    // Insertion du titre h2
    let productTitle = document.createElement('h2');
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = nameProduct;
  }
  render();
  }
