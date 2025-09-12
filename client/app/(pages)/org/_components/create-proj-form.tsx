"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { env } from "@/lib/env";
import { useState } from "react";
import toastError, { isLengthError } from "@/lib/toastError";
import { ResponseExt } from "@/types/responseExt";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export default function CreateProjForm({
  organization,
}: {
  organization: string;
}) {
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
    e.preventDefault();
    if (
      isLengthError("Name", userInput.name, 6) ||
      isLengthError("Description", userInput.description, 10)
    )
      return;

    try {
      setIsSubmitting(true);
      const response: ResponseExt<{ slug: string }> = await axios.post(
        `${env.API_URL}/api/project/${organization}/create-project`,
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
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
          <CardDescription>
            Fill up the details to create project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
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
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating ..." : "Create Project"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
