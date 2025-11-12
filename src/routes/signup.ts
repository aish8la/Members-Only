import express from "express";
import * as controller from "../controllers/signup.js";
const router = express.Router();

router.route("/").get(controller.getSignUp);

export default router;
