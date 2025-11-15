import { body } from "express-validator";
import { confirmPassword, isEmailAvailable } from "./customValidators.js";

export const vFirstName = body("firstName")
  .trim()
  .isAlpha()
  .withMessage("First Name must only contain letters.")
  .isLength({ min: 1, max: 20 })
  .withMessage("First Name must be between 1 and 20 characters.");

export const vLastName = body("lastName")
  .trim()
  .default(null)
  .if(body("lastName").exists({ values: "falsy" }))
  .isAlpha()
  .withMessage("Last Name must only contain letters.")
  .isLength({ min: 1, max: 20 })
  .withMessage("Last Name must be between 1 and 20 characters.");

export const vEmail = body("username")
  .trim()
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Email must be a valid email address")
  .bail()
  .normalizeEmail({ all_lowercase: true })
  .custom(isEmailAvailable)
  .withMessage("User with this email already exist");

export const vNewPassword = body("password")
  .matches(/^\S+$/)
  .withMessage("Must not contain spaces")
  .isLength({ min: 6, max: 25 })
  .withMessage("Password must be between 6 to 20 characters.")
  .hide("******");

export const vConfirmPassword = body("confirmPassword")
  .if(body("password").notEmpty())
  .custom(confirmPassword)
  .withMessage("Confirmation Password does not match")
  .hide("******");
