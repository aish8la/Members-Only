import type { RequestHandler } from "express";
import {
  matchedData,
  validationResult,
  type ValidationChain,
} from "express-validator";

/**
 * Run the Validation chains in the provided array and store validated data and errors in
 * session, before redirecting to specified path or running the given function
 *
 * @param { ValidationChain[] } schema - An array of validation chains to run
 * @param { string | RequestHandler } errorRedirect - Either a string representing the redirect path or middleware function to run in case of validation error
 *
 */
export const setUpValidator = (
  schema: ValidationChain[],
  errorRedirect: string | RequestHandler
) => {
  const validationMiddleware: RequestHandler = async (req, res, next) => {
    for (const v of schema) {
      await v.run(req);
    }
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

    if (typeof errorRedirect === "function") {
      return req.session.save((err) => {
        if (err) return next(err);
        return errorRedirect(req, res, next);
      });
    }

    return req.session.save((err) => {
      if (err) return next(err);
      res.redirect(errorRedirect);
    });
  };
  return validationMiddleware;
};
