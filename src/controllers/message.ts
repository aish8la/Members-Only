import type { RequestHandler } from "express";
import * as db from "../db/message.js";
import type { MessageFormValidated } from "../types/appTypes.js";
import { UnauthorizedError } from "../errors/customErrors.js";
import { getFormErrors } from "../utils/utility.js";

export const getNew: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    const err = new UnauthorizedError();
    return next(err);
  }
  const [formData, formErrors] = getFormErrors(req);

  res.render("message/messageForm", {
    title: "Post Message",
    formData,
    formErrors,
  });
};

export const postNew: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    const err = new UnauthorizedError();
    return next(err);
  }
  const v = req.validatedData as MessageFormValidated;
  const { rowCount } = await db.addMessage({
    authorId: req.user.id,
    message: v.message,
  });
  if (rowCount !== 1) {
    const err = new Error("Something Unexpected happened");
    return next(err);
  }
  res.redirect("/");
};
