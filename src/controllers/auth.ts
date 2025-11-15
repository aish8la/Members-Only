import type express from "express";
import * as db from "../db/users.js";
import * as argon2 from "argon2";
import type { NewUser } from "../typings/user.js";

export const getSignup: express.RequestHandler = (req, res) => {
  res.render("authentication/signup");
};

export const postSignup: express.RequestHandler = async (req, res, next) => {
  const userData = req.validatedData as NewUser;
  const { rowCount } = await db.addUser({
    ...userData,
    password: await argon2.hash(userData.password),
  });
  if (rowCount !== 1) {
    const err = new Error("Something Unexpected happened");
    return next(err);
  }
  res.redirect("/auth/login");
};

export const getLogin: express.RequestHandler = (req, res) => {
  const authenticated = req.isAuthenticated();
  if (!authenticated) {
    return res.render("authentication/login");
  }
  res.redirect("/");
};

export const postLogout: express.RequestHandler = (req, res, next) => {
  const authenticated = req.isAuthenticated();
  if (!authenticated) {
    return res.render("authentication/login");
  }
  req.logOut((err) => {
    if (err) return next(err);
    res.redirect("/auth/login");
  });
};
