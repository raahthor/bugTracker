import { ResponseExt } from "@/types/responseExt";
import axios from "axios";
import { cookies } from "next/headers";
import { env } from "./env";
import { redirect } from "next/navigation";
import { cache } from "react";
import UserData from "@/types/userData";

const getDirectApiUrl = (endpoint: string): string => {
  const baseUrl = env.API_URL!.replace(/\/+$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

const getDataInternal = async <T>(
  endpoint: string,
  red = "/login",
  message = "Something went wrong"
): Promise<ResponseExt<T>> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response: ResponseExt<T> = await axios.get(
      getDirectApiUrl(endpoint),
      {
        headers: { Cookie: cookieHeader },
        timeout: 10000,
      }
    );
    return response;
  } catch (err) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      typeof (err as { digest?: string }).digest === "string" &&
      (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }

    if (axios.isAxiosError(err) && err.response?.status === 401) {
      redirect("/login?message=Unauthorized%2C%20login%20again%21");
    } else {
      const separator = red.includes("?") ? "&" : "?";
      redirect(`${red}${separator}message=${encodeURIComponent(message)}`);
    }
  }
};

const getData = cache(getDataInternal);
export default getData;

export const getUserData = cache(async () => {
  return getData<UserData>("/api/user-data");
});
