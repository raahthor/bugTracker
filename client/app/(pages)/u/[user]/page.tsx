import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DataTable } from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "./data.json";
import axios from "axios";
import { env } from "@/lib/env";
import APIResponse from "@/types/apiResponse";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ErrorHandler from "@/lib/errorHandler";
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
    return { success: true, data: response.data };
  } catch (err) {
    return {
      success: false,
      error: {
        status: axios.isAxiosError(err) ? err.response?.status : 500,
        message: axios.isAxiosError(err)
          ? err.response?.data.message
          : "Error while fetchind data",
      },
    };
  }
}
function checkNewUser(user: string) {
  if (user === "new") redirect("/signup");
}
export default async function DashboardPage({ params }: { params: { user: string } }) {
  const { user } = await params;

  checkNewUser(user);

  const result = await getUserData(user);
  const isUnauthorized =
    !result.success &&
    (result.error?.status === 401 || result.error?.status === 400);
  const errorMessage = !result.success ? result.error?.message : null;
  const userData = result.success ? result.data?.data.userData : undefined;

  return (
    <>
      <SectionCards />

      <DataTable data={data} />
    </>
  );
}
