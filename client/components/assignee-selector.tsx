"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Member } from "@/types/ProjectData";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import toastError from "@/lib/toastError";
import { toast } from "sonner";

export default function AssigneeSelector({
  members,
  bugId,
  setIsOpen,
}: {
  members: Member[];
  bugId: string;

  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [user, setUsername] = React.useState<Member["user"] | null>();
  const [query, setQuery] = React.useState("");

  const filteredMembers = members.filter((m) =>
    m.user.name.toLowerCase().includes(query.toLowerCase())
  );

  async function assignBug() {
    try {
      const result = await axios.patch(
        `/api/proxy/api/project/assign-bug`,
        {
          bugId,
          userId: user?.id,
        },
        { withCredentials: true }
      );
      if (result.data.success) {
        toast.success(result.data.message);
        setIsOpen(false);
        router.refresh();
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401)
        router.push("/login?message=Unauthorized");
      else toastError(err);
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild className="max-w-30 truncate">
          <Button variant="outline">
            {user ? user.name : "Select Member"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <Label htmlFor="search">Member Name</Label>
            <Input value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="grid gap-4">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((mem, idx) => (
                <DialogClose key={idx} asChild>
                  <Button
                    variant="outline"
                    className="h-15 flex gap-2 justify-start"
                    onClick={() => setUsername(mem.user)}
                  >
                    <Avatar>
                      <AvatarImage src={mem.user.avatar} alt="user avatar" />
                    </Avatar>
                    <div className="text-start">
                      <p>{mem.user.name}</p>
                      <DialogDescription>
                        @ {mem.user.username}
                      </DialogDescription>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto",
                        user?.username === mem.user.username
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </Button>
                </DialogClose>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Button className="min-[450px]:w-30" disabled={!user} onClick={assignBug}>
        Assign
      </Button>
    </>
  );
}
