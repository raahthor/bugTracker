import OrgHeader from "@/components/pages/organization/org-header";
import ProjectsCards from "@/components/pages/organization/projects-cards";
import getData from "@/lib/getData";
import { OrgnaizationData } from "@/types/organizationData";

export default async function OrganizationPage({
  params,
}: {
  params: { organization: string };
}) {
  // fetch data about one particular org.
  const { organization } = await params;
  const result = await getData<OrgnaizationData>(
    `/api/org-data/${organization}`,
    "/org",
    "Organization not found"
  );
  const orgData = result.data.data.orgData;
  const membership = result.data.data.membership;
  const projects = result.data.data.orgData.projects;
  return (
    <div>
      <OrgHeader
        name={orgData.name}
        joinCode={orgData.joinCode}
        description={orgData.description}
        createdAt={orgData.createdAt}
      />
      <div>
        {projects.map((project, idx) => (
          <ProjectsCards
            key={idx}
            id={project.id}
            name={project.name}
            orgId={project.orgId}
            slug={project.slug}
            description={project.description}
            createdAt={project.createdAt}
            updatedAt={project.updatedAt}
            organization={organization}
          />
        ))}
      </div>
    </div>
  );
}
