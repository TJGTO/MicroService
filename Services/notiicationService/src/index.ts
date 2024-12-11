import dotenv from "dotenv";
import connectDB from "./config/databaseConfig";
import { createKafkaConsumer } from "./queue/consumer";

dotenv.config();

const run = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Kafka consumer
    await createKafkaConsumer();
  } catch (error) {
    console.error("Error in service:", error);
    process.exit(1);
  }
};

run();
