import express from "express";
const router = express.Router();

import rootRouter from "./root.js";
import authRouter from "./auth.js";

router.use("/auth", authRouter);

/**
 * Keep this as the last to
 * avoid unintentional hits on
 * all routes that start with "/"
 */
router.use("/", rootRouter);

export default router;
