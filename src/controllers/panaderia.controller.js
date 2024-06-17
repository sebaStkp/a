import { pool } from "../db.js";

export const getPanaderia= async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, pan.tipo_producto, pan.fecha_elaboracion
        FROM producto as p JOIN panaderia as pan
        ON p.id_producto = pan.id_producto`
    )
    console.log(result[0])
    res.send(result[0])
}

export const agregarPanaderia = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { nombre, precio, categoria, link, tipo_producto, fecha_elaboracion } = req.body;

        // Validar los campos requeridos
        if (!nombre || !precio || !categoria || !link || !tipo_producto || !fecha_elaboracion) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Inserción en la tabla productos
        const [productoResult] = await connection.query(
            'INSERT INTO producto (nombre, precio, categoria, link) VALUES (?, ?, ?, ?)',
            [nombre, precio, categoria, link]
        );

        const id_producto = productoResult.insertId;

        // Inserción en la tabla panaderia
        await connection.query(
            'INSERT INTO panaderia (id_producto, tipo_producto, fecha_elaboracion) VALUES (?, ?, ?)',
            [id_producto, tipo_producto, fecha_elaboracion]
        );

        await connection.commit();
        res.status(201).json({ message: 'Producto de panadería agregado correctamente', id_producto });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al agregar producto de panadería', error: error.message });
        }
    } finally {
        connection.release();
    }
};
