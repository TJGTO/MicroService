import axios from "axios";
import { sign } from "jsonwebtoken";

export class AxiosService {
  public axios: ReturnType<typeof axios.create>;

  constructor(baseUrl: string, serviceName: string, user?: any) {
    this.axios = this.axiosCreateInstance(baseUrl, serviceName, user);
  }

  public axiosCreateInstance(
    baseUrl: string,
    serviceName?: string,
    user?: any
  ): ReturnType<typeof axios.create> {
    let requestGatewayToken = "";

    if (serviceName) {
      if (user) user.serviceName = serviceName;
      requestGatewayToken = sign(
        user || { serviceName },
        process.env.JWT_SECRET || ""
      );
    }

    const instance: ReturnType<typeof axios.create> = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${requestGatewayToken}`,
      },
      withCredentials: true,
    });

    return instance;
  }
}
