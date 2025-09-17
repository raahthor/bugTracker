"use client";
import CloseBug from "@/components/table/closeBug";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BugExt as RecentBug } from "@/types/DashboardData";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Bug, Calendar, ExternalLink, User } from "lucide-react";

export default function BugArr({ bugs }: { bugs: RecentBug[] }) {
  const router = useRouter();
  return (
    <div className=" grid grid-cols-1 gap-4 px-4 lg:px-12 ">
      {bugs.length !== 0 ? (
        bugs.map((bug, idx) => (
          <Dialog key={idx}>
            <DialogTrigger asChild>
              <Button
                className="h-fit flex flex-col items-start"
                variant="outline"
              >
                <BugCard bug={bug} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className=" flex flex-col gap-2 text-sm items-start">
                <DialogTitle className="capitalize text-xl">
                  {bug.name}
                </DialogTitle>
                <DialogDescription className="text-gray-300 leading-relaxed">
                  {bug.description}
                </DialogDescription>
                <div className="flex items-center gap-2 text-gray-400 bg-white/5 rounded-lg px-3 py-2 w-full">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Created: {new Date(bug.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-1 my-1 items-center">
                  Raised By :
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={bug.raisedByUser.avatar} alt="avatar" />
                  </Avatar>
                  {bug.raisedByUser.name}
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(
                      `/org/${bug.project.organization.handle}/${bug.project.slug}`
                    )
                  }
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Project
                </Button>
                <CloseBug bugId={bug.id} />
              </div>
            </DialogContent>
          </Dialog>
        ))
      ) : (
        <Card className="bg-card/30 border-dashed border-2 ">
          <CardHeader className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Bug className="w-8 h-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-muted-foreground text-lg font-medium">
              No bugs assigned to you
            </CardTitle>
            <CardDescription className="text-base mt-2">
              You're all caught up! Check back later for new assignments.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}

function BugCard({ bug }: { bug: RecentBug }) {
  return (
    <>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Bug className="h-3 w-3" />
        <span>
          Belongs to {bug.project.name} in {bug.project.organization.handle}
        </span>
      </div>
      <h3 className="text-lg font-semibold">{bug.name}</h3>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-500/30 text-yellow-100">
            {bug.status}
          </Badge>
          <Badge
            variant="outline"
            className={`${
              bug.priority === "HIGH"
                ? "bg-red-500/20  text-red-200"
                : bug.priority === "MEDIUM"
                ? "bg-orange-600/50  text-orange-200 "
                : "bg-green-500/20 text-green-200"
            }`}
          >
            {bug.priority}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-300">
          <span>Raised :</span>
          <User className="h-3 w-3" />
          <span>{bug.raisedByUser.name}</span>
        </div>
      </div>
    </>
  );
}
