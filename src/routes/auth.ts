import express from "express";
import * as controller from "../controllers/auth.js";
import * as middleware from "../middleware/auth.js";
const router = express.Router();

router.route("/login").get(controller.getLogin).post(middleware.authenticate);
router.route("/signup").get(controller.getSignup).post(controller.postSignup);

export default router;
