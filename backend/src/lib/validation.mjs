import { z } from "zod";
import { User } from "../model/user.model.mjs";

export const userSchema = z.object({
  email: z.email().refine(async (email) => {
    const existing = await User.findOne({ email });
    return !existing;
  }, "email already exist. pick another one."),
  fullName: z.string().min(3, "name must be atleast 3 characters long."),
  password: z
    .string()
    .trim()
    .min(6, "password must be atleast 6 characters long."),
});

export const userValidate = (userSchema) => {
  return async (req, res, next) => {
    const result = await userSchema.safeParseAsync(req.body);

    if (!result.success) {
      const err = z.flattenError(result.error);
      return res.status(400).json({ error: err });
    }
    req.body = result.data;
    next();
  };
};
