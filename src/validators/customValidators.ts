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

export const isCurrentUser: CustomValidator = async (value, { req }) => {
  if (!req.user) return Promise.reject("User not logged in.");
  if (value === req.user.id) return Promise.resolve(true);
  return Promise.reject("Cannot modify other users.");
};

export const isPassphraseValid: CustomValidator = async (value) => {
  if (value === process.env.MEMBER_PASSPHRASE) return Promise.resolve(true);
  return Promise.reject("Passphrase is invalid.");
};
