import { DataTableDemo } from "@/components/table/data-table";
import CreateBug from "../../_components/create-bug";
import ProjHeader from "../../_components/proj-header";
import getData from "@/lib/getData";
import { ProjectData } from "@/types/ProjectData";

export default async function ProjectPage({
  params,
}: {
  params: { organization: string; project: string };
}) {
  const { organization, project } = await params;
  const result = await getData<ProjectData>(
    `/api/project/${organization}/${project}`,
    `/org/${organization}`
  );
  const projectData = result.data.data.projectData;
  const bugs = result.data.data.bugs;
  const members = result.data.data.members;
  return (
    <div className="">
      <ProjHeader
        name={projectData.name}
        description={projectData.description}
        createdAt={projectData.createdAt}
        organization={organization}
        project={project}
      />
      <CreateBug organization={organization} project={project} />
      <DataTableDemo bugs={bugs} members={members} />
    </div>
  );
}
