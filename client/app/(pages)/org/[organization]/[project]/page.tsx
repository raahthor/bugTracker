import { DataTableDemo } from "@/components/table/data-table";
import CreateBug from "../../_components/create-bug";
import getData from "@/lib/getData";
import { ProjectData } from "@/types/ProjectData";
import { Bug, Calendar, FolderOpen } from "lucide-react";
import { ProjSettingsBtn } from "../../_components/project-comps";
import { Badge } from "@/components/ui/badge";

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
      <header className="border-b mb-5">
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

            <div>
              <ProjSettingsBtn project={project} organization={organization} />
            </div>
          </div>
        </div>
      </header>
      <div className="space-y-5 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bug className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Bugs</h2>
            <Badge
              variant="secondary"
              className="bg-purple-500/20 text-purple-300 border-purple-500/30"
            >
              {bugs.length}
            </Badge>
          </div>

          <CreateBug organization={organization} project={project} />
        </div>

        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-12 ">
          {/* {projects.map((project, idx) => (
              <ProjectsCards
                key={idx}
                name={project.name}
                slug={project.slug}
                description={project.description}
                updatedAt={project.updatedAt}
                organization={organization}
              />
            ))} */}
          <DataTableDemo bugs={bugs} members={members} />
        </div>
      </div>
    </div>
  );
}
