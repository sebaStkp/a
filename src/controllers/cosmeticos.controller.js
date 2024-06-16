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

