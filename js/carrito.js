let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio, descuento = 0) {
    console.log(`Añadiendo al carrito: ${nombre}, $${precio}, Descuento: ${descuento}`);
    const producto = { nombre, precio, descuento };
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar en localStorage
    alert(`${nombre} ha sido añadido al carrito.`);
    actualizarCarrito(); // Actualizar carrito
    actualizarEnlaceCarrito(); // Actualizar el número en el enlace del carrito
}

// Función para actualizar la tabla del carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total');
    if (!listaCarrito || !totalElemento) return;

    listaCarrito.innerHTML = ''; // Limpiar el carrito
    let total = 0;

    carrito.forEach((producto) => {
        const item = document.createElement('tr');
        item.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>1</td> 
            <td>$${(producto.precio * (1 - producto.descuento / 100)).toFixed(2)}</td>
            <td><button class="remove-btn" onclick="eliminarProducto('${producto.nombre}')">Eliminar</button></td>
        `;
        listaCarrito.appendChild(item);
        total += producto.precio * (1 - producto.descuento / 100);
    });

    totalElemento.textContent = `Total: $${total.toFixed(2)}`;
    actualizarEnlaceCarrito(); // Actualizar el número en el enlace del carrito
}

// Función para eliminar productos del carrito
function eliminarProducto(nombre) {
    carrito = carrito.filter(producto => producto.nombre !== nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar localStorage
    actualizarCarrito();
    actualizarEnlaceCarrito(); // Actualizar el número en el enlace del carrito
}

// Función para finalizar la compra
function realizarCompra() {
    if (carrito.length === 0) {
        alert("No hay productos en el carrito.");
        return;
    }
    alert("Compra realizada con éxito.");
    carrito = []; // Vaciar el carrito
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar localStorage
    actualizarCarrito(); // Actualizar visualización
    actualizarEnlaceCarrito(); // Actualizar el número en el enlace del carrito
}

// Función para actualizar el enlace del carrito
function actualizarEnlaceCarrito() {
    const cartLink = document.getElementById('cart-link');
    if (!cartLink) return;
    
    const numProductos = carrito.length;
    cartLink.textContent = `🛒 Carrito (${numProductos})`;
}


    // Asignar evento de compra al botón
    const btnCompra = document.getElementById('btn-compra');
    if (btnCompra) {
        btnCompra.addEventListener('click', realizarCompra);
    }

    document.addEventListener('DOMContentLoaded', function() {
        carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        actualizarCarrito();
        actualizarEnlaceCarrito(); // Actualizar número de productos en el enlace al cargar la página
    
        // Asignar evento a los botones de agregar productos
        const botonesAgregar = document.querySelectorAll('.agregar-carrito'); // Cambio aquí
        botonesAgregar.forEach((boton) => {
            boton.addEventListener('click', function() {
                const producto = this.closest('.producto');
                const nombre = producto.querySelector('h3').textContent;
                const precio = parseFloat(producto.querySelector('p').textContent.replace('$', ''));
                agregarAlCarrito(nombre, precio);
            });
        });
    });
    // Suavizar el desplazamiento al hacer clic en un enlace de la galería
document.querySelectorAll('.galeria a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


