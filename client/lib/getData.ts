import { ResponseExt } from "@/types/responseExt";
import axios from "axios";
import { cookies, headers } from "next/headers";
import { env } from "./env";
import { redirect } from "next/navigation";

export default async function getData<T>(
  endpoint: string,
  red = "/login",
  message = "Something went wrong"
): Promise<ResponseExt<T>> {
  try {
    const headersList = await headers();
    const cookieStore = await cookies();

    // Method 1: From headers
    const cookieHeader = headersList.get("cookie");

    // Method 2: From cookies() function
    const allCookies = cookieStore.getAll();
    const cookieString = allCookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    // Use whichever method has data
    const finalCookieHeader = cookieHeader || cookieString;

    console.log("=== COOKIE DEBUG ===");
    console.log("Cookie from headers:", cookieHeader);
    console.log("Cookie from cookies():", cookieString);
    console.log(
      "All available headers:",
      Object.fromEntries(headersList.entries())
    );
    console.log("Final cookie header:", finalCookieHeader);
    console.log("==================");

    if (!finalCookieHeader) {
      console.log("No cookies found, redirecting...");
      redirect("/login?message=No authentication found");
    }

    const response = await fetch(`${env.API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Cookie: finalCookieHeader,
        "Content-Type": "application/json",
        "User-Agent": "NextJS-Server",
      },
      cache: "no-store",
    });

    if (response.status === 401) {
      redirect("/login?message=Unauthorized, login again!");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("getData Error:", err);
    if (axios.isAxiosError(err) && err.response?.status === 401)
      redirect("/login?message=Unauthorized, login again!");
    else redirect(`${red}?message=${message}`);
  }
}
