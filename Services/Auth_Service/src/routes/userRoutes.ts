import { Router } from "express";
import {
  createUserController,
  loginUserController,
  getUserDetailsController,
} from "../controller/userController";
import authenticateJWT from "../middleware/jwt";
import userVerifyMiddleware from "../middleware/verifyUser";

const router = Router();

// Route for creating a user
router.post("/user/create", authenticateJWT, createUserController);

router.post("/user/login", authenticateJWT, loginUserController);

router.get(
  "/user/details",
  authenticateJWT,
  userVerifyMiddleware,
  getUserDetailsController
);

export default router;
