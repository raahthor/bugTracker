import {
  CreateProjButton,
  JoinCode,
  SettingsButton,
} from "../_components/org-page-comps";
import Members from "../_components/members";
import ProjectsCards from "../_components/projects-cards";
import getData from "@/lib/getData";
import { OrgnaizationData } from "@/types/organizationData";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, FolderOpen } from "lucide-react";

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
  const createdAt = new Date(orgData.createdAt).toDateString();
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
      <header className="border-b flex items-center justify-between pb-4 mb-4">
        <div className="space-y-2">
          <div>
            <h1 className="text-3xl font-bold mb-2">{orgData.name}</h1>
            <p className="text-gray-400 text-sm">{orgData.description}</p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {createdAt}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <SettingsButton organization={organization} />
          <JoinCode joinCode={orgData.joinCode} />
        </div>
      </header>
      {/* memebnr */}
      <div>
        <div className="mb-5 flex gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold">Team Members :</h2>
          </div>

          <Members
            members={members}
            isOrgOwner={result.data.data.isOwner}
            orgId={orgData.id}
          />
        </div>
        {/* Project SEction */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold">Projects</h2>
              <Badge
                variant="secondary"
                className="bg-purple-500/20 text-purple-300 border-purple-500/30"
              >
                {projects.length}
              </Badge>
            </div>
            <CreateProjButton organization={organization} />
          </div>

          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-12 ">
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
        </div>
      </div>
    </div>
  );
}
