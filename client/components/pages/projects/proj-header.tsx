"use client";
import { Button } from "@/components/ui/button";
import { Bug } from "@/types/bug";
import { IconSettings } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ProjHeader({
  name,
  description,
  createdAt,
  organization,
  project,
}: {
  name: string;
  description: string;
  createdAt: string;
  organization: string;
  project: string;
}) {
  const router = useRouter();
  const date = new Date(createdAt).toLocaleDateString("en-IN", {
    dateStyle: "medium",
  });
  return (
    <header>
      <p>{name}</p>
      <Button
        variant={"outline"}
        onClick={() => router.push(`/org/${organization}/${project}/settings`)}
      >
        <IconSettings />
      </Button>
      <p>{description}</p>
      <p>Created : {date}</p>
    </header>
  );
}
