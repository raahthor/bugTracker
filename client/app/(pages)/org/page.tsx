import OrgCards from "./_components/org-cards";
import getData from "@/lib/getData";
import ToastSCError from "@/lib/toastSCError";
import { OrgUsersList } from "@/types/orgUsers";
import Buttons from "./_components/buttons";

export default async function OrganizationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { message } = await searchParams;
  const response = await getData<OrgUsersList>("/api/orgs-list", "/org");
  const orgList = response.data.data.orgList;
  // console.log(orgList);
  // separate out organizations as owner at and member at
  return (
    <>
      <ToastSCError error={message} />
      <Buttons />
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 ">
        {orgList.map((org, idx) => (
          <OrgCards
            key={idx}
            name={org.organization.name}
            description={org.organization.description}
            role={org.role}
            handle={org.organization.handle}
            updatedAt={org.updatedAt}
          />
        ))}
      </div>
    </>
  );
}
