// link from cart page to confirmation page
const id = new URL(window.location.href).searchParams.get('id');

//display of the command is implemented in the DOM
const orderId = document.getElementById('orderId');
orderId.innerHTML = id;

// after the command the localSorage is deleted
localStorage.clear();
