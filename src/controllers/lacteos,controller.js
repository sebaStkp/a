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

