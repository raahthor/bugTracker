"use client";

import { BugExt } from "@/types/DashboardData";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function RaisedBugs({ bugs }: { bugs: BugExt[] }) {
  return (
    <div className=" grid grid-cols-1 gap-4 px-4 lg:px-12 ">
      {bugs.length !== 0 ? (
        bugs.map((bug, idx) => <BugCard key={idx} bug={bug} />)
      ) : (
        <p>No bugs raised by you.</p>
      )}
    </div>
  );
}

function BugCard({ bug }: { bug: BugExt }) {
  return (
    <Card className="flex-col gap-2 px-2 py-1 items-start" >
      <p className="text-muted-foreground text-sm font-semibold pl-4">
        Belongs to {bug.project.name} - @ {bug.project.organization.handle}
      </p>
      <div className="flex flex-row justify-around w-full">
        <p>{bug.name}</p>
        <div className="h-full border border-black/40" />
        <Badge
          variant="outline"
          className={`${
            bug.status === "OPEN"
              ? "bg-green-500"
              : bug.status === "IN_PROGRESS" && "bg-yellow-300"
          }`}
        >
          {bug.status}
        </Badge>
        <div className="h-full border border-black/40" />
        <Badge
          variant="outline"
          className={`${
            bug.priority === "HIGH"
              ? "bg-red-400"
              : bug.priority === "MEDIUM" && "bg-orange-300"
          }`}
        >
          {bug.priority}
        </Badge>
      </div>
    </Card>
  );
}
