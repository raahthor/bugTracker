import BugArr from "@/components/bugArr";
import RaisedBugs from "./raisedBugs";
import getData from "@/lib/getData";
import { BugExt } from "@/types/DashboardData";

export default async function MyIssuesPage() {
  const result = await getData<{
    raisedBugs: BugExt[];
    assignedBugs: BugExt[];
  }>("/api/get-myissues");

  return (
    <>
      <div>
        <p>Bug(s) Assigned to you : </p>
        <BugArr bugs={result.data.data.assignedBugs} />
      </div>
      <div>
        <p>Bug(s) Raised by you : </p>
        {/* show data here */}
        <RaisedBugs bugs={result.data.data.raisedBugs} />
      </div>
    </>
  );
}
