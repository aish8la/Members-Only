import express from "express";
import * as messageControllers from "../controllers/message.js";
import {
  messageIdValidation,
  newMessageValidation,
} from "../validators/validationChains.js";
import { setUpValidator } from "../middleware/validate.js";
import { notFoundError } from "../middleware/error.js";
import { checkAuthStatus } from "../middleware/auth.js";
const router = express.Router();

router
  .route("/new")
  .get(messageControllers.getNew)
  .post(
    setUpValidator(newMessageValidation, "/message/new"),
    messageControllers.postNew
  );

router
  .route("/:messageId/delete")
  .all(
    checkAuthStatus().isAdmin(),
    setUpValidator(messageIdValidation, notFoundError)
  )
  .get(messageControllers.getDelete)
  .post(messageControllers.postDelete);

export default router;
