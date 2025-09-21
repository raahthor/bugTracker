import { redirect } from "next/navigation";
import { OrganizationButtons } from "./_components/dashComps";
import { RecentOrganizations } from "./_components/dashComps";
import getData from "@/lib/getData";
import UserData from "@/types/userData";
import { DashboardData } from "@/types/DashboardData";
import BugArr from "@/components/bugArr";
import { Badge } from "@/components/ui/badge";
import { Building2, Bug } from "lucide-react";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await params;
  const resultUser = await getData<UserData>("/api/user-data");
  const userData = resultUser.data.data.userData;

  if (user !== userData.username) redirect("/login?message=Unauthorized!");

  const resultDash = await getData<DashboardData>("/api/dashboard-data");
  const dashData = resultDash.data.data;

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Bug className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Welcome, {userData.name}
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Let&apos;s get started by creating or joining an Organization
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <OrganizationButtons />
      </div>
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Recent Organizations</h2>
          <Badge variant="secondary" className="ml-2">
            {dashData.recentOrgs.length}
          </Badge>
        </div>
        <RecentOrganizations orgs={dashData.recentOrgs} />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Bug className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Recent Bugs Assigned</h2>
          <Badge variant="secondary" className="ml-2">
            {dashData.recentBugs.length}
          </Badge>
        </div>
      </div>
      <BugArr bugs={dashData.recentBugs} />
    </div>
  );
}
