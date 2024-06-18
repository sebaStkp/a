import { pool } from "../db.js";

export const getSnacks= async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, s.tipo_snack, s.peso
        FROM producto as p JOIN snacks_golosinas as s
        ON p.id_producto = s.id_producto`
    )
    res.send(result[0])
}

export const agregarSnacks = async (req, res) => {
    const connection = await pool.getConnection();
    console.log("entro aqui")
    try {
        await connection.beginTransaction();

        const { nombre, precio, categoria, link, tipo_snack, peso } = req.body;

        // Validar los campos requeridos
        if (!nombre || !precio || !categoria || !link || !tipo_snack || !peso) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Inserción en la tabla productos
        const [productoResult] = await connection.query(
            'INSERT INTO producto (nombre, precio, categoria, link) VALUES (?, ?, ?, ?)',
            [nombre, precio, categoria, link]
        );

        const id_producto = productoResult.insertId;
        // Inserción en la tabla snacks_golosinas
        await connection.query(
            'INSERT INTO snacks_golosinas (id_producto, tipo_snack, peso) VALUES (?, ?, ?)',
            [id_producto, tipo_snack, peso]
        );

        await connection.commit();
        res.status(201).json({ message: 'Snack/Golosina agregado correctamente', id_producto });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al agregar snack/golosina', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const actualizarSnack = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id_producto, nombre, precio, categoria, link, tipo_snack, peso } = req.body;

        // Validar los campos requeridos
        if (!id_producto || !nombre || !precio || !categoria || !link || !tipo_snack || !peso) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Actualizar en la tabla productos
        await connection.query(
            'UPDATE producto SET nombre = ?, precio = ?, categoria = ?, link = ? WHERE id_producto = ?',
            [nombre, precio, categoria, link, id_producto]
        );

        // Actualizar en la tabla snacks_golosinas
        await connection.query(
            'UPDATE snacks_golosinas SET tipo_snack = ?, peso = ? WHERE id_producto = ?',
            [tipo_snack, peso, id_producto]
        );

        await connection.commit();
        res.status(200).json({ message: 'Snack/golosina actualizado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al actualizar snack/golosina', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const eliminarSnack = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id } = req.params;


        // Eliminar de la tabla snacks_golosinas
        await connection.query(
            'DELETE FROM snacks_golosinas WHERE id_producto = ?',
            [id]
        );

        // Eliminar de la tabla productos
        await connection.query(
            'DELETE FROM producto WHERE id_producto = ?',
            [id]
        );

        await connection.commit();
        res.status(200).json({ message: 'Snack/golosina eliminado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al eliminar snack/golosina', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const getSnack = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, sg.tipo_snack 
            FROM producto as p 
            JOIN snacks_golosinas as sg ON p.id_producto = sg.id_producto
            WHERE p.id_producto = ?`, [id]
        );

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: `No se encontró producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener snack o golosina:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
