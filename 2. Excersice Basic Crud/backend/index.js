import express from "express";
import cors from "cors";
import CarRoutes from "./routes/CarRoutes.js";
import MotorcycleRoutes from "./routes/MotorcycleRoutes.js";
import CondtionRoutes from "./routes/ConditionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/cars", CarRoutes);
app.use("/motorcycles", MotorcycleRoutes);
app.use("/conditions", CondtionRoutes);

app.listen(5000, () => console.info("Server up and running..."));
