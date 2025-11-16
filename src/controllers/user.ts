import type { RequestHandler } from "express";
import { setMember } from "../db/users.js";

export const postUserJoin: RequestHandler = async (req, res, next) => {
  if (!req?.user || req.user?.isMember) {
    const err = new Error("Invalid Request.");
    return next(err);
  }
  const userId = req.body.validatedData.userId as number;
  await setMember(userId);
  res.redirect("/");
};
