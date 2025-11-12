import type express from "express";

export const getHome: express.RequestHandler = (req, res) => {
  const authenticated = req.isAuthenticated();
  if (!authenticated) {
    return res.redirect("/log-in");
  }
  res.render("index", {
    isAuthenticated: authenticated,
    currentUser: req.user,
  });
};
