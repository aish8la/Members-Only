import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./database.js";

const PGStore = connectPgSimple(session);
const isProduction = process.env.NODE_ENV === "production";

export default session({
  secret: process.env.SESSION_SECRET || "secret",
  store: new PGStore({
    pool: pool,
    createTableIfMissing: true,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: isProduction,
    secure: isProduction,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});
