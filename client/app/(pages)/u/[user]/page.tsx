import { redirect } from "next/navigation";
import Welcome from "@/components/pages/dashboard/welcome";
import OrgButtons from "@/components/pages/dashboard/orgButtons";
import RecentOrgs from "@/components/pages/dashboard/recentOrgs";
import getData from "@/lib/getData";
import UserData from "@/types/userData";
import { DashboardData } from "@/types/DashboardData";
import RecentBugs from "@/components/pages/dashboard/recentBugs";

export default async function DashboardPage({
  params,
}: {
  params: { user: string };
}) {
  const { user } = await params;
  const resultUser = await getData<UserData>("/api/user-data");

  if (user !== resultUser.data.data.userData.username)
    redirect("/login?message=Unauthorized!");

  const resultDash = await getData<DashboardData>("/api/dashboard-data");
  
  return (
    <>
      <Welcome name={resultUser.data.data.userData.name!} />
      <OrgButtons />
      <RecentOrgs orgs={resultDash.data.data.recentOrgs} />
      <RecentBugs bugs={resultDash.data.data.recentBugs} />
    </>
  );
}
