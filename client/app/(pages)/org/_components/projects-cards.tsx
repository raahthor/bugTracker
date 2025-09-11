"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {name}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>{/* <Badge variant="outline">{role}</Badge> */}</CardAction>
      </CardHeader>
      {/* <CardContent>
        <p>{description}</p>
      </CardContent> */}
      <CardFooter className="flex-col items-start gap-2 text-xs">
        <div className="text-muted-foreground">Updated : {date}</div>
        {/* <div className="line-clamp-1 flex gap-2 font-medium"></div> */}
        <Button
          className=" w-20"
          onClick={() => router.push(`/org/${organization}/${slug}`)}
        >
          Open
        </Button>
      </CardFooter>
    </Card>
  );
}
