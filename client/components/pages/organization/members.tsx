"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Member } from "@/types/organizationData";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

export default function Members({ members }: { members: Member[] }) {
  const [query, setQuery] = useState("");

  const filteredMem = members.filter((mem) =>
    mem.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-12 px-5 rounded-2xl">
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            {/* make this dynamic upto 3 users only */}
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
            </Avatar>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>All members in this organization</DialogTitle>
          <DialogDescription>
            Only owner of the organization can remove members from the
            organization.
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="grid gap-4">
          {filteredMem.length !== 0 ? (
            filteredMem.map((mem, idx) => (
              <div
                className="border rounded-md px-4 py-2 flex gap-4 items-center"
                key={idx}
              >
                <Avatar>
                  <AvatarImage src={mem.avatar} alt="user avatar" />
                </Avatar>
                <div className="text-start">
                  <p>{mem.name}</p>
                  <DialogDescription>{mem.email}</DialogDescription>
                </div>
                <RemoveMemBtn isOwner={mem.role === "OWNER"} userId={mem.id} />
              </div>
            ))
          ) : (
            <p>No member found</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
function RemoveMemBtn({
  isOwner,
  userId,
}: {
  isOwner: boolean;
  userId: string;
}) {
  async function removeUser() {
    alert("to be added");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`ml-auto ${isOwner && "hidden"}`}
          disabled={isOwner} //make it reverse
        >
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove this member?</DialogTitle>
          <DialogDescription>
            This user won't be able to access this organization but bugs raised
            by them will stay there.
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button variant={"destructive"} onClick={removeUser}>
            Remove
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
