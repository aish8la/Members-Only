import type { RequestHandler } from "express";
import type { RequestAdminPromotion } from "../typings/user.js";
import { UnauthorizedError } from "../errors/customErrors.js";

export const isNewAdmin = (redirect?: string) => {
  const validateNewAdmin: RequestHandler = (req, res, next) => {
    const v = req?.validatedData as RequestAdminPromotion;
    if (!v.isAdmin) {
      return next();
    }
    if (process.env.ADMIN_PASSWORD === v.adminPassword) {
      return next();
    }

    const errMsg =
      "Valid administrator password is required to become and administrator";
    // if redirect string is not provided redirect to error middleware
    if (!redirect) {
      const error = new UnauthorizedError(errMsg);
      return next(error);
    }

    req.session.roleValidationErrors = {
      adminValidation: errMsg,
    };

    req.session.save((err) => {
      if (err) return next(err);

      res.redirect(redirect);
    });
  };
  return validateNewAdmin;
};
