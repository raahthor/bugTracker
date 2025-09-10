"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CreateProjButton({
  organization,
}: {
  organization: string;
}) {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => router.push(`/org/${organization}/create-project`)}
      >
        Create Project
      </Button>
    </div>
  );
}
