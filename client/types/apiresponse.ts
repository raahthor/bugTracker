import { AxiosResponse } from "axios";

interface APIResponse<T = null> extends AxiosResponse {
  data: { success: boolean; message: string; data: T };
}
export default APIResponse;
