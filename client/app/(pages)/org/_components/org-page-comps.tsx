"use client";

import { Button } from "@/components/ui/button";
import { IconCopy } from "@tabler/icons-react";
import { Plus, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { useState } from "react";
import toastError, { isLengthError } from "@/lib/toastError";
import { ResponseExt } from "@/types/responseExt";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";

export function CreateProjButton({ organization }: { organization: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });

  function handleUserInput(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("triggered");
    e.preventDefault();
    if (
      isLengthError("Name", userInput.name, 6) ||
      isLengthError("Description", userInput.description, 10)
    )
      return;

    try {
      setIsSubmitting(true);
      const response: ResponseExt<{ slug: string }> = await axios.post(
        `/api/proxy/api/project/${organization}/create-project`,
        {
          name: userInput.name.trim(),
          description: userInput.description.trim(),
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        router.push(`/org/${organization}/${response.data.data?.slug}`);
      }
    } catch (err) {
      toastError(err);
      if (axios.isAxiosError(err) && err.response?.status === 401)
        router.push("/login?message=Unauthorized!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-1" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Fill up the details to create project.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Project Name</Label>
              <Input
                name="name"
                type="text"
                value={userInput.name}
                onChange={handleUserInput}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">About Your Project</Label>
              <Textarea
                name="description"
                value={userInput.description}
                onChange={handleUserInput}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating ..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export function JoinCode({ joinCode }: { joinCode: string }) {
  function copyToClip() {
    try {
      navigator.clipboard.writeText(joinCode);
      toast.success("Copied");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("An error occured while copying!");
    }
  }
  return (
    <div className="flex px-4 justify-end items-center">
      <p
        id="joinCode"
        className="border border-gray-400/60 px-3 py-1 rounded-l-md"
      >
        {joinCode}
      </p>
      <Button
        onClick={copyToClip}
        variant="outline"
        className="h-fit w-fit border border-gray-400/60 rounded-l-none "
      >
        <IconCopy />
      </Button>
    </div>
  );
}
export function SettingsButton({ organization }: { organization: string }) {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={() => router.push(`/org/${organization}/settings`)}
    >
      <Settings />
    </Button>
  );
}
