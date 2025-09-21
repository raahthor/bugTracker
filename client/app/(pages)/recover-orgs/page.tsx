import getData from "@/lib/getData";
import DeletedOrgCard from "./deleted-org-card";
import { DeletedOrgs } from "@/types/softDeletedOrgs";
import { Building2 } from "lucide-react";

export default async function DeletedOrg() {
  const result = await getData<{ deletedOrgs: DeletedOrgs[] }>(
    "/api/settings/soft-deleted-orgs",
    "/recover-orgs"
  );
  const deletedOrgList = result.data.data.deletedOrgs;
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
      <header className="text-3xl font-bold flex items-center gap-4 mb-8">
        <Building2 className="text-primary" />
        <span>Recover Organizations</span>
      </header>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 ">
        {deletedOrgList.length !== 0 ? (
          deletedOrgList.map((org, idx) => (
            <DeletedOrgCard
              key={idx}
              id={org.id}
              name={org.name}
              description={org.description}
              handle={org.handle}
              deletedAt={org.deletedAt}
            />
          ))
        ) : (
          <p>No Organization to recover</p>
        )}
      </div>
    </div>
  );
}
