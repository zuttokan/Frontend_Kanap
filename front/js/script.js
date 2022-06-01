// appel de la fonction injectProducts
injectProducts();

// Recuperation des produits de l'api
async function getProducts() {
  // fonction asynchrone afin continuer à réagir aux autres évènements pendant l'exécution de cette tâche.
  const products = await fetch('http://localhost:3000/api/products');
  // await permet d'attendre la résolution d'une promesse.
  return products.json();
  // retourne la réponse en Json et sera appelé products.
  // Json permet de transmettre les données au localStorage
}

// Affichage des produits de l'api sur la page
async function injectProducts() {
  const products = await getProducts();
  // products récupére la fonction de getProducts
  products.forEach((product) => {
    // une boucle dans products  permettant d'éxécuter une fonction pour chaque éléments qui seront appelé product

    //  Implémentation d'un lien précisant l'id produit vers la page products
    let productLink = document.createElement('a');
    // création d'une variable qui inserre la balise dans le DOM
    productLink.href = `product.html?id=${product._id}`;
    // on affecte l'id du produit correspondant à l'article selectionné
    document.querySelector('.items').appendChild(productLink);
    // déclaration que la balise items est le parent de productLink

    //  Implémentation de la balise article
    let productArticle = document.createElement('article');
    productLink.appendChild(productArticle);
    // déclaration que productArticle est l'enfant de productLink, ce qui lui permet de regarder ce qu'il se passe à l'interrieur

    //  Implémentation de l'image
    let productImg = document.createElement('img');
    productArticle.appendChild(productImg);
    productImg.src = product.imageUrl;
    // on créé un lien entre les images stockés dans le local Host et le DOM
    productImg.alt = product.altTxt;

    //  Implémentation dy titre "h3"
    let productName = document.createElement('h3');
    productArticle.appendChild(productName);
    productName.innerHTML = product.name;

    //  Implémentation du texte "p"
    let productDescription = document.createElement('p');
    productArticle.appendChild(productDescription);
    productDescription.innerHTML = product.description;

    console.log(product);
  });
}
