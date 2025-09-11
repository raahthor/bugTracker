import CreateProjForm from "../../_components/create-proj-form";

export default async function CreateProjectPage({
  params,
}: {
  params: { organization: string };
}) {
  const { organization } = await params;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <CreateProjForm organization={organization} />
      </div>
    </div>
  );
}
