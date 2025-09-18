import { DataTableDemo } from "@/components/table/data-table";
import CreateBug from "../../_components/create-bug";
import getData from "@/lib/getData";
import { ProjectData } from "@/types/ProjectData";
import { Calendar, FolderOpen } from "lucide-react";
import { ProjSettingsBtn } from "../../_components/project-comps";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ organization: string; project: string }>;
}) {
  const { organization, project } = await params;
  const result = await getData<ProjectData>(
    `/api/project/${organization}/${project}`,
    `/org/${organization}`
  );
  const projectData = result.data.data.projectData;
  const bugs = result.data.data.bugs;
  const members = result.data.data.members;
  const createdAt = new Date(projectData.createdAt).toLocaleString();
  return (
    <div>
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-bold text-lg">
                  <FolderOpen />
                </div>
                <div>
                  <h1 className="text-3xl font-bold ">{projectData.name}</h1>
                  <p className="text-gray-400 text-sm">
                    {projectData.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {createdAt}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-5">
              <ProjSettingsBtn project={project} organization={organization} />
            </div>
          </div>
        </div>
      </header>
      <CreateBug organization={organization} project={project} />
      <DataTableDemo bugs={bugs} members={members} />
    </div>
  );
}
