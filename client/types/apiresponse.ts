import { AxiosResponse } from "axios";

export interface APIResponse<T = null> extends AxiosResponse {
  data: { success: boolean; message: string; data: T };
}

export interface APIErrRes<T = null> {
  success: boolean;
  message: string;
  data: T;
}