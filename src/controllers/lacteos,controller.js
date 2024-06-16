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

