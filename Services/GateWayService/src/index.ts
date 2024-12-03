import express, { Request, Response } from "express";
import authRouter from "./Routes/userRoutes";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;
const version = "v1";

app.use(express.json());
app.use(`/api/${version}/auth`, authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
