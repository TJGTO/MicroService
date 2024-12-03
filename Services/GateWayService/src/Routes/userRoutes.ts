import { Router } from "express";
import { signUp, signIn, userDetails } from "../controllers/userController";
import { tokenMiddleware } from "../Middlewares/tokenvalidations";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/details", tokenMiddleware, userDetails);

export default authRouter;
