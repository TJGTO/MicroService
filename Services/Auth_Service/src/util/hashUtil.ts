import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_SALT = process.env.SECRET_SALT;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;

// Hash password with secret salt
export const hashPassword = async (password: string): Promise<string> => {
  try {
    // Combine the secret salt with the raw password
    const saltedPassword = `${SECRET_SALT}${password}`;

    // Generate the hash
    const saltRounds = SALT_ROUNDS ? parseInt(SALT_ROUNDS) : 10;
    const hashedPassword = await bcrypt.hash(saltedPassword, saltRounds);

    return hashedPassword;
  } catch (error) {
    throw new Error(`Error hashing password: ${(error as Error).message}`);
  }
};

// Verify password with secret salt
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const saltedPassword = `${SECRET_SALT}${password}`;
    return await bcrypt.compare(saltedPassword, hashedPassword);
  } catch (error) {
    throw new Error(`Error verifying password: ${(error as Error).message}`);
  }
};

export const generateToken = (user: any) => {
  const payload = { id: user.id, email: user.email };
  const options = { expiresIn: "1h" };
  if (JWT_SECRET) {
    return jwt.sign(payload, JWT_SECRET, options);
  }
  throw new Error("Secret is not defined");
};
