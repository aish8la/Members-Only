import type { RequestHandler } from "express";
import { setMember } from "../db/users.js";
import { BadRequestError, UnauthorizedError } from "../errors/customErrors.js";

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
