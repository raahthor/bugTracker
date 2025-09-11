"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import toastError, { isLengthError } from "@/lib/toastError";
import axios from "axios";
import { env } from "@/lib/env";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function UpdateOrgName({
  name,
  handle,
  isOwner,
}: {
  name: string;
  handle: string;
  isOwner: boolean;
}) {
  const [inputName, setInputName] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function updateOrgName() {
    if (isLengthError("Name", inputName, 6)) return;
    try {
      const result = await axios.patch(
        `${env.API_URL}/api/settings/update-org`,
        { name: inputName.trim(), handle },
        { withCredentials: true }
      );
      if (result.data.success) {
        toast.success("Organization updated.");
        router.refresh();
      }
      setOpen(false);
    } catch (err) {
      toastError(err);
    }
  }
  return (
    <div className="flex items-center">
      <p className="font-semibold">Name : {name}</p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link" disabled={!isOwner}>
            Edit
          </Button>
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
  handle,
  isOwner,
}: {
  description: string;
  handle: string;
  isOwner: boolean;
}) {
  const [inputDescription, setInputDescription] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function updateOrgDescription() {
    if (isLengthError("Description", inputDescription, 10)) return;
    try {
      const result = await axios.patch(
        `${env.API_URL}/api/settings/update-org`,
        { description: inputDescription.trim(), handle },
        { withCredentials: true }
      );
      if (result.data.success) {
        toast.success("Organization updated.");
        router.refresh();
      }
      setOpen(false);
    } catch (err) {
      toastError(err);
    }
  }
  return (
    <div className="flex font-semibold gap-1">
      <p className="min-w-fit">Description : </p>
      <p className=" max-w-[150px]">{description}</p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link" disabled={!isOwner}>
            Edit
          </Button>
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
              onChange={(e) => setInputDescription(e.target.value)}
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
  const router = useRouter();

  async function updateOrgHandle() {
    if (isLengthError("Handle", inputHandle, 6)) return;
    try {
      const result = await axios.patch(
        `${env.API_URL}/api/settings/update-org`,
        { newHandle: inputHandle.trim(), handle },
        { withCredentials: true }
      );
      if (result.data.success) {
        toast.success("Organization updated.");
        router.push(`/org/${result.data.data}/settings`);
      }
    } catch (err) {
      console.error(err);
      toastError(err);
    }
  }
  return (
    <div className="flex items-center">
      <p className="font-semibold">Handle : {handle}</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" disabled={!isOwner}>
            Edit
          </Button>
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
  const router = useRouter();
  async function deleteOrg() {
    try {
      const result = await axios.delete(
        `${env.API_URL}/api/settings/delete-org/${id}`,
        { withCredentials: true }
      );
      if (result.data.success) {
        toast.success("Organization deleted successfully.");
        router.push("/org");
      }
    } catch (err) {
      toastError(err);
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive" disabled={!isOwner}>
            Delete Organization
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are Sure?</DialogTitle>
            <DialogDescription>
              Deleted organizations can still be recovered from recovery tab
              under 30 days after deletion.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant={"destructive"} onClick={deleteOrg}>
              Delete
            </Button>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
