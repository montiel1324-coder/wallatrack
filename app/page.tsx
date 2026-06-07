'use client';

import { useState, useEffect } from 'react'; 

export default function Home() {
  const [producto, setProducto] = useState({
    
    nombre: '',
    precioCompra: '',
    precioVenta: '',
  });

  const [productos, setProductos] = useState<any[]>([]);
useEffect(() => {
  const productosGuardados = localStorage.getItem('productos');

  if (productosGuardados) {
    setProductos(JSON.parse(productosGuardados));
  }
}, []);

useEffect(() => {
  localStorage.setItem('productos', JSON.stringify(productos));
}, [productos]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const agregarProducto = (e: React.FormEvent) => {
    e.preventDefault();

    setProductos([...productos, producto]);

    setProducto({
      nombre: '',
      precioCompra: '',
      precioVenta: '',
    });
  };

  return (
    <main style={{ padding: '30px', maxWidth: '600px', margin: 'auto' }}>
      <h1>WallaTrack</h1>

      <h2>Agregar Producto</h2>

      <form onSubmit={agregarProducto}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={producto.nombre}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="number"
          name="precioCompra"
          placeholder="Precio de compra"
          value={producto.precioCompra}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="number"
          name="precioVenta"
          placeholder="Precio de venta"
          value={producto.precioVenta}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit">
          Guardar Producto
        </button>
      </form>

      <hr />

      <h2>Productos Guardados</h2>

      {productos.map((p, index) => (
       <div key={index}>
  <strong>{p.nombre}</strong>

  <p>Compra: {p.precioCompra} €</p>

  <p>Venta: {p.precioVenta} €</p>

  <p>
    Beneficio: {Number(p.precioVenta) - Number(p.precioCompra)} €
  </p>

  <hr />
</div> 
      ))}
    </main>
  );
}
