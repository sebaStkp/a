import { pool } from "../db.js";

export const getBebidas_completo = async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, b.volumen, b.alcoholico 
        FROM producto as p JOIN bebidas as b 
        ON p.id_producto = b.id_producto`
    )
    console.log(result[0])
    res.send(result[0])
}

export const agregarBebida = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { nombre, precio, categoria, link, volumen, alcoholico } = req.body;

        // Validar los campos requeridos
        if (!nombre || !precio || !categoria || !link || volumen === undefined || alcoholico === undefined) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Inserción en la tabla productos
        const [productoResult] = await connection.query(
            'INSERT INTO producto (nombre, precio, categoria, link) VALUES (?, ?, ?, ?)',
            [nombre, precio, categoria, link]
        );

        const id_producto = productoResult.insertId;

        // Inserción en la tabla bebidas
        await connection.query(
            'INSERT INTO bebidas (id_producto, volumen, alcoholico) VALUES (?, ?, ?)',
            [id_producto, volumen, alcoholico]
        );

        await connection.commit();
        res.status(201).json({ message: 'Bebida agregada correctamente', id_producto });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al agregar bebida', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const actualizarBebida = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id_producto, nombre, precio, categoria, link, volumen, alcoholico } = req.body;

        // Validar los campos requeridos
        if (!id_producto || !nombre || !precio || !categoria || !link || !volumen || alcoholico === undefined) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Actualizar en la tabla productos
        await connection.query(
            'UPDATE producto SET nombre = ?, precio = ?, categoria = ?, link = ? WHERE id_producto = ?',
            [nombre, precio, categoria, link, id_producto]
        );

        // Actualizar en la tabla bebida
        await connection.query(
            'UPDATE bebidas SET volumen = ?, alcoholico = ? WHERE id_producto = ?',
            [volumen, alcoholico, id_producto]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de bebida actualizado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al actualizar producto de bebida', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const eliminarBebida = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id } = req.params;
        console.log(id);

        // Eliminar de la tabla bebida
        await connection.query(
            'DELETE FROM bebidas WHERE id_producto = ?',
            [id]
        );

        // Eliminar de la tabla productos
        await connection.query(
            'DELETE FROM producto WHERE id_producto = ?',
            [id]
        );

        await connection.commit();
        res.status(200).json({ message: 'Producto de bebida eliminado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al eliminar producto de bebida', error: error.message });
        }
    } finally {
        connection.release();
    }
};
export const getBebida = async (req, res) => {
    const { id } = req.params; // Obtener el ID desde los parámetros de la solicitud
    try {
        const result = await pool.query(
            `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, b.volumen, b.alcoholico 
            FROM producto as p 
            JOIN bebidas as b ON p.id_producto = b.id_producto
            WHERE p.id_producto = ?`, [id]
        );

        if (result.length > 0) {
            res.status(200).json(result[0]); // Enviar el primer elemento del resultado como JSON
        } else {
            res.status(404).json({ message: `No se encontró producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener bebida:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


