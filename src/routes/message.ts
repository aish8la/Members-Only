import express from "express";
import * as messageControllers from "../controllers/message.js";
import { newMessageValidation } from "../validators/validationChains.js";
import { setUpValidator } from "../middleware/validate.js";
const router = express.Router();

router
  .route("/new")
  .get(messageControllers.getNew)
  .post(
    setUpValidator(newMessageValidation, "/message/new"),
    messageControllers.postNew
  );

router.route("/messageId/delete");

export default router;
