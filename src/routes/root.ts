import express from "express";
import * as controller from "../controllers/root.js";
import { checkAuthStatus } from "../middleware/auth.js";
const router = express.Router();

router.route("/").get(checkAuthStatus(), controller.getHome);

export default router;
