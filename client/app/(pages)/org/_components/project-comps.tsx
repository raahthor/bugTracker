"use client";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProjSettingsBtn({
  organization,
  project,
}: {
  organization: string;
  project: string;
}) {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="lg"
      className="hover:bg-gray-800"
      onClick={() => router.push(`/org/${organization}/${project}/settings`)}
    >
      <Settings className="w-5 h-5" />
    </Button>
  );
}
