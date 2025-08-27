import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import getData from "@/lib/getData";
import {
  DeleteOrg,
  UpdateOrgDesc,
  UpdateOrgHandle,
  UpdateOrgName,
} from "./org-settings";

interface OrgData {
  org: {
    id: string;
    handle: string;
    joinCode: string;
    name: string;
    description: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    owner: { name: string; username: string; avatar: string };
  };
  isOwner: boolean;
}

export default async function OrgSettingsPage({
  params,
}: {
  params: { organization: string };
}) {
  const { organization } = await params;
  const result = await getData<OrgData>(
    `/api/settings/org-data/${organization}`
  );

  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="px-8 ">
        <CardTitle className="self-center text-lg">
          Organization Settings
        </CardTitle>
        <UpdateOrgName
          name={result.data.data.org.name}
          isOwner={result.data.data.isOwner}
        />
        <div className="flex gap-1 font-semibold">
          <p>Owner : </p>
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={result.data.data.org.owner.avatar}
              alt="User Image"
            />
          </Avatar>
          <p>{result.data.data.org.owner.name}</p>
        </div>
        <UpdateOrgHandle
          handle={result.data.data.org.handle}
          isOwner={result.data.data.isOwner}
        />
        <UpdateOrgDesc
          description={result.data.data.org.description}
          isOwner={result.data.data.isOwner}
        />
        <DeleteOrg
          id={result.data.data.org.id}
          isOwner={result.data.data.isOwner}
        />
      </Card>
    </div>
  );
}
