// scripts.js

// Simulación de un carrito de compras
let cart = [];

// Función para agregar un producto al carrito
function addToCart(productName, price) {
    const product = { name: productName, price: price };
    cart.push(product);
    alert(`${productName} ha sido agregado al carrito.`);
    updateCartCount();
}

// Actualizar el conteo de ítems en el carrito
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
}

// Mostrar el carrito completo
function displayCart() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = ''; // Limpiar contenido anterior

    let total = 0;
    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h2>${item.name}</h2>
            <p>Precio: $${item.price.toFixed(2)}</p>
        `;
        cartContainer.appendChild(cartItem);
        total += item.price;
    });

    const totalElement = document.querySelector('.cart-total h2');
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Eventos para simular agregar productos
document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.btn');
    addButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const productName = button.parentElement.querySelector('h2').textContent;
            const priceText = button.parentElement.querySelector('p').textContent;
            const price = parseFloat(priceText.replace('Precio: $', ''));
            addToCart(productName, price);
        });
    });

    // Si estamos en la página del carrito
    if (document.querySelector('.cart-items')) {
        displayCart();
    }
});
