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
    const hdrs = (await headers()) as any;
    const cookieHeader = hdrs?.get
      ? hdrs.get("cookie") ?? ""
      : hdrs?.cookie ?? "";

    console.log(
      "DEBUG: headers() object:",
      typeof hdrs,
      Object.keys(hdrs || {})
    );
    console.log("DEBUG: cookieHeader (forwarding):", cookieHeader);

    // Make the proxied request and also log response headers for debugging
    const res: ResponseExt<T> = await axios.get(`${env.API_URL}${endpoint}`, {
      headers: { Cookie: cookieHeader },
      validateStatus: () => true, // let us inspect error responses
    });

    console.log("DEBUG: proxied response status:", res.status);
    console.log("DEBUG: proxied response headers:", res.headers);
    console.log(
      "DEBUG: proxied response data snippet:",
      JSON.stringify(res.data).slice(0, 500)
    );

    if (res.status === 401) {
      // backend rejected auth — redirect
      redirect("/login?message=Unauthorized, login again!");
    }

    return res;
  } catch (err) {
    console.error("DEBUG: getData error:", err);
    if (axios.isAxiosError(err) && err.response?.status === 401)
      redirect("/login?message=Unauthorized, login again!");
    else redirect(`${red}?message=${message}`);
  }
}
