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
import toastError, { isLengthError } from "@/lib/toastError";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function UpdateProjName({
  name,
  id,
  isOwner,
}: {
  name: string;
  id: string;
  isOwner: boolean;
}) {
  const [inputName, setInputName] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function updateProjName() {
    if (isLengthError("Name", inputName, 6)) return;
    try {
      const result = await axios.patch(
        `/api/proxy/api/settings/update-proj`,
        { name: inputName.trim(), id },
        { withCredentials: true }
      );
      if (result.data.success) {
        toast.success("Project updated");
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
            <Button onClick={updateProjName}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export function UpdateProjDesc({
  description,
  id,
  isOwner,
}: {
  description: string;
  id: string;
  isOwner: boolean;
}) {
  const [inputDescription, setInputDescription] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function updateProjDescription() {
    if (isLengthError("Description", inputDescription, 10)) return;
    try {
      const result = await axios.patch(
        `/api/proxy/api/settings/update-proj`,
        { description: inputDescription.trim(), id },
        { withCredentials: true }
      );
      if (result.data.success) {
        toast.success("Project updated");
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
            <Button onClick={updateProjDescription}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function DeleteProj({
  id,
  isOwner,
  organization,
}: {
  id: string;
  isOwner: boolean;
  organization: string;
}) {
  const [isUnmatched, setIsUnmatched] = useState(true);
  const router = useRouter();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "delete project") setIsUnmatched(false);
    else setIsUnmatched(true);
  }
  async function deleteProj() {
    try {
      const result = await axios.delete(
        `/api/proxy/api/settings/delete-proj/${id}`,
        { withCredentials: true }
      );
      if (result.data.success) {
        toast.success("Project deleted successfully");
        router.push(`/org/${organization}`);
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
            Delete Project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are Sure?</DialogTitle>
            <DialogDescription>
              This operation is irreversible and alongwith the project all of
              it&apos;s bugs will also be deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Label>
              Type{" "}
              <span className="text-red-500 font-bold">
                &quot;delete project&quot;
              </span>{" "}
              below to confirm
            </Label>
            <Input onChange={handleChange} />
          </div>
          <DialogFooter>
            <Button
              variant={"destructive"}
              onClick={deleteProj}
              disabled={isUnmatched}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
