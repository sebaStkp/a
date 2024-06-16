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

