"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Building2, RotateCw, ArrowRight } from "lucide-react";
import Link from "next/link";

export function OrgButtons() {
  return (
    <>
      <Button
        asChild
        size="lg"
        className="bg-primary shadow-lg hover:shadow-primary/25 transition-all duration-300 group cursor-pointer"
      >
        <Link href="/create-org">
          <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          Create Organization
        </Link>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className="transition-all duration-300 group cursor-pointer"
      >
        <Link href="/join-org">
          <Building2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
          Join Organization
        </Link>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className="bg-primary shadow-lg hover:shadow-primary/25 transition-all duration-300 group cursor-pointer"
      >
        <Link href="/recover-orgs">
          <RotateCw className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          Recover organizations
        </Link>
      </Button>
    </>
  );
}

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
  const date = new Date(updatedAt).toDateString();
  return (
    <Link href={`/org/${handle}`} className="block group">
      <Card className="@container/card bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 cursor-pointer">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {name.charAt(0)}
                  </span>
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
                @{handle}
              </Badge>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <p className="text-muted-foreground text-sm">Updated : {date}</p>
          <Badge variant="outline" className="text-xs">
            {role}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
