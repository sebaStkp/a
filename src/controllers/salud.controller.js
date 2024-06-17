import { pool } from "../db.js";

export const getMedicina= async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, m.tipo_producto, m.dosis, m.fecha_expiracion
        FROM producto as p JOIN salud_medicamentos as m
        ON p.id_producto = m.id_producto`
    )
    console.log(result[0])
    res.send(result[0])
}

export const agregarMedicina = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { nombre, precio, categoria, link, tipo_producto, dosis, fecha_expiracion } = req.body;

        // Validar los campos requeridos
        if (!nombre || !precio || !categoria || !link || !tipo_producto || !dosis || !fecha_expiracion) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Inserción en la tabla productos
        const [productoResult] = await connection.query(
            'INSERT INTO producto (nombre, precio, categoria, link) VALUES (?, ?, ?, ?)',
            [nombre, precio, categoria, link]
        );

        const id_producto = productoResult.insertId;

        // Inserción en la tabla salud_medicamentos
        await connection.query(
            'INSERT INTO salud_medicamentos (id_producto, tipo_producto, dosis, fecha_expiracion) VALUES (?, ?, ?, ?)',
            [id_producto, tipo_producto, dosis, fecha_expiracion]
        );

        await connection.commit();
        res.status(201).json({ message: 'Salud/Medicamento agregado correctamente', id_producto });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al agregar salud/medicamento', error: error.message });
        }
    } finally {
        connection.release();
    }
};
