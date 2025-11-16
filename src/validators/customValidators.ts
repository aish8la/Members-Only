import type { CustomSanitizer, CustomValidator } from "express-validator";
import { isEmailUsed } from "../db/users.js";

export const confirmPassword: CustomValidator = (value, { req }) => {
  return req.body.password === value;
};

export const isEmailAvailable: CustomValidator = (value) => {
  return new Promise((res, rej) => {
    isEmailUsed(value).then((isUsed) => {
      if (isUsed) {
        rej(false);
      } else {
        res(true);
      }
    });
  });
};

export const toFalse: CustomSanitizer = () => {
  return false;
};

export const isAdminChecked: CustomValidator = async (value, { req }) => {
  if (!value) return Promise.resolve(true);
  if (!req.body?.adminPassword)
    return Promise.reject("Admin Password is required.");
  if (req.body.adminPassword === process.env.ADMIN_PASSWORD)
    return Promise.resolve(true);
  return Promise.reject("Admin password is invalid");
};
