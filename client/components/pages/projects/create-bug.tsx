"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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
import { env } from "@/lib/env";
import toastError, { isLengthError } from "@/lib/toastError";
import { cn } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export default function CreateBug({
  organization,
  project,
}: {
  organization: string;
  project: string;
}) {
  const [isShown, setIsShown] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsShown(true)}>Create Bug</Button>
      {isShown && (
        <BugDialogBox
          organization={organization}
          project={project}
          setIsShown={setIsShown}
        />
      )}
    </div>
  );
}

function BugDialogBox({
  organization,
  project,
  setIsShown,
}: {
  organization: string;
  project: string;
  setIsShown: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
        `${env.API_URL}/api/${organization}/${project}/create-bug`,
        {
          name: userInput.name.trim(),
          priority: priorityVal || "MEDIUM",
          description: userInput.description.trim(),
        },
        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      if (result.data.success) {
        toast.success(result.data.message);
        router.push(`/org/${organization}/${project}`);
      }
    } catch (err) {
      toastError(err);
      if (axios.isAxiosError(err) && err.response?.status === 401)
        router.push("/login?message=Unauthorized");
    } finally {
      setIsSubmitting(false);
      setIsShown(false);
    }
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="relative">
            <CardHeader>
              <CardTitle>Create Bug</CardTitle>
              <CardDescription>
                Fill up the details to create new bug.
              </CardDescription>
              <Button
                variant={"outline"}
                className="h-6.5 w-6.5 absolute right-2 top-2"
                onClick={() => setIsShown(false)}
              >
                <IconX />
              </Button>
            </CardHeader>
            <CardContent>
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
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating ..." : "Create Bug"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
