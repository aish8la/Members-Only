import express from "express";
import * as db from "../db/users.js";
import * as argon2 from "argon2";

export const getSignUp: express.RequestHandler = (req, res) => {
  res.render("authentication/signup");
};

export const postSignUp: express.RequestHandler = async (req, res, next) => {
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
  res.redirect("/log-in");
};
