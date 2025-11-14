import type { CustomValidator } from "express-validator";
import { isEmailUsed } from "../db/users.js";

export const confirmPassword: CustomValidator = (value, { req }) => {
  return req.body.password === value;
};

export const isEmailAvailable: CustomValidator = async (value) => {
  const emailUsed = await isEmailUsed(value);
  return !emailUsed;
};
