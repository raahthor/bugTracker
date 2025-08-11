"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ProjectsCards({
  id,
  name,
  orgId,
  slug,
  description,
  createdAt,
  updatedAt,
  organization,
}: {
  id: string;
  name: string;
  orgId: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  organization: string;
}) {
  const router = useRouter();
  const date = new Date(updatedAt).toLocaleDateString("en-IN", {
    dateStyle: "medium",
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Last Update: {date}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => router.push(`/org/${organization}/${slug}`)}>
          Open
        </Button>
      </CardFooter>
    </Card>
  );
}
