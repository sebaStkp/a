import { pool } from "../db.js";

export const getPanaderia= async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, pan.tipo_producto, pan.fecha_elaboracion
        FROM producto as p JOIN panaderia as pan
        ON p.id_producto = pan.id_producto`
    )
    console.log(result[0])
    res.send(result[0])
}