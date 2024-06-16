import { pool } from "../db.js";

export const getCarnes_completo = async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, c.tipo_carne, c.peso, c.fecha_expiracion 
        FROM producto as p JOIN carnes as c
        ON p.id_producto = c.id_producto`
    )
    console.log(result[0])
    res.send(result[0])
}

