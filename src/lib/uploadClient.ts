import env from "@/config/env";
import axios from "axios";

export const uploadClient = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});

export default uploadClient;
