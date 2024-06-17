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




