import express from "express";
import FileUpload from "express-fileupload";
import Cors from "cors";
import ProductRoutes from "./routes/ProductRoutes.js";

const app = express();

app.use(Cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public")); //agar url images bisa diakses dari luar

app.use("/products", ProductRoutes);

app.listen(5000, () => console.log("Server up and running..."));
