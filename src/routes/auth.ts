import express from "express";
import * as controller from "../controllers/auth.js";
import * as middleware from "../middleware/auth.js";
const router = express.Router();

router.route("/").get(controller.getLogin).post(middleware.authenticate);

export default router;
