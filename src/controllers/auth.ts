import type express from "express";
import * as db from "../db/users.js";
import * as argon2 from "argon2";

export const getSignup: express.RequestHandler = (req, res) => {
  res.render("authentication/signup");
};

export const postSignup: express.RequestHandler = async (req, res, next) => {
  const { rowCount } = await db.addUser({
    emailAddress: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: await argon2.hash(req.body.password),
    isMember: false,
    isAdmin: false,
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
