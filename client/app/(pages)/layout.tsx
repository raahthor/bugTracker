import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import getData from "@/lib/getData";
import UserData from "@/types/userData";
import { redirect } from "next/navigation";

export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await getData<UserData>("/api/user-data");
  if (!result.data.data.userData.username) redirect("/signup");

  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar userData={result.data.data.userData} variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="@container/main flex flex-col flex-1 gap-4 py-4 md:gap-6 md:py-6">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
