import express from "express";
import * as controller from "../controllers/auth.js";
import * as middleware from "../middleware/auth.js";
import { setUpValidator } from "../middleware/validate.js";
import { signUpValidation } from "../validators/validationChains.js";
import { checkAdminPassword } from "../middleware/roleAuthorization.js";
const router = express.Router();

router.route("/login").get(controller.getLogin).post(middleware.authenticate);
router
  .route("/signup")
  .get(controller.getSignup)
  .post(
    setUpValidator(signUpValidation, "/auth/signup"),
    checkAdminPassword("/auth/signup"),
    controller.postSignup
  );
router.route("/logout").get(controller.getLogout);

export default router;
