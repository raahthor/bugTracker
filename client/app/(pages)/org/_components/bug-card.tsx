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
import { Bug } from "@/types/bug";
import { useRouter } from "next/navigation";

export default function BugCard({
  id,
  name,
  projectId,
  priority,
  status,
  description,
  createdAt,
  updatedAt,
}: Bug) {
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
        
      </CardFooter>
    </Card>
  );
}
