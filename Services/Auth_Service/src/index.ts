import express, { Request, Response } from "express";
import { startServer } from "./config/databaseConfig";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3001;
const version = "v1";

app.use(express.json());

startServer();

app.use(`/api/${version}`, userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
