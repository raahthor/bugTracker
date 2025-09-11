"use client";
import { Button } from "@/components/ui/button";
import { IconCopy, IconSettings } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function OrgHeader({
  name,
  joinCode,
  description,
  createdAt,
  organization,
}: {
  name: string;
  joinCode: string;
  description: string;
  createdAt: string;
  organization: string;
}) {
  const router = useRouter();
  const date = new Date(createdAt).toLocaleDateString("en-IN", {
    dateStyle: "medium",
  });
  function copyToClip() {
    try {
      navigator.clipboard.writeText(joinCode);
      toast.success("Copied");
    } catch (error) {
      toast.error("An error occured while copying!");
    }
  }
  return (
    <div>
      <div className="flex justify-between px-2">
        <p>{name}</p>
        <Button
          variant={"outline"}
          onClick={() => router.push(`/org/${organization}/settings`)}
        >
          <IconSettings />
        </Button>
      </div>

      <div className="flex px-4 justify-end items-center">
        <p id="joinCode" className="border border-gray-400 px-2.5 rounded-l-md">
          {joinCode}
        </p>
        <Button
          onClick={copyToClip}
          variant="outline"
          className="h-6.25 w-6.25 border-gray-400 rounded-l-none "
        >
          <IconCopy />
        </Button>
      </div>
      <p>{description}</p>
      <p>Created : {date}</p>
    </div>
  );
}
