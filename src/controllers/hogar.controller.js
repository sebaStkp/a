import { pool } from "../db.js";

export const getHogar= async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, h.tipo_producto, h.cantidad
        FROM producto as p JOIN hogar as h
        ON p.id_producto = h.id_producto`
    )
    res.send(result[0])
}

export const agregarHogar = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { nombre, precio, categoria, link, tipo_producto, cantidad } = req.body;

        // Validar los campos requeridos
        if (!nombre || !precio || !categoria || !link || !tipo_producto || !cantidad) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Inserción en la tabla productos
        const [productoResult] = await connection.query(
            'INSERT INTO producto (nombre, precio, categoria, link) VALUES (?, ?, ?, ?)',
            [nombre, precio, categoria, link]
        );

        const id_producto = productoResult.insertId;

        // Inserción en la tabla hogar
        await connection.query(
            'INSERT INTO hogar (id_producto, tipo_producto, cantidad) VALUES (?, ?, ?)',
            [id_producto, tipo_producto, cantidad]
        );

        await connection.commit();
        res.status(201).json({ message: 'Producto de hogar agregado correctamente', id_producto });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al agregar producto de hogar', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const actualizarHogar = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id_producto, nombre, precio, categoria, link, tipo_producto, cantidad } = req.body;

        // Validar los campos requeridos
        if (!id_producto || !nombre || !precio || !categoria || !link || !tipo_producto || !cantidad) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Actualizar en la tabla productos
        await connection.query(
            'UPDATE producto SET nombre = ?, precio = ?, categoria = ?, link = ? WHERE id_producto = ?',
            [nombre, precio, categoria, link, id_producto]
        );

        // Actualizar en la tabla hogar
        await connection.query(
            'UPDATE hogar SET tipo_producto = ?, cantidad = ? WHERE id_producto = ?',
            [tipo_producto, cantidad, id_producto]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de hogar actualizado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al actualizar producto de hogar', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const eliminarHogar = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id } = req.params;
        console.log(id)

        // Eliminar de la tabla hogar
        await connection.query(
            'DELETE FROM hogar WHERE id_producto = ?',
            [id]
        );

        // Eliminar de la tabla productos
        await connection.query(
            'DELETE FROM producto WHERE id_producto = ?',
            [id]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de hogar eliminado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al eliminar producto de hogar', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const getUniHogar = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, h.tipo_producto, h.cantidad 
            FROM producto as p 
            JOIN hogar as h ON p.id_producto = h.id_producto
            WHERE p.id_producto = ?`, [id]
        );

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: `No se encontró producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener producto de hogar:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
