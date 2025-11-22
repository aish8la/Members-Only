import type { RequestHandler } from "express";
import * as db from "../db/message.js";
import type {
  MessageFormValidated,
  MessageIdValidated,
} from "../types/appTypes.js";
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

export const getDelete: RequestHandler = async (req, res) => {
  const v = req.validatedData as MessageIdValidated;
  res.render("confirmDelete", {
    title: "Delete Message",
    prompt: "Are you sure you want to delete this message ?",
    path: req.baseUrl + "/" + v.messageId + "/delete",
  });
};

export const postDelete: RequestHandler = async (req, res, next) => {
  const v = req.validatedData as MessageIdValidated;
  const { rowCount } = await db.deleteMessage(v.messageId);
  if (rowCount !== 1) {
    const err = new Error("Something Unexpected happened");
    return next(err);
  }
  return res.redirect("/");
};
