import express from "express";
import dotenv from "dotenv";
import { router as authRoutes } from "./route/auth.route.mjs";
import { connectDB } from "./lib/db.mjs";
import { date, success, z } from "zod";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send(`<h1>This is Homepage</h1>`);
});

// TEST: Zod Validation

const userSchema = z.object({
  username: z.string().min(5, "minimum 5 characters required.").trim(),
  password: z
    .string()
    .trim()
    .min(8, "password must be atleast 8 characters long."),
  name: z.string().optional().default("john doe"),
});

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // console.log(result.error.issues);
      res.status(400).json({ ...result.error.issues });
    }

    // res.status(200).json({data: result})
    req.body = result;
    next();
  };
};

app.post("/test", validate(userSchema), (req, res) => {
  try {
    // const { success, data } = req.body;
    res.status(200).json({ ...req.body });
  } catch (error) {
    console.log(`something went wrong.`);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
  connectDB();
});
