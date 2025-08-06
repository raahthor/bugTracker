import { DataTable } from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import data from "./data.json";
import { redirect } from "next/navigation";
import Welcome from "@/components/pages/dashboard/welcome";
import OrgButtons from "@/components/pages/dashboard/orgButtons";
import RecentOrgs from "@/components/pages/dashboard/recentOrgs";
import getData from "@/lib/getData";
import UserData from "@/types/userData";

export default async function DashboardPage({
  params,
}: {
  params: { user: string };
}) {
  const { user } = await params;
  const resultUser = await getData<UserData>("api/user-data");

  if (user !== resultUser.data.data.userData.username)
    redirect("/login?message=Unauthorized!");

  const resultDash = await getData<unknown>("api/dashboard-data");
  console.log(resultDash.data);
  return (
    <>
      <Welcome name={resultUser.data.data.userData.name!} />
      <OrgButtons />
      <RecentOrgs />
      {/* <SectionCards /> */}

      {/* <DataTable data={data} /> */}
    </>
  );
}
