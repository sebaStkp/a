import { pool } from "../db.js";

export const getBebidas_completo = async (req, res) => {
    const result = await pool.query(
        `SELECT p.id_producto, p.nombre, p.precio, p.categoria, p.link, b.volumen, b.alcoholico 
        FROM producto as p JOIN bebidas as b 
        ON p.id_producto = b.id_producto`
    )
    console.log(result[0])
    res.send(result[0])
}




