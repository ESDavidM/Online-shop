let carrito = [];


function agregarAlCarrito(nombre, precio, descuento = 0) {
    console.log(`Añadiendo al carrito: ${nombre}, $${precio}, Descuento: ${descuento}`);
    const producto = { nombre, precio, descuento };
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
    alert(`${nombre} ha sido añadido al carrito.`);
    actualizarCarrito(); 
    actualizarEnlaceCarrito(); 
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total');
    if (!listaCarrito || !totalElemento) return;

    listaCarrito.innerHTML = ''; 
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
    actualizarEnlaceCarrito(); 
}

function eliminarProducto(nombre) {
    carrito = carrito.filter(producto => producto.nombre !== nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
    actualizarCarrito();
    actualizarEnlaceCarrito(); 
}


function realizarCompra() {
    if (carrito.length === 0) {
        alert("No hay productos en el carrito.");
        return;
    }
    alert("Compra realizada con éxito.");
    carrito = []; 
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
    actualizarCarrito(); 
    actualizarEnlaceCarrito(); 
}

function actualizarEnlaceCarrito() {
    const cartLink = document.getElementById('cart-link');
    if (!cartLink) return;
    
    const numProductos = carrito.length;
    cartLink.textContent = `🛒 Carrito (${numProductos})`;
}


    const btnCompra = document.getElementById('btn-compra');
    if (btnCompra) {
        btnCompra.addEventListener('click', realizarCompra);
    }

    document.addEventListener('DOMContentLoaded', function() {
        carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        actualizarCarrito();
        actualizarEnlaceCarrito(); 
    
        const botonesAgregar = document.querySelectorAll('.agregar-carrito'); 
        botonesAgregar.forEach((boton) => {
            boton.addEventListener('click', function() {
                const producto = this.closest('.producto');
                const nombre = producto.querySelector('h3').textContent;
                const precio = parseFloat(producto.querySelector('p').textContent.replace('$', ''));
                agregarAlCarrito(nombre, precio);
            });
        });
    });
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

module.exports = { agregarAlCarrito, eliminarProducto, realizarCompra };
