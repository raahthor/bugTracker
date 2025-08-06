import { DataTable } from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import data from "./data.json";
import { redirect } from "next/navigation";
import A from "@/components/pages/dashboard/a";
import getUserData from "@/lib/getUserData";

export default async function DashboardPage({
  params,
}: {
  params: { user: string };
}) {
  const { user } = await params;
  if (user === "new") redirect("/signup");
  const result = await getUserData();
  if (user !== result.data.userData.username)
    redirect("/login?message=Unauthorized!");
  return (
    <>
      <A />
      {/* <SectionCards /> */}

      {/* <DataTable data={data} /> */}
    </>
  );
}
