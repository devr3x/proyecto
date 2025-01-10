// Función para agregar un producto al carrito
function addToCart(productId, productName) {
    // Obtener el carrito desde localStorage o inicializarlo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya está en el carrito
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
        // Si ya está, aumentar la cantidad
        cart[productIndex].quantity += 1;
    } else {
        // Si no está, agregarlo con cantidad inicial de 1
        cart.push({ id: productId, name: productName, quantity: 1 });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} añadido al carrito.`);
}

// Función para obtener y mostrar el carrito
function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Limpiar el contenedor
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    // Mostrar los productos del carrito
    cart.forEach(item => {
        const productElement = document.createElement('div');
        productElement.className = 'cart-item';
        productElement.innerHTML = `
            <p>${item.name} (x${item.quantity})</p>
            <button onclick="removeFromCart('${item.id}')">Eliminar</button>
        `;
        cartContainer.appendChild(productElement);
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filtrar el producto a eliminar
    cart = cart.filter(item => item.id !== productId);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar la visualización del carrito
    displayCart();
}

// Asegurarse de ejecutar el código en el contexto adecuado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('cart-container')) {
            displayCart();
        }
    });
} else {
    if (document.getElementById('cart-container')) {
        displayCart();
    }
}
