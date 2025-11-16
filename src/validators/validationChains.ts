import * as user from "./userFields.js";

export const signUpValidation = [
  user.vFirstName,
  user.vLastName,
  user.vEmail,
  user.vNewPassword,
  user.vConfirmPassword,
  user.vIsMember,
  user.vIsAdmin,
];

export const joinClubValidation = [user.visCurrentUser, user.vClubPassphrase];
