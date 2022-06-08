// call function injectProducts
injectProducts();

// Get the products from the API
async function getProducts() {
  const products = await fetch('http://localhost:3000/api/products');
  // we return the answer in json format, which makes it possible to transmit the data to the localStorage in string of charatere and to complete the promise.
  return products.json();
}

// Display the products from the API to the page
async function injectProducts() {
  const products = await getProducts();
  products.forEach((product) => {
    const productLink = document.createElement('a');
    productLink.href = `product.html?id=${product._id}`;
    document.querySelector('.items').appendChild(productLink);

    //  implementation  article
    const productArticle = document.createElement('article');
    // déclaration que productArticle est l'enfant de productLink, ce qui lui permet de regarder ce qu'il se passe à l'interrieur
    productLink.appendChild(productArticle);

    //  implementation image
    const productImg = document.createElement('img');
    productArticle.appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    //  implementation title "h3"
    const productName = document.createElement('h3');
    productArticle.appendChild(productName);
    productName.innerHTML = product.name;

    //  implementation  text "p"
    const productDescription = document.createElement('p');
    productArticle.appendChild(productDescription);
    productDescription.innerHTML = product.description;

    console.log(product);
  });
}
