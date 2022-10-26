import express from "express";
import cors from "cors";
import UsersRoute from "./routes/UsersRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/users", UsersRoute);

app.listen(5000, () => console.log("Server up and runnig..."));
