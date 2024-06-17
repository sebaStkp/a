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
