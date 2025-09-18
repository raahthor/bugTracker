"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Folder } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProjectsCards({
  name,
  slug,
  description,
  updatedAt,
  organization,
}: {
  name: string;
  slug: string;
  description: string;
  updatedAt: string;
  organization: string;
}) {
  const router = useRouter();
  const date = new Date(updatedAt).toLocaleDateString("en-IN", {
    dateStyle: "medium",
  });
  return (
    <Card
      onClick={() => router.push(`/org/${organization}/${slug}`)}
      className="@container/card bg-card/50 backdrop-blur-sm  hover:border-primary/50 transition-all duration-300 group cursor-pointer"
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
                <Folder size="20" />
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {name}
              </CardTitle>
            </div>
            <CardDescription className="text-base">
              {description}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="text-xs">
              @{organization}
            </Badge>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </CardHeader>
      <CardFooter className="text-sm text-muted-foreground">Updated : {date}</CardFooter>
    </Card>
  );
}
