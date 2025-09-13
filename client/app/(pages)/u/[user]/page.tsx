import { redirect } from "next/navigation";
import Welcome from "./_components/welcome";
import OrgButtons from "./_components/orgButtons";
import RecentOrgs from "./_components/recentOrgs";
import getData from "@/lib/getData";
import UserData from "@/types/userData";
import { DashboardData } from "@/types/DashboardData";
import BugArr from "@/components/bugArr";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ user: string }>;
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
      <div>
        <p>Recent bug(s) assigned to you : </p>
        <BugArr bugs={resultDash.data.data.recentBugs} />
      </div>
    </>
  );
}
