import { z } from "zod";

export const userSchema = z.object({
  email: z.email(),
  fullName: z.string().min(3, "name must be atleast 3 characters long."),
  password: z
    .string()
    .trim()
    .min(6, "password must be atleast 6 characters long."),
});

export const userValidate = (userSchema) => {
  return (req, res, next) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
      const err = z.flattenError(result.error);
      return res.status(400).json({ error: err });
    }
    req.body = result.data;
    next();
  };
};
