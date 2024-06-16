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