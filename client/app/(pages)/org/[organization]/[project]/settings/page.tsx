import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import getData from "@/lib/getData";
import { DeleteProj, UpdateProjDesc, UpdateProjName } from "../../../_components/proj-settings";
interface ProjData {
  projData: {
    id: string;
    name: string;
    description: string;
    orgId: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
  owner: { id: string; name: string; username: string; avatar: string };
  isOwner: boolean;
}

export default async function ProjSettingsPage({
  params,
}: {
  params: Promise<{ organization: string; project: string }>;
}) {
  const { organization, project } = await params;
  const result = await getData<ProjData>(
    `/api/settings/proj-data/${organization}/${project}`
  );
  const proj = result.data.data;

  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="px-8 ">
        <CardTitle className="self-center text-lg">Project Settings</CardTitle>
        <div className="flex gap-1 font-semibold text-muted-foreground">
          <p>Org owner &ensp;: </p>
          <Avatar className="w-6 h-6">
            <AvatarImage src={proj.owner.avatar} alt="User Image" />
          </Avatar>
          <p>{proj.owner.name}</p>
        </div>
        <UpdateProjName
          name={proj.projData.name}
          id={proj.projData.id}
          isOwner={result.data.data.isOwner}
        />
        <UpdateProjDesc
          description={proj.projData.description}
          id={proj.projData.id}
          isOwner={proj.isOwner}
        />
        <DeleteProj
          id={proj.projData.id}
          isOwner={proj.isOwner}
          organization={organization}
        />
      </Card>
    </div>
  );
}
