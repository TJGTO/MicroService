import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const userVerifyMiddleware = (req: any, res: any, next: NextFunction) => {
  const { user } = req;
  if (user && user.id) {
    next();
  } else {
    return res.status(403).json({ message: "Don't have the permission" });
  }
};

export default userVerifyMiddleware;
