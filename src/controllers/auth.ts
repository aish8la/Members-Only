import type express from "express";
import * as db from "../db/users.js";
import * as argon2 from "argon2";
import type { RegisterFormValidated } from "../types/appTypes.js";
import { getFormErrors } from "../utils/utility.js";

export const getSignup: express.RequestHandler = (req, res) => {
  const [formData, formErrors, roleValidationErrors] = getFormErrors(req);
  res.render("authentication/signup", {
    formData,
    formErrors,
    roleValidationErrors,
  });
};

export const postSignup: express.RequestHandler = async (req, res, next) => {
  const v = req.validatedData as RegisterFormValidated;
  const { rowCount } = await db.addUser({
    firstName: v.firstName,
    lastName: v.lastName,
    emailAddress: v.emailAddress,
    password: await argon2.hash(v.password),
    isMember: v.isMember,
    isAdmin: v.isAdmin,
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
