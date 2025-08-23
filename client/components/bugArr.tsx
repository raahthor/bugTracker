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
import { Avatar,AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function BugArr({ bugs }: { bugs: RecentBug[] }) {
  const router = useRouter();
  return (
    <div className=" grid grid-cols-1 gap-4 px-4 lg:px-12 ">
      {bugs.length !== 0 ? (
        bugs.map((bug, idx) => (
          <Dialog key={idx}>
            <DialogTrigger asChild>
              <Button
                className="flex-col gap-2 px-2 h-16 items-start"
                variant="outline"
              >
                <BugCard bug={bug} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className=" flex flex-col gap-2 text-sm items-start">
                <DialogTitle className=" capitalize">{bug.name}</DialogTitle>
                <DialogDescription>{bug.description}</DialogDescription>
                <p>Created : {new Date(bug.createdAt).toLocaleString()}</p>
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
                  Open Project
                </Button>
                <CloseBug bugId={bug.id} />
              </div>
            </DialogContent>
          </Dialog>
        ))
      ) : (
        <p>No bugs assigned to you</p>
      )}
    </div>
  );
}

function BugCard({ bug }: { bug: RecentBug }) {
  return (
    <>
      <p className="text-muted-foreground text-sm pl-4">
        Belongs to {bug.project.name} - @ {bug.project.organization.handle}
      </p>
      <div className="flex flex-row justify-around w-full">
        <p>{bug.name}</p>
        <div className="h-full border border-black/40" />
        <Badge variant="outline" className="bg-yellow-300 border-x ">
          {bug.status}
        </Badge>
        <div className="h-full border border-black/40" />
        <Badge
          variant="outline"
          className={`${
            bug.priority === "HIGH"
              ? "bg-red-400"
              : bug.priority === "MEDIUM" && "bg-orange-300"
          }`}
        >
          {bug.priority}
        </Badge>
        <div className="h-full border border-black/40" />
        <p>{bug.raisedByUser.name}</p>
      </div>
    </>
  );
}
