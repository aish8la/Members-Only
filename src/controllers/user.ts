import type { RequestHandler } from "express";
import { setMember } from "../db/users.js";
import { BadRequestError, UnauthorizedError } from "../errors/customErrors.js";
import { getFormErrors } from "../utils/utility.js";

export const getUserJoin: RequestHandler = (req, res) => {
  const [formData, formErrors, roleValidationErrors] = getFormErrors(req);
  res.render("user/joinClub", {
    formData,
    formErrors,
    roleValidationErrors,
  });
};

export const postUserJoin: RequestHandler = async (req, res, next) => {
  if (!req?.user) {
    const err = new UnauthorizedError();
    return next(err);
  }

  if (req.user.isMember) {
    const err = new BadRequestError("User is already a member of the club");
    return next(err);
  }

  await setMember(req.user.id);
  res.redirect("/");
};
