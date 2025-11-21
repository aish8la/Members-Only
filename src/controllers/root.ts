import type express from "express";
import { formatDistanceToNowStrict } from "date-fns";
import { getAllMessages } from "../db/message.js";

export const getHome: express.RequestHandler = async (req, res) => {
  const authenticated = req.isAuthenticated();
  const messages = await getAllMessages();

  res.render("index", {
    isAuthenticated: authenticated,
    messages: messages,
    formatDistanceToNowStrict: formatDistanceToNowStrict,
    currentUser: req.user,
  });
};
