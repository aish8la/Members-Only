import type { CustomValidator } from "express-validator";
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

export const isPassphraseValid: CustomValidator = ({ req }) => {
  if (req.body?.passphrase === process.env.MEMBER_PASSPHRASE) {
    return true;
  } else {
    return false;
  }
};

export const isAdminPassValid: CustomValidator = ({ req }) => {
  if (req.body?.adminPassword === process.env.ADMIN_PASSWORD) {
    return true;
  } else {
    return false;
  }
};
