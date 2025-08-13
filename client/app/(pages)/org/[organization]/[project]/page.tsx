import BugCard from "@/components/pages/projects/bug-card";
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
  const bugs = projectData.bugs;
  return (
    <div className="">
      <ProjHeader
        name={projectData.name}
        description={projectData.description}
        createdAt={projectData.createdAt}
      />
      <CreateBug organization={organization} project={project} />
      <div className="flex flex-col gap-3">
        {bugs.map((bug, idx) => (
          <BugCard
            key={idx}
            id={bug.id}
            name={bug.name}
            assignedTo={bug.assignedTo}
            raisedBy={bug.raisedBy}
            projectId={bug.projectId}
            priority={bug.priority}
            status={bug.status}
            description={bug.description}
            createdAt={bug.createdAt}
            updatedAt={bug.updatedAt}
          />
        ))}
      </div>
    </div>
  );
}
