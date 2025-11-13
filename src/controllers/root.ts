import type express from "express";

export const getHome: express.RequestHandler = (req, res) => {
  const authenticated = req.isAuthenticated();
  if (!authenticated) {
    return res.redirect("/auth/login");
  }
  res.render("index", {
    isAuthenticated: authenticated,
    currentUser: req.user,
  });
};
