import type express from "express";

export const getSignUp: express.RequestHandler = (req, res) => {
  res.render("authentication/signup");
};
