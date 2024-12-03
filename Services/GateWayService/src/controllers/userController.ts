import { Request, Response } from "express";
import { AuthService } from "../services/userService";

/**
 * Handles user signup.
 */

export const signUp = async (req: any, res: any) => {
  try {
    const { body } = req;
    const authService = new AuthService({});
    const response = await authService.signUp(body);
    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error("Error during sign-up:", error.message);
    return res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Internal Server Error",
    });
  }
};

/**
 * Handles user signin.
 */
export const signIn = async (req: any, res: any) => {
  try {
    const { body } = req;
    const authService = new AuthService({});
    const response = await authService.signIn(body);
    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error("Error during sign-in:", error.message);
    return res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Internal Server Error",
    });
  }
};

export const userDetails = async (req: any, res: any) => {
  try {
    const { user } = req;
    const authService = new AuthService(user);
    const response = await authService.details(req);
    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error("Error during sign-in:", error.message);
    return res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Internal Server Error",
    });
  }
};
