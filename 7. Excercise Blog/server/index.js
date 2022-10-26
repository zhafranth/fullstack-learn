import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import fileUpload from "express-fileupload";
import SequlizeStore from "connect-session-sequelize";
import db from "./config/Database.js";

// Route
import UserRoute from "./routes/UserRoute.js";
import ArticleRoute from "./routes/ArticleRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

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
app.use(express.static("public")); //agar url images bisa diakses dari luar
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
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
app.use(fileUpload());

// Route
app.use("/users", UserRoute);
app.use("/articles", ArticleRoute);
app.use("/category", CategoryRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => console.log("server up and running..."));
