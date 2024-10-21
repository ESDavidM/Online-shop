const { agregarAlCarrito, eliminarProducto, realizarCompra } = require('./js/carrito.js');

describe('Carrito de Compras', () => {
  let carrito;

  beforeEach(() => {
    
    carrito = [];
    global.alert = jest.fn(); 
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify(carrito)),
        setItem: jest.fn((key, value) => {
          carrito = JSON.parse(value);
        }),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  test('Agregar un producto al carrito', () => {
    agregarAlCarrito('Silla Moderna', 50);
    
    
    expect(carrito).toHaveLength(1);
    expect(carrito[0].nombre).toBe('Silla Moderna');
  });

  test('Eliminar un producto del carrito', () => {
    agregarAlCarrito('Silla Moderna', 50);
    eliminarProducto('Silla Moderna');

    
    expect(carrito).toHaveLength(0);
  });

  test('Realizar una compra vacía el carrito', () => {
    agregarAlCarrito('Silla Moderna', 50);
    realizarCompra();

    
    expect(carrito).toHaveLength(0);
  });
});
