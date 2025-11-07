import express from "express";
import { protectRoute } from "../middleware/auth.middleware.mjs";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controller/message.controller.mjs";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

router.get("/send/:id", protectRoute, sendMessage);

export { router };
