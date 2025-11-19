import express from "express";
import { getUserJoin, postUserJoin } from "../controllers/user.js";
import { setUpValidator } from "../middleware/validate.js";
import { joinClubValidation } from "../validators/validationChains.js";
import { isNewMember } from "../middleware/roleValidation.js";
const router = express.Router();

router
  .route("/join")
  .get(getUserJoin)
  .post(
    setUpValidator(joinClubValidation, "/user/join"),
    isNewMember("/user/join"),
    postUserJoin
  );

export default router;
