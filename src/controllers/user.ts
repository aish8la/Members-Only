import type { RequestHandler } from "express";
import { setMember } from "../db/users.js";
import type { UserRequestParamValidated } from "../typings/user.js";

export const postUserJoin: RequestHandler = async (req, res, next) => {
  if (!req?.user || req.user?.isMember) {
    const err = new Error("Invalid Request.");
    return next(err);
  }
  const v = req.validatedData as UserRequestParamValidated;
  await setMember(v.userId);
  res.redirect("/");
};
