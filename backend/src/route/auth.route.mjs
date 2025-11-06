import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.mjs";
import { userSchema, userValidate } from "../lib/validation.mjs";
import { protectRoute } from "../middleware/auth.middleware.mjs";

const router = express.Router();

router.post("/signup", userValidate(userSchema), signup);
router.post("/login", login);
router.post("/logout", logout);

router.patch("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export { router };
