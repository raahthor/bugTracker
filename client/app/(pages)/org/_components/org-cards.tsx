"use client";
import { Badge } from "@/components/ui/badge";
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
  const date = new Date(updatedAt).toLocaleString("en-IN", {
    dateStyle: "short",
    timeStyle: "short",
  });
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {name}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Badge variant="outline">{role}</Badge>
        </CardAction>
      </CardHeader>
      {/* <CardContent>
        <p>{description}</p>
      </CardContent> */}
      <CardFooter className="flex-col items-start gap-2 text-xs">
        <div className="text-muted-foreground">Updated : {date}</div>
        {/* <div className="line-clamp-1 flex gap-2 font-medium"></div> */}
        <Button className=" w-20" onClick={() => router.push(`/org/${handle}`)}>
          Open
        </Button>
      </CardFooter>
    </Card>
  );
}
