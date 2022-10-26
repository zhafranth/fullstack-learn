import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import SequlizeStore from "connect-session-sequelize";
import db from "./config/Database.js";

dotenv.config();

const app = express();

const sessionStore = SequlizeStore(session.Store);
const store = new sessionStore({
  db,
});

// (async () => {
//   await db.sync();
// })();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true, // agar frontend dapat mengirimkan request beserta cookie dengan menyertakan credentialnya
    origin: "http://localhost:3000", // domain yang dizin untuk mengakses domain kita, apabila banyak yg dapaat mengakses dapat menggunakan array string
  })
);

app.use("/users", UserRoute);
app.use("/products", ProductRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, console.log("Server up and running..."));
