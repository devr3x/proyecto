// Función para agregar un producto al carrito
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya está en el carrito
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        // Si ya está, aumentar la cantidad
        cart[productIndex].quantity += 1;
    } else {
        // Si no está, agregarlo con cantidad inicial de 1
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} añadido al carrito.`);
}

// Función para mostrar el carrito en cart.html
function displayCart() {
    const cartContainer = document.querySelector('.cart-items');
    const cartTotalContainer = document.querySelector('.cart-total h2');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Limpiar contenedor del carrito
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
        cartTotalContainer.textContent = 'Total: $0.00';
        return;
    }

    let total = 0;

    // Generar los elementos del carrito
    cart.forEach(item => {
        const productElement = document.createElement('div');
        productElement.className = 'cart-item';
        productElement.innerHTML = `
            <p>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart('${item.name}')">Eliminar</button>
        `;
        cartContainer.appendChild(productElement);

        // Calcular el total
        total += item.price * item.quantity;
    });

    // Mostrar el total
    cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filtrar el producto a eliminar
    cart = cart.filter(item => item.name !== productName);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar la visualización del carrito
    displayCart();
}

// Ejecutar funciones en el contexto correcto
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.cart-items')) {
        displayCart();
    }
});
