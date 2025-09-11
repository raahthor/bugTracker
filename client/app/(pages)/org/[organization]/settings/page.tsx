import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import getData from "@/lib/getData";
import {
  DeleteOrg,
  UpdateOrgDesc,
  UpdateOrgHandle,
  UpdateOrgName,
} from "../../_components/org-settings";

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
  params: Promise<{ organization: string }>;
}) {
  const { organization } = await params;
  const result = await getData<OrgData>(
    `/api/settings/org-data/${organization}`
  );
  const orgData = result.data.data;
  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="px-8 ">
        <CardTitle className="self-center text-lg">
          Organization Settings
        </CardTitle>
        <UpdateOrgName
          name={orgData.org.name}
          handle={orgData.org.handle}
          isOwner={result.data.data.isOwner}
        />
        <div className="flex gap-1 font-semibold">
          <p>Owner : </p>
          <Avatar className="w-6 h-6">
            <AvatarImage src={orgData.org.owner.avatar} alt="User Image" />
          </Avatar>
          <p>{orgData.org.owner.name}</p>
        </div>
        <UpdateOrgHandle
          handle={orgData.org.handle}
          isOwner={orgData.isOwner}
        />
        <UpdateOrgDesc
          description={orgData.org.description}
          handle={orgData.org.handle}
          isOwner={orgData.isOwner}
        />
        <DeleteOrg id={orgData.org.id} isOwner={orgData.isOwner} />
      </Card>
    </div>
  );
}
