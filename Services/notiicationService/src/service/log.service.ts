import { Log, ILog } from "../model/log";

export const logCreate = async (
  type: string,
  message: string
): Promise<ILog> => {
  try {
    const log = new Log({ type, message });
    return await log.save();
  } catch (error) {
    console.error("Error creating log:", error);
    throw error;
  }
};
