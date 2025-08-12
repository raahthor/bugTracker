import CreateBug from "@/components/pages/projects/create-bug";
import ProjHeader from "@/components/pages/projects/proj-header";
import getData from "@/lib/getData";
import { ProjectData } from "@/types/ProjectData";

export default async function ProjectPage({
  params,
}: {
  params: { organization: string; project: string };
}) {
  const { organization, project } = await params;
  const result = await getData<ProjectData>(
    `/api/${organization}/${project}`,
    `/org/${organization}`
  );
  const projectData = result.data.data.projectData;
  return (
    <div className="">
      <ProjHeader
        name={projectData.name}
        description={projectData.description}
        createdAt={projectData.createdAt}
        bugs={projectData.bugs}
      />
      <CreateBug organization={organization} project={project} />
    </div>
  );
}
