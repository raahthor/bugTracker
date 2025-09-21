import CreateOrgForm from "./create-org-form";

export default function CreateOrgPage() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <CreateOrgForm />
      </div>
    </div>
  );
}
