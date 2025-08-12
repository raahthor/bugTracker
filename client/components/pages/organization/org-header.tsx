"use client";
import { Button } from "@/components/ui/button";
import { Member } from "@/types/organizationData";
import { IconCopy } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function OrgHeader({
  name,
  joinCode,
  description,
  createdAt,
  organization,
  members,
}: {
  name: string;
  joinCode: string;
  description: string;
  createdAt: string;
  organization: string;
  members: Member[];
}) {
  const router = useRouter();
  const date = new Date(createdAt).toLocaleDateString("en-IN", {
    dateStyle: "medium",
  });
  function copyToClip(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    e.preventDefault();
  }
  return (
    <div>
      <p>{name}</p>
      <div className="flex px-4 justify-end items-center">
        <p id="joinCode" className="border border-gray-400 px-2.5 rounded-l-md">
          {joinCode}
        </p>
        <Button
          // onClick={copyToClip}
          variant="outline"
          className="h-6.25 w-6.25 border-gray-400 rounded-l-none "
        >
          <IconCopy />
        </Button>
      </div>

      <p>{description}</p>
      <p>Created : {date}</p>
      <div className="flex gap-1 text-sm">
        Members: (avatars)
        <div className="flex gap-1">
          {members.map((mem, idx) => (
            <p key={idx}>
              {idx + 1}. {mem.name} ({mem.role})
            </p>
          ))}
        </div>
      </div>

      <div>
        <Button
          onClick={() => router.push(`/org/${organization}/create-project`)}
        >
          Create Project
        </Button>
      </div>
    </div>
  );
}
