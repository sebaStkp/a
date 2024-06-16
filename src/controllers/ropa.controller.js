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