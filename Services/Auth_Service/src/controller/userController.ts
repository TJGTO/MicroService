import { createUser, loginUser, getUserDetails } from "../service/userService";

export const createUserController = async (req: any, res: any) => {
  try {
    const { username, email, password, dob, firstName, lastName } = req.body;

    if (!username || !email || !password || !dob || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const user = await createUser({
      username,
      email,
      password,
      dob,
      firstName,
      lastName,
    });
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return res.status(201).json({
      message: "User created successfully.",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const loginUserController = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const data = await loginUser({ email, password });

    return res.status(200).json({
      message: "Login successful",
      data: data,
    });
  } catch (error) {
    return res.status(401).json({
      message: (error as Error).message,
    });
  }
};

export const getUserDetailsController = async (req: any, res: any) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const user = await getUserDetails(userId);

    const { password, ...userWithoutPassword } = user.toJSON();

    return res.status(200).json({
      message: "User details fetched successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};
