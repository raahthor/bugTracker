"use client";

import { Button } from "@/components/ui/button";
import { IconCopy } from "@tabler/icons-react";
import { Plus, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CreateProjButton({ organization }: { organization: string }) {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => router.push(`/org/${organization}/create-project`)}
      >
        <Plus className="w-4 h-4 mr-1" />
        Create Project
      </Button>
    </div>
  );
}

export function JoinCode({ joinCode }: { joinCode: string }) {
  function copyToClip() {
    try {
      navigator.clipboard.writeText(joinCode);
      toast.success("Copied");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("An error occured while copying!");
    }
  }
  return (
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
  );
}
export function SettingsButton({ organization }: { organization: string }) {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="lg"
      className="hover:bg-gray-800"
      onClick={() => router.push(`/org/${organization}/settings`)}
    >
      <Settings className="w-5 h-5" />
    </Button>
  );
}
