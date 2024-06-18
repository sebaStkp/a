import { pool } from "../db.js";

export const getRopa= async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, r.tipo_ropa, r.talla
        FROM producto as p JOIN ropa as r
        ON p.id_producto = r.id_producto`
    )
    console.log(result[0])
    res.send(result[0])
}

export const agregarRopa = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { nombre, precio, categoria, link, tipo_ropa, talla } = req.body;

        // Validar los campos requeridos
        if (!nombre || !precio || !categoria || !link || !tipo_ropa || !talla) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Inserción en la tabla productos
        const [productoResult] = await connection.query(
            'INSERT INTO producto (nombre, precio, categoria, link) VALUES (?, ?, ?, ?)',
            [nombre, precio, categoria, link]
        );

        const id_producto = productoResult.insertId;

        // Inserción en la tabla ropa
        await connection.query(
            'INSERT INTO ropa (id_producto, tipo_ropa, talla) VALUES (?, ?, ?)',
            [id_producto, tipo_ropa, talla]
        );

        await connection.commit();
        res.status(201).json({ message: 'Ropa agregada correctamente', id_producto });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al agregar ropa', error: error.message });
        }
    } finally {
        connection.release();
    }
};
export const actualizarRopa = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id_producto, nombre, precio, categoria, link, tipo_ropa, talla } = req.body;

        // Validar los campos requeridos
        if (!id_producto || !nombre || !precio || !categoria || !link || !tipo_ropa || !talla) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Actualizar en la tabla productos
        await connection.query(
            'UPDATE producto SET nombre = ?, precio = ?, categoria = ?, link = ? WHERE id_producto = ?',
            [nombre, precio, categoria, link, id_producto]
        );

        // Actualizar en la tabla ropas
        await connection.query(
            'UPDATE ropa SET tipo_ropa = ?, talla = ? WHERE id_producto = ?',
            [tipo_ropa, talla, id_producto]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de ropa actualizado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al actualizar producto de ropa', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const eliminarRopa = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id } = req.params;

        // Eliminar de la tabla ropas
        await connection.query(
            'DELETE FROM ropa WHERE id_producto = ?',
            [id]
        );

        // Eliminar de la tabla productos
        await connection.query(
            'DELETE FROM producto WHERE id_producto = ?',
            [id]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de ropa eliminado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al eliminar producto de ropa', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const getR = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, r.tipo_ropa, r.talla 
            FROM producto as p 
            JOIN ropa as r ON p.id_producto = r.id_producto
            WHERE p.id_producto = ?`, [id]
        );

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: `No se encontró producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener ropa:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
