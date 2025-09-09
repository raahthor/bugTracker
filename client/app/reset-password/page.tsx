import ResetPageForm from "./reset-page-form";

export default async function ResetPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { token } = await searchParams;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPageForm token={token} />
      </div>
    </div>
  );
}
