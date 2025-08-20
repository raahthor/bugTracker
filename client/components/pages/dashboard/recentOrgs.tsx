"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { RecentOrg } from "@/types/DashboardData";
import { useRouter } from "next/navigation";

export default function RecentOrgs({ orgs }: { orgs: RecentOrg[] }) {
  const router = useRouter();
  return (
    <div>
      <p>Recent Organization(s) :</p>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-12 ">
        {orgs.length !== 0 ? (
          orgs.map((org, idx) => (
            <Card
              key={idx}
              className="@container/card cursor-pointer"
              onClick={() => router.push(`/org/${org.handle}`)}
            >
              <CardHeader>
                <CardTitle className=" font-semibold tabular-nums @[250px]/card:text-2xl">
                  {org.name}
                </CardTitle>
                <CardAction>
                  <p>@{org.handle}</p>
                </CardAction>
                <CardDescription>
                  <p>{org.description}</p>
                </CardDescription>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p>No recent Organizations</p>
        )}
      </div>
    </div>
  );
}
