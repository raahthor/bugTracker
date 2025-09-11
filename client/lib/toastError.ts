import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function toastError(
  err: unknown,
  defMsg = "Something went wrong!"
) {
  if (axios.isAxiosError(err)) {
    const msg = err.response?.data?.message || defMsg;
    toast.error(msg);
  } else {
    toast.error(defMsg);
    // console.error(err); // for development only
  }
}

export function useToastError(err: string | null) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && err) {
      toast.error(err);
    }
  }, [hasMounted, err]);
}

export function isLengthError(type: string, val: string, len: number) {
  if (val.trim().length < len) {
    toast.error(`${type} should be atleast ${len} characters`);
    return true;
  }
  return false;
}
