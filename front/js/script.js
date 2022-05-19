injectProducts();

// Recuperation des articles
async function getProducts() {
  const products = await fetch('http://localhost:3000/api/products');
  return products.json();
}

// Mise en ligne des articles
async function injectProducts() {
  const products = await getProducts();
  products.forEach((product) => {
    //  "a href" - a
    let productLink = document.createElement('a');
    productLink.href = `product.html?id=${product._id}`;
    document.querySelector('.items').appendChild(productLink);

    //  <article> - article
    let productArticle = document.createElement('article');
    productLink.appendChild(productArticle);

    // "image" - img
    let productImg = document.createElement('img');
    productArticle.appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    //  "h3" - productName
    let productName = document.createElement('h3');
    productArticle.appendChild(productName);
    productName.innerHTML = product.name;

    //  "p" - productDescription
    let productDescription = document.createElement('p');
    productArticle.appendChild(productDescription);
    productDescription.innerHTML = product.description;

    console.log(product);
  });
}
