import express from "express";
import { checkAuthStatus } from "../middleware/auth.js";
const router = express.Router();

import rootRouter from "./root.js";
import authRouter from "./auth.js";
import userRouter from "./user.js";

router.use("/auth", authRouter);
router.use("/user", checkAuthStatus(), userRouter);

/**
 * Keep this as the last to
 * avoid unintentional hits on
 * all routes that start with "/"
 */
router.use("/", rootRouter);

export default router;
