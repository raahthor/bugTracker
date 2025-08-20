"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription } from "@/components/ui/card";
import { RecentBug } from "@/types/DashboardData";
import { useRouter } from "next/navigation";

export default function RecentBugs({ bugs }: { bugs: RecentBug[] }) {
  const router = useRouter();
  return (
    <div>
      <p>Assigned Bug(s) :</p>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 ">
        {bugs.length !== 0 ? (
          bugs.map((bug, idx) => (
            <Card
              key={idx}
              onClick={() =>
                router.push(
                  `/org/${bug.project.organization.handle}/${bug.project.slug}`
                )
              }
              className="cursor-pointer gap-1 py-1 px-2"
            >
              <CardDescription>
                Belongs to {bug.project.name} - @{" "}
                {bug.project.organization.handle}
              </CardDescription>
              <div className="flex flex-row justify-around">
                <p>{bug.name}</p>
                <div className="h-full border border-black/40" />
                <Badge variant="outline" className="bg-yellow-300 border-x ">
                  {bug.status}
                </Badge>
                <div className="h-full border border-black/40" />
                <Badge
                  variant="outline"
                  className={`${
                    bug.priority === "HIGH"
                      ? "bg-red-400"
                      : bug.priority && "bg-orange-300"
                  }`}
                >
                  {bug.priority}
                </Badge>
              </div>
            </Card>
          ))
        ) : (
          <p>No bugs assigned to you</p>
        )}
      </div>
    </div>
  );
}
