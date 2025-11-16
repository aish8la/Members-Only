import express from "express";
import { postUserJoin } from "../controllers/user.js";
const router = express.Router();

router.route("/:userId/join").post(postUserJoin);

export default router;
