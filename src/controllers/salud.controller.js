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