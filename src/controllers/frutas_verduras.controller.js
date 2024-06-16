import { pool } from "../db.js";

export const getFrutas_verduras = async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, f.tipo_producto, f.peso, f.origen 
        FROM producto as p JOIN frutas_verduras as f
        ON p.id_producto = f.id_producto`
    )
    console.log(result[0])
    res.send(result[0])
}
