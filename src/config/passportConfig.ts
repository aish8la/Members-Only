import { Strategy } from "passport-local";
import { getUserByEmail } from "../db/users.js";
import * as argon2 from "argon2";

export const localStrategy = new Strategy(async (username, password, done) => {
  try {
    const user = await getUserByEmail(username);
    const isMatched = await argon2.verify(
      user?.password ?? process.env.FALLBACK_HASH,
      password
    );

    if (user && isMatched) {
      return done(null, user);
    }
    return done(null, false, { message: "Invalid login credentials" });
  } catch (err) {
    return done(err);
  }
});
