import OrgCards from "./_components/orgs-comps";
import getData from "@/lib/getData";
import ToastSCError from "@/lib/toastSCError";
import { OrgUsersList } from "@/types/orgUsers";
import { OrgButtons } from "./_components/orgs-comps";
import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function OrganizationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { message } = await searchParams;
  const response = await getData<OrgUsersList>("/api/orgs-list", "/org");
  const orgList = response.data.data.orgList;
  return (
    <>
      <ToastSCError error={message} />
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <header>
          <div className="text-3xl font-bold flex items-center gap-4 mb-3">
            <Building2 className="text-primary" /> <span> Organizations</span>
          </div>
          <p className="text-muted-foreground text-lg">
            Use the buttons below to create, join, or recover organizations
          </p>
          <div className="flex flex-col lg:flex-row gap-4 mb-6 mt-3">
            <OrgButtons />
          </div>
        </header>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Organizations</h2>
            <Badge variant="secondary" className="ml-2">
              {orgList.length}
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg mb-3">
            Here&apos;s a list of organizations you own or are a member of
          </p>
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 ">
            {orgList.length !== 0 ? (
              orgList.map((org, idx) => (
                <OrgCards
                  key={idx}
                  name={org.organization.name}
                  description={org.organization.description}
                  role={org.role}
                  handle={org.organization.handle}
                  updatedAt={org.updatedAt}
                />
              ))
            ) : (
              <p className="text-muted-foreground text-lg font-medium">
                No Organizations
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
