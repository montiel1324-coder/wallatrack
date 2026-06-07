'use client';

import { useState, useEffect } from 'react'; 

export default function Home() {
const [producto, setProducto] = useState({
  nombre: '',
  precioCompra: '',
  precioVenta: '',
  procedencia: '',
  fechaCompra: '',
  fechaVenta: '',
});

  const [productos, setProductos] = useState<any[]>([]);
  const [editando, setEditando] = useState<number | null>(null);
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
const eliminarProducto = (index: number) => {
  const nuevosProductos = productos.filter((_, i) => i !== index);
  setProductos(nuevosProductos);
};
const editarProducto = (index: number) => {
  setProducto(productos[index]);
  setEditando(index);
};
 const agregarProducto = (e: React.FormEvent) => {
  e.preventDefault();

  if (editando !== null) {
    const nuevosProductos = [...productos];
    nuevosProductos[editando] = producto;
    setProductos(nuevosProductos);
    setEditando(null);
  } else {
    setProductos([...productos, producto]);
  }

setProducto({
  nombre: '',
  precioCompra: '',
  precioVenta: '',
  procedencia: '',
  fechaCompra: '',
  fechaVenta: '',
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
  type="text"
  name="procedencia"
  placeholder="Procedencia o lote"
  value={producto.procedencia}
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
  type="date"
  name="fechaCompra"
  value={producto.fechaCompra}
  onChange={handleChange}
  required
/>
        <br />
        <br />
<input
  type="date"
  name="fechaVenta"
  value={producto.fechaVenta}
  onChange={handleChange}
  required
/>
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
<h2>
  Beneficio Total: {
    productos.reduce(
      (total, p) =>
        total + (Number(p.precioVenta) - Number(p.precioCompra)),
      0
    )
  } €
</h2>
<h2>Beneficio por Procedencia</h2>

{Object.entries(
  productos.reduce((acc: any, p: any) => {
    const beneficio =
      Number(p.precioVenta) - Number(p.precioCompra);

    acc[p.procedencia] =
      (acc[p.procedencia] || 0) + beneficio;

    return acc;
  }, {})
).map(([procedencia, beneficio]) => (
  <p key={procedencia}>
    {procedencia}: {beneficio as number} €
  </p>
))}

<hr />
<hr />
      <h2>Productos Guardados</h2>

      {productos.map((p, index) => (
  <div key={index}>
    <strong>{p.nombre}</strong>

    <p>Compra: {p.precioCompra} €</p>

    <p>Venta: {p.precioVenta} €</p>
    <p>Procedencia: {p.procedencia}</p> 
   

<p>Fecha compra: {p.fechaCompra}</p>
<p>Fecha venta: {p.fechaVenta}</p>

<p>
  Días almacenado: {
    Math.floor(
      (
        new Date(p.fechaVenta).getTime() -
        new Date(p.fechaCompra).getTime()
      ) / (1000 * 60 * 60 * 24)
    )
  }
</p>

<p>
  Beneficio: {Number(p.precioVenta) - Number(p.precioCompra)} €
</p>
<button onClick={() => editarProducto(index)}>
  Editar
</button>

<br />
<br />
    <button onClick={() => eliminarProducto(index)}>
      Eliminar
    </button>

 <hr />

</div>
))}

</main>
);
}