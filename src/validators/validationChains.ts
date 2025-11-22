import * as chain from "./inputFields.js";

export const signUpValidation = [
  chain.vFirstName,
  chain.vLastName,
  chain.vEmail,
  chain.vNewPassword,
  chain.vConfirmPassword,
  chain.vIsMember,
  chain.vIsAdmin,
  chain.vAdminPassword,
];

export const joinClubValidation = [chain.vClubPassphrase];

export const newMessageValidation = [chain.vMessage];

export const messageIdValidation = [chain.vMessagePath];
