import type { RequestHandler } from "express";
import {
  matchedData,
  validationResult,
  type ValidationChain,
} from "express-validator";

export const setUpValidator = (schema: ValidationChain[]) => {
  const validationMiddleware: RequestHandler = async (req, res, next) => {
    await Promise.all(schema.map((v) => v.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      req.validatedData = matchedData(req, {
        onlyValidData: true,
        includeOptionals: true,
      });
      return next();
    }
    const errorMessages = errors.array();
    return res.json(errorMessages);
  };
  return validationMiddleware;
};
