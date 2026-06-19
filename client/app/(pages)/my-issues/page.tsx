import BugArr from "@/components/bugArr";
import getData from "@/lib/getData";
import { BugExt } from "@/types/DashboardData";
import { Bug, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

export default async function MyIssuesPage() {
  const result = await getData<{
    raisedBugs: BugExt[];
    assignedBugs: BugExt[];
  }>("/api/get-myissues");
  const raisedBugs = result.data.data.raisedBugs;

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Bug className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Bug(s) Assigned to you:</h2>
          <Badge variant="secondary" className="ml-2">
            {result.data.data.assignedBugs.length}
          </Badge>
        </div>
        <BugArr bugs={result.data.data.assignedBugs} />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Bug className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Bug(s) Raised by you:</h2>
          <Badge variant="secondary" className="ml-2">
            {raisedBugs.length}
          </Badge>
        </div>

        <div className=" grid grid-cols-1 gap-4 px-4 lg:px-12 ">
          {raisedBugs.length !== 0 ? (
            raisedBugs.map((bug, idx) => (
              <div key={idx} className="border p-4 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Bug className="h-3 w-3" />
                  <span>
                    Belongs to {bug.project.name} in{" "}
                    {bug.project.organization.handle}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{bug.name}</h3>
                <div className="w-full flex items-center justify-between">
                  <div className="flex  flex-col items-start md:flex-row gap-2">
                    <Badge
                      variant="outline"
                      className="bg-yellow-500/30 text-yellow-100"
                    >
                      {bug.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`${
                        bug.priority === "HIGH"
                          ? "bg-red-500/20  text-red-200"
                          : bug.priority === "MEDIUM"
                          ? "bg-orange-600/50  text-orange-200 "
                          : "bg-green-500/20 text-green-200"
                      }`}
                    >
                      {bug.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <span>Raised :</span>
                    <User className="h-3 w-3" />
                    <span>{bug.raisedByUser.name}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Card className="bg-card/30 border-dashed border-2 ">
              <CardHeader className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Bug className="w-8 h-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-muted-foreground text-lg font-medium">
                  No bugs raised by you
                </CardTitle>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
