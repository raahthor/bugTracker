import { ResponseExt } from "@/types/responseExt";
import axios from "axios";
import { cookies } from "next/headers";
import { env } from "./env";
import { redirect } from "next/navigation";

export default async function getData<T>(
  endpoint: string,
  red = "/login",
  message = "Something went wrong"
): Promise<ResponseExt<T>> {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    console.log("Cookie header:", cookieHeader);
    console.log("All cookies:", cookieStore.getAll());
    console.log("Specific auth cookie:", cookieStore.get("token"));

    if (!cookieHeader) {
      console.log("No cookies found, redirecting to login");
      redirect("/login?message=No authentication found");
    }
    const response: ResponseExt<T> = await axios.get(
      `${env.API_URL}${endpoint}`,
      {
        headers: { Cookie: cookieHeader, "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401)
      redirect("/login?message=Unauthorized, login again!");
    else redirect(`${red}?message=${message}`);
  }
}
