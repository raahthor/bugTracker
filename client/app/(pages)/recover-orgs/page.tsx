import getData from "@/lib/getData";
import DeletedOrgCard from "./deleted-org-card";
import { DeletedOrgs } from "@/types/softDeletedOrgs";

export default async function DeletedOrg() {
  const result = await getData<{ deletedOrgs: DeletedOrgs[] }>(
    "/api/settings/soft-deleted-orgs",
    "/recover-orgs"
  );
  const deletedOrgList = result.data.data.deletedOrgs;
  return (
    <>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 ">
        {deletedOrgList.map((org, idx) => (
          <DeletedOrgCard
            key={idx}
            id={org.id}
            name={org.name}
            description={org.description}
            handle={org.handle}
            deletedAt={org.deletedAt}
          />
        ))}
      </div>
    </>
  );
}
