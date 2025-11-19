import express from "express";
import { postUserJoin } from "../controllers/user.js";
import { setUpValidator } from "../middleware/validate.js";
import { joinClubValidation } from "../validators/validationChains.js";
const router = express.Router();

router
  .route("/join")
  .post(setUpValidator(joinClubValidation, "/"), postUserJoin);

export default router;
