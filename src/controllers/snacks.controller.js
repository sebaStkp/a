import { pool } from "../db.js";

export const getSnacks= async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, s.tipo_snack, s.peso
        FROM producto as p JOIN snacks_golosinas as s
        ON p.id_producto = s.id_producto`
    )
    console.log(result[0])
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
