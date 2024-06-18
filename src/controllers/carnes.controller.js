import { pool } from "../db.js";

export const getCarnes_completo = async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, c.tipo_carne, c.peso, c.fecha_expiracion 
        FROM producto as p JOIN carnes as c
        ON p.id_producto = c.id_producto`
    )
    console.log(result[0])
    res.send(result[0])
}

export const agregarCarne = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { nombre, precio, categoria, link, tipo_carne, peso, fecha_expiracion } = req.body;

        // Validar los campos requeridos
        if (!nombre || !precio || !categoria || !link || !tipo_carne || !peso || !fecha_expiracion) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Inserción en la tabla productos
        const [productoResult] = await connection.query(
            'INSERT INTO producto (nombre, precio, categoria, link) VALUES (?, ?, ?, ?)',
            [nombre, precio, categoria, link]
        );

        const id_producto = productoResult.insertId;

        // Inserción en la tabla carnes
        await connection.query(
            'INSERT INTO carnes (id_producto, tipo_carne, peso, fecha_expiracion) VALUES (?, ?, ?, ?)',
            [id_producto, tipo_carne, peso, fecha_expiracion]
        );

        await connection.commit();
        res.status(201).json({ message: 'Carne agregada correctamente', id_producto });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al agregar carne', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const actualizarCarne = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id_producto, nombre, precio, categoria, link, tipo_carne, peso, fecha_expiracion } = req.body;

        // Validar los campos requeridos
        if (!id_producto || !nombre || !precio || !categoria || !link || !tipo_carne || !peso || !fecha_expiracion) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Actualizar en la tabla productos
        await connection.query(
            'UPDATE producto SET nombre = ?, precio = ?, categoria = ?, link = ? WHERE id_producto = ?',
            [nombre, precio, categoria, link, id_producto]
        );

        // Actualizar en la tabla carne
        await connection.query(
            'UPDATE carnes SET tipo_carne = ?, peso = ?, fecha_expiracion = ? WHERE id_producto = ?',
            [tipo_carne, peso, fecha_expiracion, id_producto]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de carne actualizado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al actualizar producto de carne', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const eliminarCarne = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id } = req.params;
        console.log(id);

        // Eliminar de la tabla carne
        await connection.query(
            'DELETE FROM carnes WHERE id_producto = ?',
            [id]
        );

        // Eliminar de la tabla productos
        await connection.query(
            'DELETE FROM producto WHERE id_producto = ?',
            [id]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de carne eliminado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al eliminar producto de carne', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const getCarne = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, c.tipo_carne, c.peso 
            FROM producto as p 
            JOIN carnes as c ON p.id_producto = c.id_producto
            WHERE p.id_producto = ?`, [id]
        );

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: `No se encontró producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener carne:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
