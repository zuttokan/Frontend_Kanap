// Retrieve API products (see script.js)
async function getProductsFromCatalog() {
  const product = await fetch('http://localhost:3000/api/products/');
  return product.json();
}

// we get the localStorage
function getCartContent() {
  const data = JSON.parse(localStorage.getItem('cmdProduct'));
  return data;
}
// filter a table to match the product id
function findItemFromCatalog(catalog, id) {
  return catalog.find((item) => item._id === id);
}

// implement the information for the product
function renderArticle(key) {
  const productArticle = document.createElement('article');
  document.querySelector('#cart__items').appendChild(productArticle);
  productArticle.className = 'cart__item';
  productArticle.id = key;
  return productArticle;
}

// implement the div for the image
function renderImage(productArticle) {
  const productDivImg = document.createElement('div');
  productArticle.appendChild(productDivImg);
  productDivImg.className = 'cart__item__img';
  return productDivImg;
}

// implement the image
function renderImg(productDivImg, image) {
  const productImg = document.createElement('img');
  productDivImg.appendChild(productImg);
  productImg.src = image;
  return productImg;
}

// implement the div
function renderItemContent(productArticle) {
  const productItemContent = document.createElement('div');
  productArticle.appendChild(productItemContent);
  productItemContent.className = 'cart__item__content';
  return productItemContent;
}

// implement the div for the price
function renderItemContentTitlePrice(productItemContent) {
  const productItemContentTitlePrice = document.createElement('div');
  productItemContent.appendChild(productItemContentTitlePrice);
  productItemContentTitlePrice.className = 'cart__item__content__titlePrice';
  return productItemContentTitlePrice;
}

// implement the title
function renderTitle(productItemContentTitlePrice, name) {
  const productTitle = document.createElement('h2');
  productItemContentTitlePrice.appendChild(productTitle);
  productTitle.innerHTML = name;
  return productTitle;
}

// implement the color
function renderColor(productTitle, color) {
  const productColor = document.createElement('p');
  productTitle.appendChild(productColor);
  productColor.innerHTML = `<div style = padding-top:10px> ${color} </div>`;
  return productColor;
}
// implement the price
function renderPrice(productItemContentTitlePrice, price) {
  const productPrice = document.createElement('p');
  productItemContentTitlePrice.appendChild(productPrice);
  productPrice.innerHTML = `<div style = padding-bottom:50px> ${`${price}€`} </div>`;
  return productPrice;
}

// Insertion de l'élément "div"
function renderItemContentSettings(productItemContent) {
  const productItemContentSettings = document.createElement('div');
  productItemContent.appendChild(productItemContentSettings);
  productItemContentSettings.className = 'cart__item__content__settings';
  return productItemContentSettings;
}

// implement the div
function renderItemContentSettingsQuantity(productItemContentSettings) {
  const productItemContentSettingsQuantity = document.createElement('div');
  productItemContentSettings.appendChild(productItemContentSettingsQuantity);
  productItemContentSettingsQuantity.className =
    'cart__item__content__settings__quantity';
  return productItemContentSettingsQuantity;
}

// implement the "p" for quantity
function renderQty(productItemContentSettingsQuantity) {
  const productQty = document.createElement('p');
  productItemContentSettingsQuantity.appendChild(productQty);
  productQty.innerHTML = 'Quantité : ';
  return productQty;
}

// implement the quantity
function renderproductQuantity(productItemContentSettingsQuantity, qty) {
  const productQuantity = document.createElement('input');
  productItemContentSettingsQuantity.appendChild(productQuantity);
  productQuantity.value = qty;
  productQuantity.className = 'itemQuantity';
  productQuantity.setAttribute('type', 'number');
  productQuantity.setAttribute('min', '1');
  productQuantity.setAttribute('max', '100');
  productQuantity.setAttribute('name', 'itemQuantity');
  return productQuantity;
}

// implement the modification of numbers product
function renderModify(productQuantity) {
  const productModify = document.querySelectorAll('.itemQuantity');

  for (let i = 0; i < productModify.length; i++) {
    productModify[i].addEventListener('change', async (e) => {
      e.preventDefault();

      //  retrieve items of localStorage
      const productModifyAfter = getCartContent();

      // send modify quantity
      productModifyAfter[i].quantity = e.target.value;
      localStorage.setItem('cmdProduct', JSON.stringify(productModifyAfter));
      renderTotalProduct(await processCart());
    });
  }
}

// implement the div for delete product
function renderItemContentSettingsDelete(productItemContentSettings) {
  const productItemContentSettingsDelete = document.createElement('div');
  productItemContentSettings.appendChild(productItemContentSettingsDelete);
  productItemContentSettingsDelete.className =
    'cart__item__content__settings__delete';
  return productItemContentSettingsDelete;
}

