import { pool } from "../db.js";

export const getClients = async (req, res) => {
    const result = await pool.query('SELECT * FROM cliente')
    console.log(result[0])
    res.send(result[0])
}

