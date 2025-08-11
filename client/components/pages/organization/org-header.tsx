import { Button } from "@/components/ui/button";
import { IconCopy } from "@tabler/icons-react";

export default function OrgHeader({
  name,
  joinCode,
  description,
  createdAt,
}: {
  name: string;
  joinCode: string;
  description: string;
  createdAt: string;
}) {
  const date = new Date(createdAt).toLocaleDateString("en-IN", {
    dateStyle: "medium",
  });
  function copyToClip(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    e.preventDefault();
  }
  return (
    <div>
      <div>
        <p>{name}</p>
        <div className="flex px-4 justify-end items-center">
          <p id="joinCode" className="border border-gray-500 px-2.5 rounded-l-md">
            {joinCode}
          </p>
          <Button
            // onClick={copyToClip}
            variant="outline"
            className="h-6.25 w-6.25 border-gray-500 rounded-l-none "
          >
            <IconCopy />
          </Button>
        </div>

        <p>{description}</p>
        <p>{date}</p>
        <p>Members: (avatars)</p>
      </div>
    </div>
  );
}
