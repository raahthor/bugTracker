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
import { Label } from "@/components/ui/label";
import toastError, { isLengthError } from "@/lib/toastError";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function UpdateName({ name }: { name: string | undefined }) {
  const router = useRouter();
  const [inputName, setInputName] = useState("");
  const [open, setOpen] = useState(false);

  async function updateName() {
    if (isLengthError("Name", inputName, 6)) return;
    try {
      const result = await axios.patch(
        `/api/proxy/api/update-user`,
        { name: inputName },
        { withCredentials: true }
      );
      // console.log(result.data);
      if (result.data.success) {
        toast.success("Name changed successfully");
        setOpen(false);
        router.refresh();
      }
    } catch (err) {
      toastError(err);
    }
  }
  return (
    <div className="flex items-center justify-between">
      <p className="font-semibold">Name &emsp; &ensp;: {name}</p>
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
            <Button onClick={updateName}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function UpdateUsername({ username }: { username: string | undefined }) {
  const router = useRouter();
  const [inputUsername, setInputUsername] = useState("");
  async function updateUsername() {
    if (isLengthError("Username", inputUsername, 4)) return;
    try {
      const result = await axios.patch(
        `/api/proxy/api/settings/update-user`,
        { username: inputUsername },
        { withCredentials: true }
      );
      // console.log(result.data);
      if (result.data.success) {
        toast.success("Username changed successfully");
        router.push(`/u/${result.data.data.username}/settings`);
      }
    } catch (err) {
      toastError(err);
    }
  }
  return (
    <div className="flex items-center justify-between">
      <p className="font-semibold">Username : {username}</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Username</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Label>New Username</Label>
            <Input
              name="username"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value.trim())}
            />
          </div>
          <DialogFooter>
            <Button onClick={updateUsername}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function UpdatePassword() {
  const [open, setOpen] = useState(false);
  const [inputPassword, setInputPassword] = useState({
    oldPass: "",
    newPass: "",
    confPass: "",
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  }
  async function updatePassword() {
    if (
      inputPassword.confPass.length === 0 ||
      inputPassword.newPass.length === 0 ||
      inputPassword.oldPass.length === 0
    ) {
      toast.error("All fields required");
      return;
    }
    if (isLengthError("Password", inputPassword.newPass, 6)) return;
    if (inputPassword.newPass !== inputPassword.confPass) {
      toast.error("Password doesn't match");
      return;
    }
    try {
      const result = await axios.patch(
        `/api/proxy/api/settings/change-password`,
        { oldPass: inputPassword.oldPass, newPass: inputPassword.newPass },
        { withCredentials: true }
      );
      if (result.data.success) {
        toast.success("Password changed successfully");
        setOpen(false);
      }
    } catch (err) {
      toastError(err);
    }
  }

  return (
    <div className="flex items-center justify-between">
      <p className="font-semibold">Password&ensp;: </p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link">Change Password</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Label>Old Password</Label>
            <Input
              name="oldPass"
              type="password"
              value={inputPassword.oldPass}
              onChange={handleChange}
            />
            <Label>New Password</Label>
            <Input
              name="newPass"
              type="password"
              value={inputPassword.newPass}
              onChange={handleChange}
            />
            <Label>Confirm Password</Label>
            <Input
              name="confPass"
              type="password"
              value={inputPassword.confPass}
              onChange={handleChange}
            />
          </div>
          <DialogFooter>
            <Button onClick={updatePassword}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
