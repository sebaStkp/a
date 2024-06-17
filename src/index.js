import express from "express";
import cors from "cors";
import clientRoutes from "./routes/client.routes.js";
import bebidasRoutes from "./routes/bebidas.routes.js";
import carnesRoutes from "./routes/carnes.routes.js";
import cosmeticosRoutes from "./routes/consmetico.routes.js";
import frutas_verdurasRoutes from "./routes/frutas_verduras.routes.js";
import hogarRoutes from "./routes/hogar.routes.js";
import lacteosRoutes from "./routes/lacteos.routes.js";
import panaderiaRoutes from "./routes/panaderia.routes.js";
import ropaRoutes from "./routes/ropa.routes.js";
import medicinaRoutes from "./routes/salud.routes.js";
import snacksRoutes from "./routes/snacks.routes.js";

const app = express();


app.use(cors({
    origin: 'http://localhost:4200',
}));


// Define tus rutas
app.use(clientRoutes);
app.use(bebidasRoutes);
app.use(carnesRoutes);
app.use(cosmeticosRoutes);
app.use(frutas_verdurasRoutes);
app.use(hogarRoutes);
app.use(lacteosRoutes);
app.use(panaderiaRoutes);
app.use(ropaRoutes);
app.use(medicinaRoutes);
app.use(snacksRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
