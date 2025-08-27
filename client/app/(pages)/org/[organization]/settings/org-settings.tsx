"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export function UpdateOrgName({
  name,
  isOwner,
}: {
  name: string;
  isOwner: boolean;
}) {
  const [inputName, setInputName] = useState("");
  const [open, setOpen] = useState(false);
  function updateOrgName() {}
  return (
    <div className="flex items-center">
      <p className="font-semibold">Name : {name}</p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Name</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Label>New Name</Label>
            <Input
              name="name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={updateOrgName}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export function UpdateOrgDesc({
  description,
  isOwner,
}: {
  description: string;
  isOwner: boolean;
}) {
  const [inputDescription, setInputDescription] = useState("");
  function updateOrgDescription() {}
  return (
    <div className="flex font-semibold gap-1">
      <p className="min-w-fit">Description : </p>
      <p className=" max-w-[150px]">{description}</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Description</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Label>New Description</Label>
            <Input
              name="desription"
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value.trim())}
            />
          </div>
          <DialogFooter>
            <Button onClick={updateOrgDescription}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export function UpdateOrgHandle({
  handle,
  isOwner,
}: {
  handle: string;
  isOwner: boolean;
}) {
  const [inputHandle, setInputHandle] = useState("");
  function updateOrgHandle() {}
  return (
    <div className="flex items-center">
      <p className="font-semibold">Handle : {handle}</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Handle</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Label>New Handle</Label>
            <Input
              name="handle"
              value={inputHandle}
              onChange={(e) => setInputHandle(e.target.value.trim())}
            />
          </div>
          <DialogFooter>
            <Button onClick={updateOrgHandle}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export function DeleteOrg({ id, isOwner }: { id: string; isOwner: boolean }) {
  return (
    <div>
      <Button>Delete Organization</Button>
    </div>
  );
}
