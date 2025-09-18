"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import toastError, { isLengthError } from "@/lib/toastError";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function CreateBug({
  organization,
  project,
}: {
  organization: string;
  project: string;
}) {
  return <BugDialogBox organization={organization} project={project} />;
}

function BugDialogBox({
  organization,
  project,
}: {
  organization: string;
  project: string;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [priorityVal, setPriorityVal] = useState("");
  const [userInput, setUserInput] = useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });

  function handleUserInput(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      isLengthError("Name", userInput.name, 5) ||
      isLengthError("Description", userInput.description, 10)
    )
      return;
    try {
      setIsSubmitting(true);
      const result = await axios.post(
        `/api/proxy/api/project/${organization}/${project}/create-bug`,
        {
          name: userInput.name.trim(),
          priority: priorityVal || "MEDIUM",
          description: userInput.description.trim(),
        },
        {
          withCredentials: true,
        }
      );
      if (result.data.success) {
        toast.success(result.data.message);
        router.refresh();
      }
      setIsOpen(false);
    } catch (err) {
      toastError(err);
      if (axios.isAxiosError(err) && err.response?.status === 401)
        router.push("/login?message=Unauthorized");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create Bug
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Bug</DialogTitle>
          <DialogDescription>
            Fill up the details to create new bug.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                type="text"
                value={userInput.name}
                onChange={handleUserInput}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="priority">Select Priority</Label>
              <Select
                value={priorityVal}
                onValueChange={(e) => setPriorityVal(e)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                value={userInput.description}
                onChange={handleUserInput}
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating ..." : "Create Bug"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
