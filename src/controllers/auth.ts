import type express from "express";

export const getLogin: express.RequestHandler = (req, res) => {
  const authenticated = req.isAuthenticated();
  if (!authenticated) {
    return res.render("authentication/login");
  }
  res.redirect("/");
};
