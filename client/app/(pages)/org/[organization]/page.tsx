import CreateProjButton from "../_components/create-proj-button";
import Members from "../_components/members";
import OrgHeader from "../_components/org-header";
import ProjectsCards from "../_components/projects-cards";
import getData from "@/lib/getData";
import { OrgnaizationData } from "@/types/organizationData";

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ organization: string }>;
}) {
  const { organization } = await params;
  const result = await getData<OrgnaizationData>(
    `/api/org-data/${organization}`,
    "/org",
    "Organization not found"
  );

  const orgData = result.data.data.orgData;
  const members = result.data.data.members;
  const projects = result.data.data.orgData.projects;
  return (
    <>
      <OrgHeader
        name={orgData.name}
        joinCode={orgData.joinCode}
        description={orgData.description}
        createdAt={orgData.createdAt}
        organization={organization}
      />
      <div>
        <Members
          members={members}
          isOrgOwner={result.data.data.isOwner}
          orgId={orgData.id}
        />
        <CreateProjButton organization={organization} />
      </div>

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 ">
        {projects.map((project, idx) => (
          <ProjectsCards
            key={idx}
            name={project.name}
            slug={project.slug}
            description={project.description}
            updatedAt={project.updatedAt}
            organization={organization}
          />
        ))}
      </div>
    </>
  );
}
