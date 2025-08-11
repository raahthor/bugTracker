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

export default function OrgCards({
  name,
  role,
  updatedAt,
  handle,
  description,
}: {
  name: string;
  role: string;
  updatedAt: string;
  handle: string;
  description: string;
}) {
  const router = useRouter();
  // const date = new Date(updatedAt).toLocaleString("en-IN");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>You're {role}</CardAction>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => router.push(`/org/${handle}`)}>Open</Button>
      </CardFooter>
    </Card>
  );
}
