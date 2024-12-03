import axios, { AxiosResponse } from "axios";
import { AxiosService } from "../config/axios";

export let axiosAuthInstance: ReturnType<typeof axios.create>;

export class AuthService {
  axiosService: AxiosService;

  constructor(user: any) {
    this.axiosService = new AxiosService(
      `${process.env.AUTH_BASE_URL}/api/v1/user`,
      process.env.AUTH_SERVICE_NAME || "",
      user
    );
    axiosAuthInstance = this.axiosService.axios;
  }

  async signUp(body: any): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axiosService.axios.post(
      "/create",
      body
    );
    return response;
  }

  async signIn(body: any): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axiosService.axios.post(
      "/login",
      body
    );
    return response;
  }

  async details(req: any): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axiosService.axios.get(
      "/details"
    );
    return response;
  }
}
