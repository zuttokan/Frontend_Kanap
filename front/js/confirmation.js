const id = new URL(window.location.href).searchParams.get('id');
// lien de la page cart vers la page confirmation
console.log(id);

//on implémente dans le DOM l'affichage de la commande
const orderId = document.getElementById('orderId');
orderId.innerHTML = id;

// une fois la commande passé on vide le localstorage
localStorage.clear();
