import { pool } from "../db.js";

export const getLacteos= async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, l.peso, l.fecha_expiracion
        FROM producto as p JOIN lacteos as l
        ON p.id_producto = l.id_producto`
    )
    console.log(result[0])
    res.send(result[0])
}

export const agregarLacteos = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { nombre, precio, categoria, link, peso, fecha_expiracion } = req.body;

        // Validar los campos requeridos
        if (!nombre || !precio || !categoria || !link || !fecha_expiracion) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Inserción en la tabla productos
        const [productoResult] = await connection.query(
            'INSERT INTO producto (nombre, precio, categoria, link) VALUES (?, ?, ?, ?)',
            [nombre, precio, categoria, link]
        );

        const id_producto = productoResult.insertId;

        // Inserción en la tabla lacteos
        await connection.query(
            'INSERT INTO lacteos (id_producto, peso, fecha_expiracion) VALUES (?, ?, ?)',
            [id_producto, peso, fecha_expiracion]
        );

        await connection.commit();
        res.status(201).json({ message: 'Lacteo agregado correctamente', id_producto });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al agregar lacteo', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const actualizarLacteo = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id_producto, nombre, precio, categoria, link, peso, fecha_expiracion } = req.body;

        // Validar los campos requeridos
        if (!id_producto || !nombre || !precio || !categoria || !link || !fecha_expiracion) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Actualizar en la tabla productos
        await connection.query(
            'UPDATE producto SET nombre = ?, precio = ?, categoria = ?, link = ? WHERE id_producto = ?',
            [nombre, precio, categoria, link, id_producto]
        );

        // Actualizar en la tabla lacteos
        await connection.query(
            'UPDATE lacteos SET peso = ?, fecha_expiracion = ? WHERE id_producto = ?',
            [peso, fecha_expiracion, id_producto]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de lácteo actualizado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al actualizar producto de lácteo', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const eliminarLacteo = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id } = req.params;

        // Eliminar de la tabla lacteos
        await connection.query(
            'DELETE FROM lacteos WHERE id_producto = ?',
            [id]
        );

        // Eliminar de la tabla productos
        await connection.query(
            'DELETE FROM producto WHERE id_producto = ?',
            [id]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de lácteo eliminado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al eliminar producto de lácteo', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const getlacteo = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, l.peso, l.fecha_expiracion 
            FROM producto as p 
            JOIN lacteos as l ON p.id_producto = l.id_producto
            WHERE p.id_producto = ?`, [id]
        );

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: `No se encontró producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener lácteo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
