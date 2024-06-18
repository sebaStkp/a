import { pool } from "../db.js";

export const getFrutas_verduras = async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, f.tipo_producto, f.peso, f.origen 
        FROM producto as p JOIN frutas_verduras as f
        ON p.id_producto = f.id_producto`
    )
    console.log(result[0])
    res.send(result[0])
}

export const agregarFrutaVerdura = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { nombre, precio, categoria, link, tipo_producto, peso, origen } = req.body;

        // Validar los campos requeridos
        if (!nombre || !precio || !categoria || !link || !tipo_producto || !peso || !origen) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Inserción en la tabla productos
        const [productoResult] = await connection.query(
            'INSERT INTO producto (nombre, precio, categoria, link) VALUES (?, ?, ?, ?)',
            [nombre, precio, categoria, link]
        );

        const id_producto = productoResult.insertId;

        // Inserción en la tabla frutas_verduras
        await connection.query(
            'INSERT INTO frutas_verduras (id_producto, tipo_producto, peso, origen) VALUES (?, ?, ?, ?)',
            [id_producto, tipo_producto, peso, origen]
        );

        await connection.commit();
        res.status(201).json({ message: 'Fruta/Verdura agregada correctamente', id_producto });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al agregar fruta/verdura', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const actualizarFrutaVerdura = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id_producto, nombre, precio, categoria, link, tipo_producto, peso, origen } = req.body;

        // Validar los campos requeridos
        if (!id_producto || !nombre || !precio || !categoria || !link || !tipo_producto || !peso || !origen) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Actualizar en la tabla productos
        await connection.query(
            'UPDATE producto SET nombre = ?, precio = ?, categoria = ?, link = ? WHERE id_producto = ?',
            [nombre, precio, categoria, link, id_producto]
        );

        // Actualizar en la tabla frutas_verduras
        await connection.query(
            'UPDATE frutas_verduras SET tipo_producto = ?, peso = ?, origen = ? WHERE id_producto = ?',
            [tipo_producto, peso, origen, id_producto]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de fruta o verdura actualizado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al actualizar producto de fruta o verdura', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const eliminarFrutaVerdura = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id } = req.params;

        // Eliminar de la tabla frutas_verduras
        await connection.query(
            'DELETE FROM frutas_verduras WHERE id_producto = ?',
            [id]
        );

        // Eliminar de la tabla productos
        await connection.query(
            'DELETE FROM producto WHERE id_producto = ?',
            [id]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de fruta o verdura eliminado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al eliminar producto de fruta o verdura', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const getFruta = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, fv.tipo_producto, fv.peso, fv.origen 
            FROM producto as p 
            JOIN frutas_verduras as fv ON p.id_producto = fv.id_producto
            WHERE p.id_producto = ?`, [id]
        );

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: `No se encontró producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener fruta o verdura:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
