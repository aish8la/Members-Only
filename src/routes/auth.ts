import express from "express";
import * as controller from "../controllers/auth.js";
const router = express.Router();

router.route("/").get(controller.getLogin);

export default router;
