import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { DataTable } from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import dataa from "./data.json";
import axios from "axios";
import { env } from "@/lib/env";
import APIResponse from "@/types/apiResponse";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ErrorHandler from "@/components/errorHandler";

async function getUserData(user: string) {
  const cookieHeader = (await cookies()).get("token")?.value;
  try {
    const response: APIResponse = await axios.get(
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
export default async function Page({ params }: { params: { user: string } }) {
  const { user } = await params;

  checkNewUser(user);

  const result = await getUserData(user);
  const isUnauthorized = !result.success && result.error?.status === 401;
  const errorMessage = !result.success ? result.error?.message : null;

  return (
    <>
      <ErrorHandler
        error={errorMessage}
        redirectTo={isUnauthorized ? "/login" : undefined}
      />
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={dataa} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
