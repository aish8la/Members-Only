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
