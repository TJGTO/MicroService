import { Kafka } from "kafkajs";
import { logCreate } from "../service/log.service";

export const createKafkaConsumer = async () => {
  const kafka = new Kafka({
    clientId: "log-notification-service",
    brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
  });

  const consumer = kafka.consumer({ groupId: "log-group" });

  try {
    await consumer.connect();
    console.log("Connected to Kafka...");

    await consumer.subscribe({ topic: "logs", fromBeginning: true });
    // await consumer.subscribe({ topic: "notifications", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const logMessage = message.value?.toString();
        if (logMessage) {
          console.log(`Consumed from ${topic}:`, logMessage);
          // if (topic == "logs") {
          await logCreate(topic, logMessage);
          //}
        }
      },
    });

    return consumer;
  } catch (error) {
    console.error("Error connecting Kafka consumer:", error);
    throw error;
  }
};
