import express from "express";
import { checkAuthStatus } from "../middleware/auth.js";
const router = express.Router();

import rootRouter from "./root.js";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import messageRouter from "./message.js";
import { notFoundError } from "../middleware/error.js";

router.use("/auth", authRouter);
router.use("/user", checkAuthStatus(), userRouter);
router.use("/message", messageRouter);

/**
 * Keep this as the last to
 * avoid unintentional hits on
 * all routes that start with "/"
 */
router.use("/", rootRouter);
router.use(notFoundError);

export default router;
