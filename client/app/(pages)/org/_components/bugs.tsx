"use client";
import CloseBug from "@/components/closeBug";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { useRouter } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bug, Calendar, Clock, User } from "lucide-react";
import { BugProj, Member } from "@/types/ProjectData";
import AssigneeSelector from "@/components/assignee-selector";
import { useState } from "react";

export default function Bugs({
  bugs,
  members,
}: {
  bugs: BugProj[];
  members: Member[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" grid grid-cols-1 gap-4  ">
      {bugs.length !== 0 ? (
        bugs.map((bug, idx) => (
          <Dialog key={idx} open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                className="h-fit flex flex-col items-start"
                variant={"outline"}
              >
                <BugCard bug={bug} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="mb-2">
                <DialogTitle className="text-2xl font-bold">
                  {bug.name}
                </DialogTitle>
                <DialogDescription className="text-gray-300 leading-relaxed mt-2 text-base">
                  {bug.description}
                </DialogDescription>
              </div>

              <div className="space-y-2">
                <div className="p-2 rounded-md flex items-center gap-3 border border-green-500/20 bg-green-600/10">
                  <div className="p-2 rounded-full bg-green-500/20">
                    <Calendar className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Created</p>
                    <p className="text-sm text-gray-200 font-semibold">
                      {new Date(bug.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-md flex items-center gap-3 border border-blue-500/20 bg-blue-600/10">
                  <div className="p-2 rounded-full bg-blue-500/20">
                    <Clock className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Updated</p>
                    <p className="text-sm text-gray-200 font-semibold">
                      {new Date(bug.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-md flex items-center gap-3  border border-purple-500/20 bg-purple-600/10">
                  <div className="p-2 rounded-full bg-purple-500/20">
                    <User className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 font-medium">
                      Raised by:
                    </span>
                    <Avatar className="h-8 w-8 ">
                      <AvatarImage src={bug.raisedByUser.avatar} alt="avatar" />
                    </Avatar>
                    <span className="text-sm text-gray-200 font-semibold">
                      {bug.raisedByUser.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="flex gap-3">
                  <AssigneeSelector
                    bugId={bug.id}
                    members={members}
                    setIsOpen={setIsOpen}
                  />
                </div>

                <CloseBug bugId={bug.id} setIsOpen={setIsOpen} />
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
              No bugs
            </CardTitle>
            <CardDescription className="text-base mt-2">
              You&apos;re all caught up! Check back later for new assignments.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}

function BugCard({ bug }: { bug: BugProj }) {
  return (
    <>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Bug className="h-3 w-3" />
        <h3 className="text-lg font-semibold text-white">{bug.name}</h3>
      </div>

      <div className="w-full flex items-end justify-between">
        <div className="flex flex-col items-start md:flex-row gap-2">
          <Badge
            variant="outline"
            className={`${
              bug.status === "OPEN"
                ? "bg-green-500"
                : bug.status === "IN_PROGRESS" && "bg-yellow-300"
            }`}
          >
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
        <div>
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <span>Raised :</span>
            <User className="h-3 w-3" />
            <span>{bug.raisedByUser.name}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <span>Assigned :</span>

            {bug.assignedUser ? (
              <>
                <User className="h-3 w-3" />
                <span> {bug.assignedUser.name}</span>
              </>
            ) : (
              <span>Not Assigned</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
