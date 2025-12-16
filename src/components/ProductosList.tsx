import { useEffect, useState } from 'react';
import axios from 'axios';

type Producto = {
    id: number;
    nombre: string;
    precio: number;
};

const ProductosList = () => {
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('/api/productos');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <div>
            <h1>Lista de Productos</h1>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>{producto.nombre} - ${producto.precio}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductosList;
