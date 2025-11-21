import express from "express";
import * as controller from "../controllers/root.js";
const router = express.Router();

router.route("/").get(controller.getHome);

export default router;
