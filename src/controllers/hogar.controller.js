import { pool } from "../db.js";

export const getHogar= async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, h.tipo_producto, h.cantidad
        FROM producto as p JOIN hogar as h
        ON p.id_producto = h.id_producto`
    )
    console.log(result[0])
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


