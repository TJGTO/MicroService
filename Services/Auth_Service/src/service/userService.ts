import User from "../model/userModel";
import bcrypt from "bcryptjs";
import { hashPassword, verifyPassword, generateToken } from "../util/hashUtil";

interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  dob: string;
  firstName: string;
  lastName: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

export const createUser = async (data: CreateUserInput) => {
  try {
    const hashedPassword = await hashPassword(data.password);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    throw new Error(`Unable to create user: ${(error as Error).message}`);
  }
};

export const loginUser = async (data: LoginUserInput) => {
  try {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await verifyPassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user);

    return { token };
  } catch (error) {
    throw new Error(`Login error: ${(error as Error).message}`);
  }
};

export const getUserDetails = async (userId: number) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(`Error fetching user details: ${(error as Error).message}`);
  }
};
