import { Kafka, Producer } from "kafkajs";

let producerInstance: Producer | null = null;

export const createKafkaProducer = async () => {
  const kafka = new Kafka({
    clientId: "log-producer-service",
    brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
  });

  try {
    const producer = kafka.producer();
    await producer.connect();
    console.log("Connected to Kafka producer...");

    producerInstance = producer;
    return producer;
  } catch (error) {
    console.error("Error connecting Kafka producer:", error);
    throw error;
  }
};

export const sendLogMessage = async (message: string) => {
  if (!producerInstance) {
    throw new Error(
      "Kafka producer not connected. Call createKafkaProducer() first."
    );
  }

  try {
    await producerInstance.send({
      topic: "logs",
      messages: [
        {
          value: message,
          timestamp: Date.now().toString(),
        },
      ],
    });
    console.log(`Message sent to topic 'logs': ${message}`);
  } catch (error) {
    console.error("Error sending message to Kafka:", error);
    throw error;
  }
};

export const disconnectKafkaProducer = async () => {
  if (producerInstance) {
    try {
      await producerInstance.disconnect();
      console.log("Disconnected from Kafka producer");
      producerInstance = null;
    } catch (error) {
      console.error("Error disconnecting Kafka producer:", error);
      throw error;
    }
  }
};
