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
  //for (let i = 0; i < data.length; i++) {}
}

async function processCart() {
  const catalogProducts = await getProductsFromCatalog();
  const cartContent = getCartContent();

  const consolidatedCart = cartContent.map((cartItem) => {
    const product = findItemFromCatalog(catalogProducts, cartItem.id);
    console.log(product);
    return {
      id: product._id,
      qty: cartItem.quantity,
      color: cartItem.color,

      name: product.name,
      description: product.description,
      unitPrice: product.unitPrice,
      totalAmount: product.unitPrice * cartItem.count,
      image: product.image,
    }; // Implement consolidated object
  });
  console.log(consolidatedCart);

  render(consolidatedCart);
}

// Code entrypoint
processCart();
