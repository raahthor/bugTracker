import { Search } from "lucide-react";
import JoinOrg from "./_components/join-org";

export default function JoinOrgPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
      <div className="text-2xl font-bold flex items-center gap-4 mb-5">
        <Search className="text-primary" /> <span>Join an Organization</span>
      </div>
      <p className="text-muted-foreground mb-5">
        Search for an organization below and enter a join code to become a
        member.
      </p>
      <JoinOrg />
    </div>
  );
}