// implement the delete product
function renderDelete(productItemContentSettingsDelete, key) {
  const productDelete = document.createElement('p');
  productItemContentSettingsDelete.appendChild(productDelete);
  productDelete.className = 'deleteItem';
  productDelete.innerHTML = '<div style = padding-top:10px> Supprimer</div>';
  productDelete.addEventListener('click', async (e) => {
    e.preventDefault();

    const deleteKey = key;
    // set the localStorage and return a new array
    localStorage.setItem(
      'cmdProduct',
      JSON.stringify(getCartContent().filter((el) => el.key !== deleteKey))
    );
    render(await processCart());
  });
}

/**
 * @name render
 * @description uptade the DOM
 * @param consolidatedData
 * @return void
 */

// implement the DOM
function render(consolidatedData) {
  document.querySelector('#cart__items').innerHTML = '';
  for (let i = 0; i < consolidatedData.length; i++) {
    const productArticle = renderArticle(consolidatedData[i].key);
    const productDivImg = renderImage(productArticle);
    const productImg = renderImg(productDivImg, consolidatedData[i].image);
    const productItemContent = renderItemContent(productArticle, productImg);
    const productItemContentTitlePrice =
      renderItemContentTitlePrice(productItemContent);
    const productTitle = renderTitle(
      productItemContentTitlePrice,
      consolidatedData[i].name
    );
    const productColor = renderColor(productTitle, consolidatedData[i].color);
    const productPrice = renderPrice(productColor, consolidatedData[i].price);
    const productItemContentSettings = renderItemContentSettings(productPrice);
    const productItemContentSettingsQuantity =
      renderItemContentSettingsQuantity(productItemContentSettings);
    const productQty = renderQty(productItemContentSettingsQuantity);
    const productQuantity = renderproductQuantity(
      productQty,
      consolidatedData[i].qty
    );
    const productModify = renderModify(
      productQuantity,
      consolidatedData[i].qty
    );
    const productItemContentSettingsDelete = renderItemContentSettingsDelete(
      productItemContentSettings
    );
    renderDelete(productItemContentSettingsDelete, productArticle.id);
  }
  renderTotalProduct(consolidatedData);
}

// Refresh Total price and quantity
function renderTotalProduct(consolidatedData) {
  document.getElementById('totalQuantity').innerHTML =
    getTotalQty(consolidatedData);
  document.getElementById('totalPrice').innerHTML =
    getTotalPrice(consolidatedData);
}

// Updated the DOM
async function processCart() {
  // catalogProducts retrieve all products from the back-end
  const catalogProducts = await getProductsFromCatalog();
  // cartContent retrieve all products from the localStorage
  const cartContent = getCartContent();
  // Return a new array
  const consolidatedCart = cartContent.map((cartItem) => {
    // retrieve a defined product
    const product = findItemFromCatalog(catalogProducts, cartItem.id);

    // retrieve the information of a product
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
    };
  });
  console.log(consolidatedCart);

  // call render for updated the DOM
  return consolidatedCart;
}

// call processCart for updated the DOM
async function main() {
  render(await processCart());
}

// total price of all items
function getTotalPrice(consolidatedData) {
  return consolidatedData.reduce((total, c) => total + c.totalAmount, 0);
}

// total quantity of all items
function getTotalQty(consolidatedData) {
  return consolidatedData.reduce((total, c) => total + parseInt(c.qty, 10), 0);
}

// implement the form
function validateForm() {
  const form = document.querySelector('.cart__order__form');
  const formRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  const addressRegExp = new RegExp(
    '^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+'
  );
  const emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
  );

  // validation of the form or validateField
  const validation = [
    validTextField(form.firstName, formRegExp),
    validTextField(form.lastName, formRegExp),
    validTextField(form.city, formRegExp),
    validTextField(form.address, addressRegExp),
    validTextField(form.email, emailRegExp),
  ];
  return validation.filter((r) => r == false).length == 0;
}

// implement the conditions of the form
function validTextField(input, regExp) {
  const errorMsg = input.nextElementSibling;

  if (regExp.test(input.value)) {
    errorMsg.innerHTML = '';
    return true;
  }
  errorMsg.innerHTML = 'Veuillez renseigner ce champ.';
  return false;
}

// Retrieve items from localstorage
function postForm() {
  const order = document.getElementById('order');

  // a ternary condition is used to check if the localstorage contains elements, if yes they are recovered
  const productCmd = localStorage.hasOwnProperty('cmdProduct')
    ? JSON.parse(localStorage.getItem('cmdProduct'))
    : [];
  console.log(productCmd);

  if (productCmd.length == 0) {
    console.error('Empty cart');
    return;
  }

  // Retrieve of form data in an object
  const contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
  };

  // Retrieve formular and products purchased
  const sendFormData = {
    contact,
    products: productCmd.map((product) => product.id),
  };

  console.log(sendFormData);

  // Send the formular to the server
  const options = {
    method: 'POST',
    body: JSON.stringify(sendFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch('http://localhost:3000/api/products/order', options)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('orderId', data.orderId);
      document.location.href = `confirmation.html?id=${data.orderId}`;
    });
}

// Check if the form is valid
order.addEventListener('click', (e) => {
  e.preventDefault();

  const isvalid = validateForm();
  if (!isvalid) {
    return;
  }

  postForm();
});

// entry point
main();
