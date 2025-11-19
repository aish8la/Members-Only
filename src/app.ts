import "./config/envConfig.js";
import { fileURLToPath } from "node:url";
import path from "node:path";
import express from "express";
import passport from "passport";
import session from "./config/session.js";
import { localStrategy } from "./config/passportConfig.js";
import router from "./routes/index.js";
import { errorMiddleware } from "./middleware/error.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
passport.use(localStrategy);
app.use(session);
app.use(passport.session());
app.use(router);
app.use(errorMiddleware);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server listening on port ${PORT}`);
});
