import getData from "@/lib/getData";

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
  console.log(result.data);
  return <div>OrgSettingsPage</div>;
}
