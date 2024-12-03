import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "";

const authenticateJWT = (req: any, res: any, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(403)
      .json({ message: "Request Blocked due to access permission" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      console.log(token, JWT_SECRET);
      return res.status(403).json({ message: "Invalid token." });
    }

    if (decoded.serviceName !== process.env.SERVICE_NAME) {
      return res
        .status(403)
        .json({ message: "Request Blocked due to access permission" });
    }
    req.user = decoded;
    next();
  });
};

export default authenticateJWT;
