export default async function ProjectPage({
  params,
}: {
  params: { organization: string; project: string };
}) {
  const { organization, project } = await params;
  return (
    <div>
      ProjectPage:{organization} and slug: {project}
    </div>
  );
}
