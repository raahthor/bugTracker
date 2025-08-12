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
  // const bugs = projectData.bugs;
  return (
    <div>
      <header>
        <p>{projectData.name}</p>
        <p>{projectData.description}</p>
        {projectData.bugs.map((bug) => (
          <div>
            <p>{bug.name}</p>
            <p>{bug.description}</p>
          </div>
        ))}
      </header>
    </div>
  );
}
