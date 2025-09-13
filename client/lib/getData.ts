import { ResponseExt } from "@/types/responseExt";
import axios from "axios";
import { headers } from "next/headers";
import { env } from "./env";
import { redirect } from "next/navigation";

export default async function getData<T>(
  endpoint: string,
  red = "/login",
  message = "Something went wrong"
): Promise<ResponseExt<T>> {
  try {
    const cookieHeader = (await headers()).get("cookie") ?? "";

    const response: ResponseExt<T> = await axios.get(
      `${env.API_URL}${endpoint}`,
      {
        headers: { Cookie: cookieHeader },
      }
    );
    return response;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401)
      redirect("/login?message=Unauthorized, login again!");
    else redirect(`${red}?message=${message}`);
  }
}
