import type { RequestHandler } from "express";
import {
  matchedData,
  validationResult,
  type ValidationChain,
} from "express-validator";

export const setUpValidator = (
  schema: ValidationChain[],
  errorRedirect: string
) => {
  const validationMiddleware: RequestHandler = async (req, res, next) => {
    await Promise.all(schema.map((v) => v.run(req)));
    const validatedData = matchedData(req, {
      onlyValidData: true,
      includeOptionals: true,
    });
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      req.validatedData = validatedData;
      return next();
    }
    req.session.formErrors = errors.mapped();
    req.session.formData = validatedData;
    return req.session.save((err) => {
      if (err) return next(err);
      res.redirect(errorRedirect);
    });
  };
  return validationMiddleware;
};
