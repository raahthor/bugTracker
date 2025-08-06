import APIResponse from "@/types/apiResponse";
import UserData from "@/types/userData";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "./env";

export default async function getUserData() {
  const cookieHeader = (await cookies()).get("token")?.value;
  try {
    const response: APIResponse<UserData> = await axios.get(
      `${env.API_URL}/api/user-data`,
      {
        headers: { Cookie: `token=${cookieHeader}` },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    if (axios.isAxiosError(err) && err.response?.status === 400)
      redirect("/login?message=Unauthorized, Login again!");
    else redirect("/login?message=Something went wrong");
  }
}
