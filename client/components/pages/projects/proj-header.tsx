"use client";
import { Bug } from "@/types/ProjectData";
import { useRouter } from "next/navigation";

export default function ProjHeader({
  name,
  description,
  createdAt,
}: {
  name: string;
  description: string;
  createdAt: string;
}) {
  const router = useRouter();
  const date = new Date(createdAt).toLocaleDateString("en-IN", {
    dateStyle: "medium",
  });
  return (
    <header>
      <p>{name}</p>
      <p>{description}</p>
      <p>Created : {date}</p>
    </header>
  );
}
