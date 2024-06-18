import { pool } from "../db.js";

export const getPanaderia= async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, pan.tipo_producto, pan.fecha_elaboracion
        FROM producto as p JOIN panaderia as pan
        ON p.id_producto = pan.id_producto`
    )
    console.log(result[0])
    res.send(result[0])
}

export const agregarPanaderia = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { nombre, precio, categoria, link, tipo_producto, fecha_elaboracion } = req.body;

        // Validar los campos requeridos
        if (!nombre || !precio || !categoria || !link || !tipo_producto || !fecha_elaboracion) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Inserción en la tabla productos
        const [productoResult] = await connection.query(
            'INSERT INTO producto (nombre, precio, categoria, link) VALUES (?, ?, ?, ?)',
            [nombre, precio, categoria, link]
        );

        const id_producto = productoResult.insertId;

        // Inserción en la tabla panaderia
        await connection.query(
            'INSERT INTO panaderia (id_producto, tipo_producto, fecha_elaboracion) VALUES (?, ?, ?)',
            [id_producto, tipo_producto, fecha_elaboracion]
        );

        await connection.commit();
        res.status(201).json({ message: 'Producto de panadería agregado correctamente', id_producto });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al agregar producto de panadería', error: error.message });
        }
    } finally {
        connection.release();
    }
};
export const actualizarPanaderia = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id_producto, nombre, precio, categoria, link, tipo_producto, fecha_elaboracion } = req.body;

        // Validar los campos requeridos
        if (!id_producto || !nombre || !precio || !categoria || !link || !tipo_producto || !fecha_elaboracion) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Actualizar en la tabla productos
        await connection.query(
            'UPDATE producto SET nombre = ?, precio = ?, categoria = ?, link = ? WHERE id_producto = ?',
            [nombre, precio, categoria, link, id_producto]
        );

        // Actualizar en la tabla panaderias
        await connection.query(
            'UPDATE panaderia SET tipo_producto = ?, fecha_elaboracion = ? WHERE id_producto = ?',
            [tipo_producto, fecha_elaboracion, id_producto]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de panadería actualizado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al actualizar producto de panadería', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const eliminarPanaderia = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id } = req.params;


        // Eliminar de la tabla panaderias
        await connection.query(
            'DELETE FROM panaderia WHERE id_producto = ?',
            [id]
        );

        // Eliminar de la tabla productos
        await connection.query(
            'DELETE FROM producto WHERE id_producto = ?',
            [id]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de panadería eliminado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al eliminar producto de panadería', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const getPan = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, pa.tipo_producto, pa.fecha_elaboracion 
            FROM producto as p 
            JOIN panaderia as pa ON p.id_producto = pa.id_producto
            WHERE p.id_producto = ?`, [id]
        );

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: `No se encontró producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener producto de panadería:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
