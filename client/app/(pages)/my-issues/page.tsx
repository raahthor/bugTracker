import BugArr from "@/components/bugArr";
import getData from "@/lib/getData";
import { BugExt } from "@/types/DashboardData";

export default async function MyIssuesPage() {
  const result = await getData<{ bugs: BugExt[] }>("/api/get-myissues");
  return (
    <div>
      <BugArr bugs={result.data.data.bugs} />
    </div>
  );
}
