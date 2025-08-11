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
  createdAt,
  updatedAt,
}: {
  id: string;
  name: string;
  orgId: string;
  createdAt: string;
  updatedAt: string;
}) {
  const router = useRouter();
  // const date = new Date(updatedAt).toLocaleString("en-IN");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p></p>
      </CardContent>
      <CardFooter>
        {/* <Button onClick={() => router.push(`/org/${handle}`)}>Open</Button> */}
      </CardFooter>
    </Card>
  );
}
