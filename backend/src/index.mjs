import express from "express";
import dotenv from "dotenv";
import { router as authRoutes } from "./route/auth.route.mjs";
import { connectDB } from "./lib/db.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send(`<h1>This is Homepage</h1>`);
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
  connectDB();
});
