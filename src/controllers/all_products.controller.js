import { pool } from "../db.js";

export const getAllProducts= async (req, res) => {
    const result = await pool.query(
        `

SELECT 'carne' AS tipo_producto,
       nombre,
       precio,
       categoria,
       link,
       tipo_carne AS tipo_especifico,
       peso,
       fecha_expiracion
FROM carne

UNION ALL

SELECT 'bebida' AS tipo_producto,
       nombre,
       precio,
       categoria,
       link,
       NULL AS tipo_especifico,
       volumen,
       alcoholico
FROM bebida

UNION ALL

SELECT 'cosmetico' AS tipo_producto,
       nombre,
       precio,
       categoria,
       link,
       tipo_cosmetico AS tipo_especifico,
       contenido AS peso_o_contenido,
       NULL AS fecha_expiracion
FROM cosmetico

UNION ALL

SELECT 'frutaverdura' AS tipo_producto,
       nombre,
       precio,
       categoria,
       link,
       tipo_producto AS tipo_especifico,
       peso,
       origen
FROM frutaverdura

UNION ALL

SELECT 'hogar' AS tipo_producto,
       nombre,
       precio,
       categoria,
       link,
       tipo_producto AS tipo_especifico,
       cantidad,
       NULL AS fecha_expiracion
FROM hogar

UNION ALL

SELECT 'lacteo' AS tipo_producto,
       nombre,
       precio,
       categoria,
       link,
       NULL AS tipo_especifico,
       peso,
       fecha_expiracion
FROM lacteo

UNION ALL

SELECT 'panaderia' AS tipo_producto,
       nombre,
       precio,
       categoria,
       link,
       tipo_producto AS tipo_especifico,
       fecha_elaboracion AS fecha_expiracion,
       NULL AS peso
FROM panaderia

UNION ALL

SELECT 'ropa' AS tipo_producto,
       nombre,
       precio,
       categoria,
       link,
       tipo_ropa AS tipo_especifico,
       talla,
       NULL AS fecha_expiracion
FROM ropa

UNION ALL

SELECT 'saludmedicamento' AS tipo_producto,
       nombre,
       precio,
       categoria,
       link,
       tipo_producto AS tipo_especifico,
       dosis,
       fecha_expiracion
FROM saludmedicamento

UNION ALL

SELECT 'snackgolosina' AS tipo_producto,
       nombre,
       precio,
       categoria,
       link,
       tipo_snack AS tipo_especifico,
       peso,
       NULL AS fecha_expiracion
FROM snackgolosina;
`
    )
    console.log(result[0])
    res.send(result[0])
}