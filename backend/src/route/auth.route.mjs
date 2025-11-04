import express from "express";
import { login, logout, signup } from "../controller/auth.controller.mjs";
import { userSchema, userValidate } from "../lib/validation.mjs";

const router = express.Router();

router.post("/signup", userValidate(userSchema), signup);

router.post("/login", login);

router.post("/logout", logout);

export { router };
