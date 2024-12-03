import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"; // Assuming JWT is used for token

export const tokenMiddleware = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Error verifying token:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
