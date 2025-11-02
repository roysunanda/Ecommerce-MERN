import express from "express";
import { router as authRoutes } from "./route/auth.route.mjs";

const app = express();
const PORT = 3100;

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send(`<h1>This is Homepage</h1>`);
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
