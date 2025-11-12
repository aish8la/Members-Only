import express from "express";
import passport from "passport";

export const authenticate: express.RequestHandler = async (req, res, next) => {
  const passportAuthenticateCb: passport.AuthenticateCallback = (
    err,
    user,
    info
  ) => {
    if (err) return next(err);
    if (!user) {
      return res.render("authentication/login", {
        errors: info,
      });
    }
    /**
     * This is to make sure that session is saved before redirect
     */
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.save((err) => {
        if (err) {
          next(err);
        }
        return res.redirect("/");
      });
    });
  };
  const authenticateFb = passport.authenticate("local", passportAuthenticateCb);
  authenticateFb(req, res, next);
};
