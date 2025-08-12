"use client";
import { Bug } from "@/types/ProjectData";
import { useRouter } from "next/navigation";

export default function ProjHeader({
  name,
  description,
  createdAt,
  bugs,
}: {
  name: string;
  description: string;
  createdAt: string;
  bugs: Bug[];
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
      <div className="flex gap-1 text-sm">
        <div className="flex gap-1">
          {bugs.map((bug, idx) => (
            <p key={idx}>
              {idx + 1}. {bug.name}, ({bug.description})
            </p>
          ))}
        </div>
      </div>
    </header>
  );
}
