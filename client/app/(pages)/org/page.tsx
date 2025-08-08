import ToastSCError from "@/lib/toastSCError";

export default async function OrganizationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { message } = await searchParams;
  console.log(message);
  // get all orgs from backend
  // may be handle query param messaage in different way, like directly using toastError utils
  return (
    <div>
      <ToastSCError error={message} />
    </div>
  );
}
