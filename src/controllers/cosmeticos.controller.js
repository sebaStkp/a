import { pool } from "../db.js";

export const getCosmeticos_completo = async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, c.tipo_cosmetico, c.contenido 
        FROM producto as p JOIN cosmeticos as c
        ON p.id_producto = c.id_producto`
    )
    console.log(result[0])
    res.send(result[0])
}

export const agregarCosmetico = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { nombre, precio, categoria, link, tipo_cosmetico, contenido } = req.body;

        // Validar los campos requeridos
        if (!nombre || !precio || !categoria || !link || !tipo_cosmetico || !contenido) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Inserción en la tabla productos
        const [productoResult] = await connection.query(
            'INSERT INTO producto (nombre, precio, categoria, link) VALUES (?, ?, ?, ?)',
            [nombre, precio, categoria, link]
        );

        const id_producto = productoResult.insertId;
        
        // Inserción en la tabla cosmeticos
        await connection.query(
            'INSERT INTO cosmeticos (id_producto, tipo_cosmetico, contenido) VALUES (?, ?, ?)',
            [id_producto, tipo_cosmetico, contenido]
        );
 

        await connection.commit();
        res.status(201).json({ message: 'Cosmetico agregado correctamente', id_producto });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al agregar cosmetico', error: error.message });
        }
    } finally {
        connection.release();
    }
};


