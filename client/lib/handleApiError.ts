import axios from "axios";
import { toast } from "sonner";

export default function handleApiError(
  err: unknown,
  defMsg = "Something went wrong!"
) {
  if (axios.isAxiosError<APIErrorRes>(err)) {
    const msg = err.response?.data?.message || defMsg;
    toast.error(msg);
  } else {
    toast.error(defMsg);
    // console.error(err); // for development only
  }
}
