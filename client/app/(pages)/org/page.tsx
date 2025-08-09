import OrgCards from "@/components/pages/organization/org-cards";
import getData from "@/lib/getData";
import ToastSCError from "@/lib/toastSCError";
import { OrgUsersList } from "@/types/orgUsers";

export default async function OrganizationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { message } = await searchParams;
  const response = await getData<OrgUsersList>("/api/orgs-list", "/org");
  const orgList = response.data.data.orgList;
  console.log(orgList)
  return (
    <div className="p-5">
      <ToastSCError error={message} />
      {orgList.map((org, idx) => (
        <OrgCards key={idx}  />
      ))}
    </div>
  );
}
