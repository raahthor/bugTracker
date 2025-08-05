import { DataTable } from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import data from "./data.json";
import axios from "axios";
import { env } from "@/lib/env";
import APIResponse from "@/types/apiResponse";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserData from "@/types/userData";

async function getUserData(user: string) {
  const cookieHeader = (await cookies()).get("token")?.value;
  try {
    const response: APIResponse<UserData> = await axios.get(
      `${env.API_URL}/api/user-data/${user}`,
      {
        headers: { Cookie: `token=${cookieHeader}` },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    if (
      axios.isAxiosError(err) &&
      (err.response?.status === 401 || err.response?.status === 400)
    )
      redirect("/login?message=Unauthorized, Login again!");
    else redirect("/login?message=Something went wrong");
  }
}

export default async function DashboardPage({
  params,
}: {
  params: { user: string };
}) {
  const { user } = await params;
  if (user === "new") redirect("/signup");
  
  const result = await getUserData(user);
  return (
    <>
      <SectionCards />

      <DataTable data={data} />
    </>
  );
}
