import getData from "@/lib/getData";

export default async function OrganizationPage({
  params,
}: {
  params: { organization: string };
}) {
  // fetch data about one particular org.
  const { organization } = await params;
  const result = await getData<unknown>(
    `/api/org-data/${organization}`,
    "/org",
    "Organization not found"
  );
  console.log(result.data);
  return <div>Organization handle:{organization}</div>;
}
