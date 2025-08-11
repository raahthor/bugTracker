import getData from "@/lib/getData";
import { OrgnaizationData } from "@/types/organizationData";

export default async function OrganizationPage({
  params,
}: {
  params: { organization: string };
}) {
  // fetch data about one particular org.
  const { organization } = await params;
  const result = await getData<OrgnaizationData>(
    `/api/org-data/${organization}`,
    "/org",
    "Organization not found"
  );
  console.log(result.data);
  return <div></div>;
}
