import { Strategy } from "passport-local";
import { getUserByEmail, getUserById } from "../db/users.js";
import * as argon2 from "argon2";
import passport from "passport";

export const localStrategy = new Strategy(async (username, password, done) => {
  try {
    const user = await getUserByEmail(username);
    const hashedPassword = user
      ? user.password
      : await argon2.hash(process.env.FALLBACK_HASH_GEN_STRING);
    const isMatched = await argon2.verify(hashedPassword, password);

    if (user && isMatched) {
      return done(null, user);
    }
    return done(null, false, { message: "Invalid login credentials" });
  } catch (err) {
    return done(err);
  }
});

passport.serializeUser((user: SafeUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: SafeUser["id"], done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
