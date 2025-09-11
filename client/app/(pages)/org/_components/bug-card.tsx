"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bug } from "@/types/bug";

export default function BugCard({
  name,
  description,
  updatedAt,
}: Bug) {
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
