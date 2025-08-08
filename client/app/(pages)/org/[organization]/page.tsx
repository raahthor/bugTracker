export default async function Organization({
  params,
}: {
  params: { organization: string };
}) {
  // fetch data about one particular org.
  const { organization } = await params;
  console.log(organization);
  return <div>Organization</div>;
  
}
